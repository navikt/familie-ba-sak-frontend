import { useStableArray } from '@hooks/useStableArray';
import { useMemo } from 'react';
import { FlaggCombobox, type FlaggComboboxKodeProps } from '../FlaggCombobox';
import { VALUTAKODE_TIL_LABEL, VALUTAKODE_TIL_REGIONKODE, type Valutakode } from './valuta';

export function ValutaCombobox({ options, ...rest }: FlaggComboboxKodeProps<Valutakode>) {
    const stableOptions = useStableArray(options);

    const valutaOptions = useMemo(() => {
        return stableOptions.map(valuta => ({
            value: valuta,
            label: VALUTAKODE_TIL_LABEL[valuta],
            regionCode: VALUTAKODE_TIL_REGIONKODE[valuta],
        }));
    }, [stableOptions]);

    return <FlaggCombobox {...rest} options={valutaOptions} />;
}
