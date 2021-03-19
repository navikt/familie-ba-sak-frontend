import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useHistory, useParams } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import {
    useFelt,
    feil,
    Avhengigheter,
    useSkjema,
    ok,
    Felt,
    FeltState,
} from '@navikt/familie-skjema';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    IDokumentInfo,
    Ressurs,
    RessursStatus,
    AvsenderMottakerIdType,
    kjønnType,
    AvsenderMottaker,
} from '@navikt/familie-typer';

import { Behandlingstype, BehandlingÅrsak, IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import {
    BrevkodeMap,
    IDataForManuellJournalføring,
    IRestJournalføring,
    JournalpostKanal,
} from '../typer/manuell-journalføring';
import { Adressebeskyttelsegradering, IPersonInfo, PersonType } from '../typer/person';
import { hentAktivBehandlingPåFagsak } from '../utils/fagsak';
import familieDayjs, { familieDayjsDiff } from '../utils/familieDayjs';
import { useApp } from './AppContext';

const tomPerson: IPersonInfo = {
    adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
    harTilgang: true,
    familierelasjoner: [],
    familierelasjonerMaskert: [],
    fødselsdato: '',
    kjønn: kjønnType.UKJENT,
    navn: '',
    personIdent: '',
    type: PersonType.SØKER,
};

const tomAvsender: AvsenderMottaker = {
    erLikBruker: false,
    id: '',
    land: '',
    navn: '',
    type: AvsenderMottakerIdType.UKJENT,
};

const erPersonTom = (person: IPersonInfo | undefined) => !person || !person.personIdent;

const erAvsenderTom = (avsender: AvsenderMottaker | undefined) => !avsender || !avsender.navn;

const erstattNullVerdiMedTomtObjekt = (res: Ressurs<IDataForManuellJournalføring>) => {
    // Vi bruker tomt objekt for person og avsender hvis de er null/undefined i hentet data fra backend
    // fordi vi vil bruke objektene til å indeksere valideringsfeil (Se validaterData())
    if (res.status === RessursStatus.SUKSESS) {
        if (!res.data.person) {
            res.data.person = tomPerson;
        }
        if (!res.data.journalpost.avsenderMottaker) {
            res.data.journalpost.avsenderMottaker = tomAvsender;
        }
    }
    return res;
};

const validaterData = (dataForValidering: IDataForManuellJournalføring) => {
    const valideringsfeilMap = new Map<unknown, string[]>();

    const settValideringsfeil = (data: unknown, feil: string) => {
        valideringsfeilMap.set(data, [...(valideringsfeilMap.get(data) || []), feil]);
    };

    if (!dataForValidering.journalpost.tittel) {
        settValideringsfeil(dataForValidering.journalpost, 'Journalposttittel må ikke være tom');
    }

    dataForValidering.journalpost.dokumenter?.forEach(dokument => {
        if (!dokument.tittel) {
            settValideringsfeil(dokument, 'Dokumenttittel må ikke være tom');
        }
    });

    if (erPersonTom(dataForValidering.person)) {
        settValideringsfeil(dataForValidering.person, 'Bruker er ikke satt');
    }

    if (erAvsenderTom(dataForValidering.journalpost.avsenderMottaker)) {
        settValideringsfeil(
            dataForValidering.journalpost.avsenderMottaker,
            'Avsender er ikke satt'
        );
    }

    return valideringsfeilMap;
};

const [ManuellJournalførProvider, useManuellJournalfør] = createUseContext(() => {
    const { innloggetSaksbehandler } = useApp();
    const history = useHistory();
    const { request } = useHttp();
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const [dokumentData, settDokumentData] = React.useState(byggTomRessurs<string>());

    const [fagsak, settFagsak] = useState<IFagsak | undefined>(undefined);
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            settDokumentData(byggTomRessurs());
        }
    }, [oppgaveId]);

    const knyttTilNyBehandling = useFelt<boolean>({
        verdi: false,
    });

    const behandlingstype = useFelt<Behandlingstype | ''>({
        verdi: '',
        valideringsfunksjon: felt => {
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Velg type behandling som skal opprettes fra nedtrekkslisten');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            const knyttTilNyBehandling = avhengigheter.knyttTilNyBehandling;
            return knyttTilNyBehandling;
        },
        avhengigheter: { knyttTilNyBehandling: knyttTilNyBehandling.verdi },
    });

    const behandlingsårsak = useFelt<BehandlingÅrsak | ''>({
        verdi: '',
        valideringsfunksjon: felt => {
            return felt.verdi !== ''
                ? ok(felt)
                : feil(felt, 'Velg årsak for opprettelse av behandlingen fra nedtrekkslisten');
        },
        skalFeltetVises: (avhengigheter: Avhengigheter) => {
            const knyttTilNyBehandling = avhengigheter.knyttTilNyBehandling;
            const behandlingstypeVerdi = avhengigheter.behandlingstype;
            return knyttTilNyBehandling && behandlingstypeVerdi === Behandlingstype.REVURDERING;
        },
        avhengigheter: {
            behandlingstype: behandlingstype.verdi,
            knyttTilNyBehandling: knyttTilNyBehandling.verdi,
        },
    });

    const [valgtDokumentId, settValgtDokumentId] = React.useState<string | undefined>(undefined);
    const { skjema, nullstillSkjema, kanSendeSkjema, onSubmit } = useSkjema<
        {
            avsenderMottaker: AvsenderMottaker;
            bruker: IPersonInfo | undefined;
            knyttTilNyBehandling: boolean;
            behandlingstype: Behandlingstype | '';
            behandlingsårsak: BehandlingÅrsak | '';
            journalpostTittel: string;
            tilknyttedeBehandlingIder: number[];
            dokumenter: IDokumentInfo[];
        },
        string
    >({
        felter: {
            avsenderMottaker: useFelt<AvsenderMottaker>({ verdi: tomAvsender }),
            bruker: useFelt<IPersonInfo | undefined>({
                verdi: undefined,
                valideringsfunksjon: (felt: FeltState<IPersonInfo | undefined>) => {
                    return felt.verdi !== undefined ? ok(felt) : feil(felt, 'Bruker er ikke satt');
                },
            }),
            behandlingstype,
            behandlingsårsak,
            dokumenter: useFelt<IDokumentInfo[]>({ verdi: [] }),
            knyttTilNyBehandling,
            journalpostTittel: useFelt<string>({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<string>) => {
                    return felt.verdi !== ''
                        ? ok(felt)
                        : feil(felt, 'Journalposttittel må ikke være tom');
                },
            }),
            tilknyttedeBehandlingIder: useFelt<number[]>({
                verdi: [],
            }),
        },
        skjemanavn: 'Opprett behandling modal',
    });

    useEffect(() => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            skjema.felter.dokumenter.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.dokumenter ?? []
            );

            skjema.felter.journalpostTittel.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.tittel ?? ''
            );

            skjema.felter.avsenderMottaker.validerOgSettFelt(
                dataForManuellJournalføring.data.journalpost.avsenderMottaker ?? tomAvsender
            );

            skjema.felter.bruker.validerOgSettFelt(dataForManuellJournalføring.data.person);

            settFagsak(dataForManuellJournalføring.data.fagsak);
        }
    }, [dataForManuellJournalføring]);

    // TODO - kanskje noe som kan ligge i skjema-hooken?
    const erEndret = () => false;

    const tilbakestillData = () => {
        nullstillSkjema();
    };

    const settDokumentTittel = (dokumentTittel: string, dokumentInfoId?: string) => {
        skjema.felter.dokumenter.validerOgSettFelt([
            ...skjema.felter.dokumenter.verdi.map(dokument => {
                return dokumentInfoId === valgtDokumentId
                    ? {
                          ...dokument,
                          tittel: dokumentTittel,
                          brevkode: hentBrevkode(dokumentTittel),
                      }
                    : dokument;
            }),
        ]);
    };

    const settLogiskeVedlegg = (logiskeVedleggNavn: string[], dokumentInfoId?: string) => {
        skjema.felter.dokumenter.validerOgSettFelt([
            ...skjema.felter.dokumenter.verdi.map(dokument => {
                return dokumentInfoId === valgtDokumentId
                    ? {
                          ...dokument,
                          logiskeVedlegg: logiskeVedleggNavn.map(vedlegg => ({
                              tittel: vedlegg,
                              logiskVedleggId: '0', // Påkrevd felt, ignoreres av backend. Kan settes til hva som helst.
                          })),
                      }
                    : dokument;
            }),
        ]);
    };

    const hentBrevkode = (dokumentTittel: string | undefined): string => {
        return BrevkodeMap.get(dokumentTittel) || '';
    };

    const hentFagsak = async (personId: string) => {
        return request<{ personIdent: string }, IFagsak | undefined>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/hent-fagsak-paa-person`,
            data: {
                personIdent: personId,
            },
        }).then((fagsak: Ressurs<IFagsak | undefined>) => {
            return fagsak;
        });
    };

    const endreBruker = async (personId: string) => {
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
            if (
                hentetPerson.data.adressebeskyttelseGradering ===
                Adressebeskyttelsegradering.FORTROLIG
            ) {
                return 'Brukeren har diskresjonskode fortrolig adresse. Avbryt journalføringen og endre enhet.';
            } else if (
                hentetPerson.data.adressebeskyttelseGradering ===
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG ||
                hentetPerson.data.adressebeskyttelseGradering ===
                    Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND
            ) {
                return 'Brukeren har diskresjonskode strengt fortrolig adresse. Avbryt journalføringen og tildel ny saksbehandler.';
            } else {
                return 'Du har ikke tilgang til denne brukeren.';
            }
        }

        const restFagsak = await hentFagsak(hentetPerson.data.personIdent);
        if (restFagsak.status === RessursStatus.SUKSESS) {
            skjema.felter.bruker.validerOgSettFelt(hentetPerson.data);
            settFagsak(restFagsak.data);
            return '';
        } else {
            return 'Ukjent feil ved henting av fagsak.';
        }
    };

    const hentDataForManuellJournalføring = async (oppgaveId: string) => {
        settDataForManuellJournalføring(byggHenterRessurs());
        return request<void, IDataForManuellJournalføring>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgave/${oppgaveId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetDataForManuellJournalføring: Ressurs<IDataForManuellJournalføring>) => {
                settDataForManuellJournalføring(
                    erstattNullVerdiMedTomtObjekt(hentetDataForManuellJournalføring)
                );

                if (hentetDataForManuellJournalføring.status === RessursStatus.SUKSESS) {
                    const førsteDokument = hentetDataForManuellJournalføring.data.journalpost.dokumenter?.find(
                        () => true
                    );
                    settValgtDokumentId(førsteDokument?.dokumentInfoId);
                    hentOgVisDokument(
                        hentetDataForManuellJournalføring.data.journalpost.journalpostId,
                        førsteDokument?.dokumentInfoId
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settDataForManuellJournalføring(
                    byggFeiletRessurs('Ukjent feil ved henting av oppgave')
                );
            });
    };

    const hentOgVisDokument = async (
        journalpostId: string | undefined,
        dokumentInfoId: string | undefined
    ) => {
        if (!journalpostId || !dokumentInfoId) {
            return;
        }

        settDokumentData(byggHenterRessurs());
        return request<void, string>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/${journalpostId}/hent/${dokumentInfoId}`,
            påvirkerSystemLaster: false,
        })
            .then((hentetDokumentData: Ressurs<string>) => {
                if (hentetDokumentData.status === RessursStatus.SUKSESS) {
                    settDokumentData(
                        byggDataRessurs(`data:application/pdf;base64,${hentetDokumentData.data}`)
                    );
                } else if (
                    hentetDokumentData.status === RessursStatus.FEILET ||
                    hentetDokumentData.status === RessursStatus.FUNKSJONELL_FEIL ||
                    hentetDokumentData.status === RessursStatus.IKKE_TILGANG
                ) {
                    settDokumentData(hentetDokumentData);
                } else {
                    settDokumentData(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settDokumentData(byggFeiletRessurs('Ukjent feil ved henting av dokument'));
            });
    };

    const velgOgHentDokumentData = (dokumentInfoId: string) => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            hentOgVisDokument(
                dataForManuellJournalføring.data.journalpost.journalpostId,
                dokumentInfoId
            );
            settValgtDokumentId(dokumentInfoId);
        }
    };

    const settJournalpostTittel = (tittel: string) => {
        console.log(tittel);
        skjema.felter.journalpostTittel.validerOgSettFelt(tittel);
    };

    const settAvsender = (navn: string, id = '') => {
        skjema.felter.avsenderMottaker.validerOgSettFelt({
            ...skjema.felter.avsenderMottaker.verdi,
            navn,
            id,
        });
    };

    const tilbakestillJournalpostTittel = () => {
        skjema.felter.journalpostTittel.nullstill();
    };

    const hentAktivBehandlingForJournalføring = (): IBehandling | undefined => {
        let aktivBehandling = undefined;
        if (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.fagsak
        ) {
            aktivBehandling = hentAktivBehandlingPåFagsak(dataForManuellJournalføring.data.fagsak);
        }
        return aktivBehandling;
    };

    const hentSorterteBehandlinger = () => {
        return dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.fagsak?.behandlinger.length
            ? dataForManuellJournalføring.data.fagsak.behandlinger.sort((a, b) =>
                  familieDayjsDiff(
                      familieDayjs(b.opprettetTidspunkt),
                      familieDayjs(a.opprettetTidspunkt)
                  )
              )
            : [];
    };

    const journalfør = async () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            const erDigitalKanal =
                dataForManuellJournalføring.data.journalpost.kanal === JournalpostKanal.NAV_NO;

            const nyBehandlingstype = skjema.felter.behandlingstype.verdi;
            const nyBehandlingsårsak = skjema.felter.behandlingsårsak.verdi;

            //SKAN_IM-kanalen benytter logiske vedlegg, NAV_NO-kanalen gjør ikke. For sistnevnte må titlene konkateneres.
            onSubmit<IRestJournalføring>(
                {
                    method: 'POST',
                    url: `/familie-ba-sak/api/journalpost/${
                        dataForManuellJournalføring.data.journalpost.journalpostId
                    }/journalfør/${oppgaveId}?journalfoerendeEnhet=${
                        innloggetSaksbehandler?.enhet ?? '9999'
                    }&ferdigstill=true`,
                    data: {
                        journalpostTittel: skjema.felter.journalpostTittel.verdi,
                        bruker: {
                            navn: skjema.felter.bruker.verdi?.navn ?? '',
                            id: skjema.felter.bruker.verdi?.personIdent ?? '',
                        },
                        avsender: {
                            navn: skjema.felter.avsenderMottaker.verdi.navn,
                            id: skjema.felter.avsenderMottaker.verdi.id,
                        },
                        datoMottatt: dataForManuellJournalføring.data.journalpost.datoMottatt,
                        dokumenter: skjema.felter.dokumenter.verdi.map(dokument => {
                            const exsisterendeLogiskeVedlegg = dataForManuellJournalføring.data.journalpost.dokumenter?.find(
                                it => it.dokumentInfoId === dokument.dokumentInfoId
                            )?.logiskeVedlegg;
                            const tittelsammenkobling = dokument.logiskeVedlegg
                                .map(current => current.tittel)
                                .reduce(
                                    (previous, current) => `${previous}, ${current}`,
                                    dokument.tittel ?? ''
                                );

                            return {
                                dokumentTittel: erDigitalKanal
                                    ? tittelsammenkobling
                                    : dokument.tittel,
                                dokumentInfoId: dokument.dokumentInfoId || '0',
                                eksisterendeLogiskeVedlegg: exsisterendeLogiskeVedlegg,
                                logiskeVedlegg: erDigitalKanal
                                    ? exsisterendeLogiskeVedlegg
                                    : dokument.logiskeVedlegg,
                            };
                        }),
                        knyttTilFagsak:
                            skjema.felter.tilknyttedeBehandlingIder.verdi.length > 0 ||
                            skjema.felter.knyttTilNyBehandling.verdi,
                        tilknyttedeBehandlingIder: skjema.felter.tilknyttedeBehandlingIder.verdi,
                        opprettOgKnyttTilNyBehandling: skjema.felter.knyttTilNyBehandling.verdi,
                        nyBehandlingstype: nyBehandlingstype,
                        nyBehandlingsårsak:
                            nyBehandlingstype === Behandlingstype.FØRSTEGANGSBEHANDLING
                                ? BehandlingÅrsak.SØKNAD
                                : nyBehandlingsårsak,
                        navIdent: innloggetSaksbehandler?.navIdent ?? '',
                    },
                },
                (fagsakId: Ressurs<string>) => {
                    if (fagsakId.status === RessursStatus.SUKSESS && fagsakId.data !== '') {
                        history.push(`/fagsak/${fagsakId.data}/saksoversikt`);
                    } else if (fagsakId.status === RessursStatus.SUKSESS) {
                        history.push('/oppgaver');
                    }
                    return fagsakId;
                }
            );
        }
    };
    console.log(skjema);

    return {
        dataForManuellJournalføring,

        dokumentData,
        skjema,
        fagsak,
        nullstillSkjema,
        valgtDokumentId,
        settDokumentTittel,
        settLogiskeVedlegg,
        settAvsender,
        velgOgHentDokumentData,

        // Funksjoner for å endre journalpostmetadata
        settJournalpostTittel,
        tilbakestillJournalpostTittel,

        // Funksjoner som omhandler bruker og behandling
        endreBruker,
        hentAktivBehandlingForJournalføring,
        hentSorterteBehandlinger,
        knyttTilNyBehandling,

        // Validering og tilbakestilling
        erEndret,
        tilbakestillData,
        harFeil: (param: unknown) => false,

        // Journalføring
        journalfør,
    };
});

export { ManuellJournalførProvider, useManuellJournalfør };
