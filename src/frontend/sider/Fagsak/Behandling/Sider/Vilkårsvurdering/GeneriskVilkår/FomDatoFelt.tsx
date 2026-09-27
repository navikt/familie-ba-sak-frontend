import { tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';
import { Resultat } from '@typer/vilkår';
import {
    dagensDato,
    dateTilIsoDatoStringEllerUndefined,
    type IsoDatoString,
    isoStringTilDateEllerUndefined,
} from '@utils/dato';
import { endOfMonth } from 'date-fns';
import { type Ref, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

interface Props {
    lagretFom: IsoDatoString | undefined;
    readOnly: boolean;
    inputRef: Ref<HTMLInputElement>;
    onValidert: (validation: DateValidationT) => void;
    onEndret: (fom: IsoDatoString | undefined) => void;
}

export function FomDatoFelt({ lagretFom, readOnly, inputRef, onValidert, onEndret }: Props) {
    const { control } = useFormContext<VilkårResultatFormValues>();

    const resultat = useWatch({ control, name: VilkårResultatFelt.RESULTAT });
    const erEksplisittAvslagPåSøknad = useWatch({ control, name: VilkårResultatFelt.ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD });

    const ventendeDato = useRef<{ dato: Date | undefined } | null>(null);

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: isoStringTilDateEllerUndefined(lagretFom),
        fromDate: tidligsteRelevanteDato,
        toDate: endOfMonth(dagensDato),
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

    const erValgfri = resultat === Resultat.IKKE_OPPFYLT && erEksplisittAvslagPåSøknad;

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                ref={inputRef}
                label={erValgfri ? 'F.o.m (valgfri)' : 'F.o.m'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                readOnly={readOnly}
            />
        </DatePicker>
    );
}
