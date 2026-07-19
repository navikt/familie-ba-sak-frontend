import type { OptionType } from '@typer/common';
import { useController, useFormContext } from 'react-hook-form';

import { UNSAFE_Combobox } from '@navikt/ds-react';

import { ValutakursFelt, type ValutakursFormValues } from './useValutakursSkjema';

interface Props {
    tilgjengeligeBarn: OptionType[];
    lesevisning: boolean;
}

export function ValutakursBarnFelt({ tilgjengeligeBarn, lesevisning }: Props) {
    const { control } = useFormContext<ValutakursFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name: ValutakursFelt.BARN,
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
            readOnly={lesevisning}
            error={error?.message}
        />
    );
}
