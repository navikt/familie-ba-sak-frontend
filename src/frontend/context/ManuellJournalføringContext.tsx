import React, { useState } from 'react';

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

import { IOpprettEllerHentFagsakData, IOpprettBehandlingData } from '../api/fagsak';
import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import {
    Dokumenttype,
    dokumenttyper,
    IDataForManuellJournalføring,
    ILogiskVedlegg,
    IRestOppdaterJournalpost,
} from '../typer/manuell-journalføring';
import { IPersonInfo } from '../typer/person';
import { hentAktivBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';

const [ManuellJournalføringProvider, useManuellJournalføring] = createUseContext(() => {
    const { axiosRequest, innloggetSaksbehandler } = useApp();
    const history = useHistory();
    const { oppgaveId } = useParams<{ oppgaveId: string }>();

    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [person, settPerson] = useState<Ressurs<IPersonInfo>>(byggTomRessurs());
    const [logiskeVedlegg, settLogiskeVedlegg] = useState<ILogiskVedlegg[]>([]);
    const [senderInn, settSenderInn] = useState(false);
    const [visFeilmeldinger, settVisfeilmeldinger] = useState(false);
    const [feilmeldinger, settFeilmeldinger] = useState<FeiloppsummeringFeil[]>([]);
    const [innsendingsfeilmelding, settInnsendingsfeilmelding] = useState('');
    const [dokumenttype, settDokumenttype] = useState<Dokumenttype>(
        Dokumenttype.SØKNAD_OM_ORDINÆR_BARNETRYGD
    );
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
    const [knyttTilFagsak, settKnyttTilFagsak] = useState(true);
    const [tilknyttedeBehandlingIder, settTilknyttedeBehandlingIder] = useState<number[]>([]);

    React.useEffect(() => {
        if (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.person !== undefined &&
            dataForManuellJournalføring.data.person !== null
        ) {
            settPerson({
                status: RessursStatus.SUKSESS,
                data: dataForManuellJournalføring.data.person,
            });
        }

        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            if (dataForManuellJournalføring.data.journalpost.dokumenter) {
                settLogiskeVedlegg(
                    dataForManuellJournalføring.data.journalpost.dokumenter[0].logiskeVedlegg ?? []
                );
            }
            const aktivBehandling = hentAktivBehandlingForJournalføring();
            settTilknyttedeBehandlingIder(aktivBehandling ? [aktivBehandling.behandlingId] : []);
        }
    }, [dataForManuellJournalføring]);

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
        }
    }, [oppgaveId]);

    const hentDataForManuellJournalføring = (oppgaveId: string) => {
        settDataForManuellJournalføring(byggHenterRessurs());
        axiosRequest<IDataForManuellJournalføring, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgave/${oppgaveId}`,
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

    const validerSkjema = () => {
        const accFeilmeldinger: FeiloppsummeringFeil[] = [];

        if (person.status !== RessursStatus.SUKSESS) {
            accFeilmeldinger.push({
                feilmelding: 'Du må knytte bruker til journalposten',
                skjemaelementId: 'hent-person',
            });
        }

        settFeilmeldinger(accFeilmeldinger);
        return accFeilmeldinger;
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

    const manueltJournalfør = () => {
        const accFeilmeldinger = validerSkjema();

        if (
            accFeilmeldinger.length === 0 &&
            person.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.status === RessursStatus.SUKSESS
        ) {
            const dokumenter: IDokumentInfo[] | undefined =
                dataForManuellJournalføring.data.journalpost.dokumenter;

            settSenderInn(true);
            axiosRequest<string, IRestOppdaterJournalpost>({
                method: 'PUT',
                url: `/familie-ba-sak/api/journalpost/${
                    dataForManuellJournalføring.data.journalpost.journalpostId
                }/ferdigstill/${oppgaveId}?journalfoerendeEnhet=${
                    innloggetSaksbehandler?.enhet ?? '9999'
                }`,
                data: {
                    bruker: {
                        navn: person.data.navn,
                        id: person.data.personIdent,
                    },
                    avsender: {
                        navn: person.data.navn,
                        id: person.data.personIdent,
                    },
                    datoMottatt: dataForManuellJournalføring.data.journalpost.datoMottatt,
                    dokumentTittel: dokumenttyper[dokumenttype].navn,
                    dokumentInfoId: dokumenter ? dokumenter[0].dokumentInfoId ?? '' : '',
                    eksisterendeLogiskeVedlegg: dokumenter ? dokumenter[0].logiskeVedlegg : [],
                    logiskeVedlegg,
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

    /*
    *****************************************************************************
    Dokument Visning - temporary feature
    */
    const [valgtDokumentId, settValgtDokumentId] = React.useState<string | undefined>(undefined);
    const [dokumentData, settDokumentData] = React.useState(byggTomRessurs<string>());
    const [visDokument, settVisDokument] = React.useState(false);

    const hentDokumentData = (journalPostId: string, dokumentInfoId: string) => {
        settDokumentData(byggHenterRessurs());
        settVisDokument(true);
        axiosRequest<string, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/${journalPostId}/hent/${dokumentInfoId}`,
            påvirkerSystemLaster: false,
        })
            .then((hentetDokumentData: Ressurs<string>) => {
                if (hentetDokumentData.status === RessursStatus.SUKSESS) {
                    settDokumentData(
                        byggDataRessurs(`data:application/pdf;base64,${hentetDokumentData.data}`)
                    );
                } else if (
                    hentetDokumentData.status === RessursStatus.FEILET ||
                    hentetDokumentData.status === RessursStatus.FUNKSJONELL_FEIL
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

    const hentValgtDokument = () =>
        valgtDokumentId && dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.dokumenter?.find(
                  it => it.dokumentInfoId === valgtDokumentId
              )
            : undefined;
    /*
     *****************************************************************************
     */

    return {
        dataForManuellJournalføring,
        dokumenttype,
        feilmeldinger,
        hentAktivBehandlingForJournalføring,
        hentDataForManuellJournalføring,
        innsendingsfeilmelding,
        knyttTilFagsak,
        logiskeVedlegg,
        manueltJournalfør,
        opprettBehandling,
        opprettFagsak,
        person,
        senderInn,
        settDataForManuellJournalføring,
        settDokumenttype,
        settKnyttTilFagsak,
        settLogiskeVedlegg,
        settPerson,
        settTilknyttedeBehandlingIder,
        tilknyttedeBehandlingIder,
        validerSkjema,
        visFeilmeldinger,
        valgtDokumentId,
        /*
        *****************************************************************************
        Dokument Visning - temporary feature
        */
        settValgtDokumentId,
        dokumentData,
        visDokument,
        hentDokumentData,
        hentValgtDokument,
        /*
         *****************************************************************************
         */
    };
});

export { ManuellJournalføringProvider, useManuellJournalføring };
