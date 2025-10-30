import * as React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Heading, Radio, RadioGroup } from '@navikt/ds-react';

import { Fields, type FormValues } from './useRegistrerSøknadForm';
import { behandlingUnderkategori, BehandlingUnderkategori } from '../../../../../typer/behandlingstema';
import { useBehandlingContext } from '../../context/BehandlingContext';

function Legend() {
    return (
        <Heading size={'medium'} level={'2'}>
            Hva har bruker søkt om?
        </Heading>
    );
}

export function UnderkategoriField() {
    const { vurderErLesevisning } = useBehandlingContext();

    const { control } = useFormContext<FormValues>();

    const { field, fieldState, formState } = useController({
        name: Fields.UNDERKATEGORI,
        control,
        rules: { required: 'Underkategori er påkrevd.' },
    });

    const erLesevisning = vurderErLesevisning();

    return (
        <RadioGroup
            id={Fields.UNDERKATEGORI}
            ref={field.ref}
            legend={<Legend />}
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={fieldState.error?.message}
            readOnly={erLesevisning || formState.isSubmitting}
        >
            <Radio value={BehandlingUnderkategori.ORDINÆR}>
                {behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
            </Radio>
            <Radio value={BehandlingUnderkategori.UTVIDET}>
                {behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
            </Radio>
        </RadioGroup>
    );
}
