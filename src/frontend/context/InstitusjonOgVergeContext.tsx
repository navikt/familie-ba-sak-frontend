import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import { feil, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../typer/behandling';
import { FagsakType } from '../typer/fagsak';
import type { IInstitusjon, IRegistrerInstitusjonOgVerge } from '../typer/institusjon-og-verge';
import type { IPersonInfo } from '../typer/person';
import { hentAlder } from '../utils/formatter';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { identValidator } from '../utils/validators';
import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

const [InstitusjonOgVergeProvider, useInstitusjonOgVerge] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const { erLesevisning, settÅpenBehandling } = useBehandling();
        const { minimalFagsak } = useFagsakRessurser();
        const { fagsakId } = useSakOgBehandlingParams();
        const navigate = useNavigate();
        const { request } = useHttp();
        const [hentPersonFeilmelding, settHentPersonFeilmelding] = useState<string | undefined>('');
        const [submitFeilmelding, settSubmitFeilmelding] = useState<string | undefined>('');

        const fagsakType: { [key: string]: string } = {
            data:
                minimalFagsak.status === RessursStatus.SUKSESS ? minimalFagsak.data.fagsakType : '',
            feilmelding:
                minimalFagsak.status !== RessursStatus.SUKSESS
                    ? hentFrontendFeilmelding(minimalFagsak) || 'Ukjent feil ved henting av fagsak'
                    : '',
        };
        const { skjema, onSubmit } = useSkjema<
            {
                fødselsnummer: string;
                institusjon: IInstitusjon | undefined;
                navn: string | undefined;
                adresse: string;
                postnummer: string;
                sted: string;
            },
            IBehandling
        >({
            felter: {
                fødselsnummer: useFelt<string>({
                    verdi: åpenBehandling.verge?.ident || '',
                    avhengigheter: { feilmelding: hentPersonFeilmelding },
                    valideringsfunksjon: (felt, avhengigheter) => {
                        if (avhengigheter?.feilmelding) {
                            return feil(felt, avhengigheter?.feilmelding);
                        } else {
                            return identValidator(felt);
                        }
                    },
                }),
                institusjon: useFelt<IInstitusjon | undefined>({
                    verdi:
                        minimalFagsak.status === RessursStatus.SUKSESS
                            ? minimalFagsak.data.institusjon
                            : undefined,
                }),
                navn: useFelt<string | undefined>({
                    verdi: '',
                }),
                adresse: useFelt<string>({
                    verdi: '',
                }),
                postnummer: useFelt<string>({
                    verdi: '',
                }),
                sted: useFelt<string>({
                    verdi: '',
                }),
            },
            skjemanavn: 'Registrer mottaker',
        });

        useEffect(() => {
            settHentPersonFeilmelding('');
        }, [skjema.felter.fødselsnummer.verdi]);

        const hentPerson = async () => {
            if (skjema.felter.fødselsnummer.verdi.length > 0) {
                const hentetPerson = await request<void, IPersonInfo>({
                    method: 'GET',
                    url: '/familie-ba-sak/api/person/adresse',
                    headers: {
                        personIdent: skjema.felter.fødselsnummer.verdi,
                    },
                });

                if (hentetPerson.status !== RessursStatus.SUKSESS) {
                    settHentPersonFeilmelding(
                        hentFrontendFeilmelding(hentetPerson) || 'Ukjent feil ved henting av person'
                    );
                    return;
                } else if (!hentetPerson.data.harTilgang) {
                    const adressebeskyttelsegradering =
                        hentetPerson.data.adressebeskyttelseGradering.includes('strengt')
                            ? 'strengt fortrolig'
                            : 'fortrolig';
                    settHentPersonFeilmelding(
                        `Personen har adresse med diskresjonskode ${adressebeskyttelsegradering}`
                    );
                    return;
                } else if (hentAlder(hentetPerson.data.fødselsdato) < 18) {
                    settHentPersonFeilmelding('Fødselsdato er under myndighetsalder');
                }
                settHentPersonFeilmelding('');
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
                settHentPersonFeilmelding('Fødselsnummer er ikke satt');
            }
        };

        const onSubmitMottaker = () => {
            if (erLesevisning()) {
                navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`);
            } else {
                onSubmit<IRegistrerInstitusjonOgVerge | undefined>(
                    {
                        data: {
                            institusjonInfo:
                                fagsakType.data === FagsakType.INSTITUSJON
                                    ? {
                                          orgNummer: '',
                                          tssEksternId: '',
                                      }
                                    : undefined,
                            vergeInfo:
                                fagsakType.data !== FagsakType.INSTITUSJON
                                    ? {
                                          ident: skjema.felter.fødselsnummer.verdi,
                                      }
                                    : undefined,
                        },
                        method: 'POST',
                        url: `/familie-ba-sak/api/behandlinger/${åpenBehandling?.behandlingId}/steg/registrer-institusjon-og-verge`,
                    },
                    (ressurs: Ressurs<IBehandling>) => {
                        if (ressurs.status === RessursStatus.SUKSESS) {
                            settÅpenBehandling(ressurs);
                            navigate(
                                `/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`
                            );
                        } else {
                            settSubmitFeilmelding(hentFrontendFeilmelding(ressurs));
                        }
                    },
                    (ressurs: Ressurs<IBehandling>) => {
                        settSubmitFeilmelding(hentFrontendFeilmelding(ressurs));
                    }
                );
            }
        };

        return {
            fagsakType,
            hentPerson,
            onSubmitMottaker,
            skjema,
            submitFeilmelding,
        };
    }
);

export { InstitusjonOgVergeProvider, useInstitusjonOgVerge };
