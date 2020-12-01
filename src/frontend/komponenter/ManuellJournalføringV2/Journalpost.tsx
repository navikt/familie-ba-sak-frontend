import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { RessursStatus } from '@navikt/familie-typer';
import styled from 'styled-components';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import CreatableSelect from 'react-select/creatable';
import { journalpostTittelList } from './DokumentVelger';

const JournalpostDiv = styled.div`
    width: 560px;
`;

const JournalpostInfo: React.FC = () => {
    const { dataForManuellJournalføring, brevkode } = useManuellJournalføringV2();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const journalpost = dataForManuellJournalføring.data.journalpost;
            return (
                <div>
                    <Undertittel>{journalpost.tittel || 'Ingen tittel'}</Undertittel>
                    <Normaltekst>Tema: {journalpost.tema || 'Ingen tema'}</Normaltekst>
                    <Normaltekst>Skjemakode: {brevkode}</Normaltekst>
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

const EndreJournalpost: React.FC = () => {
    const {
        dataForManuellJournalføring,
        settJournalpostTittel,
        tilbakestilleJournalpostTittel,
    } = useManuellJournalføringV2();
    const journalpostTittel =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.tittel
            : undefined;
    return (
        <div>
            <CreatableSelect
                id="select"
                isClearable
                isMulti={false}
                options={journalpostTittelList}
                value={{ value: journalpostTittel, label: journalpostTittel }}
                onChange={value => {
                    if (value && 'value' in value) {
                        settJournalpostTittel(value.value);
                    } else {
                        tilbakestilleJournalpostTittel();
                    }
                }}
            />
        </div>
    );
};

export const Journalpost: React.FC = () => {
    return (
        <JournalpostDiv>
            <Ekspanderbartpanel tittel={<JournalpostInfo />}>
                <EndreJournalpost />
            </Ekspanderbartpanel>
        </JournalpostDiv>
    );
};
