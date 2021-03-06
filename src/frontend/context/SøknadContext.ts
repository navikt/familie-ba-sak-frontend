import React from 'react';

import createUseContext from 'constate';
import { useHistory } from 'react-router';

import { Avhengigheter, feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { BehandlingUnderkategori, IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { ForelderBarnRelasjonRolle, IForelderBarnRelasjon } from '../typer/person';
import { IBarnMedOpplysninger, IRestRegistrerSøknad, Målform } from '../typer/søknad';
import {
    erEtter,
    kalenderDatoFraDate,
    kalenderDatoMedFallback,
    TIDENES_ENDE,
} from '../utils/kalender';
import { useBehandling } from './BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

export const hentBarnMedLøpendeUtbetaling = (fagsak: IFagsak) =>
    fagsak.gjeldendeUtbetalingsperioder
        .filter(utbetalingsperiode =>
            erEtter(
                kalenderDatoMedFallback(utbetalingsperiode.periodeTom, TIDENES_ENDE),
                kalenderDatoFraDate(new Date())
            )
        )
        .reduce((acc, utbetalingsperiode) => {
            utbetalingsperiode.utbetalingsperiodeDetaljer.map(utbetalingsperiodeDetalj =>
                acc.add(utbetalingsperiodeDetalj.person.personIdent)
            );

            return acc;
        }, new Set());

const [SøknadProvider, useSøknad] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const { fagsak, settFagsak } = useFagsakRessurser();
        const { erLesevisning } = useBehandling();
        const history = useHistory();
        const { bruker } = useFagsakRessurser();
        const [visBekreftModal, settVisBekreftModal] = React.useState<boolean>(false);

        const barnMedLøpendeUtbetaling =
            fagsak.status === RessursStatus.SUKSESS
                ? hentBarnMedLøpendeUtbetaling(fagsak.data)
                : new Set();

        const { skjema, nullstillSkjema, onSubmit, hentFeilTilOppsummering } = useSkjema<
            {
                underkategori: BehandlingUnderkategori;
                barnaMedOpplysninger: IBarnMedOpplysninger[];
                endringAvOpplysningerBegrunnelse: string;
                målform: Målform | undefined;
            },
            IFagsak
        >({
            felter: {
                underkategori: useFelt<BehandlingUnderkategori>({
                    verdi: BehandlingUnderkategori.ORDINÆR,
                }),
                barnaMedOpplysninger: useFelt<IBarnMedOpplysninger[]>({
                    verdi: [],
                    valideringsfunksjon: (felt, avhengigheter?: Avhengigheter) => {
                        return felt.verdi.some(
                            (barn: IBarnMedOpplysninger) => barn.inkludertISøknaden
                        ) || (avhengigheter?.barnMedLøpendeUtbetaling.size ?? []) > 0
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
                skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                    bruker.data.forelderBarnRelasjon
                        .filter(
                            (relasjon: IForelderBarnRelasjon) =>
                                relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                        )
                        .map(
                            (relasjon: IForelderBarnRelasjon): IBarnMedOpplysninger => ({
                                inkludertISøknaden: false,
                                ident: relasjon.personIdent,
                                navn: relasjon.navn,
                                fødselsdato: relasjon.fødselsdato,
                                manueltRegistrert: false,
                                erFolkeregistrert: true,
                            })
                        ) ?? []
                );
            }
            settSøknadErLastetFraBackend(false);
        };

        React.useEffect(() => {
            tilbakestillSøknad();
        }, [bruker.status]);

        React.useEffect(() => {
            if (åpenBehandling.søknadsgrunnlag) {
                settSøknadErLastetFraBackend(true);
                skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                    åpenBehandling.søknadsgrunnlag.barnaMedOpplysninger.map(
                        (barnMedOpplysninger: IBarnMedOpplysninger) => ({
                            ...barnMedOpplysninger,
                            checked: true,
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

        const nesteAction = (bekreftEndringerViaFrontend: boolean) => {
            if (bruker.status === RessursStatus.SUKSESS) {
                if (erLesevisning()) {
                    if (fagsak.status === RessursStatus.SUKSESS) {
                        history.push(
                            `/fagsak/${fagsak.data.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`
                        );
                    } else {
                        throw Error(
                            'Prøver å gå videre fra søknadsregistrering uten å ha en fagsak'
                        );
                    }
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
                                    barnaMedOpplysninger: skjema.felter.barnaMedOpplysninger.verdi,
                                    endringAvOpplysningerBegrunnelse:
                                        skjema.felter.endringAvOpplysningerBegrunnelse.verdi,
                                },
                                bekreftEndringerViaFrontend,
                            },
                            url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/registrere-søknad-og-hent-persongrunnlag`,
                        },
                        (response: Ressurs<IFagsak>) => {
                            if (response.status === RessursStatus.SUKSESS) {
                                settFagsak(response);
                                history.push(
                                    `/fagsak/${response.data.id}/${åpenBehandling.behandlingId}/vilkaarsvurdering`
                                );
                            }
                        },
                        (errorResponse: Ressurs<IFagsak>) => {
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
