import type { OptionType } from '@typer/common';
import { useController, useFormContext } from 'react-hook-form';

import { UNSAFE_Combobox } from '@navikt/ds-react';

import { KompetanseFelt, type KompetanseFormValues } from './useKompetansePeriodeSkjema';

interface Props {
    tilgjengeligeBarn: OptionType[];
    lesevisning: boolean;
}

export function KompetanseBarnFelt({ tilgjengeligeBarn, lesevisning }: Props) {
    const { control } = useFormContext<KompetanseFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: KompetanseFelt.BARN,
        control,
        rules: {
            validate: barn => (barn.length > 0 ? undefined : 'Minst ett barn må være valgt'),
        },
    });

    const onToggleSelected = (optionValue: string, isSelected: boolean) => {
        if (isSelected) {
            const nyttValg = tilgjengeligeBarn.find(barn => barn.value === optionValue);
            if (nyttValg) {
                onChange([...value, nyttValg]);
            }
        } else {
            onChange(value.filter(barn => barn.value !== optionValue));
        }
    };

    return (
        <UNSAFE_Combobox
            isMultiSelect
            label={'Barn'}
            options={tilgjengeligeBarn}
            selectedOptions={value}
            onToggleSelected={onToggleSelected}
            onBlur={onBlur}
            ref={ref}
            readOnly={lesevisning || isSubmitting}
            error={error?.message}
        />
    );
}
