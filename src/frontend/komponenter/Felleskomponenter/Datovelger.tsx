import * as React from 'react';
import { useState } from 'react';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

interface IProps {
    felt: Felt<Date | undefined>;
    label: string;
    skjemaSkalViseFeilmelding: boolean;
}

enum Feilmelding {
    UGYDLIG_DATO = 'UGYDLIG_DATO',
}

const feilmeldinger: Record<Feilmelding, string> = {
    UGYDLIG_DATO: 'Du må velge en gyldig dato',
};

const Datovelger = ({ felt, label, skjemaSkalViseFeilmelding }: IProps) => {
    const [error, setError] = useState<Feilmelding | undefined>(undefined);
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: felt.verdi,
        onDateChange: (dato?: Date) => {
            felt.validerOgSettFelt(dato);
        },
        onValidate: val => {
            if (!val.isValidDate && error !== Feilmelding.UGYDLIG_DATO) {
                felt.nullstill();
                setError(Feilmelding.UGYDLIG_DATO);
            }
            if (val.isValidDate) {
                setError(undefined);
            }
        },
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                label={label}
                {...inputProps}
                error={
                    error && skjemaSkalViseFeilmelding
                        ? feilmeldinger[error]
                        : felt.hentNavBaseSkjemaProps(skjemaSkalViseFeilmelding).error
                }
            />
        </DatePicker>
    );
};

export default Datovelger;
