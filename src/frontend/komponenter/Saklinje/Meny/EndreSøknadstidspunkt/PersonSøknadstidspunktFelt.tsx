import { useRef } from 'react';

import { dagensDato } from '@utils/dato';
import { formaterIdent, formaterTekstStorForbokstav, hentAlderSomString } from '@utils/formatter';
import { useController, useFormContext } from 'react-hook-form';

import {
    BodyShort,
    Box,
    DatePicker,
    type DateValidationT,
    Detail,
    HStack,
    VStack,
    useDatepicker,
} from '@navikt/ds-react';

import type { EndreSøknadstidspunktFormValues } from './useEndreSøknadstidspunktForm';

interface Props {
    index: number;
    navn: string;
    fødselsdato: string;
    personIdent: string;
    erLesevisning: boolean;
}

export const PersonSøknadstidspunktFelt = ({ index, navn, fødselsdato, personIdent, erLesevisning }: Props) => {
    const { control, trigger } = useFormContext<EndreSøknadstidspunktFormValues>();
    const dateValidationRef = useRef<DateValidationT | undefined>(undefined);

    const feltnavn = `personer.${index}.søknadstidspunkt` as const;

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitted, isSubmitting },
    } = useController({
        name: feltnavn,
        control,
        rules: {
            validate: dato => {
                const dateValidation = dateValidationRef.current;

                if (dateValidation?.isAfter) {
                    return 'Du kan ikke sette en dato frem i tid.';
                }

                if (
                    dateValidation &&
                    !dateValidation.isEmpty &&
                    (!dateValidation.isValidDate || dateValidation.isInvalid)
                ) {
                    return 'Du må velge en gyldig dato';
                }

                return dato === null || dato instanceof Date || 'Du må velge en gyldig dato';
            },
        },
    });

    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: value ?? undefined,
        toDate: dagensDato,
        onDateChange: date => {
            onChange(date ?? null);
            if (isSubmitted) {
                trigger(feltnavn);
            }
        },
        onValidate: validation => {
            dateValidationRef.current = validation;
            // Re-valider feltet slik at inline-feil vises umiddelbart (onValidate fyres etter onDateChange).
            trigger(feltnavn);
        },
    });

    return (
        <Box padding="space-4">
            <HStack gap="space-4" align="end" wrap={false}>
                <VStack gap="space-1" flexGrow="1">
                    <BodyShort size="small" weight="semibold">
                        {formaterTekstStorForbokstav(navn)}
                    </BodyShort>
                    <Detail textColor="subtle">
                        {hentAlderSomString(fødselsdato)} | {formaterIdent(personIdent)}
                    </Detail>
                </VStack>
                <DatePicker {...datepickerProps} dropdownCaption>
                    <DatePicker.Input
                        {...inputProps}
                        label="Søknadstidspunkt"
                        hideLabel
                        // Visuell label er felles; gi hvert felt et unikt tilgjengelig navn med barnets navn,
                        // ellers hører skjermleserbrukere N identiske «Søknadstidspunkt»-felter.
                        aria-label={`Søknadstidspunkt for ${formaterTekstStorForbokstav(navn)}`}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                        readOnly={erLesevisning || isSubmitting}
                        error={error?.message}
                        size="small"
                    />
                </DatePicker>
            </HStack>
        </Box>
    );
};
