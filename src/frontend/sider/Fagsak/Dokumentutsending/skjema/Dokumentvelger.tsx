import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { opplysningsdokumenter } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import {
    DokumentutsendingFeltnavn,
    type DokumentutsendingFormValues,
} from '@sider/Fagsak/Dokumentutsending/useDokumentutsendingSkjema';
import { useController, useFormContext } from 'react-hook-form';

export function Dokumentvelger() {
    const erLesevisning = useErLesevisningFagsak();
    const {
        control,
        formState: { isSubmitting },
    } = useFormContext<DokumentutsendingFormValues>();

    const { field, fieldState } = useController({
        name: DokumentutsendingFeltnavn.DOKUMENTER,
        control,
        rules: {
            validate: (dokumenter, formValues) =>
                dokumenter.length > 0 || formValues.fritekster.length > 0
                    ? undefined
                    : 'Du må velge minst ett dokument eller legge til en fritekst',
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
            readOnly={erLesevisning || isSubmitting}
        />
    );
}
