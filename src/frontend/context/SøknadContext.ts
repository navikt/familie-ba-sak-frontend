import React from 'react';

import createUseContext from 'constate';
import { useHistory, useParams } from 'react-router';

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
import { IBarnMedOpplysninger, IRestRegistrerSøknad, Målform } from '../typer/søknad';
import { useBehandling } from './BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

const [SøknadProvider, useSøknad] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
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
            if (
                parseInt(behandlingId, 10) === åpenBehandling.behandlingId &&
                hentStegNummer(åpenBehandling.steg) >=
                    hentStegNummer(BehandlingSteg.VILKÅRSVURDERING) &&
                åpenBehandling.søknadsgrunnlag
            ) {
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
