import * as React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { Heading, Textarea } from '@navikt/ds-react';

import { Fields, type FormValues } from './useRegistrerSøknadForm';
import { useBehandlingContext } from '../../context/BehandlingContext';

export function AnnetField() {
    const { vurderErLesevisning } = useBehandlingContext();

    const {
        control,
        formState: { isDirty },
    } = useFormContext<FormValues>();

    const { field, fieldState, formState } = useController({
        name: Fields.ANNET,
        control,
        rules: {
            validate: value => {
                console.log(isDirty);
                if (!isDirty) {
                    return undefined;
                }
                if (!value || value.length === 0) {
                    return 'En begrunnelsen er påkrevd.';
                }
                if (value.length < 5) {
                    return 'En begrunnelsen må være på minst 5 tegn.';
                }
                return undefined;
            },
        },
    });

    const erLesevisning = vurderErLesevisning();

    return (
        <>
            <Textarea
                id={Fields.ANNET}
                ref={field.ref}
                label={<Heading size={'medium'} level={'2'} children={'Annet'} />}
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                description={!erLesevisning ? 'Ved endring av opplysningene er begrunnelse obligatorisk.' : ''}
                error={fieldState.error?.message}
                readOnly={formState.isSubmitting || erLesevisning}
                maxLength={2000}
            />
        </>
    );
}
