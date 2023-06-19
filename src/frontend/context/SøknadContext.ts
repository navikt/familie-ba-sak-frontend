import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import { useNavigate } from 'react-router-dom';

import type { Avhengigheter, FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import {
    Adressebeskyttelsegradering,
    hentDataFraRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

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
        const {
            bruker,
            minimalFagsak,
            skjemaHarValgtFortroligBarn,
            settSkjemaHarValgtFortroligBarn,
        } = useFagsakContext();
        const [visBekreftModal, settVisBekreftModal] = useState<boolean>(false);

        const barnMedLøpendeUtbetaling =
            minimalFagsak.status === RessursStatus.SUKSESS
                ? hentBarnMedLøpendeUtbetaling(minimalFagsak.data)
                : new Set();

        const brukerData = hentDataFraRessurs(bruker);
        const erBrukerFortrolig =
            brukerData?.adressebeskyttelseGradering ===
                Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
            brukerData?.adressebeskyttelseGradering ===
                Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND;
        function sjekkAtBarnIkkeErFortrolig(person: IBarnMedOpplysninger) {
            return !brukerData?.forelderBarnRelasjon.some(
                barn =>
                    barn.personIdent === person.ident &&
                    (Adressebeskyttelsegradering.STRENGT_FORTROLIG ===
                        barn.adressebeskyttelseGradering ||
                        Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND ===
                            barn.adressebeskyttelseGradering)
            );
        }

        const validerBrukerOgBarnaMedOpplysninger = (
            felt: FeltState<IBarnMedOpplysninger[]>,
            avhengigheter?: Avhengigheter
        ) => {
            if (
                !(
                    felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket) ||
                    (avhengigheter?.barnMedLøpendeUtbetaling.size ?? []) > 0
                )
            ) {
                return feil(felt, 'Ingen av barna er valgt.');
            }
            if (avhengigheter?.antallBrevmottakere && avhengigheter?.erBrukerFortrolig) {
                return feil(
                    felt,
                    'Brevmottaker(e) er manuelt registrert og må fjernes da brukeren har diskresjonskode.'
                );
            }
            if (avhengigheter?.antallBrevmottakere && avhengigheter?.finnesFortroligBarn) {
                return feil(
                    felt,
                    'Brevmottaker(e) er manuelt registrert og må fjernes før du kan velge barn med diskresjonskode.'
                );
            }
            return ok(felt);
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
                    valideringsfunksjon: validerBrukerOgBarnaMedOpplysninger,
                    avhengigheter: {
                        barnMedLøpendeUtbetaling,
                        antallBrevmottakere: åpenBehandling.brevmottakere.length,
                        erBrukerFortrolig,
                        finnesFortroligBarn: skjemaHarValgtFortroligBarn,
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

        const [søknadErLastetFraBackend, settSøknadErLastetFraBackend] = useState(false);

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

        useEffect(() => {
            tilbakestillSøknad();
        }, [bruker.status]);

        useEffect(() => {
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
        }, [åpenBehandling]);

        useEffect(() => {
            const merkedeBarn = skjema.felter.barnaMedOpplysninger.verdi.filter(
                barn => barn.merket
            );
            const finnesFortroligMerkedeBarn = !merkedeBarn.every(person =>
                sjekkAtBarnIkkeErFortrolig(person)
            );
            settSkjemaHarValgtFortroligBarn(finnesFortroligMerkedeBarn);
        }, [skjema.felter.barnaMedOpplysninger.verdi]);

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
