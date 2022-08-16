import * as React from 'react';

import type { TextareaProps } from '@navikt/ds-react';
import { Textarea } from '@navikt/ds-react';

import { type ILesevisningStyle, SkjemafeltLesevisning } from './SkjemaFeltLesevisning';

export interface IProps extends TextareaProps {
    lesevisning: boolean;
    lesevisningStyle?: ILesevisningStyle;
}

// TODO: Kan fjernes etter oppgradering av famile-felles-frontend
export const TextAreaMedLesevisning: React.FC<IProps> = props => {
    const { lesevisning, lesevisningStyle, ...textAreaProps } = props;

    return lesevisning ? (
        <SkjemafeltLesevisning
            label={props.label}
            value={props.value}
            lesevisningStyle={lesevisningStyle}
        />
    ) : (
        <Textarea {...textAreaProps} />
    );
};
