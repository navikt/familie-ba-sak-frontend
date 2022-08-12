import * as React from 'react';

import type { SelectProps } from '@navikt/ds-react';
import { Select } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';

import { SkjemafeltLesevisning } from './SkjemaFeltLesevisning';

export interface IProps extends Omit<SelectProps, 'children'> {
    lesevisning: boolean;
    options: OptionType[];
}

export const SelectMedLesevisning: React.FC<IProps> = props => {
    const { lesevisning, options, ...selectProps } = props;

    const value = options.find(option => option.value === props.value)?.label ?? 'Ikke oppgitt';

    return lesevisning ? (
        <SkjemafeltLesevisning label={props.label} value={value} />
    ) : (
        <Select {...selectProps}>
            {options.map(option => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
};
