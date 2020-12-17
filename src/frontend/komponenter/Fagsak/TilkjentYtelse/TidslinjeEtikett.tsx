import React, { useEffect } from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { TidslinjeVindu, useTidslinje } from '../../../context/TidslinjeContext';

interface IEtikettProp {
    etikett: Skalaetikett;
}

const EtikettKnapp = styled.button<{ disabled: boolean; valgt: boolean }>`
    padding: 3px 3px 3px ${({ valgt }) => (valgt ? '5px' : '3px')};
    width: 90%;
    text-align: left;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    border-left: ${({ valgt }) => (valgt ? `1px solid ${navFarger.navGra20}` : 'none')};

    > span {
        text-decoration: ${({ disabled, valgt }) => (disabled || valgt ? 'none' : 'underline')};
        font-weight: ${({ valgt }) => (valgt ? 'bold' : 'normal')};
        color: ${({ disabled, valgt }) => {
            if (disabled) return navFarger.navMorkGra;
            else if (valgt) return navFarger.navDypBla;
            else return navFarger.navBla;
        }};
    }

    :hover {
        > span {
            text-decoration: none;
        }
    }

    :focus,
    :active {
        background-color: ${navFarger.fokusFarge};
        > span {
            color: #fff;
        }
    }
`;

const TidslinjeEtikett: React.FunctionComponent<IEtikettProp> = ({ etikett }) => {
    const {
        aktivEtikett,
        settAktivEtikett,
        aktivtTidslinjeVindu,
        initiellAktivEtikettErSatt,
        setInitiellAktivEtikettErSatt,
    } = useTidslinje();

    const onEtikettClick = () => {
        settAktivEtikett(etikett);
    };

    useEffect(() => {
        if (
            !initiellAktivEtikettErSatt &&
            etikett.dato.getFullYear() === new Date().getFullYear() &&
            etikett.dato.getMonth() === new Date().getMonth()
        ) {
            settAktivEtikett(etikett);
            setInitiellAktivEtikettErSatt(true);
        }
    }, [etikett]);

    return (
        <EtikettKnapp
            aria-label={etikett.label}
            disabled={aktivtTidslinjeVindu.vindu.id === TidslinjeVindu.TRE_ÅR}
            valgt={
                !!aktivEtikett && aktivEtikett.dato.toDateString() === etikett.dato.toDateString()
            }
            onClick={onEtikettClick}
        >
            <span>{etikett.label}</span>
        </EtikettKnapp>
    );
};

export default TidslinjeEtikett;
