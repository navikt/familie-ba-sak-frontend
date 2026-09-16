import { UNSAFE_Combobox } from '@navikt/ds-react';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import {
    ManuellJournalføringFelter,
    type ManuellJournalføringFormValues,
} from '@sider/ManuellJournalføring/useManuellJournalføringSkjema';
import { JournalpostTittel } from '@typer/manuell-journalføring';
import { useController, useFormContext } from 'react-hook-form';

export function JournalpostTittelFelt() {
    const { erLesevisning } = useManuellJournalføringContext();
    const { control, watch } = useFormContext<ManuellJournalføringFormValues>();

    const {
        field: { onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: ManuellJournalføringFelter.JOURNALPOST_TITTEL,
        control,
        rules: {
            required: 'Journalposttittel kan ikke være tom.',
        },
    });

    const journalpostTittelVerdi = watch(ManuellJournalføringFelter.JOURNALPOST_TITTEL);

    function onToggleSelected(value: string, isSelected: boolean) {
        if (isSelected) {
            onChange(value);
        } else {
            onChange('');
        }
    }

    return (
        <UNSAFE_Combobox
            label={'Endre journalposttittel'}
            placeholder={'Skriv fritekst for å endre tittel...'}
            error={error?.message}
            allowNewValues
            readOnly={erLesevisning() || isSubmitting}
            isMultiSelect={false}
            options={Object.values(JournalpostTittel)}
            selectedOptions={journalpostTittelVerdi === '' ? [] : [journalpostTittelVerdi]}
            onToggleSelected={onToggleSelected}
        />
    );
}
