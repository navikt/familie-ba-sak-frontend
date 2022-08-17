import * as React from 'react';

import type { TextFieldProps } from '@navikt/ds-react';
import { TextField } from '@navikt/ds-react';

import { type ILesevisningStyle, SkjemafeltLesevisning } from './SkjemaFeltLesevisning';

export interface IProps extends TextFieldProps {
    lesevisning: boolean;
    lesevisningStyle?: ILesevisningStyle;
}

// TODO: Kan fjernes etter oppgradering av famile-felles-frontend
export const TextFieldMedLesevisning: React.FC<IProps> = props => {
    const { lesevisning, lesevisningStyle, ...textFieldProps } = props;

    return lesevisning ? (
        <SkjemafeltLesevisning
            label={props.label}
            value={props.value}
            lesevisningStyle={lesevisningStyle}
        />
    ) : (
        <TextField {...textFieldProps} />
    );
};
