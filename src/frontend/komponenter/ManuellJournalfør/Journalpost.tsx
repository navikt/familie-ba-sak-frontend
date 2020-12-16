import React from 'react';

import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Label } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import { journalpostTittelList } from './DokumentVelger';

const JournalpostDiv = styled.div`
    width: 560px;
`;

const JournalpostInfo: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalfør();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const journalpost = dataForManuellJournalføring.data.journalpost;
            return (
                <div>
                    <Undertittel>{journalpost.tittel || 'Ingen tittel'}</Undertittel>
                </div>
            );
        default:
            return <div></div>;
    }
};

const JournalpostMetadataDiv = styled.div`
    margin: 0 0 20px 0;
`;

const EndreJournalpost: React.FC = () => {
    const {
        dataForManuellJournalføring,
        settJournalpostTittel,
        tilbakestillJournalpostTittel,
    } = useManuellJournalfør();
    const journalpostTittel =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.tittel
            : undefined;
    return (
        <div>
            <Label htmlFor="select">Endre journalposttittel</Label>
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
                        tilbakestillJournalpostTittel();
                    }
                }}
            />
        </div>
    );
};

export const Journalpost: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalfør();
    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;
    return (
        <JournalpostDiv>
            <Ekspanderbartpanel tittel={<JournalpostInfo />}>
                <JournalpostMetadataDiv>
                    <Normaltekst>
                        Mottatt:{' '}
                        {datoMottatt
                            ? formaterIsoDato(datoMottatt, datoformat.DATO)
                            : 'Ingen mottatt dato'}
                    </Normaltekst>
                </JournalpostMetadataDiv>
                <EndreJournalpost />
            </Ekspanderbartpanel>
        </JournalpostDiv>
    );
};
