import * as React from 'react';

import { isValid, parseISO } from 'date-fns';
import { useController } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import {
    senesteRelevanteDato,
    tidligsteRelevanteDato,
} from '../../../../../../komponenter/Datovelger/utils';
import { dateTilFormatertString, Datoformat } from '../../../../../../utils/dato';

interface Props {
    feltnavn: string;
    tittel: string;
    beskrivelse?: string;
    erLesevisning?: boolean;
    kanKunVelgeFortid?: boolean;
    minDatoAvgrensning?: Date;
    maksDatoAvgrensning?: Date;
}

const Datovelger = ({
    feltnavn,
    tittel,
    beskrivelse,
    erLesevisning = false,
    minDatoAvgrensning = tidligsteRelevanteDato,
    maksDatoAvgrensning = senesteRelevanteDato,
}: Props) => {
    const { field, fieldState, formState } = useController({
        name: feltnavn,
        rules: {
            required: `${tittel} er påkrevd.`,
            validate: (dato: string) => isValid(parseISO(dato)) || `Ugyldig dato`,
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: field.value ? parseISO(field.value) : undefined,
        onDateChange: dato => {
            field.onChange(
                dateTilFormatertString({
                    date: dato,
                    tilFormat: Datoformat.ISO_DAG,
                    defaultString: inputProps.value?.toString(),
                })
            );
        },
        fromDate: minDatoAvgrensning,
        toDate: maksDatoAvgrensning,
    });

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={tittel}
                description={beskrivelse}
                placeholder={'DD.MM.ÅÅÅÅ'}
                error={fieldState.error?.message}
                readOnly={erLesevisning || formState.isSubmitting}
            />
        </DatePicker>
    );
};

export default Datovelger;
