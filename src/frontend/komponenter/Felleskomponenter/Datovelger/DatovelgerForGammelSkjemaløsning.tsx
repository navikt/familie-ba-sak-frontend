import * as React from 'react';
import { useEffect } from 'react';

import { isValid, parseISO } from 'date-fns';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { senesteRelevanteDato, tidligsteRelevanteDato } from './utils';
import { dagensDato, formatterDate } from '../../../utils/dato';
import type { IsoDatoString } from '../../../utils/dato';
import { Datoformat } from '../../../utils/formatter';

interface IProps {
    value: string | undefined;
    onDateChange: (dato: IsoDatoString) => void;
    label: string;
    visFeilmeldinger: boolean;
    feilmelding?: string;
    readOnly?: boolean;
    kanKunVelgeFortid?: boolean;
}

const DatovelgerForGammelSkjemaløsning = ({
    value,
    onDateChange,
    label,
    visFeilmeldinger,
    feilmelding = undefined,
    readOnly = false,
    kanKunVelgeFortid = false,
}: IProps) => {
    const formatterDefaultSelected = () => {
        if (value === undefined) return undefined;
        const isoString = parseISO(value);
        return isValid(isoString) ? isoString : undefined;
    };

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
        defaultSelected: formatterDefaultSelected(),
        fromDate: tidligsteRelevanteDato,
        toDate: kanKunVelgeFortid ? dagensDato : senesteRelevanteDato,
    });

    useEffect(() => {
        onDateChange(
            formatterDate({
                dato: selectedDay,
                datoformat: Datoformat.ISO_DAG,
                defaultString: inputProps.value?.toString(),
            })
        );
    }, [inputProps.value]);

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={label}
                placeholder={'DD.MM.ÅÅÅÅ'}
                readOnly={readOnly}
                error={visFeilmeldinger && feilmelding}
            />
        </DatePicker>
    );
};

export default DatovelgerForGammelSkjemaløsning;
