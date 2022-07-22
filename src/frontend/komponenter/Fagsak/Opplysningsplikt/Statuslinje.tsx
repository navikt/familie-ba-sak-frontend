import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

import VilkårResultatIkon from '../../../ikoner/VilkårResultatIkon';
import type { Resultat } from '../../../typer/vilkår';

interface StatuslinjeProps {
    resultat: Resultat;
}

const StatuslinjeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1rem;
`;

const Linje = styled.span`
    margin-top: 5px;
    width: 1px;
    background-color: ${navFarger.navBlaLighten20};
    height: 100%;
`;

const Statuslinje: React.FC<StatuslinjeProps> = ({ resultat }) => (
    <StatuslinjeWrapper>
        <VilkårResultatIkon resultat={resultat} width={20} height={20} />
        <Linje />
    </StatuslinjeWrapper>
);

export default Statuslinje;
