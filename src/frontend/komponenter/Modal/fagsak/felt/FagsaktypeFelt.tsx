import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { useAppContext } from '../../../../context/AppContext';
import { useAuthContext } from '../../../../context/AuthContext';
import { FagsakType } from '../../../../typer/fagsak';
import { ToggleNavn } from '../../../../typer/toggles';
import { erProd } from '../../../../utils/miljø';
import { useFagsakerContext } from '../context/FagsakerContext';
import { OpprettFagsakFeltnavn, type OpprettFagsakFormValues } from '../form/OpprettFagsakForm';

const SKJERMET_BARN_GRUPPE = {
    PROD: 'ad7b87a6-9180-467c-affc-20a566b0fec0',
    DEV: '5ef775f2-61f8-4283-bf3d-8d03f428aa14',
};

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
    const { innloggetSaksbehandler } = useAuthContext();
    const { toggles } = useAppContext();
    const { harNormalFagsak, harBarnEnsligMindreårigFagsak } = useFagsakerContext();

    const { control, setValue, resetField } = useFormContext<OpprettFagsakFormValues>();

    const { field, fieldState, formState } = useController({
        name: OpprettFagsakFeltnavn.FAGSAKTYPE,
        control,
        rules: { required: `Fagsaktype er påkrevd.` },
    });

    const options = fagsakTypeOptions
        .filter(option => {
            if (option.value === FagsakType.SKJERMET_BARN) {
                const groups = innloggetSaksbehandler?.groups ?? [];
                const aktuellGruppe = erProd()
                    ? SKJERMET_BARN_GRUPPE.PROD
                    : SKJERMET_BARN_GRUPPE.DEV;
                const harTilgang = groups.some(group => group === aktuellGruppe);
                return harTilgang && toggles[ToggleNavn.tillattBehandlingAvSkjermetBarn];
            }
            return true;
        })
        .filter(option => (harNormalFagsak ? option.value !== FagsakType.NORMAL : true))
        .filter(option =>
            harBarnEnsligMindreårigFagsak
                ? option.value !== FagsakType.BARN_ENSLIG_MINDREÅRIG
                : true
        );

    return (
        <Select
            label={'Fagsaktype'}
            size={'small'}
            name={field.name}
            value={field.value}
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
