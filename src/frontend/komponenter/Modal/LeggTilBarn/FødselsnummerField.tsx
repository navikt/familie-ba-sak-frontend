import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';
import { idnr } from '@navikt/fnrvalidator';

import { Fields, type FormValues } from './useLeggTilBarnForm';
import { useMergedRef } from '../../../hooks/useMergedRef';
import type { IBarnMedOpplysninger } from '../../../typer/søknad';

function sjekkEr11Tall(verdi: string): boolean {
    return /^\d{11}$/.test(verdi.replace(' ', ''));
}

function sjekkErGyldigIdent(verdi: string): boolean {
    return idnr(verdi).status === 'valid';
}

interface Props {
    ref: React.Ref<HTMLInputElement | null>;
    barn: IBarnMedOpplysninger[];
}

export function FødselsnummerField({ ref, barn }: Props) {
    const { control } = useFormContext<FormValues>();

    const alleredeLagtTilFødslesnummer = barn.map(b => b.ident);

    const { field, fieldState, formState } = useController({
        name: Fields.FØDSELSNUMMER,
        control,
        rules: {
            validate: value => {
                if (!value) {
                    return 'Fødselsnummer eller D-nummer er påkrevd.';
                }
                if (alleredeLagtTilFødslesnummer.includes(value)) {
                    return 'Barnet er allerede lagt til.';
                }
                if (!sjekkEr11Tall(value)) {
                    return 'Fødselsnummer eller D-nummer er påkrevd har ikke 11 tall.';
                }
                if (!sjekkErGyldigIdent(value)) {
                    return 'Fødselsnummer eller D-nummer er ugyldig.';
                }
            },
        },
    });

    const mergedRef = useMergedRef(ref, field.ref);

    return (
        <TextField
            ref={mergedRef}
            label={'Fødselsnummer / D-nummer'}
            placeholder={'11 siffer'}
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={fieldState.error?.message}
            readOnly={formState.isSubmitting}
            disabled={formState.isSubmitting}
        />
    );
}
