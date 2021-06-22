import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Element } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';

import { IPersonInfo } from '../../../typer/person';
import { DagMånedÅr, tilVisning } from '../../../utils/kalender';

import 'nav-frontend-tabell-style';

const Container = styled.div`
    margin: 1rem;
`;

interface IProps {
    bruker: IPersonInfo;
}

interface Journalpost {
    journalpostId: string;
    tittel: string;
    behandlingstema: string;
    datoMottatt: DagMånedÅr;
    tema: string;
    journalstatus: string;
}

const JournalpostListe: React.FC<IProps> = ({ bruker }) => {
    const { request } = useHttp();
    const [journalposter, settjournalposter] = useState<Journalpost[]>([]);

    useEffect(() => {
        request<undefined, Journalpost[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/for-bruker/${bruker.personIdent}`,
        }).then(journalposterRessurs => {
            if (journalposterRessurs.status === RessursStatus.SUKSESS) {
                settjournalposter(journalposterRessurs.data);
            }
        });
    }, [bruker]);

    return (
        <Container>
            <h2>Journalposter</h2>
            <table className="tabell">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tittel</th>
                        <th>behandlingstema</th>
                        <th>tema</th>
                        <th>journalstatus</th>
                        <th>datoMottatt</th>
                    </tr>
                </thead>
                <tbody>
                    {journalposter.map(journalpost => (
                        <tr key={journalpost.journalpostId}>
                            <td>{journalpost.journalpostId}</td>
                            <td>{journalpost.tittel}</td>
                            <td>{journalpost.behandlingstema}</td>
                            <td>{journalpost.tema}</td>
                            <td>{journalpost.journalstatus}</td>
                            <td>{tilVisning(journalpost.datoMottatt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
};

export default JournalpostListe;
