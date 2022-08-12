import * as React from 'react';

import type { TextareaProps } from '@navikt/ds-react';
import { Textarea } from '@navikt/ds-react';

import { SkjemafeltLesevisning } from './SkjemaFeltLesevisning';

export interface IProps extends TextareaProps {
    lesevisning: boolean;
}

export const TextAreaMedLesevisning: React.FC<IProps> = props => {
    const { lesevisning, ...textAreaProps } = props;

    return lesevisning ? (
        <SkjemafeltLesevisning label={props.label} value={props.value} />
    ) : (
        <Textarea {...textAreaProps} />
    );
};
