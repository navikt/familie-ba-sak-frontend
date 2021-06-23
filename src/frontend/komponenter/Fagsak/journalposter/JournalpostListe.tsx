import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus, Ressurs, byggTomRessurs } from '@navikt/familie-typer';

import { IPersonInfo } from '../../../typer/person';
import { DagMånedÅr, tilVisning, kalenderDato } from '../../../utils/kalender';

import 'nav-frontend-tabell-style';

const Container = styled.div`
    margin: 4.1875rem 3.3125rem;
`;

const StyledSidetittel = styled(Sidetittel)`
    margin-bottom: 1rem;
`;

interface IProps {
    bruker: IPersonInfo;
}

interface Journalpost {
    journalpostId: string;
    tittel: string;
    behandlingstema: string;
    behandlingstemanavn: string;
    sak: { fagsaksystem: string; tema: string };
    avsenderMottaker: { navn: string };
    datoMottatt: DagMånedÅr;
    journalstatus: string;
}

const JournalpostListe: React.FC<IProps> = ({ bruker }) => {
    const { request } = useHttp();
    const [journalposter, settjournalposter] = useState<Journalpost[]>([]);

    useEffect(() => {
        request<undefined, Journalpost[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/for-bruker/${bruker.personIdent}`,
            påvirkerSystemetLaster: true
        }).then(journalposterRessurs => {
            journalposterRessurs.status === RessursStatus.SUKSESS &&
                settJournalposterRessurs(journalposterRessurs);
        });
    }, [bruker]);

    if (
        journalposterRessurs.status === RessursStatus.FEILET ||
        journalposterRessurs.status === RessursStatus.FUNKSJONELL_FEIL
    ) {
        return (
            <Container>
                <AlertStripeFeil>Klarte ikke å hente inn journalposter for fagsak.</AlertStripeFeil>
            </Container>
        );
    }

    if (journalposterRessurs.status === RessursStatus.SUKSESS) {
        const journalposter = journalposterRessurs.data;

        return (
            <Container>
                <StyledSidetittel>Dokumentoversikt</StyledSidetittel>
                <table className="tabell tabell--stripet">
                    <thead>
                        <tr>
                            <th>DatoMottatt</th>
                            <th>Tittel</th>
                            <th>Behandlingstema</th>
                            <th>Fagsaksystem</th>
                            <th>Fagsaktema</th>
                            <th>Avsender</th>
                            <th>Journalstatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journalposter.map(journalpost => (
                            <tr key={journalpost.journalpostId}>
                                <td>{tilVisning(journalpost.datoMottatt)}</td>
                                <td>{journalpost.tittel}</td>
                                <td>
                                    {journalpost.behandlingstema}: {journalpost.behandlingstemanavn}
                                </td>
                                <td>{journalpost.sak.fagsaksystem}</td>
                                <td>{journalpost.sak.tema}</td>
                                <td>{journalpost.avsenderMottaker.navn}</td>
                                <td>{journalpost.journalstatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        );
    } else {
        return <></>;
    }
};

export default JournalpostListe;
