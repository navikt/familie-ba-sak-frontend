import React, { type Ref, useMemo } from 'react';

import { CURRENCY_CODE_LABELS, CURRENCY_CODE_TO_REGION_CODE, type CurrencyCode } from './currency';
import { FlagCombobox } from '../FlagCombobox';

interface CurrencyComboboxBaseProps {
    options: CurrencyCode[];
    label: string;
    error?: string | Error;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
}

interface CurrencyComboboxSingleProps extends CurrencyComboboxBaseProps {
    isMulti?: false;
    value: CurrencyCode | undefined | null;
    onChange: (value: CurrencyCode | null) => void;
}

interface CurrencyComboboxMultiProps extends CurrencyComboboxBaseProps {
    isMulti: true;
    value: CurrencyCode[] | undefined;
    onChange: (value: CurrencyCode[]) => void;
}

type CurrencyComboboxProps = (CurrencyComboboxSingleProps | CurrencyComboboxMultiProps) & {
    ref?: Ref<HTMLInputElement>;
};

export function CurrencyCombobox({ options, ...rest }: CurrencyComboboxProps) {
    const currencyOptions = useMemo(() => {
        return options.map(currency => ({
            value: currency,
            label: CURRENCY_CODE_LABELS[currency],
            regionCode: CURRENCY_CODE_TO_REGION_CODE[currency],
        }));
    }, [options]);

    return <FlagCombobox {...rest} options={currencyOptions} />;
}
