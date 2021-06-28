import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';

import { LeftFilled, RightFilled, DownFilled } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus, Ressurs, byggTomRessurs, byggHenterRessurs } from '@navikt/familie-typer';

import { Journalpost, JournalpostType } from '../../../typer/Journalpost';
import { IPersonInfo } from '../../../typer/person';
import { tilVisning, kalenderDato } from '../../../utils/kalender';

import 'nav-frontend-tabell-style';

const Container = styled.div`
    margin: 4.1875rem 3.3125rem;
`;

const TittelWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const IkonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
`;

const StyledSidetittel = styled(Sidetittel)`
    margin-bottom: 1rem;
`;

interface IProps {
    bruker: IPersonInfo;
}

const JournalpostListe: React.FC<IProps> = ({ bruker }) => {
    const { request } = useHttp();
    const [journalposterRessurs, settJournalposterRessurs] = useState<Ressurs<Journalpost[]>>(
        byggTomRessurs()
    );

    useEffect(() => {
        settJournalposterRessurs(byggHenterRessurs());

        request<undefined, Journalpost[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/for-bruker/${bruker.personIdent}`,
            påvirkerSystemLaster: true,
        }).then(journalposterRessurs => {
            journalposterRessurs.status === RessursStatus.SUKSESS &&
                settJournalposterRessurs(journalposterRessurs);
        });
    }, [bruker]);

    const hentIkonForJournalpostType = (journalpostType: JournalpostType) => {
        switch (journalpostType) {
            case 'I':
                return <LeftFilled />;
            case 'U':
                return <RightFilled />;
            case 'M':
                return <DownFilled />;
        }
    };

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
                            <th>Dato mottatt</th>
                            <th>Tittel</th>
                            <th>Fagsystem</th>
                            <th>Avsender/Mottaker</th>
                            <th>Journalstatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journalposter.map(journalpost => (
                            <tr key={journalpost.journalpostId}>
                                <td>{tilVisning(kalenderDato(journalpost.datoMottatt))}</td>
                                <td>
                                    <TittelWrapper>
                                        <IkonWrapper>
                                            {hentIkonForJournalpostType(
                                                journalpost.journalposttype
                                            )}{' '}
                                        </IkonWrapper>
                                        {journalpost.tittel}
                                    </TittelWrapper>
                                </td>
                                <td>{journalpost.sak.fagsaksystem}</td>
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
