import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React, { useState } from 'react';

import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '../typer/ressurs';
import { useApp } from './AppContext';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { IPerson } from '../typer/person';
import { useHistory, useParams } from 'react-router';
import {
    Dokumenttype,
    dokumenttyper,
    IDataForManuellJournalføring,
    IDokumentInfo,
    ILogiskVedlegg,
    IRestOppdaterJournalpost,
} from '../typer/manuell-journalføring';
import { hentAktivBehandlingPåFagsak } from '../utils/fagsak';
import { useFagsakRessurser } from './FagsakContext';

const [ManuellJournalføringProvider, useManuellJournalføring] = createUseContext(() => {
    const { axiosRequest, innloggetSaksbehandler } = useApp();
    const history = useHistory();
    const { oppgaveId } = useParams();

    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [person, settPerson] = useState<Ressurs<IPerson>>(byggTomRessurs());
    const [logiskeVedlegg, settLogiskeVedlegg] = useState<ILogiskVedlegg[]>([]);
    const [senderInn, settSenderInn] = useState(false);
    const [visFeilmeldinger, settVisfeilmeldinger] = useState(false);
    const [feilmeldinger, settFeilmeldinger] = useState<FeiloppsummeringFeil[]>([]);
    const [innsendingsfeilmelding, settInnsendingsfeilmelding] = useState('');
    const [dokumenttype, settDokumenttype] = useState<Dokumenttype>(
        Dokumenttype.SØKNAD_OM_ORDINÆR_BARNETRYGD
    );
    const hentAktivBehandlingForJournalføring = () => {
        let aktivBehandling = undefined;
        if (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.fagsak
        ) {
            aktivBehandling = hentAktivBehandlingPåFagsak(dataForManuellJournalføring.data.fagsak);
        }
        return aktivBehandling;
    };
    const { fagsak, hentFagsak } = useFagsakRessurser();
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
    }, [dataForManuellJournalføring.status]);

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
        }
    }, [oppgaveId, fagsak]);

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
                    logiskeVedlegg: logiskeVedlegg,
                    knyttTilFagsak: tilknyttedeBehandlingIder.length > 0, // TODO: Midlertidig bakoverkompabilitet før flagg fjernes. Setter true hvis behandlinger å knytte til er valgt.
                    tilknyttedeBehandlingIder: tilknyttedeBehandlingIder,
                    navIdent: innloggetSaksbehandler?.navIdent ?? '',
                },
            })
                .then((fagsakId: Ressurs<string>) => {
                    settSenderInn(false);
                    if (fagsakId.status === RessursStatus.SUKSESS && fagsakId.data !== '') {
                        hentFagsak(fagsakId.data);
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

    return {
        hentAktivBehandlingForJournalføring,
        dataForManuellJournalføring,
        dokumenttype,
        feilmeldinger,
        hentDataForManuellJournalføring,
        innsendingsfeilmelding,
        knyttTilFagsak,
        tilknyttedeBehandlingIder,
        logiskeVedlegg,
        manueltJournalfør,
        person,
        senderInn,
        settDokumenttype,
        settKnyttTilFagsak,
        settLogiskeVedlegg,
        settTilknyttedeBehandlingIder,
        settPerson,
        validerSkjema,
        visFeilmeldinger,
    };
});

export { ManuellJournalføringProvider, useManuellJournalføring };
