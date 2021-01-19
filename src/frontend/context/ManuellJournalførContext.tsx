import React from 'react';

import { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useHistory, useParams } from 'react-router';

import { useHttp } from '@navikt/familie-http';
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
    byggSuksessRessurs,
    IJournalpost,
} from '@navikt/familie-typer';

import { IOpprettBehandlingData, IOpprettEllerHentFagsakData } from '../api/fagsak';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
    IBehandling,
} from '../typer/behandling';
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
        settValideringsfeil(dataForValidering.journalpost, 'Journalpost tittel må ikke være tom');
    }

    dataForValidering.journalpost.dokumenter?.forEach(dokument => {
        if (!dokument.tittel) {
            settValideringsfeil(dokument, 'Dokument tittel må ikke være tom');
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
    const { request } = useHttp();
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [dokumentData, settDokumentData] = React.useState(byggTomRessurs<string>());
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const [valideringsfeil, settValideringsfeil] = React.useState(new Map<unknown, string[]>());

    const harFeil = (data: unknown) => !!hentFeil(data).length;

    const hentFeil = (data: unknown = undefined) =>
        data
            ? valideringsfeil.get(data) ?? []
            : Array.from(valideringsfeil, ([_, feil]) => feil).reduce(
                  (alleFeil, feil) => [...alleFeil, ...feil],
                  []
              );

    const erEndret = () =>
        oppdatertData.status === RessursStatus.SUKSESS &&
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        (JSON.stringify(oppdatertData.data.journalpost) !==
            JSON.stringify(dataForManuellJournalføring.data.journalpost) ||
            JSON.stringify(oppdatertData.data.person) !==
                JSON.stringify(dataForManuellJournalføring.data.person));

    const tilbakestillBruker = () => {
        if (
            oppdatertData.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            oppdatertData.data.person?.personIdent !==
                dataForManuellJournalføring.data.person?.personIdent
        ) {
            endreBruker(dataForManuellJournalføring.data.person?.personIdent ?? '');
        }
    };

    const tilbakestillData = () => {
        settDataRessurs(dataForManuellJournalføring, true);
        tilbakestillBruker();
    };

    // Vi lager en kopi av journalposten, for enklere å støtte tilbakestilling av endringer.
    // Modifikasjoner gjøres på kopien. Ved tilbakestilling reverterer vi tilbake til originalen.
    const [oppdatertData, settOppdatertData] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );

    const [valgtDokumentId, settValgtDokumentId] = React.useState<string | undefined>(undefined);
    const history = useHistory();

    const lagerDataKopi = (dataRessurs: Ressurs<IDataForManuellJournalføring>) =>
        JSON.parse(JSON.stringify(dataRessurs));

    // Funksjonen kan brukes for <<tilbakestill>>, hvor vi ikke skal tilbakestille fagsak dersom fagsaken er endret
    // (endringer på fagsak er ikke mulig å tilbakestille, da allerede er lagret i databasen).
    // Dette vil f.eks. skje når en behandling er opprettet.
    const settDataRessurs = (
        dataRessurs: Ressurs<IDataForManuellJournalføring>,
        beholdFagsak = false
    ) => {
        settDataForManuellJournalføring(dataRessurs);
        const oppdatert = lagerDataKopi(dataRessurs);

        if (beholdFagsak && oppdatertData.status === RessursStatus.SUKSESS) {
            oppdatert.data.fagsak = oppdatertData.data.fagsak;
        }

        settOppdatertData(oppdatert);

        if (oppdatert.status === RessursStatus.SUKSESS) {
            const førsteDokument = oppdatert.data.journalpost.dokumenter?.find(() => true);
            settValgtDokumentId(førsteDokument?.dokumentInfoId);
            hentOgVisDokument(
                oppdatert.data.journalpost.journalpostId,
                førsteDokument?.dokumentInfoId
            );
        }
    };

    const [tilknyttedeBehandlingIder, settTilknyttedeBehandlingIder] = React.useState<number[]>([]);

    const finnDokument = (
        ressurs: Ressurs<IDataForManuellJournalføring>,
        dokumentInfoId: string | undefined
    ) => {
        return ressurs.status !== RessursStatus.SUKSESS
            ? undefined
            : ressurs.data.journalpost.dokumenter?.find(
                  dokument => dokument.dokumentInfoId === dokumentInfoId
              );
    };

    const finnValgtDokument = (ressurs: Ressurs<IDataForManuellJournalføring>) => {
        return finnDokument(ressurs, valgtDokumentId);
    };

    const settValgtDokumentInfo = (dokumentInfo: IDokumentInfo) => {
        oppdatertData.status === RessursStatus.SUKSESS &&
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    journalpost: {
                        ...oppdatertData.data.journalpost,
                        dokumenter: oppdatertData.data.journalpost.dokumenter?.map(dokument => {
                            return dokument.dokumentInfoId === valgtDokumentId
                                ? dokumentInfo
                                : dokument;
                        }),
                    },
                },
            });
    };

    const settDokumentTittel = (dokumentTittel: string) => {
        const valgt = finnValgtDokument(oppdatertData);
        if (!valgt) {
            return;
        }
        valgt.tittel = dokumentTittel;
        valgt.brevkode = hentBrevkode(valgt.tittel);
        settValgtDokumentInfo(valgt);
    };

    const settLogiskeVedlegg = (logiskeVedleggNavn: Array<string>) => {
        const valgt = finnValgtDokument(oppdatertData);
        if (!valgt) {
            return;
        }

        valgt.logiskeVedlegg = logiskeVedleggNavn.map(vedlegg => {
            return {
                tittel: vedlegg,
                logiskVedleggId: '0', // Påkrevd felt, ignoreres av backend. Kan settes til hva som helst.
            };
        });
        settValgtDokumentInfo(valgt);
    };

    const hentBrevkode = (dokumentTittel: string | undefined): string => {
        return BrevkodeMap.get(dokumentTittel) || '';
    };

    const settFagsak = (fagsak: Ressurs<IFagsak | undefined>) => {
        if (
            oppdatertData.status === RessursStatus.SUKSESS &&
            fagsak.status === RessursStatus.SUKSESS
        ) {
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    fagsak: fagsak.data,
                },
            });
        }
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

        if (hentetPerson.status === RessursStatus.SUKSESS) {
            hentetPerson.data.harTilgang = false;
            hentetPerson.data.adressebeskyttelseGradering =
                Adressebeskyttelsegradering.STRENGT_FORTROLIG_UTLAND;
        }

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
        if (
            restFagsak.status === RessursStatus.SUKSESS &&
            oppdatertData.status === RessursStatus.SUKSESS
        ) {
            settPersonOgFagsak(hentetPerson, restFagsak);
            return '';
        } else {
            return 'Ukjent feil ved henting av fagsak.';
        }
    };

    const tilbakestillDokumentTittel = () => {
        const valgtDokument = finnValgtDokument(oppdatertData);
        const valgtDokumentUendret = finnValgtDokument(dataForManuellJournalføring);
        if (valgtDokument && valgtDokumentUendret) {
            valgtDokument.tittel = valgtDokumentUendret.tittel;
            settValgtDokumentInfo(valgtDokument);
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
                settDataRessurs(erstattNullVerdiMedTomtObjekt(hentetDataForManuellJournalføring));
            })
            .catch((_error: AxiosError) => {
                settDataRessurs(byggFeiletRessurs('Ukjent feil ved henting av oppgave'));
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
                } else if (hentetDokumentData.status === RessursStatus.FEILET) {
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
        if (oppdatertData.status === RessursStatus.SUKSESS) {
            hentOgVisDokument(oppdatertData.data.journalpost.journalpostId, dokumentInfoId);
            settValgtDokumentId(dokumentInfoId);
        }
    };

    const settJournalpostTittel = (tittel: string | undefined) => {
        const oppdatert = { ...oppdatertData };
        if (oppdatert.status === RessursStatus.SUKSESS) {
            oppdatert.data.journalpost.tittel = tittel;
            settOppdatertData(oppdatert);
        }
    };

    const settAvsender = (navn: string, id = '') => {
        const oppdatert = { ...oppdatertData };
        if (
            oppdatert.status === RessursStatus.SUKSESS &&
            oppdatert.data.journalpost.avsenderMottaker
        ) {
            oppdatert.data.journalpost.avsenderMottaker.navn = navn;
            oppdatert.data.journalpost.avsenderMottaker.id = id;
            settOppdatertData(oppdatert);
        }
    };

    const tilbakestillJournalpostTittel = () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            settJournalpostTittel(dataForManuellJournalføring.data.journalpost.tittel);
        }
    };

    const settPersonOgFagsak = (
        person: Ressurs<IPersonInfo>,
        fagsak: Ressurs<IFagsak | undefined>
    ) => {
        const oppdatert = { ...oppdatertData };
        if (
            oppdatert.status === RessursStatus.SUKSESS &&
            person.status === RessursStatus.SUKSESS &&
            fagsak.status === RessursStatus.SUKSESS
        ) {
            oppdatert.data.person = person.data;
            oppdatert.data.fagsak = fagsak.data;
            settOppdatertData(oppdatert);
        }
    };

    const hentAktivBehandlingForJournalføring = (): IBehandling | undefined => {
        let aktivBehandling = undefined;
        if (oppdatertData.status === RessursStatus.SUKSESS && oppdatertData.data.fagsak) {
            aktivBehandling = hentAktivBehandlingPåFagsak(oppdatertData.data.fagsak);
        }
        return aktivBehandling;
    };

    const opprettFagsak = async (data: IOpprettEllerHentFagsakData) => {
        return request<IOpprettEllerHentFagsakData, IFagsak>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
        })
            .then((response: Ressurs<IFagsak>) => {
                return response;
            })
            .catch(() => {
                return byggFeiletRessurs<IFagsak>('Opprettelse av fagsak feilet');
            });
    };

    const opprettBehandling = async (data: IOpprettBehandlingData) => {
        return request<IOpprettBehandlingData, IFagsak>({
            data,
            method: 'POST',
            url: '/familie-ba-sak/api/behandlinger',
        })
            .then((response: Ressurs<IFagsak>) => {
                return response;
            })
            .catch(() => {
                return byggFeiletRessurs<IFagsak>('Opprettelse av behandling feilet');
            });
    };

    const hentSorterteBehandlinger = () => {
        return oppdatertData.status === RessursStatus.SUKSESS &&
            oppdatertData.data.fagsak?.behandlinger.length
            ? oppdatertData.data.fagsak.behandlinger.sort((a, b) =>
                  familieDayjsDiff(
                      familieDayjs(b.opprettetTidspunkt),
                      familieDayjs(a.opprettetTidspunkt)
                  )
              )
            : [];
    };

    const opprettFagsakOgBehandling = async () => {
        const stateFeil =
            oppdatertData.status !== RessursStatus.SUKSESS
                ? byggFeiletRessurs<IFagsak>('Ukjent feil ved applikasjonen')
                : !oppdatertData.data.person?.personIdent
                ? byggFeiletRessurs<IFagsak>(
                      'Klarer ikke opprette behandling fordi journalpost mangler bruker. Hent bruker før opprettelse av behandling'
                  )
                : undefined;

        if (stateFeil) {
            return stateFeil;
        }

        const data =
            oppdatertData.status === RessursStatus.SUKSESS ? oppdatertData.data : undefined;

        const fagsakRessurs = data?.fagsak
            ? byggSuksessRessurs(data?.fagsak)
            : await opprettFagsak({
                  personIdent: data?.person?.personIdent ?? '',
                  aktørId: null,
              })
                  .then((response: Ressurs<IFagsak>) => response)
                  .catch(() => byggFeiletRessurs<IFagsak>('Ukjent feil ved opprett fagsak'));

        if (fagsakRessurs.status !== RessursStatus.SUKSESS) {
            return fagsakRessurs;
        }

        const fagsak = fagsakRessurs.data;

        const behandlingType = fagsak.behandlinger.length
            ? Behandlingstype.REVURDERING
            : Behandlingstype.FØRSTEGANGSBEHANDLING;

        const fagsakMedBehandling: Ressurs<IFagsak> = await opprettBehandling({
            behandlingType: behandlingType,
            behandlingÅrsak: BehandlingÅrsak.SØKNAD,
            kategori: BehandlingKategori.NASJONAL, // TODO: Utvides/fjernes fra opprettelse
            navIdent: innloggetSaksbehandler?.navIdent,
            søkersIdent: data?.person?.personIdent ?? '',
            underkategori: BehandlingUnderkategori.ORDINÆR, // TODO: Utvides/fjernes fra opprettelse
        }).then((response: Ressurs<IFagsak>) => response);

        if (fagsakMedBehandling.status === RessursStatus.SUKSESS) {
            settFagsak(fagsakMedBehandling);
        } else if (fagsakMedBehandling.status !== RessursStatus.FEILET) {
            return byggFeiletRessurs<IFagsak>('Opprettelse av behandling feilet.');
        }

        return fagsakMedBehandling;
    };

    const journalfør = async () => {
        const erDigitalKanal = (journalpost: IJournalpost) =>
            journalpost.kanal === JournalpostKanal.NAV_NO;

        if (
            oppdatertData.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            oppdatertData.data.person
        ) {
            const person = oppdatertData.data.person;
            //SKAN_IM-kanalen benytter logiske vedlegg, NAV_NO-kanalen gjør ikke. For sistnevnte må titlene konkateneres.
            return request<IRestJournalføring, string>({
                method: 'POST',
                url: `/familie-ba-sak/api/journalpost/${
                    oppdatertData.data.journalpost.journalpostId
                }/journalfør/${oppgaveId}?journalfoerendeEnhet=${
                    innloggetSaksbehandler?.enhet ?? '9999'
                }&ferdigstill=true`,
                data: {
                    bruker: {
                        navn: person.navn,
                        id: person.personIdent,
                    },
                    avsender: {
                        navn: oppdatertData.data.journalpost.avsenderMottaker?.navn || '',
                        id: oppdatertData.data.journalpost.avsenderMottaker?.id || '',
                    },
                    datoMottatt: oppdatertData.data.journalpost.datoMottatt,
                    dokumenter: oppdatertData.data.journalpost.dokumenter?.map(dokument => {
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
                            dokumentTittel: erDigitalKanal(oppdatertData.data.journalpost)
                                ? tittelsammenkobling
                                : dokument.tittel,
                            dokumentInfoId: dokument.dokumentInfoId || '0',
                            eksisterendeLogiskeVedlegg: exsisterendeLogiskeVedlegg,
                            logiskeVedlegg: erDigitalKanal(oppdatertData.data.journalpost)
                                ? exsisterendeLogiskeVedlegg
                                : dokument.logiskeVedlegg,
                        };
                    }),
                    knyttTilFagsak: tilknyttedeBehandlingIder.length > 0,
                    tilknyttedeBehandlingIder,
                    navIdent: innloggetSaksbehandler?.navIdent ?? '',
                },
            })
                .then((fagsakId: Ressurs<string>) => {
                    if (fagsakId.status === RessursStatus.SUKSESS && fagsakId.data !== '') {
                        history.push(`/fagsak/${fagsakId.data}/saksoversikt`);
                    } else if (fagsakId.status === RessursStatus.SUKSESS) {
                        history.push('/oppgaver');
                    }
                    return fagsakId;
                })
                .catch(() => {
                    return byggFeiletRessurs<string>('Ukjent feil ved journalføring.');
                });
        } else {
            return byggFeiletRessurs<string>('Ukjent feil ved applikasjonen');
        }
    };

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            settDokumentData(byggTomRessurs());
        }
    }, [oppgaveId]);

    React.useEffect(() => {
        oppdatertData.status === RessursStatus.SUKSESS &&
            settValideringsfeil(validaterData(oppdatertData.data));
    }, [oppdatertData]);

    return {
        dataForManuellJournalføring: oppdatertData,
        settDataForManuellJournalføring: settOppdatertData,

        // Funksjoner for å endre valgt dokument
        finnValgtDokument: (): IDokumentInfo | undefined => {
            return finnValgtDokument(oppdatertData);
        },
        dokumentData,
        valgtDokumentId,
        settDokumentTittel,
        settLogiskeVedlegg,
        settAvsender,
        tilbakestillDokumentTittel,
        velgOgHentDokumentData,

        // Funksjoner for å endre journalpostmetadata
        settJournalpostTittel,
        tilbakestillJournalpostTittel,

        // Funksjoner som omhandler bruker og behandling
        endreBruker,
        hentAktivBehandlingForJournalføring,
        opprettFagsakOgBehandling,
        hentSorterteBehandlinger,
        tilknyttedeBehandlingIder,
        settTilknyttedeBehandlingIder,

        // Validering og tilbakestilling
        harFeil,
        hentFeil,
        erEndret,
        tilbakestillData,

        // Journalføring
        journalfør,
    };
});

export { ManuellJournalførProvider, useManuellJournalfør };
