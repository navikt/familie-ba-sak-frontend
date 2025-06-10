import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { ToggleNavn } from '../../../../../../backend/frontend/typer/toggles';
import { useAppContext } from '../../../../context/AppContext';
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
    {
        value: FagsakType.SKJERMET_BARN,
        label: 'Skjermet barn',
    },
];

interface Props {
    readOnly: boolean;
}

export function FagsaktypeFelt({ readOnly }: Props) {
    const { control, setValue, resetField } = useFormContext<OpprettFagsakFormValues>();

    const { field, fieldState, formState } = useController({
        name: OpprettFagsakFeltnavn.FAGSAKTYPE,
        control,
        rules: { required: `Fagsaktype er påkrevd.` },
    });

    const { harNormalFagsak } = useFagsakerContext();

    const { toggles } = useAppContext();

    const options = fagsakTypeOptions
        .filter(option => {
            if (option.value === FagsakType.SKJERMET_BARN) {
                return toggles[ToggleNavn.tillattBehandlingAvSkjermetBarn];
            }
            return true;
        })
        .filter(option => (harNormalFagsak ? option.value !== FagsakType.NORMAL : true));

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
                if (value !== FagsakType.SKJERMET_BARN) {
                    resetField(OpprettFagsakFeltnavn.SKJERMET_BARN_SØKER);
                }
                field.onChange(value);
            }}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting || readOnly}
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
