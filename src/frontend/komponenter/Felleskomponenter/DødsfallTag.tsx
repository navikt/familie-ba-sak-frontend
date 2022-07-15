import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

import { Tag } from '@navikt/ds-react';

const StyletTag = styled(Tag)`
    color: white;
    background-color: ${navFarger.navMorkGra};
    border-color: ${navFarger.navMorkGra};
`;

interface IDødsfallTagProps {
    dødsfallDato: string;
}

const DødsfallTag: React.FC<IDødsfallTagProps> = ({ dødsfallDato }) => {
    return (
        <StyletTag variant="info">{`Død ${new Date(dødsfallDato).toLocaleDateString()}`}</StyletTag>
    );
};

export default DødsfallTag;
