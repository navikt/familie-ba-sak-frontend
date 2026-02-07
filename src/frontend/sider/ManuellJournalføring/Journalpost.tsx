import React from 'react';

import { BodyShort, Box, ExpansionCard, UNSAFE_Combobox } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringContext } from './ManuellJournalføringContext';
import { JournalpostTittel } from '../../typer/manuell-journalføring';
import { Datoformat, isoStringTilFormatertString } from '../../utils/dato';

const EndreJournalpost: React.FC = () => {
    const { skjema, erLesevisning } = useManuellJournalføringContext();
    const navInputProps = skjema.felter.journalpostTittel.hentNavInputProps(skjema.visFeilmeldinger);

    return (
        <UNSAFE_Combobox
            error={navInputProps.feil}
            id={navInputProps.id}
            allowNewValues
            readOnly={erLesevisning()}
            label={'Endre journalposttittel'}
            placeholder={'Skriv fritekst for å endre tittel...'}
            isMultiSelect={false}
            options={Object.values(JournalpostTittel)}
            selectedOptions={
                skjema.felter.journalpostTittel.verdi === '' ? [] : [skjema.felter.journalpostTittel.verdi]
            }
            onToggleSelected={(value, isSelected) => {
                if (isSelected) {
                    skjema.felter.journalpostTittel.validerOgSettFelt(value);
                } else {
                    skjema.felter.journalpostTittel.nullstill();
                }
            }}
        />
    );
};

const Journalpost: React.FC = () => {
    const { dataForManuellJournalføring, skjema } = useManuellJournalføringContext();
    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;

    return (
        <ExpansionCard id={skjema.felter.journalpostTittel.id} size="small" aria-label="journalpost">
            <ExpansionCard.Header>
                <ExpansionCard.Title size={'small'} as={'h2'}>
                    {skjema.felter.journalpostTittel.verdi || 'Ingen tittel'}
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Box marginBlock={'space-0 space-20'}>
                    <BodyShort>
                        Mottatt:{' '}
                        {isoStringTilFormatertString({
                            isoString: datoMottatt,
                            tilFormat: Datoformat.DATO,
                            defaultString: 'Ingen mottatt dato',
                        })}
                    </BodyShort>
                </Box>
                <EndreJournalpost />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default Journalpost;
