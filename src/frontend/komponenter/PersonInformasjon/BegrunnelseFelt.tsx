import * as React from 'react';

import { useFormContext } from 'react-hook-form';

import { Textarea } from '@navikt/ds-react';

import { RegistrerDødsfallDatoFelt, type RegistrerDødsfallDatoFormValues } from './useRegistrerDødsfallDatoSkjema';

interface Props {
    erLesevisning: boolean;
}

export function BegrunnelseFelt({ erLesevisning }: Props) {
    const {
        register,
        formState: { isSubmitting, errors },
    } = useFormContext<RegistrerDødsfallDatoFormValues>();

    return (
        <Textarea
            {...register(RegistrerDødsfallDatoFelt.BEGRUNNELSE, {
                required: 'Begrunnelse for manuell registrering av dødsfall er påkrevd.',
            })}
            error={errors.begrunnelse?.message}
            id={'manuell-dødsdato-begrunnelse'}
            label={'Begrunnelse'}
            disabled={isSubmitting}
            readOnly={isSubmitting || erLesevisning}
        />
    );
}
