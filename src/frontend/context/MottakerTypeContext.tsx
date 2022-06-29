import createUseContext from 'constate';
import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../typer/behandling';
import type { IRegistrerMottaker } from '../typer/mottaker';
import type { IPersonInfo } from '../typer/person';
import { kunSiffer } from '../utils/formatter';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

const [MottakerTypeProvider, useMottakerType] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const { erLesevisning, settÅpenBehandling } = useBehandling();
        const { minimalFagsak } = useFagsakRessurser();
        const { fagsakId } = useSakOgBehandlingParams();
        const history = useHistory();
        const { request } = useHttp();

        const fagsakType: { [key: string]: string } = {
            data:
                minimalFagsak.status === RessursStatus.SUKSESS ? minimalFagsak.data.fagsakType : '',
            feilmelding:
                minimalFagsak.status !== RessursStatus.SUKSESS
                    ? hentFrontendFeilmelding(minimalFagsak) || 'Ukjent feil ved henting av fagsak'
                    : '',
        };
        const institusjon = useFelt<string | undefined>({
            verdi: undefined,
        });
        const { skjema, onSubmit } = useSkjema<
            {
                fødselsnummer: string;
                institusjon: string | undefined;
                mottaker: string | undefined;
                adresse: string;
                postnummer: string;
                sted: string;
            },
            IBehandling
        >({
            felter: {
                fødselsnummer: useFelt<string>({
                    verdi: '',
                }),
                institusjon: institusjon,
                mottaker: useFelt<string | undefined>({
                    verdi: '',
                    avhengigheter: institusjon,
                    valideringsfunksjon: (felt, avhengigheter) => {
                        if (
                            avhengigheter?.institusjon?.verdi ||
                            (felt.verdi && felt.verdi.length > 0)
                        ) {
                            return ok(felt);
                        } else {
                            return feil(felt, 'Vergens navn er ikke satt');
                        }
                    },
                }),
                adresse: useFelt<string>({
                    verdi: '',
                    valideringsfunksjon: felt => {
                        return felt.verdi !== '' ? ok(felt) : feil(felt, 'Adresse er ikke satt');
                    },
                }),
                postnummer: useFelt<string>({
                    verdi: '',
                    valideringsfunksjon: felt => {
                        if (kunSiffer(felt.verdi)) {
                            return ok(felt);
                        } else {
                            return feil(
                                felt,
                                felt.verdi === '' ? 'Postnummer er ikke satt' : 'Ugyldig postnummer'
                            );
                        }
                    },
                }),
                sted: useFelt<string>({
                    verdi: '',
                    valideringsfunksjon: felt => {
                        return felt.verdi !== '' ? ok(felt) : feil(felt, 'Sted er ikke satt');
                    },
                }),
            },
            skjemanavn: 'Registrer mottaker',
        });

        const hentPerson = async (personId: string) => {
            const hentetPerson = await request<void, IPersonInfo>({
                method: 'GET',
                url: '/familie-ba-sak/api/person',
                headers: {
                    personIdent: personId,
                },
            });

            if (hentetPerson.status !== RessursStatus.SUKSESS) {
                return 'Ukjent feil ved henting av person';
            } else if (!hentetPerson.data.harTilgang) {
                return 'Du har ikke tilgang til denne brukeren.';
            }
            skjema.felter.mottaker.validerOgSettFelt(hentetPerson.data.navn);
            skjema.felter.postnummer.validerOgSettFelt(hentetPerson.data.kommunenummer);
            // TODO IPersonInfo inneholder ikke adresse/sted

            return '';
        };

        const onSubmitMottaker = () => {
            if (erLesevisning()) {
                history.push(
                    `/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`
                );
            } else {
                onSubmit<IRegistrerMottaker | undefined>(
                    {
                        data: {
                            navn: skjema.felter.mottaker.verdi,
                            adresse: skjema.felter.adresse.verdi,
                            postNummer: skjema.felter.postnummer.verdi,
                            ident: skjema.felter.fødselsnummer.verdi,
                            orgNummer: '',
                            tsr: '',
                        },
                        method: 'POST',
                        url: `/familie-ba-sak/api/behandlinger/${åpenBehandling?.behandlingId}/registrer-mottaker`,
                    },
                    (ressurs: Ressurs<IBehandling>) => {
                        if (ressurs.status === RessursStatus.SUKSESS) {
                            settÅpenBehandling(ressurs);
                            history.push(
                                `/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`
                            );
                        }
                    }
                );
            }
        };

        return {
            fagsakType,
            hentPerson,
            onSubmitMottaker,
            skjema,
        };
    }
);

export { MottakerTypeProvider, useMottakerType };
