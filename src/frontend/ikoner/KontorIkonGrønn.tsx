import classNames from 'classnames';

import { Buildings3Icon } from '@navikt/aksel-icons';

import styles from './KontorIkonGrønn.module.css';

interface IKontorIkonGrønn {
    className?: string;
    størrelse?: 's' | 'm';
    erAdresseBeskyttet?: boolean;
}

const KontorIkonGrønn = ({ className, størrelse = 's', erAdresseBeskyttet = false }: IKontorIkonGrønn) => {
    return (
        <span
            className={classNames(styles.container, {
                [styles.largerCircle]: størrelse === 'm',
                [styles.adresseBeskyttet]: erAdresseBeskyttet,
            })}
        >
            <Buildings3Icon
                className={classNames(className, styles.icon, { [styles.largerIcon]: størrelse === 'm' })}
            />
        </span>
    );
};

export default KontorIkonGrønn;
