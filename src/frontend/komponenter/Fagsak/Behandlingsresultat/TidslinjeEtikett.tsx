import React, { useEffect } from 'react';

import styled from 'styled-components';

import { ABlue500, ABlue600, ABlue800, AGray300, AGray900 } from '@navikt/ds-tokens/dist/tokens';
import type { Etikett } from '@navikt/familie-tidslinje';

import { TidslinjeVindu, useTidslinje } from '../../../context/TidslinjeContext';
import FamilieBaseKnapp from '../../Felleskomponenter/FamilieBaseKnapp';

interface IEtikettProp {
    etikett: Etikett;
}

const EtikettKnapp = styled(FamilieBaseKnapp)<{ disabled: boolean; valgt: boolean }>`
    padding: 3px 3px 3px ${({ valgt }) => (valgt ? '5px' : '3px')};
    width: 90%;
    text-align: left;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    border-left: ${({ valgt }) => (valgt ? `1px solid ${AGray300}` : 'none')};

    > span {
        text-decoration: ${({ disabled, valgt }) => (disabled || valgt ? 'none' : 'underline')};
        font-weight: ${({ valgt }) => (valgt ? 'bold' : 'normal')};
        color: ${({ disabled, valgt }) => {
            if (disabled) return AGray900;
            else if (valgt) return ABlue600;
            else return ABlue500;
        }};
    }

    :hover {
        > span {
            text-decoration: none;
        }
    }

    :focus,
    :active {
        background-color: ${ABlue800};
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
            etikett.date.getFullYear() === new Date().getFullYear() &&
            etikett.date.getMonth() === new Date().getMonth()
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
                !!aktivEtikett && aktivEtikett.date.toDateString() === etikett.date.toDateString()
            }
            onClick={onEtikettClick}
        >
            <span>{etikett.label}</span>
        </EtikettKnapp>
    );
};

export default TidslinjeEtikett;
