import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import {
    ManuellJournalføringFelter,
    type ManuellJournalføringFormValues,
} from '@sider/ManuellJournalføring/useManuellJournalføringSkjema';
import { DokumentTittel, JournalpostTittel } from '@typer/manuell-journalføring';
import { useController, useFormContext } from 'react-hook-form';

interface Props {
    dokument: IDokumentInfo;
}

export function DokumentTittelFelt({ dokument }: Props) {
    const { erLesevisning } = useManuellJournalføringContext();
    const { control, watch } = useFormContext<ManuellJournalføringFormValues>();

    const {
        field: { onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: ManuellJournalføringFelter.DOKUMENT_TITTEL, // TODO: se på hvordan dokumentene håndteres mtp feltet
        control,
        rules: {
            required: 'Tittel er ikke satt',
        },
    });

    const tittelList = (Object.values(JournalpostTittel) as string[]).concat(Object.values(DokumentTittel));

    const dokumenter = watch(ManuellJournalføringFelter.DOKUMENTER);
    const dokumentFraSkjema: IDokumentInfo | undefined = dokumenter.find(
        findDokument => findDokument.dokumentInfoId === dokument.dokumentInfoId
    );

    function onToggleSelected(value: string, isSelected: boolean) {
        if (isSelected) {
            onChange(value);
        } else {
            onChange('');
        }
    }

    return (
        <UNSAFE_Combobox
            label={'Dokumenttittel'}
            readOnly={erLesevisning() || isSubmitting}
            allowNewValues
            placeholder={'Skriv fritekst for å endre tittel...'}
            isMultiSelect={false}
            options={tittelList}
            selectedOptions={
                !dokumentFraSkjema?.tittel || dokumentFraSkjema.tittel === '' ? [] : [dokumentFraSkjema.tittel]
            }
            error={error?.message}
            onToggleSelected={onToggleSelected}
        />
    );
}
