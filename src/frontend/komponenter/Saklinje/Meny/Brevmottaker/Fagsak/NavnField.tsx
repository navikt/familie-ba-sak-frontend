import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import {
    BrevmottakerField,
    type BrevmottakerFormValues,
} from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/useBrevmottakerForm';
import { TextField } from '@navikt/ds-react';
import { BREVMOTTAKERTYPE_SOM_SKAL_PREUTFYLLES, erBrevmottakertype } from '@typer/brevmottaker';
import { useController, useFormContext } from 'react-hook-form';

export function NavnField() {
    const erLesevisning = useErLesevisningFagsak();

    const { control, watch } = useFormContext<BrevmottakerFormValues>();

    const {
        field: { name, ref, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: BrevmottakerField.NAVN,
        control,
        rules: {
            required: 'Navn er påkrevd.',
            maxLength: { value: 80, message: 'Maks 80 tegn.' },
        },
    });

    const brevmottakertype = watch(BrevmottakerField.BREVMOTTAKERTYPE);

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
