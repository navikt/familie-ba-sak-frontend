import React from 'react';

import classNames from 'classnames';

import KnappBase, { KnappBaseProps } from 'nav-frontend-knapper';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';

export enum IkonPosisjon {
    VENSTRE = 'venstre',
    HØYRE = 'høyre',
}

interface IProps {
    className?: string;
    erLesevisning: boolean;
    id: string;
    ikon: React.ReactChild;
    ikonPosisjon?: IkonPosisjon;
    label: string;
    mini?: boolean;
    onClick: () => void;
    spinner?: boolean;
}

const IkonKnapp: React.FC<IProps & KnappBaseProps> = ({
    className,
    erLesevisning,
    id,
    ikon,
    ikonPosisjon = IkonPosisjon.HØYRE,
    label,
    mini,
    onClick,
    spinner,
    ...props
}) => {
    return !erLesevisning ? (
        <KnappBase
            className={classNames(className, 'ikon-knapp', ikonPosisjon)}
            id={id}
            onClick={onClick}
            type={props.type ?? 'flat'}
            mini={mini}
            kompakt={true}
            {...props}
        >
            {ikonPosisjon === 'venstre' && <IkonTilKnapp ikon={ikon} spinner={spinner} />}
            <Normaltekst>{label}</Normaltekst>
            {ikonPosisjon === 'høyre' ? <IkonTilKnapp ikon={ikon} spinner={spinner} /> : null}
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
