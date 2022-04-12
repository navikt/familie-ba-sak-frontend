import * as React from 'react';

import styled from 'styled-components';

import '@navikt/ds-css-internal';
import { ErrorFilled, SuccessFilled, WarningFilled } from '@navikt/ds-icons';

import { KompetanseStatus } from '../../../../typer/kompetanse';

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
    status?: KompetanseStatus;
    heigth?: number;
    width?: number;
}

const KompetanseIkon: React.FC<IProps> = ({ status, heigth, width }) => {
    switch (status) {
        case KompetanseStatus.OK:
            return <StyledSuccess height={heigth} width={width} />;
        case KompetanseStatus.UFULLSTENDIG:
            return <StyledError height={heigth} width={width} />;
        case KompetanseStatus.IKKE_UTFYLT:
        default:
            return <StyledWarning height={heigth} width={width} />;
    }
};

export default KompetanseIkon;
