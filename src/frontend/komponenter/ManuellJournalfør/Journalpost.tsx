import React from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { IDokumentInfo, RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { JournalpostTittel } from '../../typer/manuell-journalføring';
import { datoformat, formaterIsoDato } from '../../utils/formatter';

export const journalpostTittelList = Object.keys(JournalpostTittel).map((_, index) => {
    return {
        value: Object.values(JournalpostTittel)[index].toString(),
        label: Object.values(JournalpostTittel)[index].toString(),
        isDisabled: false,
    };
});

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
    const { skjema, settJournalpostTittel, tilbakestillJournalpostTittel } = useManuellJournalfør();

    return (
        <FamilieReactSelect
            creatable={true}
            isClearable
            erLesevisning={false}
            label={'Endre journalposttittel'}
            id="select"
            isMulti={false}
            options={journalpostTittelList}
            value={{
                value: skjema.felter.journalpostTittel.verdi,
                label: skjema.felter.journalpostTittel.verdi,
            }}
            onChange={value => {
                if (value && 'value' in value) {
                    settJournalpostTittel(value.value);
                } else {
                    tilbakestillJournalpostTittel();
                }
            }}
        />
    );
};

const Journalpost: React.FC = () => {
    const { dataForManuellJournalføring, skjema } = useManuellJournalfør();
    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;

    return (
        <JournalpostDiv>
            <Ekspanderbartpanel
                tittel={
                    <Undertittel>
                        {skjema.felter.journalpostTittel.verdi || 'Ingen tittel'}
                    </Undertittel>
                }
            >
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

export default Journalpost;
