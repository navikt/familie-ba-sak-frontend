import * as React from 'react';
import { useState } from 'react';

import { format } from 'date-fns';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { tidenesEnde, tidenesMorgen } from '../../utils/dato';
import { Datoformat } from '../../utils/formatter';

interface IProps {
    felt: Felt<Date | undefined>;
    label: string;
    skjemaSkalViseFeilmelding: boolean;
    minDatoAvgrensning?: Date;
    maksDatoAvgrensning?: Date;
}

enum Feilmelding {
    UGYDLIG_DATO = 'UGYDLIG_DATO',
    FØR_MIN_DATO = 'FØR_MIN_DATO',
    ETTER_MAKS_DATO = 'ETTER_MAKS_DATO',
}

const Datovelger = ({
    felt,
    label,
    skjemaSkalViseFeilmelding,
    minDatoAvgrensning,
    maksDatoAvgrensning,
}: IProps) => {
    const [error, setError] = useState<Feilmelding | undefined>(undefined);
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: felt.verdi,
        onDateChange: (dato?: Date) => {
            felt.validerOgSettFelt(dato);
        },
        fromDate: minDatoAvgrensning ?? tidenesMorgen(),
        toDate: maksDatoAvgrensning ?? tidenesEnde(),
        onValidate: val => {
            if (val.isBefore) {
                nullstillOgSettFeilmelding(Feilmelding.FØR_MIN_DATO);
            } else if (val.isAfter) {
                nullstillOgSettFeilmelding(Feilmelding.ETTER_MAKS_DATO);
            } else if (!val.isValidDate) {
                nullstillOgSettFeilmelding(Feilmelding.UGYDLIG_DATO);
            } else {
                setError(undefined);
            }
        },
    });

    const feilmeldinger: Record<Feilmelding, string> = {
        UGYDLIG_DATO: 'Du må velge en gyldig dato',
        FØR_MIN_DATO: `Du må velge en dato som er senere enn eller lik ${
            minDatoAvgrensning ? format(minDatoAvgrensning, Datoformat.DATO) : ''
        }`,
        ETTER_MAKS_DATO: `Du må velge en dato som er tidligere enn eller lik ${
            maksDatoAvgrensning ? format(maksDatoAvgrensning, Datoformat.DATO) : ''
        }`,
    };

    const nullstillOgSettFeilmelding = (feilmelding: Feilmelding) => {
        if (error !== feilmelding) {
            setError(feilmelding);
            felt.nullstill();
        }
    };

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
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
