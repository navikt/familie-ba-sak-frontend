import React from 'react';

import { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useHistory, useParams } from 'react-router';

import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    IDokumentInfo,
    ILogiskVedlegg,
    Ressurs,
    RessursStatus,
    AvsenderMottakerIdType,
    kjønnType,
    AvsenderMottaker,
} from '@navikt/familie-typer';

import { IOpprettBehandlingData, IOpprettEllerHentFagsakData } from '../api/fagsak';
import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import {
    BrevkodeMap,
    IDataForManuellJournalføring,
    IRestJournalføring,
    JournalpostTittel,
} from '../typer/manuell-journalføring';
import { Adressebeskyttelsegradering, IPersonInfo, PersonType } from '../typer/person';
import { hentAktivBehandlingPåFagsak } from '../utils/fagsak';
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

const erPersonTomt = (person: IPersonInfo | undefined) => !person || !person.personIdent;

const erAvsenderTomt = (avsender: AvsenderMottaker | undefined) => !avsender || !avsender.navn;

const validaterData = (dataForValidering: IDataForManuellJournalføring) => {
    const valideringsfeilMap = new Map<unknown, string[]>();

    if (!dataForValidering.journalpost.tittel) {
        valideringsfeilMap.set(dataForValidering.journalpost, [
            ...(valideringsfeilMap.get(dataForValidering.journalpost) || []),
            'Journalpost tittel må ikke være tom',
        ]);
    }

    dataForValidering.journalpost.dokumenter?.forEach(dokument => {
        if (!dokument.tittel) {
            valideringsfeilMap.set(dokument, [
                ...(valideringsfeilMap.get(dokument) || []),
                'Dokument tittel må ikke være tom',
            ]);
        }
    });

    if (erPersonTomt(dataForValidering.person)) {
        valideringsfeilMap.set(dataForValidering.person, [
            ...(valideringsfeilMap.get(dataForValidering.person) || []),
            'Bruker er ikke satt',
        ]);
    }

    if (erAvsenderTomt(dataForValidering.journalpost.avsenderMottaker)) {
        valideringsfeilMap.set(dataForValidering.journalpost.avsenderMottaker, [
            ...(valideringsfeilMap.get(dataForValidering.journalpost.avsenderMottaker) || []),
            'Avsender er ikke satt',
        ]);
    }

    return valideringsfeilMap;
};

