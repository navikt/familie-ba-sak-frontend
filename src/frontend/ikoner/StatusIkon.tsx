import * as React from 'react';

import styled from 'styled-components';

import {
    CheckmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
    InformationSquareFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

interface IProps {
    status: Status;
    title?: string;
}

export enum Status {
    ADVARSEL,
    FEIL,
    OK,
    INFO,
}

const OkIkon = styled(CheckmarkCircleFillIcon)`
    color: var(--ax-success-600);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const FeilIkon = styled(XMarkOctagonFillIcon)`
    color: var(--ax-danger-800);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const AdvarselIkon = styled(ExclamationmarkTriangleFillIcon)`
    color: var(--ax-warning-500);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const InfoIkon = styled(InformationSquareFillIcon)`
    color: var(--ax-info-700);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const StatusIkon: React.FC<IProps> = ({ status, title }) => {
    switch (status) {
        case Status.OK:
            return <OkIkon title={title} />;
        case Status.FEIL:
            return <FeilIkon title={title} />;
        case Status.ADVARSEL:
            return <AdvarselIkon title={title} />;
        case Status.INFO:
            return <InfoIkon title={title} />;
    }
};
export default StatusIkon;
