import { useState } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';
import { isoDatoPeriodeTilFormatertString } from '@utils/dato';

import { Table } from '@navikt/ds-react';

import { RefusjonEøsForm } from './form/RefusjonEøsForm';
import { Type } from './form/useRefusjonEøsForm';
import { SlettRefusjonEøs } from './SlettRefusjonEøs';
import { useSlettRefusjonEøsIsPending } from './useSlettRefusjonEøsIsPending';

interface Props {
    refusjonEøs: IRestRefusjonEøs;
}

export function RefusjonEøsRad({ refusjonEøs }: Props) {
    const erLesevisning = useErLesevisning();

    const slettRefusjonEøsIsPending = useSlettRefusjonEøsIsPending({ refusjonEøsId: refusjonEøs.id });

    const [erRadEkspandert, settErRadEkspandert] = useState<boolean>(false);

    return (
        <Table.ExpandableRow
            open={erRadEkspandert}
            onOpenChange={() => settErRadEkspandert(prev => !prev)}
            content={
                <RefusjonEøsForm
                    key={`${refusjonEøs.id}-$${erRadEkspandert ? 'ekspandert' : 'lukket'}`} // Pga. rhf reset ikke funker for MonthPicker
                    type={Type.OPPDATER}
                    refusjonEøs={refusjonEøs}
                    skjulForm={() => settErRadEkspandert(false)}
                    readOnly={erLesevisning || slettRefusjonEøsIsPending}
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
