import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import { BehandlingSteg } from '../typer/behandling';
import type { IBehandling } from '../typer/behandling';
import { FagsakType } from '../typer/fagsak';
import type { IRegistrerInstitusjonOgVerge } from '../typer/institusjon-og-verge';
import type { IPersonInfo } from '../typer/person';
import { hentAlder, kunSiffer } from '../utils/formatter';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { identValidator } from '../utils/validators';
import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

const [MottakerTypeProvider, useMottakerType] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const { erLesevisning, settÅpenBehandling } = useBehandling();
        const { minimalFagsak } = useFagsakRessurser();
        const { fagsakId } = useSakOgBehandlingParams();
        const history = useHistory();
        const { request } = useHttp();
        const [feilMelding, settFeilMelding] = useState<string | undefined>('');
        const lesevisning = () =>
            erLesevisning() ||
            åpenBehandling?.steg !== BehandlingSteg.REGISTRERE_INSTITUSJON_OG_VERGE;

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
                navn: string | undefined;
                adresse: string;
                postnummer: string;
                sted: string;
            },
            IBehandling
        >({
            felter: {
                fødselsnummer: useFelt<string>({
                    verdi: '',
                    avhengigheter: { feilMelding },
                    valideringsfunksjon: (felt, avhengigheter) => {
                        if (avhengigheter?.feilMelding) {
                            return feil(felt, avhengigheter?.feilMelding);
                        } else {
                            return felt.verdi === '' ? ok(felt) : identValidator(felt);
                        }
                    },
                }),
                institusjon: institusjon,
                navn: useFelt<string | undefined>({
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
                }),
            },
            skjemanavn: 'Registrer mottaker',
        });

        useEffect(() => {
            settFeilMelding('');
        }, [skjema.felter.fødselsnummer.verdi]);

        const hentPerson = async () => {
            if (
                skjema.felter.fødselsnummer.verdi.length > 0 &&
                skjema.felter.fødselsnummer.valideringsstatus === Valideringsstatus.OK
            ) {
                const hentetPerson = await request<void, IPersonInfo>({
                    method: 'GET',
                    url: '/familie-ba-sak/api/person/adresse',
                    headers: {
                        personIdent: skjema.felter.fødselsnummer.verdi,
                    },
                });

                if (hentetPerson.status !== RessursStatus.SUKSESS) {
                    settFeilMelding('Ukjent feil ved henting av person');
                    return;
                } else if (!hentetPerson.data.harTilgang) {
                    const adressebeskyttelsegradering =
                        hentetPerson.data.adressebeskyttelseGradering.includes('strengt')
                            ? 'strengt fortrolig'
                            : 'fortrolig';
                    settFeilMelding(
                        `Personen har adresse med diskresjonskode ${adressebeskyttelsegradering}`
                    );
                    return;
                } else if (hentAlder(hentetPerson.data.fødselsdato) < 18) {
                    settFeilMelding('Fødselsdato er under myndighetsalder');
                }
                skjema.felter.navn.validerOgSettFelt(hentetPerson.data.navn);

                if (hentetPerson.data.bostedsadresse) {
                    skjema.felter.postnummer.validerOgSettFelt(
                        hentetPerson.data.bostedsadresse.postnummer
                    );
                    skjema.felter.adresse.validerOgSettFelt(
                        hentetPerson.data.bostedsadresse?.adresse || ''
                    );
                }
            } else {
                settFeilMelding(
                    skjema.felter.fødselsnummer.verdi.length > 0
                        ? 'Ugyldig fødselsnummer'
                        : 'Fødselsnummer er ikke satt'
                );
            }
        };

        const onSubmitMottaker = () => {
            if (lesevisning()) {
                history.push(
                    `/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`
                );
            } else {
                onSubmit<IRegistrerInstitusjonOgVerge | undefined>(
                    {
                        data: {
                            institusjonInfo:
                                fagsakType.data === FagsakType.INSTITUSJON
                                    ? {
                                          orgNummer: '',
                                          eksternTssNummer: '',
                                      }
                                    : undefined,
                            vergeInfo:
                                fagsakType.data !== FagsakType.INSTITUSJON
                                    ? {
                                          navn: skjema.felter.navn.verdi || '',
                                          adresse:
                                              skjema.felter.adresse.verdi +
                                              `\n${skjema.felter.postnummer.verdi} ${skjema.felter.sted.verdi}`,
                                          ident: skjema.felter.fødselsnummer.verdi
                                              ? skjema.felter.fødselsnummer.verdi
                                              : undefined,
                                      }
                                    : undefined,
                        },
                        method: 'POST',
                        url: `/familie-ba-sak/api/behandlinger/${åpenBehandling?.behandlingId}/steg/registrer-institusjon-og-verge`,
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
            lesevisning,
            registrertVerge: åpenBehandling.verge,
        };
    }
);

export { MottakerTypeProvider, useMottakerType };
