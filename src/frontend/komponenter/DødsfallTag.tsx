import { Tag } from '@navikt/ds-react';

import { Datoformat, isoStringTilFormatertString } from '../utils/dato';

interface IDødsfallTagProps {
    dødsfallDato: string;
}

const DødsfallTag = ({ dødsfallDato }: IDødsfallTagProps) => {
    const formatertDato = isoStringTilFormatertString({
        isoString: dødsfallDato,
        tilFormat: Datoformat.DATO,
    });
    return <Tag variant="neutral-filled" size="small">{`Død ${formatertDato}`}</Tag>;
};

export default DødsfallTag;
