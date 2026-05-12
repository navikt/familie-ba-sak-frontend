import { useEffect } from 'react';

import styled from 'styled-components';

import {
    BgNeutralStrongPressed,
    BorderNeutralSubtle,
    TextAccent,
    TextNeutral,
    TextNeutralSubtle,
} from '@navikt/ds-tokens/dist/tokens';
import type { Etikett } from '@navikt/familie-tidslinje';

import { TidslinjeVindu, useTidslinjeContext } from './TidslinjeContext';
import FamilieBaseKnapp from '../FamilieBaseKnapp';

interface IEtikettProp {
    etikett: Etikett;
}

const EtikettKnapp = styled(FamilieBaseKnapp)<{ disabled: boolean; $valgt: boolean }>`
    padding: 3px 3px 3px ${({ $valgt }) => ($valgt ? '5px' : '3px')};
    width: 90%;
    text-align: left;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    border-left: ${({ $valgt }) => ($valgt ? `1px solid ${BorderNeutralSubtle}` : 'none')};

    > span {
        text-decoration: ${({ disabled, $valgt }) => (disabled || $valgt ? 'none' : 'underline')};
        font-weight: ${({ $valgt }) => ($valgt ? 'bold' : 'normal')};
        color: ${({ disabled, $valgt }) => {
            if (disabled) return TextNeutralSubtle;
            else if ($valgt) return TextNeutral;
            else return TextAccent;
        }};
    }

    :hover {
        > span {
            text-decoration: none;
        }
    }

    :focus,
    :active {
        background-color: ${BgNeutralStrongPressed};
        color: #fff;
    }
`;

const TidslinjeEtikett = ({ etikett }: IEtikettProp) => {
    const {
        aktivEtikett,
        settAktivEtikett,
        aktivtTidslinjeVindu,
        initiellAktivEtikettErSatt,
        setInitiellAktivEtikettErSatt,
    } = useTidslinjeContext();

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
            $valgt={!!aktivEtikett && aktivEtikett.date.toDateString() === etikett.date.toDateString()}
            onClick={onEtikettClick}
        >
            <span>{etikett.label}</span>
        </EtikettKnapp>
    );
};

export default TidslinjeEtikett;
