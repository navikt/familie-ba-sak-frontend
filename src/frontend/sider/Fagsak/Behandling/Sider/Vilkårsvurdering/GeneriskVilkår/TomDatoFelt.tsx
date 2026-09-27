import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';
import { dateTilIsoDatoStringEllerUndefined, type IsoDatoString, isoStringTilDateEllerUndefined } from '@utils/dato';
import { useRef } from 'react';

interface Props {
    lagretTom: IsoDatoString | undefined;
    readOnly: boolean;
    onValidert: (validation: DateValidationT) => void;
    onEndret: (tom: IsoDatoString | undefined) => void;
}

export function TomDatoFelt({ lagretTom, readOnly, onValidert, onEndret }: Props) {
    const ventendeDato = useRef<{ dato: Date | undefined } | null>(null);

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: isoStringTilDateEllerUndefined(lagretTom),
        fromDate: tidligsteRelevanteDato,
        toDate: senesteRelevanteDato,
        onDateChange: dato => {
            ventendeDato.current = { dato };
        },
        onValidate: validation => {
            onValidert(validation);
            if (ventendeDato.current) {
                onEndret(dateTilIsoDatoStringEllerUndefined(ventendeDato.current.dato));
                ventendeDato.current = null;
            }
        },
    });

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'T.o.m (valgfri)'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                readOnly={readOnly}
            />
        </DatePicker>
    );
}
