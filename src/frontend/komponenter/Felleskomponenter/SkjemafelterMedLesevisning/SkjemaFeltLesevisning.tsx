import * as React from 'react';

import styled from 'styled-components';

export interface ILesevisningStyle {
    label?: React.CSSProperties;
    value?: React.CSSProperties;
}

interface IProps {
    label: React.ReactNode;
    value?: string;
    lesevisningStyle?: ILesevisningStyle;
}

const Label = styled.h2`
    font-family: Source Sans Pro;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5rem;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 1.5rem;
`;

const Value = styled.p`
    font-family: Source Sans Pro;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 0;
`;

const SkjemaGruppe = styled.div`
    margin-bottom: 2.5rem;
    :last-child {
        margin-bottom: 0;
    }
`;
// TODO: Kan fjernes etter oppgradering av famile-felles-frontend
export const SkjemafeltLesevisning: React.FC<IProps> = ({ label, value, lesevisningStyle }) => {
    return (
        <SkjemaGruppe>
            <Label style={lesevisningStyle?.label}>{label}</Label>
            <Value style={lesevisningStyle?.value}>{value}</Value>
        </SkjemaGruppe>
    );
};
