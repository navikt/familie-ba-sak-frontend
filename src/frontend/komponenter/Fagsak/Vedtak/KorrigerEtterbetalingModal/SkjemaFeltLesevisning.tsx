import * as React from 'react';

import styled from 'styled-components';

interface IProps {
    label: React.ReactNode;
    value?: string;
}

const Label = styled.h2`
    font-family: Source Sans Pro;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 1.5rem;
`;

const Value = styled.p`
    font-family: Source Sans Pro;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
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

export const SkjemafeltLesevisning: React.FC<IProps> = ({ label, value }) => {
    return (
        <SkjemaGruppe>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </SkjemaGruppe>
    );
};
