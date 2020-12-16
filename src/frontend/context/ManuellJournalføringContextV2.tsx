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
    byggSuksessRessurs,
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
} from '../typer/manuell-journalføring';
import { Adressebeskyttelsegradering, IPersonInfo, PersonType } from '../typer/person';
import { hentAktivBehandlingPåFagsak } from '../utils/fagsak';
import familieDayjs from '../utils/familieDayjs';
import { useApp } from './AppContext';

const tomtPerson = {
    adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
    familierelasjoner: [],
    familierelasjonerMaskert: [],
    fødselsdato: '',
    kjønn: kjønnType.UKJENT,
    navn: '',
    personIdent: '',
    type: PersonType.SØKER,
};

const tomtAvsender = {
    erLikBruker: false,
    id: '',
    land: '',
    navn: '',
    type: AvsenderMottakerIdType.UKJENT,
};

const erPersonTom = (person: IPersonInfo | undefined) => !person || !person.personIdent;

const erAvsenderTom = (avsender: AvsenderMottaker | undefined) => !avsender || !avsender.navn;

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

const [ManuellJournalføringProviderV2, useManuellJournalføringV2] = createUseContext(() => {
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

    const erEndret = () => {
        const kopi = lagerDataKopi(dataForManuellJournalføring);
        return (
            oppdatertData.status === RessursStatus.SUKSESS &&
            kopi.status === RessursStatus.SUKSESS &&
            (JSON.stringify(oppdatertData.data.journalpost) !==
                JSON.stringify(kopi.data.journalpost) ||
                JSON.stringify(oppdatertData.data.person) !== JSON.stringify(kopi.data.person))
        );
    };

    const tilbakestillData = () => {
        settDataRessurs(dataForManuellJournalføring, true);
    };

    // We need to revert changes on journalpost in case the saksbehandler wants so, therefore we make
    // a copy of the data that is subject to change. All modifications will be done on the copy
    // before journalføring
    const [oppdatertData, settOppdatertData] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );

    const [valgtDokumentId, settValgtDokumentId] = React.useState<string | undefined>(undefined);
    const history = useHistory();

    const lagerDataKopi = (
        dataRessurs: Ressurs<IDataForManuellJournalføring>,
        holdeFagsak = false
    ) => {
        const dataKopiert: Ressurs<IDataForManuellJournalføring> = JSON.parse(
            JSON.stringify(dataRessurs)
        );
        if (dataKopiert.status === RessursStatus.SUKSESS) {
            //we use tom object for person and avsender if they are not present in data
            //because we need to use the objects to index the validation errors (See validaterData() for details)
            if (erPersonTom(dataKopiert.data.person)) {
                dataKopiert.data.person = tomtPerson;
            }
            if (erAvsenderTom(dataKopiert.data.journalpost.avsenderMottaker)) {
                dataKopiert.data.journalpost.avsenderMottaker = tomtAvsender;
            }

            //the function can be used in the <<tilbakestill>> scenario, where if fagsak has changed we do not
            //overwrite the change because creating fagsak is not possible to revert
            if (holdeFagsak && oppdatertData.status === RessursStatus.SUKSESS) {
                dataKopiert.data.fagsak = oppdatertData.data.fagsak;
            }
        }

        return dataKopiert;
    };

    const settDataRessurs = (
        dataRessurs: Ressurs<IDataForManuellJournalføring>,
        holdeFagsak = false
    ) => {
        settDataForManuellJournalføring(dataRessurs);
        const oppdatert = lagerDataKopi(dataRessurs, holdeFagsak);
        settOppdatertData(oppdatert);

        //after updating data, we need extra steps for business concerns
        if (oppdatert.status === RessursStatus.SUKSESS) {
            //Select and view the first document by default
            const firstDokument = oppdatert.data.journalpost.dokumenter?.find(() => true);
            settValgtDokumentId(firstDokument?.dokumentInfoId);
            hentDokumentData(
                oppdatert.data.journalpost.journalpostId,
                firstDokument?.dokumentInfoId
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
                logiskVedleggId: '0', // this id is not nullable but ignored by backend so set it to whatever string
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
        return axiosRequest<IFagsak | undefined, Ressurs<IFagsak | undefined>>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsakForPerson`,
            headers: {
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
                settDataRessurs(hentetDataForManuellJournalføring);
            })
            .catch((_error: AxiosError) => {
                settDataRessurs(byggFeiletRessurs('Ukjent feil ved henting av oppgave'));
            });
    };

    const hentDokumentData = async (
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
            // not necessary to await because the UI will monitor document data
            hentDokumentData(oppdatertData.data.journalpost.journalpostId, dokumentInfoId);
            settValgtDokumentId(dokumentInfoId);
        }
    };

    const settJournalpostTittel = (tittel: string | undefined) => {
        if (oppdatertData.status === RessursStatus.SUKSESS) {
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    journalpost: {
                        ...oppdatertData.data.journalpost,
                        tittel: tittel,
                    },
                },
            });
        }
    };

    const settAvsender = (navn: string) => {
        if (oppdatertData.status === RessursStatus.SUKSESS) {
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    journalpost: {
                        ...oppdatertData.data.journalpost,
                        avsenderMottaker: {
                            navn: navn,
                            id: '',
                            land: '',
                            erLikBruker: false,
                            type: AvsenderMottakerIdType.UKJENT,
                        },
                    },
                },
            });
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
        if (
            oppdatertData.status === RessursStatus.SUKSESS &&
            person.status === RessursStatus.SUKSESS &&
            fagsak.status === RessursStatus.SUKSESS
        ) {
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    fagsak: fagsak.data,
                    journalpost: {
                        ...oppdatertData.data.journalpost,
                        bruker: {
                            id: person.data.personIdent,
                        },
                    },
                    person: person.data,
                },
            });
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
        return axiosRequest<IFagsak, IOpprettEllerHentFagsakData>({
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
        return axiosRequest<IFagsak, IOpprettBehandlingData>({
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
                  familieDayjs(b.opprettetTidspunkt).diff(familieDayjs(a.opprettetTidspunkt))
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
        if (
            oppdatertData.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            oppdatertData.data.person
        ) {
            const person = oppdatertData.data.person;

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
                        return {
                            dokumentTittel: dokument.tittel,
                            dokumentInfoId: dokument.dokumentInfoId || '0', // dokumentInfoId is not nullable
                            brevkode: dokument.brevkode,
                            logiskeVedlegg: dokument.logiskeVedlegg,
                            eksisterendeLogiskeVedlegg: dataForManuellJournalføring.data.journalpost.dokumenter?.find(
                                it => it.dokumentInfoId === dokument.dokumentInfoId
                            )?.logiskeVedlegg,
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

        // The methods below manipulate selected document
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

        // The methods below manipulate journalpost metadata
        settJournalpostTittel,
        tilbakestillJournalpostTittel,

        // Bruker and fagsak/behandling
        endreBruker,
        hentAktivBehandlingForJournalføring,
        opprettFagsakOgBehandling,
        hentSorterteBehandlinger,
        tilknyttedeBehandlingIder,
        settTilknyttedeBehandlingIder,

        // Validate, check, revert data
        harFeil,
        hentFeil,
        erEndret,
        tilbakestillData,

        // Journalfør
        journalfør,
    };
});

export { ManuellJournalføringProviderV2, useManuellJournalføringV2 };
