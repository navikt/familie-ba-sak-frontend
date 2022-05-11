import * as React from 'react';

import styled from 'styled-components';
import '@navikt/ds-css-internal';

import { ErrorFilled, SuccessFilled, WarningFilled } from '@navikt/ds-icons';

import type { KompetanseStatus } from '../../../../typer/kompetanse';

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
    IKKE_UTFYLT = 'IKKE_UTFYLT',
    UFULLSTENDIG = 'UFULLSTENDIG',
    OK = 'OK',
}

export const kompetanseStatusTilStatus: Record<KompetanseStatus, Status> = {
    IKKE_UTFYLT: Status.IKKE_UTFYLT,
    UFULLSTENDIG: Status.UFULLSTENDIG,
    OK: Status.OK,
};

const StatusIkon: React.FC<IProps> = ({ status, heigth, width }) => {
    switch (status) {
        case Status.OK:
            return <StyledSuccess height={heigth} width={width} />;
        case Status.UFULLSTENDIG:
            return <StyledError height={heigth} width={width} />;
        case Status.IKKE_UTFYLT:
        default:
            return <StyledWarning height={heigth} width={width} />;
    }
};

export default StatusIkon;
