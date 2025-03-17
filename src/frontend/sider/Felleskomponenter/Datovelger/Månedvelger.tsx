import * as React from 'react';
import { useState } from 'react';

import { endOfMonth, isBefore, isSameDay, startOfMonth } from 'date-fns';

import { MonthPicker, useMonthpicker } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { senesteRelevanteDato, tidligsteRelevanteDato } from './utils';
import { dagensDato, dateTilFormatertString, Datoformat } from '../../../utils/dato';

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

export enum DagIMåneden {
    FØRSTE_DAG = 'FØRSTE_DAG',
    SISTE_DAG = 'SISTE_DAG',
}

enum Feilmelding {
    UGYLDIG_DATO = 'UGYLDIG_DATO',
    FØR_MIN_DATO = 'FØR_MIN_DATO',
    ETTER_MAKS_DATO = 'ETTER_MAKS_DATO',
}

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
    const [forrigeTilhørendeFomVerdi, settforrigeTilhørendeFomVerdi] = useState(
        tilhørendeFomFelt?.verdi
    );

    const hentFromDate = () => {
        if (tilhørendeFomFelt?.verdi !== undefined) return tilhørendeFomFelt.verdi;
        if (kanKunVelgeFremtid) return dagensDato;
        return tidligsteRelevanteDato;
    };

    const hentToDate = () => {
        if (kanKunVelgeFortid) return dagensDato;
        return senesteRelevanteDato;
    };

    const nullstillOgSettFeilmelding = (feilmelding: Feilmelding) => {
        if (error !== feilmelding) {
            setError(feilmelding);
            felt.nullstill();
        }
    };

    const formatterTilRiktigDagIMåneden = (dato: Date): Date => {
        if (dagIMåneden === DagIMåneden.FØRSTE_DAG) return startOfMonth(dato);
        else if (dagIMåneden === DagIMåneden.SISTE_DAG) return endOfMonth(dato);
        else return dato;
    };

    const oppdaterFeltMedValgtDato = (dato?: Date) => {
        if (dato === undefined) felt.nullstill();
        else {
            felt.validerOgSettFelt(formatterTilRiktigDagIMåneden(dato));
        }
    };

    const { monthpickerProps, inputProps, selectedMonth } = useMonthpicker({
        defaultSelected: felt.verdi,
        onMonthChange: oppdaterFeltMedValgtDato,
        fromDate: hentFromDate(),
        toDate: hentToDate(),
        onValidate: val => {
            if (val.isBefore) {
                nullstillOgSettFeilmelding(Feilmelding.FØR_MIN_DATO);
            } else if (val.isAfter) {
                nullstillOgSettFeilmelding(Feilmelding.ETTER_MAKS_DATO);
            } else if (!val.isValidMonth) {
                nullstillOgSettFeilmelding(Feilmelding.UGYLDIG_DATO);
            } else {
                setError(undefined);
            }
        },
    });

    const valgtDatoErFørTilhørendeFom = () =>
        tilhørendeFomFelt?.verdi &&
        selectedMonth &&
        isBefore(formatterTilRiktigDagIMåneden(selectedMonth), tilhørendeFomFelt.verdi);

    if (forrigeTilhørendeFomVerdi !== tilhørendeFomFelt?.verdi) {
        settforrigeTilhørendeFomVerdi(tilhørendeFomFelt?.verdi);
        if (valgtDatoErFørTilhørendeFom()) {
            nullstillOgSettFeilmelding(Feilmelding.FØR_MIN_DATO);
        } else {
            setError(undefined);
            oppdaterFeltMedValgtDato(selectedMonth);
        }
    }

    const feilmeldingForDatoFørMinDato = () => {
        const tidligsteFraDato = hentFromDate();

        if (isSameDay(tidligsteFraDato, dagensDato)) {
            return 'Du kan ikke sette en måned som er tilbake i tid';
        }
        if (tilhørendeFomFelt?.verdi && isSameDay(tidligsteFraDato, tilhørendeFomFelt?.verdi)) {
            return `Du må velge en måned som er ${dateTilFormatertString({
                date: tilhørendeFomFelt.verdi,
                tilFormat: Datoformat.MÅNED_ÅR_NAVN,
            })} eller senere`;
        }

        return `Du må velge en måned som er senere enn ${dateTilFormatertString({
            date: tidligsteFraDato,
            tilFormat: Datoformat.MÅNED_ÅR_NAVN,
        })}`;
    };

    const feilmeldingForDatoEtterMaksDato = () => {
        if (kanKunVelgeFortid) {
            return 'Du kan ikke sette en måned som er frem i tid';
        }
        const senesteDato = hentToDate();
        return `Du må velge en måned som er tidligere enn ${dateTilFormatertString({
            date: senesteDato,
            tilFormat: Datoformat.MÅNED_ÅR_NAVN,
        })}`;
    };

    const feilmeldinger: Record<Feilmelding, string> = {
        UGYLDIG_DATO: 'Du må velge en gyldig måned',
        FØR_MIN_DATO: feilmeldingForDatoFørMinDato(),
        ETTER_MAKS_DATO: feilmeldingForDatoEtterMaksDato(),
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
