import React from 'react';

import { Tag } from '@navikt/ds-react';

import { datoformat, formaterIsoDato } from '../../utils/formatter';

interface IDødsfallTagProps {
    dødsfallDato: string;
}

const DødsfallTag: React.FC<IDødsfallTagProps> = ({ dødsfallDato }) => {
    const formatertDato = formaterIsoDato(dødsfallDato, datoformat.DATO);
    return <Tag variant="neutral-filled">{`Død ${formatertDato}`}</Tag>;
};

export default DødsfallTag;