const [ManuellJournalføringProviderV2, useManuellJournalføringV2] = createUseContext(() => {
    const { axiosRequest, innloggetSaksbehandler } = useApp();
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [dokumentData, settDokumentData] = React.useState(byggTomRessurs<string>());
    const [visDokument, settVisDokument] = React.useState(false);
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const [valideringsfeil, settValideringsfeil] = React.useState(new Map<unknown, string[]>());
    const harFeil = (data: unknown) => valideringsfeil.get(data);
    const hentFeil = (data: unknown = undefined) =>
        data
            ? valideringsfeil.get(data)
            : Array.from(valideringsfeil, ([_, feil]) => feil).reduce(
                  (alleFeil, feil) => [...alleFeil, ...feil],
                  []
              );

    //We need to revert changes on journalpost in case the saksbehandler wants so, therefore we make
    //a copy of the data that is subject to change. All modification will be done on the copy
    //before <<journalføring>>
    const [oppdatertData, settOppdatertData] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );

    const [valgtDokumentId, settValgtDokumentId] = React.useState<string | undefined>(undefined);
    const history = useHistory();

    const settDataRessurs = (dataRessurs: Ressurs<IDataForManuellJournalføring>) => {
        settDataForManuellJournalføring(dataRessurs);
        const oppdatert: Ressurs<IDataForManuellJournalføring> = JSON.parse(
            JSON.stringify(dataRessurs)
        );
        if (oppdatert.status === RessursStatus.SUKSESS) {
            if (!oppdatert.data.person) {
                oppdatert.data.person = tomtPerson;
            }
            if (!oppdatert.data.journalpost.avsenderMottaker) {
                oppdatert.data.journalpost.avsenderMottaker = tomtAvsender;
            }
            const firstDokument = oppdatert.data.journalpost.dokumenter?.find(() => true);
            settValgtDokumentId(firstDokument?.dokumentInfoId);
            hentDokumentData(
                oppdatert.data.journalpost.journalpostId,
                firstDokument?.dokumentInfoId
            );
        }
        settOppdatertData(oppdatert);
    };

    const [brevkode, settBrevkode] = React.useState<string | undefined>('');

    const [visFeilmeldinger, settVisfeilmeldinger] = React.useState(false);
    const [feilmeldinger, settFeilmeldinger] = React.useState<FeiloppsummeringFeil[]>([]);
    const [innsendingsfeilmelding, settInnsendingsfeilmelding] = React.useState('');
    const [knyttTilFagsak, settKnyttTilFagsak] = React.useState(true);
    const [tilknyttedeBehandlingIder, settTilknyttedeBehandlingIder] = React.useState<number[]>([]);
    const [senderInn, settSenderInn] = React.useState(false);
    const [visModal, settVisModal] = React.useState(false);

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

    const autoOppdateJournalpostMetadata = () => {
        if (oppdatertData.status === RessursStatus.SUKSESS) {
            let funnetTittel = undefined;
            oppdatertData.data.journalpost.dokumenter?.find(
                dokument =>
                    !!dokument.logiskeVedlegg.find(
                        lv =>
                            !!Object.values(JournalpostTittel).find(it => {
                                if (it === lv.tittel) {
                                    funnetTittel = it;
                                    return true;
                                }
                                return false;
                            })
                    )
            );
            if (funnetTittel) {
                settJournalpostTittel(funnetTittel);
                settBrevkode(BrevkodeMap.get(funnetTittel) || '');
            } else {
                tilbakestilleJournalpostTittel();
            }
        }
    };

    const settDokumentTittel = (dokumentTittel: string) => {
        const valgt = finnValgtDokument(oppdatertData);
        if (!valgt) {
            return;
        }
        valgt.tittel = dokumentTittel;
        settValgtDokumentInfo(valgt);
    };

    const settLogiskVedlegg = (logiskVedlggNavn: Array<string>) => {
        const valgt = finnValgtDokument(oppdatertData);
        if (!valgt) {
            return;
        }

        valgt.logiskeVedlegg = logiskVedlggNavn.map(vedlegg => {
            return {
                tittel: vedlegg,
                logiskVedleggId: '0',
            };
        });
        valgt.brevkode = hentBrevkode(valgt.logiskeVedlegg);
        settValgtDokumentInfo(valgt);
        autoOppdateJournalpostMetadata();
    };

    const hentBrevkode = (logiskevedlegg: ILogiskVedlegg[]): string | undefined => {
        return BrevkodeMap.get(
            logiskevedlegg.reduce((pv, cv) => {
                return BrevkodeMap.has(pv.tittel) ? pv : cv;
            })?.tittel
        );
    };

    const settFagsak = (fagsak: Ressurs<IFagsak | undefined>) => {
        if (
            oppdatertData.status === RessursStatus.SUKSESS &&
            fagsak.status === RessursStatus.SUKSESS
        ) {
            console.log(fagsak);
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    fagsak: fagsak.data,
                },
            });
        }
    };

    const hentFagsak = (personId: string) => {
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

    const endrePerson = (personId: string, callback: (status: RessursStatus) => void) => {
        return axiosRequest<IPersonInfo, void>({
            method: 'GET',
            url: '/familie-ba-sak/api/person',
            headers: {
                personIdent: personId,
            },
        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
            if (hentetPerson.status === RessursStatus.SUKSESS) {
                hentFagsak(hentetPerson.data.personIdent).then(restFagsak => {
                    if (
                        restFagsak.status === RessursStatus.SUKSESS &&
                        oppdatertData.status === RessursStatus.SUKSESS
                    ) {
                        settPersonOgFagsak(hentetPerson, restFagsak);
                    }
                    callback(restFagsak.status);
                });
            } else {
                callback(hentetPerson.status);
            }
        });
    };

    const erDokumentTittelEndret = (dokument: IDokumentInfo): boolean => {
        const dokumentUendret = finnDokument(dataForManuellJournalføring, dokument.dokumentInfoId);
        return dokument.tittel !== dokumentUendret?.tittel;
    };

    const tilbakestilleDokumentTittel = () => {
        const valgtDokument = finnValgtDokument(oppdatertData);
        const valgtDokumentUendret = finnValgtDokument(dataForManuellJournalføring);
        if (valgtDokument && valgtDokumentUendret) {
            valgtDokument.tittel = valgtDokumentUendret.tittel;
            settValgtDokumentInfo(valgtDokument);
        }
    };

    const hentDataForManuellJournalføring = (oppgaveId: string) => {
        settDataForManuellJournalføring(byggHenterRessurs());
        axiosRequest<IDataForManuellJournalføring, void>({
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

    const hentDokumentData = (
        journalpostId: string | undefined,
        dokumentInfoId: string | undefined
    ) => {
        if (!journalpostId || !dokumentInfoId) {
            return;
        }

        settDokumentData(byggHenterRessurs());
        settVisDokument(true);
        axiosRequest<string, void>({
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
            settBrevkode(BrevkodeMap.get(tittel) || '');
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

    const tilbakestilleJournalpostTittel = () => {
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

    const opprettFagsak = async (data: IOpprettEllerHentFagsakData): Promise<Ressurs<IFagsak>> => {
        return axiosRequest<IFagsak, IOpprettEllerHentFagsakData>({
            data,
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker`,
        })
            .then((response: Ressurs<IFagsak>) => {
                return response;
            })
            .catch(() => {
                return byggFeiletRessurs('Opprettelse av fagsak feilet');
            });
    };

    const opprettBehandling = async (data: IOpprettBehandlingData): Promise<Ressurs<IFagsak>> => {
        return axiosRequest<IFagsak, IOpprettBehandlingData>({
            data,
            method: 'POST',
            url: '/familie-ba-sak/api/behandlinger',
        })
            .then((response: Ressurs<IFagsak>) => {
                return response;
            })
            .catch(() => {
                return byggFeiletRessurs('Opprettelse av behandling feilet');
            });
    };

    const validerSkjema = () => {
        const accFeilmeldinger: FeiloppsummeringFeil[] = [];

        if (oppdatertData.status !== RessursStatus.SUKSESS || !oppdatertData.data.person) {
            accFeilmeldinger.push({
                feilmelding: 'Du må knytte bruker til journalposten',
                skjemaelementId: 'hent-person',
            });
        }

        settFeilmeldinger(accFeilmeldinger);
        return accFeilmeldinger;
    };

    const manueltJournalfør = () => {
        const accFeilmeldinger = validerSkjema();

        if (
            accFeilmeldinger.length === 0 &&
            oppdatertData.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            oppdatertData.data.person
        ) {
            const person = oppdatertData.data.person;

            settSenderInn(true);
            axiosRequest<string, IRestJournalføring>({
                method: 'POST',
                url: `/familie-ba-sak/api/journalpost/${
                    oppdatertData.data.journalpost.journalpostId
                }/journalfør/${oppgaveId}?journalfoerendeEnhet=${
                    innloggetSaksbehandler?.enhet ?? '9999'
                }&ikkeFerdigstill=false`,
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
                            dokumentInfoId: dokument.dokumentInfoId || '0', //TODO: dokumentInfoId is not nullable
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
                    settSenderInn(false);
                    if (fagsakId.status === RessursStatus.SUKSESS && fagsakId.data !== '') {
                        history.push(`/fagsak/${fagsakId.data}/saksoversikt`);
                    } else if (fagsakId.status === RessursStatus.SUKSESS) {
                        history.push('/oppgaver');
                    } else if (fagsakId.status === RessursStatus.FEILET) {
                        settVisfeilmeldinger(true);
                        settInnsendingsfeilmelding(fagsakId.frontendFeilmelding);
                    }
                })
                .catch(() => {
                    settSenderInn(false);
                    settVisfeilmeldinger(true);
                    settInnsendingsfeilmelding('Ukjent feil ved journalføring.');
                });
        } else {
            settVisfeilmeldinger(true);
        }
    };

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            settDokumentData(byggTomRessurs());
            settVisDokument(false);
        }
    }, [oppgaveId]);

    React.useEffect(() => {
        oppdatertData.status === RessursStatus.SUKSESS &&
            settValideringsfeil(validaterData(oppdatertData.data));
    }, [oppdatertData]);

    return {
        dataForManuellJournalføring: oppdatertData,
        settDataForManuellJournalføring: settOppdatertData,
        dokumentData,
        visDokument,
        valgtDokumentId,
        finnValgtDokument: (): IDokumentInfo | undefined => {
            return finnValgtDokument(oppdatertData);
        },
        settDokumentTittel,
        settLogiskVedlegg,
        settAvsender,
        tilbakestilleDokumentTittel,
        erDokumentTittelEndret,
        settJournalpostTittel,
        tilbakestilleJournalpostTittel,
        hentAktivBehandlingForJournalføring,
        brevkode,
        endrePerson,
        visFeilmeldinger,
        settVisfeilmeldinger,
        feilmeldinger,
        settFeilmeldinger,
        innsendingsfeilmelding,
        settInnsendingsfeilmelding,
        knyttTilFagsak,
        settKnyttTilFagsak,
        tilknyttedeBehandlingIder,
        settTilknyttedeBehandlingIder,
        opprettBehandling,
        opprettFagsak,
        senderInn,
        settSenderInn,
        manueltJournalfør,
        visModal,
        settVisModal,
        valideringsfeil,
        harFeil,
        hentFeil,
        settFagsak,
        velgOgHentDokumentData,
    };
});

export { ManuellJournalføringProviderV2, useManuellJournalføringV2 };
