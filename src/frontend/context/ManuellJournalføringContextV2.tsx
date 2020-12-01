import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    IDokumentInfo,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';
import { useParams } from 'react-router';
import {
    BrevkodeMap,
    IDataForManuellJournalføring,
    JournalpostTittel,
} from '../typer/manuell-journalføring';
import { useApp } from './AppContext';

const [ManuellJournalføringProviderV2, useManuellJournalføringV2] = createUseContext(() => {
    const { axiosRequest } = useApp();
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

    const settDataRessurs = (dataRessurs: Ressurs<IDataForManuellJournalføring>) => {
        settDataForManuellJournalføring(dataRessurs);
        const oppdatert = JSON.parse(JSON.stringify(dataRessurs));
        settOppdatertData(oppdatert);
    };

    const [brevkode, settBrevkode] = React.useState<string | undefined>('');

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

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            settDokumentData(byggTomRessurs());
            settVisDokument(false);
        }
    }, [oppgaveId]);

    return {
        dataForManuellJournalføring: oppdatertData,
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
        brevkode,
    };
});

export { ManuellJournalføringProviderV2, useManuellJournalføringV2 };
