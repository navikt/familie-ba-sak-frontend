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
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { IOpprettBehandlingData, IOpprettEllerHentFagsakData } from '../api/fagsak';
import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import {
    BrevkodeMap,
    IDataForManuellJournalføring,
    IRestOppdaterJournalpost,
    JournalpostTittel,
} from '../typer/manuell-journalføring';
import { IPersonInfo } from '../typer/person';
import { hentAktivBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';

const [ManuellJournalføringProviderV2, useManuellJournalføringV2] = createUseContext(() => {
    const { axiosRequest, innloggetSaksbehandler } = useApp();
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [dokumentData, settDokumentData] = React.useState(byggTomRessurs<string>());
    const [visDokument, settVisDokument] = React.useState(false);
    const { oppgaveId } = useParams<{ oppgaveId: string }>();
    const [oppdatertData, settOppdatertData] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [valgtDokumentId, settValgtDokumentId] = React.useState<string | undefined>(undefined);
    const history = useHistory();

    const settDataRessurs = (dataRessurs: Ressurs<IDataForManuellJournalføring>) => {
        settDataForManuellJournalføring(dataRessurs);
        const oppdatert = JSON.parse(JSON.stringify(dataRessurs));
        settOppdatertData(oppdatert);
    };

    const [brevkode, settBrevkode] = React.useState<string | undefined>('');

    const [visFeilmeldinger, settVisfeilmeldinger] = React.useState(false);
    const [feilmeldinger, settFeilmeldinger] = React.useState<FeiloppsummeringFeil[]>([]);
    const [innsendingsfeilmelding, settInnsendingsfeilmelding] = React.useState('');
    const [knyttTilFagsak, settKnyttTilFagsak] = React.useState(true);
    const [tilknyttedeBehandlingIder, settTilknyttedeBehandlingIder] = React.useState<number[]>([]);
    const [senderInn, settSenderInn] = React.useState(false);

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
        settValgtDokumentInfo(valgt);
        autoOppdateJournalpostMetadata();
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

    const hentDokumentData = (journalPostId: string, dokumentInfoId: string) => {
        settDokumentData(byggHenterRessurs());
        settVisDokument(true);
        axiosRequest<string, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/${journalPostId}/hent/${dokumentInfoId}`,
            påvirkerSystemLaster: true,
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

    const tilbakestilleJournalpostTittel = () => {
        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            settJournalpostTittel(dataForManuellJournalføring.data.journalpost.tittel);
        }
    };

    const settPerson = (person: IPersonInfo) => {
        if (oppdatertData.status === RessursStatus.SUKSESS) {
            settOppdatertData({
                ...oppdatertData,
                data: {
                    ...oppdatertData.data,
                    person: person,
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
            oppdatertData.data.person
        ) {
            const dokumenter: IDokumentInfo[] | undefined =
                oppdatertData.data.journalpost.dokumenter;
            const person = oppdatertData.data.person;

            settSenderInn(true);
            axiosRequest<string, IRestOppdaterJournalpost>({
                method: 'PUT',
                url: `/familie-ba-sak/api/journalpost/${
                    oppdatertData.data.journalpost.journalpostId
                }/ferdigstill/${oppgaveId}?journalfoerendeEnhet=${
                    innloggetSaksbehandler?.enhet ?? '9999'
                }`,
                data: {
                    bruker: {
                        navn: person.navn,
                        id: person.personIdent,
                    },
                    avsender: {
                        navn: person.navn,
                        id: person.personIdent,
                    },
                    datoMottatt: oppdatertData.data.journalpost.datoMottatt,
                    dokumentTittel: '',
                    dokumentInfoId: dokumenter ? dokumenter[0].dokumentInfoId ?? '' : '',
                    eksisterendeLogiskeVedlegg: dokumenter ? dokumenter[0].logiskeVedlegg : [],
                    logiskeVedlegg: [],
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

    return {
        dataForManuellJournalføring: oppdatertData,
        settDataForManuellJournalføring: settOppdatertData,
        dokumentData,
        visDokument,
        hentDokumentData,
        valgtDokumentId,
        finnValgtDokument: (): IDokumentInfo | undefined => {
            return finnValgtDokument(oppdatertData);
        },
        settValgtDokumentId,
        settDokumentTittel,
        settLogiskVedlegg,
        tilbakestilleDokumentTittel,
        erDokumentTittelEndret,
        settJournalpostTittel,
        tilbakestilleJournalpostTittel,
        hentAktivBehandlingForJournalføring,
        brevkode,
        settPerson,
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
    };
});

export { ManuellJournalføringProviderV2, useManuellJournalføringV2 };
