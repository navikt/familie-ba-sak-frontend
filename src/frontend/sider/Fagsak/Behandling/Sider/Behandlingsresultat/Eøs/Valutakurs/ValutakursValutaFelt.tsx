import { EØS_VALUTAKODER, type Valutakode, ValutaCombobox } from '@komponenter/FlaggCombobox';
import { useFormContext, useWatch } from 'react-hook-form';

import { ValutakursFelt, type ValutakursFormValues } from './useValutakursSkjema';

export function ValutakursValutaFelt() {
    const { control } = useFormContext<ValutakursFormValues>();

    const valutakode = useWatch({ control, name: ValutakursFelt.VALUTAKODE });

    return (
        <ValutaCombobox
            label={'Valuta'}
            value={valutakode as Valutakode}
            options={EØS_VALUTAKODER}
            onChange={() => {}}
            readOnly={true}
        />
    );
}
