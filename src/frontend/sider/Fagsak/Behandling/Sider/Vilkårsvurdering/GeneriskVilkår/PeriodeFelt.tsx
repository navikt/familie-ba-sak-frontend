import { useErLesevisning } from '@hooks/useErLesevisning';
import { senesteRelevanteDato, tidligsteRelevanteDato } from '@komponenter/Datovelger/utils';
import { DatePicker, type DateValidationT, Fieldset, HelpText, HStack, Label, useDatepicker } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import { Resultat, VilkårType } from '@typer/vilkår';
import { dagensDato, dateTilIsoDatoStringEllerUndefined, isoStringTilDateEllerUndefined } from '@utils/dato';
import type { IIsoDatoPeriode } from '@utils/dato/periode';
import { endOfMonth } from 'date-fns';
import { useRef } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { validerPeriode } from '../validering';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

const harUgyldigDatoInput = (validation: DateValidationT | undefined) =>
    !!validation && !validation.isEmpty && (validation.isInvalid || validation.isBefore || validation.isAfter);

interface Props {
    person: IGrunnlagPerson;
    vilkårType: VilkårType;
    lagretPeriode: IIsoDatoPeriode;
}

export function PeriodeFelt({ person, vilkårType, lagretPeriode }: Props) {
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<VilkårResultatFormValues>();

    const resultat = useWatch({ control, name: VilkårResultatFelt.RESULTAT });
    const erEksplisittAvslagPåSøknad = useWatch({ control, name: VilkårResultatFelt.ER_EKSPLISITT_AVSLAG_PÅ_SØKNAD });

    const fomValidationRef = useRef<DateValidationT | undefined>(undefined);
    const tomValidationRef = useRef<DateValidationT | undefined>(undefined);
    const ventendeFom = useRef<{ dato: Date | undefined } | null>(null);
    const ventendeTom = useRef<{ dato: Date | undefined } | null>(null);

    const er18ÅrsVilkår = vilkårType === VilkårType.UNDER_18_ÅR;

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: VilkårResultatFelt.PERIODE,
        control,
        rules: {
            validate: (periode, formValues) => {
                const fomValidation = fomValidationRef.current;
                if (fomValidation && !fomValidation.isEmpty) {
                    if (fomValidation.isAfter) {
                        return 'Du kan ikke legge inn fra og med dato som er i neste måned eller senere';
                    }
                    if (fomValidation.isInvalid || fomValidation.isBefore) {
                        return 'Ugyldig f.o.m.';
                    }
                }
                if (harUgyldigDatoInput(tomValidationRef.current)) {
                    return 'Ugyldig t.o.m.';
                }
                return validerPeriode(periode, {
                    person,
                    erEksplisittAvslagPåSøknad: formValues.erEksplisittAvslagPåSøknad,
                    er18ÅrsVilkår,
                });
            },
        },
    });

    const fom = useDatepicker({
        defaultSelected: isoStringTilDateEllerUndefined(lagretPeriode.fom),
        fromDate: tidligsteRelevanteDato,
        toDate: endOfMonth(dagensDato),
        onDateChange: dato => {
            ventendeFom.current = { dato };
        },
        onValidate: validation => {
            fomValidationRef.current = validation;
            if (ventendeFom.current) {
                onChange({ ...value, fom: dateTilIsoDatoStringEllerUndefined(ventendeFom.current.dato) });
                ventendeFom.current = null;
            }
        },
    });

    const tom = useDatepicker({
        defaultSelected: isoStringTilDateEllerUndefined(lagretPeriode.tom),
        fromDate: tidligsteRelevanteDato,
        toDate: senesteRelevanteDato,
        onDateChange: dato => {
            ventendeTom.current = { dato };
        },
        onValidate: validation => {
            tomValidationRef.current = validation;
            if (ventendeTom.current) {
                onChange({ ...value, tom: dateTilIsoDatoStringEllerUndefined(ventendeTom.current.dato) });
                ventendeTom.current = null;
            }
        },
    });

    const fomErValgfri = resultat === Resultat.IKKE_OPPFYLT && erEksplisittAvslagPåSøknad;

    return (
        <Fieldset legend={'Periode for vurderingen'} hideLegend error={error?.message}>
            {!erLesevisning && (
                <HStack gap={'space-8'} align={'center'}>
                    <Label>Velg periode</Label>
                    <HelpText title="Hvordan fastsette periode">
                        Oppgi startdato/periode hvor vilkåret er oppfylt/ikke oppfylt. Virkningstidspunktet vil bli
                        beregnet ut fra dette. Dersom vurderingen gjelder et avslag er ikke periode påkrevd.
                    </HelpText>
                </HStack>
            )}
            <HStack gap={'space-16'}>
                <DatePicker dropdownCaption {...fom.datepickerProps}>
                    <DatePicker.Input
                        {...fom.inputProps}
                        ref={ref}
                        label={fomErValgfri ? 'F.o.m (valgfri)' : 'F.o.m'}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                        readOnly={erLesevisning || isSubmitting}
                    />
                </DatePicker>
                <DatePicker dropdownCaption {...tom.datepickerProps}>
                    <DatePicker.Input
                        {...tom.inputProps}
                        label={'T.o.m (valgfri)'}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                        readOnly={erLesevisning || isSubmitting}
                    />
                </DatePicker>
            </HStack>
        </Fieldset>
    );
}
