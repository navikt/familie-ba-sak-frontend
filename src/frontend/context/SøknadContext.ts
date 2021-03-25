import React from 'react';

import createUseContext from 'constate';
import { useHistory, useParams } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import {
    BehandlingSteg,
    BehandlingUnderkategori,
    hentStegNummer,
    IBehandling,
} from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { FamilieRelasjonRolle, IFamilierelasjon } from '../typer/person';
import { IBarnMedOpplysninger, IRestRegistrerSøknad, ISøknadDTO, Målform } from '../typer/søknad';
import { useBehandling } from './BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

const [SøknadProvider, useSøknad] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const { request } = useHttp();
        const { fagsak, settFagsak } = useFagsakRessurser();
        const { erLesevisning } = useBehandling();
        const history = useHistory();
        const { bruker } = useFagsakRessurser();
        const { behandlingId } = useParams<{ behandlingId: string }>();

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
                    valideringsfunksjon: felt =>
                        felt.verdi.some((barn: IBarnMedOpplysninger) => barn.inkludertISøknaden)
                            ? ok(felt)
                            : feil(felt, 'Ingen av barna er valgt.'),
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
                    bruker.data.familierelasjoner
                        .filter(
                            (relasjon: IFamilierelasjon) =>
                                relasjon.relasjonRolle === FamilieRelasjonRolle.BARN
                        )
                        .map(
                            (relasjon: IFamilierelasjon): IBarnMedOpplysninger => ({
                                inkludertISøknaden: false,
                                ident: relasjon.personIdent,
                                navn: relasjon.navn,
                                fødselsdato: relasjon.fødselsdato,
                                manueltRegistrert: false,
                                uregistrert: false,
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
            if (
                parseInt(behandlingId, 10) === åpenBehandling.behandlingId &&
                hentStegNummer(åpenBehandling.steg) >=
                    hentStegNummer(BehandlingSteg.VILKÅRSVURDERING)
            ) {
                request<void, ISøknadDTO>({
                    method: 'GET',
                    url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/søknad`,
                    påvirkerSystemLaster: true,
                }).then((response: Ressurs<ISøknadDTO>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settSøknadErLastetFraBackend(true);
                        skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                            response.data.barnaMedOpplysninger.map(
                                (barnMedOpplysninger: IBarnMedOpplysninger) => ({
                                    ...barnMedOpplysninger,
                                    checked: true,
                                })
                            )
                        );

                        skjema.felter.målform.validerOgSettFelt(
                            response.data.søkerMedOpplysninger.målform
                        );
                    }
                });
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
                                        målform: undefined, // TODO
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
                        }
                    );
                }
            }
        };

        return {
            skjema,
            nesteAction,
            hentFeilTilOppsummering,
            søknadErLastetFraBackend,
        };
    }
);

export { SøknadProvider, useSøknad };
