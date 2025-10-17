import * as React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Heading, Radio, RadioGroup } from '@navikt/ds-react';

import { Fields, type FormValues } from './useRegistrerSøknadForm';
import { målform, Målform } from '../../../../../typer/søknad';
import { useBehandlingContext } from '../../context/BehandlingContext';

const målformer = [Målform.NB, Målform.NN];

export function MålformField() {
    const { vurderErLesevisning } = useBehandlingContext();

    const { control } = useFormContext<FormValues>();

    const { field, fieldState, formState } = useController({
        name: Fields.MÅLFORM,
        control,
        rules: { required: 'Målform er påkrevd.' },
    });

    const erLesevisning = vurderErLesevisning();

    return (
        <RadioGroup
            id={Fields.MÅLFORM}
            ref={field.ref}
            legend={<Heading size={'medium'} level={'2'} children={'Målform'} />}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            readOnly={formState.isSubmitting || erLesevisning}
            error={fieldState.error?.message}
        >
            {målformer.map(m => (
                <Radio value={m} readOnly={formState.isSubmitting || erLesevisning}>
                    {målform[m]}
                </Radio>
            ))}
        </RadioGroup>
    );
}
