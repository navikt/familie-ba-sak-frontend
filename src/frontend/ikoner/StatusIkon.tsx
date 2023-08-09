import * as React from 'react';

import {
    CheckmarkCircleIcon,
    ExclamationmarkTriangleIcon,
    InformationSquareIcon,
    XMarkOctagonIcon,
} from '@navikt/aksel-icons';

interface IProps {
    status?: Status;
    height?: number;
    width?: number;
}

export enum Status {
    ADVARSEL,
    FEIL,
    OK,
    INFO,
}

const StatusIkon: React.FC<IProps> = ({ status, height = 24, width = 24 }) => {
    switch (status) {
        case Status.OK:
            return <CheckmarkCircleIcon height={height} width={width} />;
        case Status.FEIL:
            return <XMarkOctagonIcon height={height} width={width} />;
        case Status.ADVARSEL:
            return <ExclamationmarkTriangleIcon height={height} width={width} />;
        default:
        case Status.INFO:
            return <InformationSquareIcon height={height} width={width} />;
    }
};
export default StatusIkon;
