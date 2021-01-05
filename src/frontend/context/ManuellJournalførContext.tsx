import React from 'react';

import { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useHistory, useParams } from 'react-router';

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
    IJournalpost,
} from '@navikt/familie-typer';

import {
    BehandlingKategori,
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    Behandlingstype,
    BehandlingUnderkategori,
    BehandlingÅrsak,
    IBehandling,
} from '../typer/behandling';
import { FagsakStatus, IFagsak } from '../typer/fagsak';
import {
    BrevkodeMap,
    IDataForManuellJournalføring,
    IRestJournalføring,
    JournalpostKanal,
} from '../typer/manuell-journalføring';
import { Adressebeskyttelsegradering, IPersonInfo, PersonType } from '../typer/person';
import { hentAktivBehandlingPåFagsak } from '../utils/fagsak';
import familieDayjs from '../utils/familieDayjs';
import { useApp } from './AppContext';

const tomPerson: IPersonInfo = {
    adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
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
    const { axiosRequest, innloggetSaksbehandler } = useApp();
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
        JSON.stringify(oppdatertData) !== JSON.stringify(dataForManuellJournalføring);

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
        settDataRessurs(dataForManuellJournalføring);
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
    const settDataRessurs = (dataRessurs: Ressurs<IDataForManuellJournalføring>) => {
        settDataForManuellJournalføring(dataRessurs);
        const oppdatert = lagerDataKopi(dataRessurs);

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

    const settFagsak = (fagsak: IFagsak) => {
        if (oppdatertData.status === RessursStatus.SUKSESS) {
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    fagsak: fagsak,
                },
            });
        }
    };

    const hentFagsak = async (personId: string) => {
        return axiosRequest<IFagsak | undefined, { personIdent: string }>({
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
        const hentetPerson = await axiosRequest<IPersonInfo, void>({
            method: 'GET',
            url: '/familie-ba-sak/api/person',
            headers: {
                personIdent: personId,
            },
        });

        if (hentetPerson.status === RessursStatus.SUKSESS) {
            const restFagsak = await hentFagsak(hentetPerson.data.personIdent);
            if (
                restFagsak.status === RessursStatus.SUKSESS &&
                oppdatertData.status === RessursStatus.SUKSESS
            ) {
                settPersonOgFagsak(hentetPerson, restFagsak);
            }
            return restFagsak;
        }
        return hentetPerson;
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
        return axiosRequest<IDataForManuellJournalføring, void>({
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
        return axiosRequest<string, void>({
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

    const settAvsender = (navn: string) => {
        const oppdatert = { ...oppdatertData };
        if (
            oppdatert.status === RessursStatus.SUKSESS &&
            oppdatert.data.journalpost.avsenderMottaker
        ) {
            oppdatert.data.journalpost.avsenderMottaker.navn = navn;
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

    const hentSorterteBehandlinger = () => {
        return oppdatertData.status === RessursStatus.SUKSESS &&
            oppdatertData.data.fagsak?.behandlinger.length
            ? oppdatertData.data.fagsak.behandlinger.sort((a, b) =>
                  familieDayjs(b.opprettetTidspunkt).diff(familieDayjs(a.opprettetTidspunkt))
              )
            : [];
    };

    const opprettFagsakOgBehandling = () => {
        if (oppdatertData.status !== RessursStatus.SUKSESS) {
            return;
        }
        const data = oppdatertData.data;

        const fagsak = data?.fagsak ?? {
            behandlinger: [],
            id: -1,
            opprettetTidspunkt: '',
            saksnummer: '',
            status: FagsakStatus.IKKE_OPPRETTET,
            søkerFødselsnummer: data?.person?.personIdent ?? '',
            underBehandling: false,
        };

        const fagsakMedBehandling: IFagsak = {
            ...fagsak,
            behandlinger: [
                ...fagsak.behandlinger,
                {
                    aktiv: true,
                    arbeidsfordelingPåBehandling: {
                        behandlendeEnhetId: '',
                        behandlendeEnhetNavn: '',
                        manueltOverstyrt: false,
                    },
                    begrunnelse: '',
                    behandlingId: -1,
                    endretAv: '',
                    kategori: BehandlingKategori.NASJONAL,
                    opprettetTidspunkt: '',
                    personResultater: [],
                    personer: [],
                    resultat: BehandlingResultat.IKKE_VURDERT,
                    status: BehandlingStatus.IKKE_OPPRETTET,
                    steg: BehandlingSteg.REGISTRERE_SØKNAD,
                    stegTilstand: [],
                    totrinnskontroll: undefined,
                    opplysningsplikt: undefined,
                    type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                    underkategori: BehandlingUnderkategori.ORDINÆR,
                    vedtakForBehandling: [],
                    utbetalingsperioder: [],
                    personerMedAndelerTilkjentYtelse: [],
                    årsak: BehandlingÅrsak.SØKNAD,
                    skalBehandlesAutomatisk: false,
                },
            ],
        };
        settFagsak(fagsakMedBehandling);
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
            return axiosRequest<string, IRestJournalføring>({
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
