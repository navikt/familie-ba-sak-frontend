import { Table } from '@navikt/ds-react';

import { RefusjonEøsForm } from './form/RefusjonEøsForm';
import { Type } from './form/useRefusjonEøsForm';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface Props {
    skjulForm: () => void;
}

export function LeggTilRefusjonEøs({ skjulForm }: Props) {
    const { vurderErLesevisning } = useBehandlingContext();

    const readOnly = vurderErLesevisning();

    return (
        <Table.ExpandableRow
            open={true}
            content={<RefusjonEøsForm type={Type.OPPRETT} skjulForm={() => skjulForm()} readOnly={readOnly} />}
        />
    );
}
