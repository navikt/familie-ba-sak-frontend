import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { ComboboxOption } from '@navikt/ds-react/cjs/form/combobox/types';

import { lagPersonLabel } from '../../../../../../../utils/formatter';
import { useBehandlingContext } from '../../../../context/BehandlingContext';
import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndelRHF';

export const Personvelger = ({ erLesevisning }: StandardFeltProps) => {
    const { behandling } = useBehandlingContext();
    const { control, getValues } = useFormContext<EndretUtbetalingAndelFormValues>();

    const tilgjengeligePersoner: ComboboxOption[] = behandling.personer
        .filter(person =>
            behandling.personerMedAndelerTilkjentYtelse
                .map(personMedAndeler => personMedAndeler.personIdent)
                .includes(person.personIdent)
        )
        .map(person => ({
            value: person.personIdent,
            label: lagPersonLabel(person.personIdent, behandling.personer),
        }));

    return (
        <Controller
            name={EndretUtbetalingAndelFeltnavn.PERSONER}
            control={control}
            rules={{ required: 'Du må velge minst én person' }}
            render={({
                field: { value, onChange, onBlur, ref },
                fieldState: { error },
                formState: { isSubmitting },
            }) => {
                const onToggleSelected = (optionValue: string, isSelected: boolean) => {
                    const valgtePersoner = getValues(EndretUtbetalingAndelFeltnavn.PERSONER);
                    const oppdatertePersoner = isSelected
                        ? [...valgtePersoner, tilgjengeligePersoner.find(p => p.value === optionValue)]
                        : valgtePersoner.filter(p => p.value !== optionValue);
                    onChange(oppdatertePersoner);
                };

                return (
                    <UNSAFE_Combobox
                        isMultiSelect
                        label={'Velg hvem det gjelder'}
                        options={tilgjengeligePersoner}
                        selectedOptions={value}
                        onToggleSelected={onToggleSelected}
                        onBlur={onBlur}
                        ref={ref}
                        readOnly={erLesevisning || isSubmitting}
                        error={error?.message}
                    />
                );
            }}
        />
    );
};
