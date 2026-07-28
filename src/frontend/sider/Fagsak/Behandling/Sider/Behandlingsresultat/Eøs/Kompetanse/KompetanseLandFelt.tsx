import { EØS_LAND_REGIONKODER, RegionCombobox, type Regionkode } from '@komponenter/FlaggCombobox';
import { isEmpty } from '@utils/eøsValidators';
import { useController, useFormContext } from 'react-hook-form';

import type { KompetanseFelt, KompetanseFormValues } from './useKompetansePeriodeSkjema';

interface Props {
    navn:
        | KompetanseFelt.SØKERS_AKTIVITETSLAND
        | KompetanseFelt.ANNEN_FORELDERS_AKTIVITETSLAND
        | KompetanseFelt.BARNETS_BOSTEDSLAND;
    label: string;
    lesevisning: boolean;
    erPåkrevd?: (values: KompetanseFormValues) => boolean;
}

export function KompetanseLandFelt({ navn, label, lesevisning, erPåkrevd }: Props) {
    const { control } = useFormContext<KompetanseFormValues>();

    const {
        field: { value, onChange, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: navn,
        control,
        rules: {
            validate: (land, values) => {
                if (erPåkrevd && !erPåkrevd(values)) {
                    return undefined;
                }
                return isEmpty(land) ? 'Feltet er påkrevd, men mangler input' : undefined;
            },
        },
    });

    return (
        <RegionCombobox
            ref={ref}
            label={label}
            value={(value ?? null) as Regionkode | null}
            options={EØS_LAND_REGIONKODER}
            onChange={valgtRegion => onChange(valgtRegion ?? undefined)}
            readOnly={lesevisning || isSubmitting}
            error={error?.message}
        />
    );
}
