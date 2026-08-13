import { opplysningsdokumenter } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { useController, useFormContext } from 'react-hook-form';

import { UNSAFE_Combobox } from '@navikt/ds-react';

import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './useDokumentutsendingSkjema';

export function Dokumentvelger() {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    const { field, fieldState } = useController({
        name: DokumentutsendingFeltnavn.DOKUMENTER,
        control,
        rules: {
            validate: (dokumenter, formValues) =>
                dokumenter.length > 0 || formValues.fritekster.length > 0
                    ? undefined
                    : 'Du må velge minst ett dokument',
        },
    });

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            field.onChange([...field.value, option]);
        } else {
            field.onChange(field.value.filter(dokument => dokument !== option));
        }
    };

    return (
        <UNSAFE_Combobox
            label="Velg dokumenter"
            isMultiSelect
            onToggleSelected={onToggleSelected}
            selectedOptions={field.value}
            options={opplysningsdokumenter.map(dokument => dokument.label)}
            error={fieldState.error?.message}
        />
    );
}
