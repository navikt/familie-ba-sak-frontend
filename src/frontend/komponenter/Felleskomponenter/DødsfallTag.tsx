import React from 'react';

import styled from 'styled-components';

import { Tag } from '@navikt/ds-react';
import { AGray900 } from '@navikt/ds-tokens/dist/tokens';

import { datoformat, formaterIsoDato } from '../../utils/formatter';

const StyletTag = styled(Tag)`
    color: white;
    background-color: ${AGray900};
    border-color: ${AGray900};
`;

interface IDødsfallTagProps {
    dødsfallDato: string;
}

const DødsfallTag: React.FC<IDødsfallTagProps> = ({ dødsfallDato }) => {
    const formatertDato = formaterIsoDato(dødsfallDato, datoformat.DATO);
    return <StyletTag variant="info">{`Død ${formatertDato}`}</StyletTag>;
};

export default DødsfallTag;
