import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';
import { useParams } from 'react-router';
import { IDataForManuellJournalføring } from '../typer/manuell-journalføring';
import { useApp } from './AppContext';

const [ManuellJournalføringProviderV2, useManuellJournalføringV2] = createUseContext(() => {
    const { axiosRequest } = useApp();
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [dokumentData, settDokumentData] = React.useState(byggTomRessurs<string>());
    const [visDokument, settVisDokument] = React.useState(false);
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const hentDataForManuellJournalføring = (oppgaveId: string) => {
        settDataForManuellJournalføring(byggHenterRessurs());
        axiosRequest<IDataForManuellJournalføring, void>({
            method: 'GET',
            //TODO: remove mock
            url: `/familie-ba-sak/api/mock/oppgave/${oppgaveId}`,
            påvirkerSystemLaster: true,
        })
            .then((hentetDataForManuellJournalføring: Ressurs<IDataForManuellJournalføring>) => {
                settDataForManuellJournalføring(hentetDataForManuellJournalføring);
            })
            .catch((_error: AxiosError) => {
                settDataForManuellJournalføring(
                    byggFeiletRessurs('Ukjent feil ved henting av oppgave')
                );
            });
    };

    const hentDokumentData = (journalPostId: string, dokumentInfoId: string) => {
        settDokumentData(byggHenterRessurs());
        settVisDokument(true);
        axiosRequest<string, void>({
            method: 'GET',
            //TODO: remove mock
            url: `/familie-ba-sak/api/mock/journalpost/${journalPostId}/hent/${dokumentInfoId}`,
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

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
            settDokumentData(byggTomRessurs());
            settVisDokument(false);
        }
    }, [oppgaveId]);

    return {
        dataForManuellJournalføring,
        dokumentData,
        visDokument,
        hentDokumentData,
    };
});

export { ManuellJournalføringProviderV2, useManuellJournalføringV2 };
