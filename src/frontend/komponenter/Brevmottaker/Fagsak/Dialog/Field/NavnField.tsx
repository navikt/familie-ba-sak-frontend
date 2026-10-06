import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { TextField } from '@navikt/ds-react';
import { BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES, erBrevmottakertype } from '@typer/brevmottaker';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { BrevmottakerField, type BrevmottakerFormValues } from '../useBrevmottakerForm';

export function NavnField() {
    const erLesevisning = useErLesevisningFagsak();

    const { control } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.NAVN,
        control,
        rules: {
            required: 'Navn er påkrevd.',
            maxLength: { value: 80, message: 'Navn kan ikke være mer enn 80 tegn.' },
            validate: value => value.trim() !== '' || 'Navn er påkrevd.',
        },
    });

    const brevmottakertype = useWatch({ control, name: BrevmottakerField.BREVMOTTAKERTYPE });

    const erNavnPreutfylt = erBrevmottakertype(brevmottakertype)
        ? BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES.includes(brevmottakertype)
        : false;

    return (
        <TextField
            name={name}
            ref={ref}
            label={'Navn'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={erLesevisning || isSubmitting || erNavnPreutfylt}
            error={error?.message}
        />
    );
}
