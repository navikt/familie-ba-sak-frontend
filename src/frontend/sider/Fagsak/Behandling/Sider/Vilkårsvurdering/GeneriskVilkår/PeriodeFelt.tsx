import { useErLesevisning } from '@hooks/useErLesevisning';
import { type DateValidationT, Fieldset, HelpText, HStack, Label } from '@navikt/ds-react';
import type { IGrunnlagPerson } from '@typer/person';
import { VilkårType } from '@typer/vilkår';
import type { IIsoDatoPeriode } from '@utils/dato/periode';
import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { validerPeriode } from '../validering';
import { FomDatoFelt } from './FomDatoFelt';
import { TomDatoFelt } from './TomDatoFelt';
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

    const fomValidationRef = useRef<DateValidationT | undefined>(undefined);
    const tomValidationRef = useRef<DateValidationT | undefined>(undefined);

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

    const readOnly = erLesevisning || isSubmitting;

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
                <FomDatoFelt
                    lagretFom={lagretPeriode.fom}
                    readOnly={readOnly}
                    inputRef={ref}
                    onValidert={validation => {
                        fomValidationRef.current = validation;
                    }}
                    onEndret={fom => onChange({ ...value, fom })}
                />
                <TomDatoFelt
                    lagretTom={lagretPeriode.tom}
                    readOnly={readOnly}
                    onValidert={validation => {
                        tomValidationRef.current = validation;
                    }}
                    onEndret={tom => onChange({ ...value, tom })}
                />
            </HStack>
        </Fieldset>
    );
}
