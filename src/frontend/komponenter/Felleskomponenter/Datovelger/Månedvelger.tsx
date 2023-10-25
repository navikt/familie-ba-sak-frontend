import * as React from 'react';
import { useEffect, useState } from 'react';

import { endOfMonth, isAfter, isSameDay, startOfDay, startOfMonth } from 'date-fns';

import { MonthPicker, useMonthpicker } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { dagensDato, formatterDate } from '../../../utils/dato';
import { Datoformat } from '../../../utils/formatter';

interface IProps {
    felt: Felt<Date | undefined>;
    label: string;
    readOnly?: boolean;
    visFeilmeldinger: boolean;
    kanKunVelgeFortid?: boolean;
    kanKunVelgeFremtid?: boolean;
    dagIMåneden: DagIMåneden;
    tilhørendeFomFelt?: Felt<Date | undefined>;
}

enum Feilmelding {
    UGYDLIG_DATO = 'UGYDLIG_DATO',
    FØR_MIN_DATO = 'FØR_MIN_DATO',
    ETTER_MAKS_DATO = 'ETTER_MAKS_DATO',
}

export enum DagIMåneden {
    FØRSTE_DAG = 'FØRSTE_DAG',
    SISTE_DAG = 'SISTE_DAG',
}

const tidligsteRelevanteDato = () => startOfDay(new Date(1900, 0));

const senesteRelevanteDato = () => startOfDay(new Date(2500, 0));

const Månedvelger = ({
    felt,
    label,
    visFeilmeldinger,
    dagIMåneden,
    readOnly = false,
    kanKunVelgeFremtid = false,
    kanKunVelgeFortid = false,
    tilhørendeFomFelt,
}: IProps) => {
    const [error, setError] = useState<Feilmelding | undefined>();

    const hentFromDate = () => {
        if (tilhørendeFomFelt?.verdi !== undefined) return tilhørendeFomFelt.verdi;
        if (kanKunVelgeFremtid) return dagensDato();
        return tidligsteRelevanteDato();
    };

    const hentToDate = () => {
        if (kanKunVelgeFortid) return dagensDato();
        return senesteRelevanteDato();
    };

    const nullstillOgSettFeilmelding = (feilmelding: Feilmelding) => {
        if (error !== feilmelding) {
            setError(feilmelding);
            felt.nullstill();
        }
    };

    const { monthpickerProps, inputProps, selectedMonth } = useMonthpicker({
        defaultSelected: felt.verdi,
        onMonthChange: (dato?: Date) => {
            if (dato === undefined) felt.nullstill();
            else {
                if (dagIMåneden === DagIMåneden.FØRSTE_DAG) {
                    felt.validerOgSettFelt(startOfMonth(dato));
                } else if (dagIMåneden === DagIMåneden.SISTE_DAG) {
                    felt.validerOgSettFelt(endOfMonth(dato));
                } else felt.validerOgSettFelt(dato);
            }
        },
        fromDate: hentFromDate(),
        toDate: hentToDate(),
        onValidate: val => {
            if (val.isBefore) {
                nullstillOgSettFeilmelding(Feilmelding.FØR_MIN_DATO);
            } else if (val.isAfter) {
                nullstillOgSettFeilmelding(Feilmelding.ETTER_MAKS_DATO);
            } else if (!val.isValidMonth) {
                nullstillOgSettFeilmelding(Feilmelding.UGYDLIG_DATO);
            } else {
                setError(undefined);
            }
        },
    });

    useEffect(() => {
        if (
            tilhørendeFomFelt?.verdi &&
            selectedMonth &&
            isAfter(tilhørendeFomFelt.verdi, selectedMonth)
        ) {
            nullstillOgSettFeilmelding(Feilmelding.FØR_MIN_DATO);
        } else {
            setError(undefined);
            felt.validerOgSettFelt(selectedMonth);
        }
    }, [tilhørendeFomFelt?.verdi]);

    const feilmeldingForDatoFørMinDato = () => {
        const tidligsteFraDato = hentFromDate();

        if (isSameDay(tidligsteFraDato, dagensDato())) {
            return 'Du kan ikke sette en måned som er tilbake i tid';
        }
        if (tilhørendeFomFelt?.verdi && isSameDay(tidligsteFraDato, tilhørendeFomFelt?.verdi)) {
            return `Du må velge en måned som er ${formatterDate({
                dato: tilhørendeFomFelt.verdi,
                datoformat: Datoformat.MÅNED_ÅR_NAVN,
            })} eller senere`;
        }

        return `Du må velge en måned som er senere enn ${formatterDate({
            dato: tidligsteFraDato,
            datoformat: Datoformat.MÅNED_ÅR_NAVN,
        })}`;
    };

    const feilmeldingForDatoFørMaksDato = () => {
        if (kanKunVelgeFortid) {
            return 'Du kan ikke sette en måned som er frem i tid';
        }
        const senesteDato = hentToDate();
        return `Du må velge en måned som er tidligere enn ${formatterDate({
            dato: senesteDato,
            datoformat: Datoformat.MÅNED_ÅR_NAVN,
        })}`;
    };

    const feilmeldinger: Record<Feilmelding, string> = {
        UGYDLIG_DATO: 'Du må velge en gyldig måned',
        FØR_MIN_DATO: feilmeldingForDatoFørMinDato(),
        ETTER_MAKS_DATO: feilmeldingForDatoFørMaksDato(),
    };

    return (
        <div>
            <MonthPicker {...monthpickerProps} dropdownCaption>
                <MonthPicker.Input
                    {...inputProps}
                    label={label}
                    readOnly={readOnly}
                    error={
                        error && visFeilmeldinger
                            ? feilmeldinger[error]
                            : felt.hentNavBaseSkjemaProps(visFeilmeldinger).error
                    }
                />
            </MonthPicker>
        </div>
    );
};

export default Månedvelger;
