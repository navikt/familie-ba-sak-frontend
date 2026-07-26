import { EØS_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '@komponenter/FlaggCombobox';
import { isEmpty } from '@utils/eøsValidators';
import { useController, useFormContext } from 'react-hook-form';

import { UtenlandskPeriodeBeløpFelt, type UtenlandskPeriodeBeløpFormValues } from './useUtenlandskPeriodeBeløpSkjema';

interface Props {
    readOnly: boolean;
}

export function UtenlandskPeriodeBeløpUtbetalingslandFelt({ readOnly }: Props) {
    const { control } = useFormContext<UtenlandskPeriodeBeløpFormValues>();

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: UtenlandskPeriodeBeløpFelt.UTBETALINGSLAND,
        control,
        rules: {
            validate: utbetalingsland =>
                !isEmpty(utbetalingsland) ? undefined : 'Utbetalingsland er påkrevd, men mangler input',
        },
    });

    return (
        <RegionCombobox
            label={'Utbetalingsland'}
            value={value as Regionkode}
            options={EØS_LAND_REGIONKODER}
            onChange={nyttUtbetalingsland => onChange(nyttUtbetalingsland ?? undefined)}
            ref={ref}
            readOnly={readOnly || isSubmitting}
            error={error?.message}
        />
    );
}
