import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { FagsakType } from '../../../../typer/fagsak';
import { useFagsakerContext } from '../context/FagsakerContext';
import { OpprettFagsakFeltnavn, type OpprettFagsakFormValues } from '../form/OpprettFagsakForm';

const fagsakTypeOptions = [
    {
        value: FagsakType.NORMAL,
        label: 'Normal',
    },
    {
        value: FagsakType.INSTITUSJON,
        label: 'Institusjon',
    },
    {
        value: FagsakType.BARN_ENSLIG_MINDREÅRIG,
        label: 'Enslig mindreårig',
    },
];

export function FagsaktypeFelt() {
    const { control, setValue } = useFormContext<OpprettFagsakFormValues>();

    const { field, fieldState, formState } = useController({
        name: OpprettFagsakFeltnavn.FAGSAKTYPE,
        control,
        rules: {
            required: `Fagsaktype er påkrevd.`,
        },
    });

    const { harNormalFagsak } = useFagsakerContext();

    const options = fagsakTypeOptions.filter(valg =>
        harNormalFagsak ? valg.value !== FagsakType.NORMAL : true
    );

    return (
        <Select
            label={'Fagsaktype'}
            size={'small'}
            name={field.name}
            value={field.value ?? ''}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={event => {
                const value = event.target.value;
                if (value !== FagsakType.INSTITUSJON) {
                    setValue(OpprettFagsakFeltnavn.SAMHANDLER, null);
                }
                field.onChange(value);
            }}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting}
        >
            <option value={''}>-- Velg fagsaktype --</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
}
