import { EØS_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '@komponenter/FlaggCombobox';
import { useController, useFormContext } from 'react-hook-form';

import { Brevmal } from './typer';
import { type BrevModulFormValues, BrevmodulFeltnavn } from './useBrevModul';
import { useSkjemaErLåst } from './useSkjemaErLåst';

export function MottakerlandSedField() {
    const skjemaErLåst = useSkjemaErLåst();
    const { control } = useFormContext<BrevModulFormValues>();

    const {
        field,
        fieldState: { error },
    } = useController({
        name: BrevmodulFeltnavn.MOTTAKERLAND_SED,
        control,
        rules: {
            validate: (verdi, values) => {
                if (values.brevmal === Brevmal.SVARTIDSBREV) {
                    return true;
                }
                if (verdi.length) {
                    return true;
                }
                return 'Velg land SED er sendt/skal sendes til';
            },
        },
    });

    return (
        <RegionCombobox
            label={'SED er sendt til'}
            value={(field.value ?? []) as Regionkode[]}
            options={EØS_LAND_REGIONKODER}
            onChange={value => field.onChange(value ?? [])}
            readOnly={skjemaErLåst}
            error={error?.message ?? ''}
            isMulti={true}
        />
    );
}
