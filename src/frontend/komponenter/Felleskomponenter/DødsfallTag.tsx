import React from 'react';

import { Tag } from '@navikt/ds-react';

import { Datoformat } from '../../utils/dato';
import { formaterIsoDato } from '../../utils/formatter';

interface IDødsfallTagProps {
    dødsfallDato: string;
}

const DødsfallTag: React.FC<IDødsfallTagProps> = ({ dødsfallDato }) => {
    const formatertDato = formaterIsoDato(dødsfallDato, Datoformat.DATO);
    return <Tag variant="neutral-filled">{`Død ${formatertDato}`}</Tag>;
};

export default DødsfallTag;
