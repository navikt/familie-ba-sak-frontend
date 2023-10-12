import * as React from 'react';
import { useState } from 'react';

import { format } from 'date-fns';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { dagensDato, tidenesEnde, tidenesMorgen } from '../../utils/dato';
import { Datoformat } from '../../utils/formatter';

interface IProps {
    felt: Felt<Date | undefined>;
    label: string;
    visFeilmeldinger: boolean;
    minDatoAvgrensning?: Date;
    maksDatoAvgrensning?: Date;
    avgrensDatoFremITid?: boolean;
    avgrensDatoTilbakeITid?: boolean;
    datoMåFyllesUt?: boolean;
}

enum Feilmelding {
    UGYDLIG_DATO = 'UGYDLIG_DATO',
    FØR_MIN_DATO = 'FØR_MIN_DATO',
    ETTER_MAKS_DATO = 'ETTER_MAKS_DATO',
}

const Datovelger = ({
    felt,
    label,
    visFeilmeldinger,
    minDatoAvgrensning,
    maksDatoAvgrensning,
    avgrensDatoFremITid = false,
    avgrensDatoTilbakeITid = false,
    datoMåFyllesUt = true,
}: IProps) => {
    const [error, setError] = useState<Feilmelding | undefined>(undefined);

    const hentToDate = () => {
        if (maksDatoAvgrensning) return maksDatoAvgrensning;
        if (avgrensDatoFremITid) return dagensDato();
        return tidenesEnde();
    };

    const hentFromDate = () => {
        if (minDatoAvgrensning) return minDatoAvgrensning;
        if (avgrensDatoTilbakeITid) return dagensDato();
        return tidenesMorgen();
    };

    const nullstillOgSettFeilmelding = (feilmelding: Feilmelding) => {
        if (error !== feilmelding) {
            setError(feilmelding);
            felt.nullstill();
        }
    };

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: felt.verdi,
        onDateChange: (dato?: Date) => {
            felt.validerOgSettFelt(dato);
        },
        fromDate: hentFromDate(),
        toDate: hentToDate(),
        onValidate: val => {
            if (val.isEmpty && !datoMåFyllesUt) {
                felt.nullstill();
                setError(undefined);
            } else if (val.isBefore) {
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

    const feilmeldingForDatoFørMinDato = () => {
        if (avgrensDatoTilbakeITid) {
            return 'Du kan ikke sette en dato som er tilbake i tid';
        }
        return `Du må velge en dato som er senere enn eller lik ${
            minDatoAvgrensning ? format(minDatoAvgrensning, Datoformat.DATO) : ''
        }`;
    };
    const feilmeldingForDatoEtterMaksDato = () => {
        if (avgrensDatoFremITid) {
            return 'Du kan ikke sette en dato som er frem i tid';
        }
        return `Du må velge en dato som er tidligere enn eller lik ${
            maksDatoAvgrensning ? format(maksDatoAvgrensning, Datoformat.DATO) : ''
        }`;
    };

    const feilmeldinger: Record<Feilmelding, string> = {
        UGYDLIG_DATO: 'Du må velge en gyldig dato',
        FØR_MIN_DATO: feilmeldingForDatoFørMinDato(),
        ETTER_MAKS_DATO: feilmeldingForDatoEtterMaksDato(),
    };

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                label={label}
                {...inputProps}
                error={
                    error && visFeilmeldinger
                        ? feilmeldinger[error]
                        : felt.hentNavBaseSkjemaProps(visFeilmeldinger).error
                }
            />
        </DatePicker>
    );
};

export default Datovelger;
