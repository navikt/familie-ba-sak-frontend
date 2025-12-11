import * as React from 'react';
import { useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import { Label, VStack } from '@navikt/ds-react';

import type { IBehandling } from '../../../../../../../typer/behandling';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';
import Månedvelger from './Månedvelger';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../../typer/utbetalingAndel';
import { useBehandlingContext } from '../../../../context/BehandlingContext';

export function utledTidligsteOgSenesteDato(
    åpenBehandling: IBehandling,
    valgtePersoner: string[],
    årsak: IEndretUtbetalingAndelÅrsak | ''
) {
    const ikkeSenereEnnInneværendeMåned = årsak === IEndretUtbetalingAndelÅrsak.ALLEREDE_UTBETALT;

    const andeler = åpenBehandling.personerMedAndelerTilkjentYtelse.filter(
        p => valgtePersoner.length === 0 || valgtePersoner.includes(p.personIdent)
    );

    const tidligsteAndelFom = Math.min(...andeler.map(a => new Date(a.stønadFom).getTime()));
    const senesteAndelTom = Math.max(...andeler.map(a => new Date(a.stønadTom).getTime()));

    const inneværendeMåned = new Date().getTime();
    const tidligsteDato = !ikkeSenereEnnInneværendeMåned
        ? new Date(tidligsteAndelFom)
        : new Date(Math.min(tidligsteAndelFom, inneværendeMåned));

    const senesteDato = !ikkeSenereEnnInneværendeMåned
        ? new Date(senesteAndelTom)
        : new Date(Math.min(senesteAndelTom, inneværendeMåned));
    return { tidligsteDato, senesteDato };
}

const Månedperiodevelger = ({ erLesevisning }: StandardFeltProps) => {
    const { behandling } = useBehandlingContext();
    const { watch } = useFormContext<EndretUtbetalingAndelFormValues>();

    const valgtePersoner = watch(EndretUtbetalingAndelFeltnavn.PERSONER).map(p => p.value);
    const årsak = watch(EndretUtbetalingAndelFeltnavn.ÅRSAK);
    const valgfriTomDato = årsak === IEndretUtbetalingAndelÅrsak.ENDRE_MOTTAKER;

    const { tidligsteDato, senesteDato } = useMemo(
        () => utledTidligsteOgSenesteDato(behandling, valgtePersoner, årsak),
        [behandling, valgtePersoner, årsak]
    );

    return (
        <VStack gap="2">
            <Label>Fastsett periode</Label>
            <Månedvelger
                name={EndretUtbetalingAndelFeltnavn.FOM}
                label="F.o.m"
                erLesevisning={erLesevisning}
                tidligsteDato={tidligsteDato}
                senesteDato={senesteDato}
            />

            <Månedvelger
                name={EndretUtbetalingAndelFeltnavn.TOM}
                label={'T.o.m' + (valgfriTomDato ? ' (valgfri)' : '')}
                erLesevisning={erLesevisning}
                tidligsteDato={tidligsteDato}
                senesteDato={senesteDato}
                valgfri={valgfriTomDato}
            />
        </VStack>
    );
};

export default Månedperiodevelger;
