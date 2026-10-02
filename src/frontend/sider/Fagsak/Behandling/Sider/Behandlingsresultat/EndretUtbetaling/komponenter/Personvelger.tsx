import { useBehandling } from '@hooks/useBehandling';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { ComboboxOption } from '@typer/common';
import { lagPersonLabel } from '@utils/formatter';
import { useController, useFormContext } from 'react-hook-form';

import {
    EndretUtbetalingAndelFeltnavn,
    type EndretUtbetalingAndelFormValues,
    type StandardFeltProps,
} from '../useEndretUtbetalingAndel';

export const Personvelger = ({ erLesevisning }: StandardFeltProps) => {
    const behandling = useBehandling();

    const { control, getValues } = useFormContext<EndretUtbetalingAndelFormValues>();

    const { field, fieldState, formState } = useController({
        name: EndretUtbetalingAndelFeltnavn.PERSONER,
        control,
        rules: { required: 'Du må velge minst én person' },
    });

    const tilgjengeligePersoner: ComboboxOption[] = behandling.personer
        .filter(person =>
            behandling.personerMedAndelerTilkjentYtelse
                .map(personMedAndeler => personMedAndeler.personIdent)
                .includes(person.personIdent)
        )
        .filter(person => !person.skjermesForBruker)
        .map(person => ({
            value: person.personIdent,
            label: lagPersonLabel(person.personIdent, behandling.personer),
        }));

    const onToggleSelected = (optionValue: string, isSelected: boolean) => {
        const valgtePersoner = getValues(EndretUtbetalingAndelFeltnavn.PERSONER);
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
};
