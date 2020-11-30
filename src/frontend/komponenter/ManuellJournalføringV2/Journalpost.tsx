import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { RessursStatus } from '@navikt/familie-typer';
import styled from 'styled-components';
import { datoformat, formaterIsoDato } from '../../utils/formatter';

const JournalpostDiv = styled.div`
    width: 100%;
`;

const JournalpostInfo: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const journalpost = dataForManuellJournalføring.data.journalpost;
            return (
                <div>
                    <Undertittel>{journalpost.tittel || 'Ingen tittel'}</Undertittel>
                    <Normaltekst>Tema: {journalpost.tema || 'Ingen tema'}</Normaltekst>
                    <Normaltekst>Skjemakode: ???</Normaltekst>
                    <Normaltekst>Kanal: {journalpost.kanal || 'Ingen kanal'}</Normaltekst>
                    <Normaltekst>
                        Mottatt:{' '}
                        {journalpost.datoMottatt
                            ? formaterIsoDato(journalpost.datoMottatt, datoformat.DATO)
                            : 'Ingen mottatt dato'}
                    </Normaltekst>
                </div>
            );
        default:
            return <div></div>;
    }
};

export const Journalpost: React.FC = () => {
    return (
        <JournalpostDiv>
            <Ekspanderbartpanel tittel={<JournalpostInfo />}>
                Panelet vil da ekspandere og vise innholdet.
            </Ekspanderbartpanel>
        </JournalpostDiv>
    );
};
