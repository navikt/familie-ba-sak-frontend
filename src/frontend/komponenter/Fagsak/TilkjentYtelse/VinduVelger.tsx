import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Undertekst } from 'nav-frontend-typografi';

import { useTidslinje } from '../../../context/TidslinjeContext';
import FamilieBaseKnapp from '../../Felleskomponenter/FamilieBaseKnapp';

const VinduVelgerKnapp = styled(FamilieBaseKnapp)<{ valgt: boolean }>`
    color: ${({ valgt }) => (valgt ? '#fff' : navFarger.navMorkGra)};
    padding: 0.5rem;
    border: 0.0625rem solid ${navFarger.navGra20};
    background-color: ${({ valgt }) => (valgt ? navFarger.navGra80 : 'none')};

    :first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-left-radius: 0.25rem;
        margin-right: -0.0625rem;
        box-sizing: border-box;
    }

    :last-child {
        border-bottom-right-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        margin-left: -0.0625rem;
    }

    :hover {
        background-color: ${({ valgt }) => (valgt ? navFarger.navGra80 : navFarger.navLysGra)};
    }

    :focus {
        background-color: ${({ valgt }) => (valgt ? navFarger.navGra80 : navFarger.navLysGra)};
        outline: ${({ valgt }) =>
            `0.1875rem solid ${valgt ? navFarger.navOransjeLighten20 : navFarger.fokusFarge}`};
        outline-offset: -0.125rem;
        position: relative;
    }
`;

const Vinduvelger: React.FunctionComponent = () => {
    const { tidslinjeVinduer, endreTidslinjeVindu, aktivtTidslinjeVindu } = useTidslinje();

    return (
        <div>
            {tidslinjeVinduer.map(vindu => {
                return (
                    <VinduVelgerKnapp
                        key={vindu.id}
                        aria-label={vindu.label}
                        valgt={aktivtTidslinjeVindu.vindu.id === vindu.id}
                        onClick={() => endreTidslinjeVindu(vindu)}
                    >
                        <Undertekst>{vindu.label}</Undertekst>
                    </VinduVelgerKnapp>
                );
            })}
        </div>
    );
};

export default Vinduvelger;
