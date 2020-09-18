import React from 'react';
import { randomUUID } from '../../../utils/commons';
import KnappBase from 'nav-frontend-knapper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import classNames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';

interface IProps {
    className?: string;
    erLesevisning: boolean;
    id: string;
    ikon: React.ReactChild;
    knappPosisjon?: 'venstre' | 'høyre';
    label: string;
    mini?: boolean;
    onClick: () => void;
    spinner?: boolean;
}

const IkonKnapp: React.FC<IProps> = ({
    className,
    erLesevisning,
    id,
    ikon,
    knappPosisjon = 'høyre',
    label,
    mini,
    onClick,
    spinner,
}) => {
    return !erLesevisning ? (
        <KnappBase
            aria-label={`utfør_${randomUUID()}`}
            className={classNames(className, 'ikon-knapp', knappPosisjon)}
            id={id}
            onClick={onClick}
            type="flat"
            mini={mini}
            kompakt={true}
        >
            {knappPosisjon === 'venstre' && <IkonTilKnapp ikon={ikon} spinner={spinner} />}
            <Normaltekst>{label}</Normaltekst>
            {knappPosisjon === 'høyre' ? <IkonTilKnapp ikon={ikon} spinner={spinner} /> : null}
        </KnappBase>
    ) : null;
};

const IkonTilKnapp: React.FC<{ ikon: React.ReactChild; spinner?: boolean }> = ({
    ikon,
    spinner,
}) => {
    return <>{spinner ? <NavFrontendSpinner /> : ikon}</>;
};

export default IkonKnapp;
