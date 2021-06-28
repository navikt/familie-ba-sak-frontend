import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';

import { LeftFilled, RightFilled, DownFilled } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import {
    RessursStatus,
    Ressurs,
    byggTomRessurs,
    byggHenterRessurs,
    IJournalpost,
    Journalposttype,
} from '@navikt/familie-typer';

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
    const [journalposterRessurs, settJournalposterRessurs] = useState<Ressurs<IJournalpost[]>>(
        byggTomRessurs()
    );

    useEffect(() => {
        settJournalposterRessurs(byggHenterRessurs());

        request<undefined, IJournalpost[]>({
            method: 'GET',
            url: `/familie-ba-sak/api/journalpost/for-bruker/${bruker.personIdent}`,
            påvirkerSystemLaster: true,
        }).then(journalposterRessurs => {
            settJournalposterRessurs(journalposterRessurs);
        });
    }, [bruker]);

    const hentIkonForJournalpostType = (journalposttype: Journalposttype) => {
        switch (journalposttype) {
            case Journalposttype.I:
                return <LeftFilled />;
            case Journalposttype.U:
                return <RightFilled />;
            case Journalposttype.N:
                return <DownFilled />;
        }
    };

    if (
        journalposterRessurs.status === RessursStatus.FEILET ||
        journalposterRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        journalposterRessurs.status === RessursStatus.IKKE_TILGANG
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
                        {journalposter.sort().map(journalpost => (
                            <tr key={journalpost.journalpostId}>
                                <td>
                                    {journalpost.datoMottatt &&
                                        tilVisning(kalenderDato(journalpost.datoMottatt))}
                                </td>
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
                                <td>{journalpost.sak?.fagsaksystem}</td>
                                <td>{journalpost.avsenderMottaker?.navn}</td>
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
