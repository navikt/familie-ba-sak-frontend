import classNames from 'classnames';

import {
    CheckmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
    InformationSquareFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

import styles from './StatusIkon.module.css';

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

const StatusIkon = ({ status, title }: IProps) => {
    switch (status) {
        case Status.OK:
            return <CheckmarkCircleFillIcon className={classNames(styles.icon, styles.ok)} title={title} />;
        case Status.FEIL:
            return <XMarkOctagonFillIcon className={classNames(styles.icon, styles.feil)} title={title} />;
        case Status.ADVARSEL:
            return (
                <ExclamationmarkTriangleFillIcon className={classNames(styles.icon, styles.advarsel)} title={title} />
            );
        case Status.INFO:
            return <InformationSquareFillIcon className={classNames(styles.icon, styles.info)} title={title} />;
    }
};
export default StatusIkon;
