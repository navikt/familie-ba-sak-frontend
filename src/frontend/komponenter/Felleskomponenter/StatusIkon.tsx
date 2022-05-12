import * as React from 'react';

import styled from 'styled-components';
import '@navikt/ds-css-internal';

import { ErrorFilled, SuccessFilled, WarningFilled } from '@navikt/ds-icons';

import type { KompetanseStatus } from '../../typer/kompetanse';

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
    heigth?: number;
    width?: number;
}

export enum Status {
    ADVARSEL,
    FEIL,
    OK,
}

export const kompetanseStatusTilStatus: Record<KompetanseStatus, Status> = {
    IKKE_UTFYLT: Status.ADVARSEL,
    UFULLSTENDIG: Status.FEIL,
    OK: Status.OK,
};

const StatusIkon: React.FC<IProps> = ({ status, heigth, width }) => {
    switch (status) {
        case Status.OK:
            return <StyledSuccess height={heigth} width={width} />;
        case Status.FEIL:
            return <StyledError height={heigth} width={width} />;
        case Status.ADVARSEL:
        default:
            return <StyledWarning height={heigth} width={width} />;
    }
};

export default StatusIkon;
