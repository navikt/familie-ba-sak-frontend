import { useState } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';
import { isoDatoPeriodeTilFormatertString } from '@utils/dato';

import { Table } from '@navikt/ds-react';

import { FeilutbetaltValutaForm } from './form/FeilutbetaltValutaForm';
import { Type } from './form/useFeilutbetaltValutaForm';
import { SlettFeilutbetaltValuta } from './SlettFeilutbetaltValuta';
import { useSlettFeilutbetaltValutaIsPending } from './useSlettFeilutbetaltValutaIsPending';

interface Props {
    feilutbetaltValuta: IRestFeilutbetaltValuta;
}

export function FeilutbetaltValutaRad({ feilutbetaltValuta }: Props) {
    const erLesevisning = useErLesevisning();

    const slettFeilutbetaltValutaIsPending = useSlettFeilutbetaltValutaIsPending({
        feilutbetaltValutaId: feilutbetaltValuta.id,
    });

    const [erRadEkspandert, settErRadEkspandert] = useState<boolean>(false);

    return (
        <Table.ExpandableRow
            open={erRadEkspandert}
            onOpenChange={() => settErRadEkspandert(prev => !prev)}
            content={
                <FeilutbetaltValutaForm
                    key={`${feilutbetaltValuta.id}-$${erRadEkspandert ? 'ekspandert' : 'lukket'}`} // Pga. rhf reset ikke funker for MonthPicker
                    type={Type.OPPDATER}
                    feilutbetaltValuta={feilutbetaltValuta}
                    skjulForm={() => settErRadEkspandert(false)}
                    readOnly={erLesevisning || slettFeilutbetaltValutaIsPending}
                />
            }
        >
            <Table.DataCell scope={'row'}>
                {isoDatoPeriodeTilFormatertString({
                    fom: feilutbetaltValuta.fom,
                    tom: feilutbetaltValuta.tom,
                })}
            </Table.DataCell>
            <Table.DataCell align={'right'}>{feilutbetaltValuta.feilutbetaltBeløp} kr</Table.DataCell>
            <Table.DataCell align={'center'}>
                <SlettFeilutbetaltValuta feilutbetaltValutaId={feilutbetaltValuta.id} />
            </Table.DataCell>
        </Table.ExpandableRow>
    );
}
