import { KompetanseResultat, kompetanseResultater } from '@typer/eøsPerioder';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@navikt/ds-react';

import { KompetanseFelt, type KompetanseFormValues } from './useKompetansePeriodeSkjema';

interface Props {
    lesevisning: boolean;
}

const RESULTATER: KompetanseResultat[] = [
    KompetanseResultat.NORGE_ER_PRIMÆRLAND,
    KompetanseResultat.NORGE_ER_SEKUNDÆRLAND,
    KompetanseResultat.NASJONAL_RETT_DIFFERANSEBEREGNING,
    KompetanseResultat.TO_PRIMÆRLAND,
];

export function KompetanseResultatFelt({ lesevisning }: Props) {
    const { control } = useFormContext<KompetanseFormValues>();

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: KompetanseFelt.RESULTAT,
        control,
        rules: {
            validate: resultat => (resultat ? undefined : 'Feltet er påkrevd, men mangler input'),
        },
    });

    return (
        <Select
            ref={ref}
            onBlur={onBlur}
            readOnly={lesevisning || isSubmitting}
            label={'Kompetanse'}
            value={value ?? ''}
            error={error?.message}
            onChange={event => onChange((event.target.value || undefined) as KompetanseResultat | undefined)}
        >
            <option value={''}>Velg</option>
            {RESULTATER.map(resultat => (
                <option key={resultat} value={resultat}>
                    {kompetanseResultater[resultat]}
                </option>
            ))}
        </Select>
    );
}
