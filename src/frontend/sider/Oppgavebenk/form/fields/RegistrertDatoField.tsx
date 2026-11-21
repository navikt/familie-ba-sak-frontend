import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { dateTilIsoDatoString } from '@utils/dato';
import { parseISO } from 'date-fns';
import { type ChangeEvent, type FocusEvent, useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import { useOppdaterLocalStorage } from '../useOppdaterLocalStorage';
import { useOppdaterURL } from '../useOppdaterURL';
import { OppgavefilterField, type OppgavefilterFormValues } from '../useOppgavefilterForm';
import { erGyldigDato, validerDato } from '../validering';

export function RegistrertDatoField() {
    const typedValue = useRef('');

    const { field, fieldState } = useController<OppgavefilterFormValues>({
        name: OppgavefilterField.REGISTRERT_DATO,
        rules: { validate: value => validerDato(value) },
    });

    const oppdaterURL = useOppdaterURL();
    const oppdaterLocalStorage = useOppdaterLocalStorage();

    const { datepickerProps, inputProps, selectedDay, setSelected } = useDatepicker({
        defaultSelected: field.value ? parseISO(field.value) : undefined,
        fromDate: tidligsteRelevanteDato,
        toDate: senesteRelevanteDato,
        onDateChange: dato => {
            const verdi = dato ? dateTilIsoDatoString(dato) : typedValue.current;
            if (verdi !== field.value) {
                field.onChange(verdi);
                oppdaterLocalStorage({ [OppgavefilterField.REGISTRERT_DATO]: verdi });
                oppdaterURL({ [OppgavefilterField.REGISTRERT_DATO]: verdi });
            }
        },
    });

    // useDatepicker har egen intern tilstand som bare initialiseres fra defaultSelected ved første render.
    // Når skjemaverdien endres utenfra (f.eks. reset), må datovelgeren derfor oppdateres manuelt.
    useEffect(() => {
        const fieldErTømt = field.value === '';
        const datovelgerViserTekst = inputProps.value !== '';

        if (fieldErTømt && datovelgerViserTekst) {
            setSelected(undefined);
            return;
        }

        const fieldErGyldigDato = erGyldigDato(field.value);
        const formatertValgtDato = selectedDay ? dateTilIsoDatoString(selectedDay) : undefined;
        const datovelgerViserAnnenDato = formatertValgtDato !== field.value;

        if (fieldErGyldigDato && datovelgerViserAnnenDato) {
            setSelected(parseISO(field.value));
            return;
        }
    }, [field.value, inputProps.value, selectedDay, setSelected]);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        typedValue.current = event.target.value;
        inputProps.onChange?.(event);
        typedValue.current = '';
    }

    function onBlur(event: FocusEvent<HTMLInputElement>) {
        inputProps.onBlur?.(event);
        field.onBlur();
    }

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                label={'Reg. dato'}
                placeholder={'DD.MM.ÅÅÅÅ'}
                ref={field.ref}
                value={field.value === '' ? '' : inputProps.value}
                onChange={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
            />
        </DatePicker>
    );
}
