import React, { useId } from 'react';

import { PadlockLockedFillIcon } from '@navikt/aksel-icons';
import { HStack, Label } from '@navikt/ds-react';
import type { Currency } from '@navikt/land-verktoy';
import _CountrySelect from '@navikt/landvelger';

import Styles from './Valutavelger.module.css';

// Plaster for problem med default export i landvelger. Spiller ikke på lag ved konvertering fra CJS til ESM.
// Ekstraherer default med fallbacks
const CountrySelect = (_CountrySelect as unknown as { default?: typeof _CountrySelect }).default ?? _CountrySelect;

export const EØS_CURRENCY = ['DKK', 'SEK', 'ISK', 'EUR', 'PLN', 'BGN', 'CZK', 'HUF', 'HRK', 'RON', 'GBP', 'CHF'];

interface Props {
    label: string;
    value: string | undefined;
    options: string[];
    onChange: (value: Currency) => void;
    error?: string;
    readOnly?: boolean;
}

export function Valutavelger({ label, value, options, onChange, error, readOnly }: Props) {
    const id = useId();
    const values = value ? [value] : [];

    const labelElement = readOnly ? (
        <HStack wrap={false} align={'center'} gap={'space-8'}>
            <PadlockLockedFillIcon />
            <Label htmlFor={id}>{label}</Label>
        </HStack>
    ) : (
        <Label htmlFor={id}>{label}</Label>
    );

    return (
        <CountrySelect
            id={id}
            className={Styles.valutavelger}
            values={values}
            locale={'nb'}
            label={labelElement}
            ariaLabel={label}
            hideLabel={false}
            type={'currency'}
            flags={true}
            flagType={'circle'}
            isClearable={true}
            flagWave={false}
            closeMenuOnSelect={true}
            isMulti={false}
            isDisabled={readOnly}
            sort={'scandinaviaFirst'}
            onOptionSelected={onChange}
            includeList={options}
            error={error ?? undefined}
        />
    );
}
