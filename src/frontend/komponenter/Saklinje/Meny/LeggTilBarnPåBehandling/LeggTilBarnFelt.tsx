import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import {
    LeggTilBarnPåBehandlingFelt,
    type LeggTilBarnPåBehandlingFormValues,
} from './useLeggTilBarnPåBehandlingSkjema';

interface Props {
    erLesevisning: boolean;
}

export const LeggTilBarnFelt = ({ erLesevisning }: Props) => {
    const { control } = useFormContext<LeggTilBarnPåBehandlingFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: LeggTilBarnPåBehandlingFelt.BARNIDENT,
        control,
        rules: {
            required: 'Ident må oppgis.',
            // TODO: stemmer dette, eller finnes det noen identtyper der lengden ikke er 11?
            minLength: { value: 11, message: 'Ident må være på 11 siffer' },
            maxLength: { value: 11, message: 'Ident må være på 11 siffer' },
        },
    });

    return (
        <TextField
            label={'Fødselsnummer'}
            placeholder={'11 siffer'}
            value={value}
            onChange={event => {
                onChange(event.target.value);
            }}
            maxLength={11}
            error={error?.message}
            readOnly={erLesevisning || isSubmitting}
        />
    );
};
