import * as React from 'react';

import { ErrorColored, SuccessColored, WarningColored } from '@navikt/ds-icons';

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
            return <SuccessColored height={height} width={width} />;
        case Status.FEIL:
            return <ErrorColored height={height} width={width} />;
        case Status.ADVARSEL:
        default:
            return <WarningColored height={height} width={width} />;
    }
};

export default StatusIkon;
