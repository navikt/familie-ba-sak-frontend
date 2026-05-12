import type { Ref } from 'react';
import { useMemo } from 'react';

import { VALUTAKODE_TIL_LABEL, VALUTAKODE_TIL_REGIONKODE, type Valutakode } from './valuta';
import { FlaggCombobox } from '../FlaggCombobox';

interface ValutaComboboxBaseProps {
    options: Valutakode[];
    label: string;
    error?: string | Error;
    readOnly?: boolean;
    placeholder?: string;
    dropdownPlacement?: 'bottom' | 'top' | 'auto';
    className?: string;
}

interface ValutaComboboxSingleProps extends ValutaComboboxBaseProps {
    isMulti?: false;
    value: Valutakode | undefined | null;
    onChange: (value: Valutakode | null) => void;
}

interface ValutaComboboxMultiProps extends ValutaComboboxBaseProps {
    isMulti: true;
    value: Valutakode[] | undefined;
    onChange: (value: Valutakode[]) => void;
}

type ValutaComboboxProps = (ValutaComboboxSingleProps | ValutaComboboxMultiProps) & {
    ref?: Ref<HTMLInputElement>;
};

export function ValutaCombobox({ options, ...rest }: ValutaComboboxProps) {
    const valutaOptions = useMemo(() => {
        return options.map(currency => ({
            value: currency,
            label: VALUTAKODE_TIL_LABEL[currency],
            regionCode: VALUTAKODE_TIL_REGIONKODE[currency],
        }));
    }, [options]);

    return <FlaggCombobox {...rest} options={valutaOptions} />;
}
