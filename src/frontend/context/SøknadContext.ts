import React from 'react';

import createUseContext from 'constate';
import { useNavigate } from 'react-router';

import type { Avhengigheter } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandlingContext } from './behandlingContext/BehandlingContext';
import useDeepEffect from '../hooks/useDeepEffect';
import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import { useFagsakContext } from '../sider/Fagsak/FagsakContext';
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

const [SøknadProvider, useSøknad] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const {
            vurderErLesevisning,
            settÅpenBehandling,
            gjelderInstitusjon,
            gjelderEnsligMindreårig,
        } = useBehandlingContext();
        const { fagsakId } = useSakOgBehandlingParams();
        const navigate = useNavigate();
        const { bruker, minimalFagsakRessurs } = useFagsakContext();
        const [visBekreftModal, settVisBekreftModal] = React.useState<boolean>(false);

        const barnMedLøpendeUtbetaling =
            minimalFagsakRessurs.status === RessursStatus.SUKSESS
                ? hentBarnMedLøpendeUtbetaling(minimalFagsakRessurs.data)
                : new Set();

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
                    valideringsfunksjon: (felt, avhengigheter?: Avhengigheter) => {
                        return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket) ||
                            (avhengigheter?.barnMedLøpendeUtbetaling.size ?? []) > 0
                            ? ok(felt)
                            : feil(felt, 'Ingen av barna er valgt.');
                    },
                    avhengigheter: { barnMedLøpendeUtbetaling },
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
            tilbakestillSøknad();
        }, [bruker.status]);

        useDeepEffect(() => {
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
        }, [åpenBehandling.behandlingId, åpenBehandling.søknadsgrunnlag]);

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
