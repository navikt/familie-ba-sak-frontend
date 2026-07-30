import type { KompetanseAktivitet } from '@typer/eøsPerioder';
import { kompetanseAktiviteter } from '@typer/eøsPerioder';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import type { KompetanseFelt, KompetanseFormValues } from './useKompetansePeriodeSkjema';

interface Props {
    navn: KompetanseFelt.SØKERS_AKTIVITET | KompetanseFelt.ANNEN_FORELDERS_AKTIVITET;
    label: string;
    aktiviteter: KompetanseAktivitet[];
    lesevisning: boolean;
    className?: string;
    avhengigLandFelt?: KompetanseFelt.SØKERS_AKTIVITETSLAND | KompetanseFelt.ANNEN_FORELDERS_AKTIVITETSLAND;
}

export function KompetanseAktivitetFelt({ navn, label, aktiviteter, lesevisning, className, avhengigLandFelt }: Props) {
    const { control, trigger } = useFormContext<KompetanseFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting, isSubmitted },
    } = useController({
        name: navn,
        control,
        rules: {
            validate: aktivitet => (aktivitet ? undefined : 'Feltet er påkrevd, men mangler input'),
        },
    });

    return (
        <Select
            ref={ref}
            onBlur={onBlur}
            className={className}
            readOnly={lesevisning || isSubmitting}
            label={label}
            value={value ?? ''}
            error={error?.message}
            onChange={event => {
                onChange((event.target.value || undefined) as KompetanseAktivitet | undefined);
                if (isSubmitted && avhengigLandFelt) {
                    trigger(avhengigLandFelt);
                }
            }}
        >
            <option value={''}>Velg</option>
            {aktiviteter.map(aktivitet => (
                <option key={aktivitet} value={aktivitet}>
                    {kompetanseAktiviteter[aktivitet]}
                </option>
            ))}
        </Select>
    );
}
