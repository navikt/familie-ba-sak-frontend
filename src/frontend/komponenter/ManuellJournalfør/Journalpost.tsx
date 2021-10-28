import React, { useState } from 'react';

import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { JournalpostTittel } from '../../typer/manuell-journalføring';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import { BehandlingstemaSelect } from '../Felleskomponenter/BehandlingstemaSelect';

export const journalpostTittelList = Object.keys(JournalpostTittel).map((_, index) => {
    return {
        value: Object.values(JournalpostTittel)[index].toString(),
        label: Object.values(JournalpostTittel)[index].toString(),
        isDisabled: false,
    };
});

const JournalpostMetadataDiv = styled.div`
    margin: 0 0 20px 0;
`;

const EndreJournalpost: React.FC = () => {
    const { skjema, erLesevisning } = useManuellJournalfør();
    const { journalpostTittel, behandlingstema } = skjema.felter;

    return (
        <>
            <FamilieReactSelect
                {...journalpostTittel.hentNavInputProps(skjema.visFeilmeldinger)}
                creatable={true}
                isClearable
                erLesevisning={erLesevisning()}
                label={'Endre journalposttittel'}
                placeholder={'Skriv fritekst for å endre tittel...'}
                isMulti={false}
                options={journalpostTittelList}
                value={
                    skjema.felter.journalpostTittel.verdi === ''
                        ? null
                        : {
                              value: journalpostTittel.verdi,
                              label: journalpostTittel.verdi,
                          }
                }
                onChange={value => {
                    if (value && 'value' in value) {
                        journalpostTittel.validerOgSettFelt(value.value);
                    } else {
                        journalpostTittel.nullstill();
                    }
                }}
            />
            <BehandlingstemaSelect
                behandlingstema={behandlingstema}
                visFeilmeldinger={skjema.visFeilmeldinger}
                name="Behandlingstema"
                label="Sett behandlingstema / Gjelder"
            />
        </>
    );
};

const Journalpost: React.FC = () => {
    const { dataForManuellJournalføring, skjema } = useManuellJournalfør();
    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;
    const [åpen, settÅpen] = useState(false);
    const toggleApen = () => settÅpen(!åpen);
    const erÅpen = (): boolean => {
        if (skjema.visFeilmeldinger === true) return true;
        return åpen;
    };

    return (
        <EkspanderbartpanelBase
            id={skjema.felter.journalpostTittel.id}
            tittel={
                <Undertittel>{skjema.felter.journalpostTittel.verdi || 'Ingen tittel'}</Undertittel>
            }
            apen={erÅpen()}
            onClick={toggleApen}
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
        </EkspanderbartpanelBase>
    );
};

export default Journalpost;
