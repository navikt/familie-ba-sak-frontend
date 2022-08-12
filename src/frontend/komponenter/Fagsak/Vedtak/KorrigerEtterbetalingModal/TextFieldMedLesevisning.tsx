import * as React from 'react';

import type { TextFieldProps } from '@navikt/ds-react';
import { TextField } from '@navikt/ds-react';

import { SkjemafeltLesevisning } from './SkjemaFeltLesevisning';

export interface IProps extends TextFieldProps {
    lesevisning: boolean;
}

export const TextFieldMedLesevisning: React.FC<IProps> = props => {
    const { lesevisning, ...textFieldProps } = props;

    return lesevisning ? (
        <SkjemafeltLesevisning label={props.label} value={props.value} />
    ) : (
        <TextField {...textFieldProps} />
    );
};
