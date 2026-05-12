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
    color: var(--ax-text-success-subtle);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const FeilIkon = styled(XMarkOctagonFillIcon)`
    color: var(--ax-text-danger-subtle);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const AdvarselIkon = styled(ExclamationmarkTriangleFillIcon)`
    color: var(--ax-text-warning-subtle);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const InfoIkon = styled(InformationSquareFillIcon)`
    color: var(--ax-text-info-subtle);
    font-size: 1.5rem;
    min-width: 1.5rem;
`;

const StatusIkon = ({ status, title }: IProps) => {
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
