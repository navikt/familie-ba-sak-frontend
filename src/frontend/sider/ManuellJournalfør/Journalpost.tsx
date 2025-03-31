import React from 'react';

import styled from 'styled-components';

import { BodyShort, ExpansionCard, Heading } from '@navikt/ds-react';
import { AZIndexPopover } from '@navikt/ds-tokens/dist/tokens';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalførContext } from './ManuellJournalførContext';
import { JournalpostTittel } from '../../typer/manuell-journalføring';
import { Datoformat, isoStringTilFormatertString } from '../../utils/dato';

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
    const { skjema, erLesevisning } = useManuellJournalførContext();

    return (
        <FamilieReactSelect
            {...skjema.felter.journalpostTittel.hentNavInputProps(skjema.visFeilmeldinger)}
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
                          value: skjema.felter.journalpostTittel.verdi,
                          label: skjema.felter.journalpostTittel.verdi,
                      }
            }
            onChange={value => {
                if (value && 'value' in value) {
                    skjema.felter.journalpostTittel.validerOgSettFelt(value.value);
                } else {
                    skjema.felter.journalpostTittel.nullstill();
                }
            }}
            propSelectStyles={{
                container: (base, props) => ({
                    ...base,
                    zIndex: props.isFocused ? AZIndexPopover : 1,
                }),
            }}
        />
    );
};

const Journalpost: React.FC = () => {
    const { dataForManuellJournalføring, skjema } = useManuellJournalførContext();
    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;

    return (
        <ExpansionCard
            id={skjema.felter.journalpostTittel.id}
            size="small"
            aria-label="journalpost"
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title>
                    <Heading size={'small'} level={'2'}>
                        {skjema.felter.journalpostTittel.verdi || 'Ingen tittel'}
                    </Heading>
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <JournalpostMetadataDiv>
                    <BodyShort>
                        Mottatt:{' '}
                        {isoStringTilFormatertString({
                            isoString: datoMottatt,
                            tilFormat: Datoformat.DATO,
                            defaultString: 'Ingen mottatt dato',
                        })}
                    </BodyShort>
                </JournalpostMetadataDiv>
                <EndreJournalpost />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default Journalpost;
