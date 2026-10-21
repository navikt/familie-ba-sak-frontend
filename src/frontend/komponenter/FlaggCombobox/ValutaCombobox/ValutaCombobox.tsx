import { useMemo } from 'react';
import { FlaggCombobox, type FlaggComboboxKodeProps } from '../FlaggCombobox';
import { VALUTAKODE_TIL_LABEL, VALUTAKODE_TIL_REGIONKODE, type Valutakode } from './valuta';

export function ValutaCombobox({ options, ...rest }: FlaggComboboxKodeProps<Valutakode>) {
    const valutaOptions = useMemo(() => {
        return options.map(valuta => ({
            value: valuta,
            label: VALUTAKODE_TIL_LABEL[valuta],
            regionCode: VALUTAKODE_TIL_REGIONKODE[valuta],
        }));
    }, [options]);

    return <FlaggCombobox {...rest} options={valutaOptions} />;
}
