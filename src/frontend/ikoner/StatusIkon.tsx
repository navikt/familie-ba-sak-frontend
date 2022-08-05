import * as React from 'react';

import styled from 'styled-components';

import { ErrorFilled, SuccessFilled, WarningFilled } from '@navikt/ds-icons';

const StyledSuccess = styled(SuccessFilled)`
    color: var(--navds-semantic-color-feedback-success-icon);
`;
const StyledError = styled(ErrorFilled)`
    color: var(--navds-semantic-color-feedback-danger-icon);
`;
const StyledWarning = styled(WarningFilled)`
    color: var(--navds-semantic-color-feedback-warning-border);
`;

interface IProps {
    status?: Status;
    height?: number;
    width?: number;
}

export enum Status {
    ADVARSEL,
    FEIL,
    OK,
}

const StatusIkon: React.FC<IProps> = ({ status, height = 24, width = 24 }) => {
    switch (status) {
        case Status.OK:
            return <StyledSuccess height={height} width={width} />;
        case Status.FEIL:
            return <StyledError height={height} width={width} />;
        case Status.ADVARSEL:
        default:
            return <StyledWarning height={height} width={width} />;
    }
};

export default StatusIkon;
