import * as React from 'react';
import { useState } from 'react';

import { addDays, format, subDays } from 'date-fns';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { senesteRelevanteDato, tidligsteRelevanteDato } from './utils';
import { dagensDato, Datoformat } from '../../../utils/dato';

interface IProps {
    felt: Felt<Date | undefined>;
    label: string;
    visFeilmeldinger: boolean;
    minDatoAvgrensning?: Date;
    maksDatoAvgrensning?: Date;
    kanKunVelgeFortid?: boolean;
    kanKunVelgeFremtid?: boolean;
    datoMåFyllesUt?: boolean;
    readOnly?: boolean;
    disableWeekends?: boolean;
}

export enum Feilmelding {
    UGYLDIG_DATO = 'UGYLDIG_DATO',
    FØR_MIN_DATO = 'FØR_MIN_DATO',
    ETTER_MAKS_DATO = 'ETTER_MAKS_DATO',
    HELG_ER_UGYLDIG = 'HELG_ER_UGYLDIG',
}

const Datovelger = ({
    felt,
    label,
    visFeilmeldinger,
    minDatoAvgrensning,
    maksDatoAvgrensning,
    kanKunVelgeFortid = false,
    kanKunVelgeFremtid = false,
    datoMåFyllesUt = true,
    readOnly = false,
    disableWeekends = false,
}: IProps) => {
    const [error, setError] = useState<Feilmelding | undefined>(undefined);

    const hentToDate = () => {
        if (maksDatoAvgrensning) return maksDatoAvgrensning;
        if (kanKunVelgeFortid) return dagensDato;
        return senesteRelevanteDato;
    };

    const hentFromDate = () => {
        if (minDatoAvgrensning) return minDatoAvgrensning;
        if (kanKunVelgeFremtid) return dagensDato;
        return tidligsteRelevanteDato;
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
        disableWeekends: disableWeekends,
        openOnFocus: false,
        onValidate: val => {
            if (val.isEmpty && !datoMåFyllesUt) {
                felt.nullstill();
                setError(undefined);
            } else if (val.isBefore) {
                nullstillOgSettFeilmelding(Feilmelding.FØR_MIN_DATO);
            } else if (val.isAfter) {
                nullstillOgSettFeilmelding(Feilmelding.ETTER_MAKS_DATO);
            } else if (disableWeekends && val.isWeekend) {
                nullstillOgSettFeilmelding(Feilmelding.HELG_ER_UGYLDIG);
            } else if (!val.isValidDate) {
                nullstillOgSettFeilmelding(Feilmelding.UGYLDIG_DATO);
            } else {
                setError(undefined);
            }
        },
    });

    const feilmeldingForDatoFørMinDato = () => {
        if (kanKunVelgeFremtid) {
            return 'Du kan ikke sette en dato som er tilbake i tid';
        }
        const førsteUgyldigeDato = minDatoAvgrensning
            ? format(subDays(minDatoAvgrensning, 1), Datoformat.DATO)
            : '';
        return `Du må velge en dato som er senere enn ${førsteUgyldigeDato}`;
    };
    const feilmeldingForDatoEtterMaksDato = () => {
        if (kanKunVelgeFortid) {
            return 'Du kan ikke sette en dato som er frem i tid';
        }
        const førsteUgyldigeDato = maksDatoAvgrensning
            ? format(addDays(maksDatoAvgrensning, 1), Datoformat.DATO)
            : '';
        return `Du må velge en dato som er tidligere enn ${førsteUgyldigeDato}`;
    };

    const feilmeldinger: Record<Feilmelding, string> = {
        UGYLDIG_DATO: 'Du må velge en gyldig dato',
        FØR_MIN_DATO: feilmeldingForDatoFørMinDato(),
        ETTER_MAKS_DATO: feilmeldingForDatoEtterMaksDato(),
        HELG_ER_UGYLDIG: 'Du må velge en dato som er en ukedag',
    };

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={label}
                placeholder={'DD.MM.ÅÅÅÅ'}
                readOnly={readOnly}
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
