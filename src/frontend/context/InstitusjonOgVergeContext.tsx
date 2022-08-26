import { useEffect, useState } from 'react';

import createUseContext from 'constate';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import { BehandlingSteg } from '../typer/behandling';
import type { IBehandling } from '../typer/behandling';
import { FagsakType } from '../typer/fagsak';
import type { IRegistrerInstitusjonOgVerge, IVerge } from '../typer/institusjon-og-verge';
import type { IPersonInfo } from '../typer/person';
import { hentAlder, kunSiffer } from '../utils/formatter';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { identValidator } from '../utils/validators';
import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakRessurser } from './FagsakContext';

const brytOppLagretAdresseinfo = (verge?: IVerge) => {
    // til preliminær bruk
    const adresse = verge?.adresse.split('\n').at(0);
    const postnummerOgSted = verge?.adresse.split('\n').at(1);
    const postnummer = postnummerOgSted?.split(' ')?.at(0);
    const sted = postnummerOgSted?.split(' ')?.at(1);
    return {
        adresse,
        postnummer,
        sted,
    };
};

const [InstitusjonOgVergeProvider, useInstitusjonOgVerge] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const { erLesevisning, settÅpenBehandling } = useBehandling();
        const { minimalFagsak } = useFagsakRessurser();
        const { fagsakId } = useSakOgBehandlingParams();
        const navigate = useNavigate();
        const { request } = useHttp();
        const [hentPersonFeilmelding, settHentPersonFeilmelding] = useState<string | undefined>('');
        const [submitFeilmelding, settSubmitFeilmelding] = useState<string | undefined>('');
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
        const { adresse, postnummer, sted } = brytOppLagretAdresseinfo(åpenBehandling.verge);
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
                    verdi: åpenBehandling.verge?.ident || '',
                    avhengigheter: { feilmelding: hentPersonFeilmelding },
                    valideringsfunksjon: (felt, avhengigheter) => {
                        if (avhengigheter?.feilmelding) {
                            return feil(felt, avhengigheter?.feilmelding);
                        } else {
                            return felt.verdi === '' ? ok(felt) : identValidator(felt);
                        }
                    },
                }),
                institusjon: institusjon,
                navn: useFelt<string | undefined>({
                    verdi: åpenBehandling.verge?.navn || '', // TODO Kan også brukes til oppgitt kontaktperson for en institusjon
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
                    verdi: adresse || '',
                }),
                postnummer: useFelt<string>({
                    verdi: postnummer || '',
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
                    verdi: sted || '',
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
            if (lesevisning()) {
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
            lesevisning,
            submitFeilmelding,
        };
    }
);

export { InstitusjonOgVergeProvider, useInstitusjonOgVerge };
