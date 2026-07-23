import { konverterSkjemaverdiTilDesimal } from '@utils/eøs';
import { isEmpty, isNumeric } from '@utils/eøsValidators';
import { useController, useFormContext } from 'react-hook-form';

import { TextField } from '@navikt/ds-react';

import { UtenlandskPeriodeBeløpFelt, type UtenlandskPeriodeBeløpFormValues } from './useUtenlandskPeriodeBeløpSkjema';

const validerBeløp = (verdi: string | undefined): string | undefined => {
    if (!verdi || isEmpty(verdi) || typeof verdi != 'string') {
        return 'Beløp er påkrevd, men mangler input';
    }
    const nyttBeløp = konverterSkjemaverdiTilDesimal(verdi);
    if (!nyttBeløp) {
        return 'Beløp er påkrevd, men mangler input';
    }
    if (!isNumeric(nyttBeløp)) {
        return `Beløp innholder ugyldige verdier, beløp: ${verdi}`;
    }
    if (Number(nyttBeløp) < 0) {
        return `Kan ikke registrere negativt utbetalt beløp: ${verdi}`;
    }
    return undefined;
};

interface Props {
    readOnly: boolean;
}

export function UtenlandskPeriodeBeløpBeløpFelt({ readOnly }: Props) {
    const { control } = useFormContext<UtenlandskPeriodeBeløpFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: UtenlandskPeriodeBeløpFelt.BELØP,
        control,
        rules: {
            validate: beløp => validerBeløp(beløp),
        },
    });

    return (
        <TextField
            label={'Beløp per barn'}
            readOnly={readOnly || isSubmitting}
            value={value ?? ''}
            onChange={event => onChange(event.target.value)}
            onBlur={onBlur}
            ref={ref}
            error={error?.message}
            size={'medium'}
        />
    );
}
