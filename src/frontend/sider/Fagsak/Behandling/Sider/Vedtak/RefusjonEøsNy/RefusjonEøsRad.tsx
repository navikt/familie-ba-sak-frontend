import { useState } from 'react';

import { Table } from '@navikt/ds-react';

import { RefusjonEøsForm } from './form/RefusjonEøsForm';
import { Type } from './form/useRefusjonEøsForm';
import { useSlettRefusjonEøsIsPending } from './form/useSlettRefusjonEøsIsPending';
import { SlettRefusjonEøs } from './SlettRefusjonEøs';
import type { IRestRefusjonEøs } from '../../../../../../typer/refusjon-eøs';
import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface Props {
    refusjonEøs: IRestRefusjonEøs;
}

export function RefusjonEøsRad({ refusjonEøs }: Props) {
    const { vurderErLesevisning } = useBehandlingContext();

    const slettRefusjonEøsIsPending = useSlettRefusjonEøsIsPending({ refusjonEøsId: refusjonEøs.id });

    const [erRadEkspandert, settErRadEkspandert] = useState<boolean>(false);

    const readOnly = vurderErLesevisning() || slettRefusjonEøsIsPending;

    return (
        <Table.ExpandableRow
            open={erRadEkspandert}
            onOpenChange={() => settErRadEkspandert(prev => !prev)}
            content={
                <RefusjonEøsForm
                    type={Type.OPPDATER}
                    refusjonEøs={refusjonEøs}
                    skjulForm={() => settErRadEkspandert(false)}
                    readOnly={readOnly}
                />
            }
        >
            <Table.DataCell scope={'row'}>
                {isoDatoPeriodeTilFormatertString({
                    fom: refusjonEøs.fom,
                    tom: refusjonEøs.tom,
                })}
            </Table.DataCell>
            <Table.DataCell align={'right'}>{refusjonEøs.refusjonsbeløp} kr/mnd</Table.DataCell>
            <Table.DataCell align={'center'}>
                <SlettRefusjonEøs refusjonEøsId={refusjonEøs.id} />
            </Table.DataCell>
        </Table.ExpandableRow>
    );
}
