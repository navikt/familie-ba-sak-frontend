import { TextField } from '@navikt/ds-react';
import { konverterSkjemaverdiTilDesimal } from '@utils/eøs';
import { isEmpty, isNumeric, tellAntallDesimaler } from '@utils/eøsValidators';
import { useController, useFormContext } from 'react-hook-form';

import { ValutakursFelt, type ValutakursFormValues } from './useValutakursSkjema';

const validerKurs = (verdi: string | undefined): string | undefined => {
    if (!verdi || isEmpty(verdi) || typeof verdi != 'string') {
        return 'Valutakurs er påkrevd, men mangler input';
    }
    const nyKurs = konverterSkjemaverdiTilDesimal(verdi);
    if (!nyKurs) {
        return 'Valutakurs er påkrevd, men mangler input';
    }
    if (!isNumeric(nyKurs)) {
        return `Valutakurs innholder ugyldige verdier, kurs: ${verdi}`;
    }
    if (tellAntallDesimaler(nyKurs) === 0) {
        return `Valutakurs må oppgis med desimaler, kurs: ${verdi}`;
    }
    if (Number(nyKurs) < 0) {
        return `Kan ikke registrere negativt kurs: ${verdi}`;
    }
    return undefined;
};

interface Props {
    readOnly: boolean;
    erManuellInputAvKurs: boolean;
}

export function ValutakursKursFelt({ readOnly, erManuellInputAvKurs }: Props) {
    const { control } = useFormContext<ValutakursFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: ValutakursFelt.KURS,
        control,
        rules: {
            validate: kurs => (erManuellInputAvKurs ? validerKurs(kurs) : undefined),
        },
    });

    return (
        <TextField
            label={'Valutakurs'}
            readOnly={readOnly || isSubmitting}
            value={value ?? ''}
            onChange={event => onChange(event.target.value)}
            onBlur={onBlur}
            ref={ref}
            error={error?.message}
        />
    );
}
