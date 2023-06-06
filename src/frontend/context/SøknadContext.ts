import React from 'react';

import createUseContext from 'constate';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../typer/behandling';
import { BehandlingUnderkategori } from '../typer/behandlingstema';
import type { IForelderBarnRelasjon } from '../typer/person';
import { ForelderBarnRelasjonRolle } from '../typer/person';
import type {
    IBarnMedOpplysninger,
    IBarnMedOpplysningerBackend,
    IRestRegistrerSøknad,
    Målform,
} from '../typer/søknad';
import { hentBarnMedLøpendeUtbetaling } from '../utils/fagsak';
import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakContext } from './fagsak/FagsakContext';

const [SøknadProvider, useSøknad] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const {
            vurderErLesevisning,
            settÅpenBehandling,
            gjelderInstitusjon,
            gjelderEnsligMindreårig,
        } = useBehandling();
        const { fagsakId } = useSakOgBehandlingParams();
        const navigate = useNavigate();
        const { bruker, minimalFagsak } = useFagsakContext();
        const [visBekreftModal, settVisBekreftModal] = React.useState<boolean>(false);

        const { request } = useHttp();
        const mountedRef = React.useRef(true);
        const [antallBrevmottakere, settAntallBrevmottakere] = React.useState<number>(0);
        const [fortroligePersonIdenter, settFortroligePersonIdenter] = React.useState<string[]>([]);
        const [fortroligePersonIdenterFeilmelding, settFortroligePersonIdenterFeilmelding] =
            React.useState<string>('');

        const barnMedLøpendeUtbetaling =
            minimalFagsak.status === RessursStatus.SUKSESS
                ? hentBarnMedLøpendeUtbetaling(minimalFagsak.data)
                : new Set();

        const validerBarnaMedOpplysninger = (
            felt: FeltState<IBarnMedOpplysninger[]>,
            avhengigheter?: Avhengigheter
        ) => {
            if (
                felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket) ||
                (avhengigheter?.barnMedLøpendeUtbetaling.size ?? []) > 0
            ) {
                if (avhengigheter?.fortroligePersonIdenterFeilmelding) {
                    return feil(felt, 'Feil: ' + avhengigheter?.fortroligePersonIdenterFeilmelding);
                } else if (
                    avhengigheter?.antallBrevmottakere &&
                    avhengigheter?.fortroligePersonIdenter.length
                ) {
                    return feil(
                        felt,
                        'Brevmottaker(e) er manuelt registrert og må fjernes før du kan velge personer med ' +
                            'diskresjonskode. Følgende personer har diskresjonskode: ' +
                            avhengigheter?.fortroligePersonIdenter
                    );
                } else {
                    return ok(felt);
                }
            } else {
                return feil(felt, 'Ingen av barna er valgt.');
            }
        };

        const { skjema, nullstillSkjema, onSubmit, hentFeilTilOppsummering } = useSkjema<
            {
                underkategori: BehandlingUnderkategori;
                barnaMedOpplysninger: IBarnMedOpplysninger[];
                endringAvOpplysningerBegrunnelse: string;
                målform: Målform | undefined;
            },
            IBehandling
        >({
            felter: {
                underkategori: useFelt<BehandlingUnderkategori>({
                    verdi:
                        åpenBehandling.underkategori === BehandlingUnderkategori.UTVIDET
                            ? BehandlingUnderkategori.UTVIDET
                            : BehandlingUnderkategori.ORDINÆR,
                }),
                barnaMedOpplysninger: useFelt<IBarnMedOpplysninger[]>({
                    verdi: [],
                    valideringsfunksjon: validerBarnaMedOpplysninger,
                    avhengigheter: {
                        barnMedLøpendeUtbetaling,
                        antallBrevmottakere,
                        fortroligePersonIdenter,
                        fortroligePersonIdenterFeilmelding,
                    },
                }),
                endringAvOpplysningerBegrunnelse: useFelt<string>({
                    verdi: '',
                }),
                målform: useFelt<Målform | undefined>({
                    verdi: undefined,
                    valideringsfunksjon: felt =>
                        felt.verdi !== undefined ? ok(felt) : feil(felt, 'Målform er ikke valgt.'),
                }),
            },
            skjemanavn: 'Registrer søknad',
        });

        const [søknadErLastetFraBackend, settSøknadErLastetFraBackend] = React.useState(false);

        const tilbakestillSøknad = () => {
            if (bruker.status === RessursStatus.SUKSESS) {
                nullstillSkjema();
                let barnaMedOpplysninger: IBarnMedOpplysninger[];
                if (gjelderInstitusjon || gjelderEnsligMindreårig) {
                    barnaMedOpplysninger = [
                        {
                            merket: true,
                            ident: bruker.data.personIdent,
                            navn: bruker.data.navn,
                            fødselsdato: bruker.data.fødselsdato,
                            manueltRegistrert: false,
                            erFolkeregistrert: true,
                        },
                    ];
                } else {
                    barnaMedOpplysninger =
                        bruker.data.forelderBarnRelasjon
                            .filter(
                                (relasjon: IForelderBarnRelasjon) =>
                                    relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                            )
                            .map(
                                (relasjon: IForelderBarnRelasjon): IBarnMedOpplysninger => ({
                                    merket: false,
                                    ident: relasjon.personIdent,
                                    navn: relasjon.navn,
                                    fødselsdato: relasjon.fødselsdato,
                                    manueltRegistrert: false,
                                    erFolkeregistrert: true,
                                })
                            ) ?? [];
                }
                skjema.felter.barnaMedOpplysninger.validerOgSettFelt(barnaMedOpplysninger);
            }
            settSøknadErLastetFraBackend(false);
        };

        React.useEffect(() => {
            return () => {
                mountedRef.current = false;
            };
        }, []);

        React.useEffect(() => {
            const merkedeBarn = skjema.felter.barnaMedOpplysninger.verdi.filter(
                barn => barn.merket
            );
            const personIdentArray = merkedeBarn.map(p => p.ident);
            const brukerData = bruker.status === RessursStatus.SUKSESS ? bruker.data : undefined;
            personIdentArray.push(brukerData?.personIdent ?? '');
            hentPersonerMedAdresseBeskyttelse(personIdentArray);
        }, [skjema.felter.barnaMedOpplysninger.verdi]);

        React.useEffect(() => {
            tilbakestillSøknad();
        }, [bruker.status]);

        React.useEffect(() => {
            if (åpenBehandling.søknadsgrunnlag) {
                settSøknadErLastetFraBackend(true);
                skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                    åpenBehandling.søknadsgrunnlag.barnaMedOpplysninger.map(
                        (barnMedOpplysninger: IBarnMedOpplysningerBackend) => ({
                            ...barnMedOpplysninger,
                            merket: barnMedOpplysninger.inkludertISøknaden,
                        })
                    )
                );

                skjema.felter.målform.validerOgSettFelt(
                    åpenBehandling.søknadsgrunnlag.søkerMedOpplysninger.målform
                );
                skjema.felter.underkategori.validerOgSettFelt(
                    åpenBehandling.søknadsgrunnlag.underkategori
                );
                skjema.felter.endringAvOpplysningerBegrunnelse.validerOgSettFelt(
                    åpenBehandling.søknadsgrunnlag.endringAvOpplysningerBegrunnelse
                );
            } else {
                // Ny behandling er lastet som ikke har fullført søknad-steget.
                tilbakestillSøknad();
            }
            settAntallBrevmottakere(åpenBehandling.brevmottakere.length);
        }, [åpenBehandling]);

        const nesteAction = (bekreftEndringerViaFrontend: boolean) => {
            if (bruker.status === RessursStatus.SUKSESS) {
                if (vurderErLesevisning()) {
                    navigate(
                        `/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`
                    );
                } else {
                    onSubmit<IRestRegistrerSøknad>(
                        {
                            method: 'POST',
                            data: {
                                søknad: {
                                    underkategori: skjema.felter.underkategori.verdi,
                                    søkerMedOpplysninger: {
                                        ident: bruker.data.personIdent,
                                        målform: skjema.felter.målform.verdi,
                                    },
                                    barnaMedOpplysninger:
                                        skjema.felter.barnaMedOpplysninger.verdi.map(
                                            (
                                                barn: IBarnMedOpplysninger
                                            ): IBarnMedOpplysningerBackend => ({
                                                ...barn,
                                                inkludertISøknaden: barn.merket,
                                            })
                                        ),
                                    endringAvOpplysningerBegrunnelse:
                                        skjema.felter.endringAvOpplysningerBegrunnelse.verdi,
                                },
                                bekreftEndringerViaFrontend,
                            },
                            url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/steg/registrer-søknad`,
                        },
                        (response: Ressurs<IBehandling>) => {
                            if (response.status === RessursStatus.SUKSESS) {
                                settÅpenBehandling(response);
                                navigate(
                                    `/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/vilkaarsvurdering`
                                );
                            }
                        },
                        (errorResponse: Ressurs<IBehandling>) => {
                            if (errorResponse.status === RessursStatus.FUNKSJONELL_FEIL) {
                                settVisBekreftModal(true);
                            }
                        }
                    );
                }
            }
        };

        const hentPersonerMedAdresseBeskyttelse = async (personIdentArray: string[]) => {
            if (personIdentArray.length) {
                settFortroligePersonIdenterFeilmelding('');
                await request<string[], string[]>({
                    method: 'POST',
                    url: '/familie-ba-sak/api/person/personidenterMedStrengtFortroligGradering',
                    data: personIdentArray,
                })
                    .then((response: Ressurs<string[]>) => {
                        if (!mountedRef.current) return null;
                        if (response.status === RessursStatus.SUKSESS) {
                            settFortroligePersonIdenter(response.data);
                        } else if (
                            response.status === RessursStatus.FEILET ||
                            response.status === RessursStatus.FUNKSJONELL_FEIL ||
                            response.status === RessursStatus.IKKE_TILGANG
                        ) {
                            settFortroligePersonIdenterFeilmelding(
                                'Feil ved validering for personer med strengt fortrolig adresse med manuelle brevmottakere satt: ' +
                                    response.frontendFeilmelding
                            );
                        } else {
                            settFortroligePersonIdenterFeilmelding(
                                'Ugyldig status returnert ved validering for personer med strengt fortrolig adresse med manuelle brevmottakere satt: ' +
                                    response.status
                            );
                        }
                    })
                    .catch(err => {
                        if (!mountedRef.current) return null;
                        settFortroligePersonIdenterFeilmelding(
                            'En feil oppstod ved validering for personer med strengt fortrolig adresse med manuelle brevmottakere satt: ' +
                                err.message
                        );
                    });
            } else {
                settFortroligePersonIdenter([]);
            }
        };

        return {
            barnMedLøpendeUtbetaling,
            hentFeilTilOppsummering,
            nesteAction,
            settVisBekreftModal,
            skjema,
            søknadErLastetFraBackend,
            visBekreftModal,
        };
    }
);

export { SøknadProvider, useSøknad };
