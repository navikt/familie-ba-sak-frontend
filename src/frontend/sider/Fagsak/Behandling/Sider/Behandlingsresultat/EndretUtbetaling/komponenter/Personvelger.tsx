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

const Personvelger = ({ erLesevisning }: StandardFeltProps) => {
    const { behandling } = useBehandlingContext();
    const { control, watch } = useFormContext<EndretUtbetalingAndelFormValues>();

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
            render={({ field, fieldState, formState }) => {
                const onToggleSelected = (optionValue: string, isSelected: boolean) => {
                    const valgtePersoner = watch(EndretUtbetalingAndelFeltnavn.PERSONER);
                    const oppdatertePersoner = isSelected
                        ? [...valgtePersoner, tilgjengeligePersoner.find(p => p.value === optionValue)]
                        : valgtePersoner.filter(p => p.value !== optionValue);
                    field.onChange(oppdatertePersoner);
                };

                return (
                    <UNSAFE_Combobox
                        isMultiSelect
                        label={'Velg hvem det gjelder'}
                        options={tilgjengeligePersoner}
                        selectedOptions={field.value}
                        onToggleSelected={onToggleSelected}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        readOnly={erLesevisning || formState.isSubmitting}
                        error={fieldState.error?.message}
                    />
                );
            }}
        />
    );
};

export default Personvelger;
