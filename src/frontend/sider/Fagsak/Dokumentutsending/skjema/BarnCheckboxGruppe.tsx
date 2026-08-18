import type { ReactNode } from 'react';

import type { IBarnMedOpplysninger } from '@typer/søknad';
import { sorterBarnEtterFødselsdato } from '@utils/formatter';
import { useController, useFormContext } from 'react-hook-form';

import { CheckboxGroup } from '@navikt/ds-react';

import { BarnCheckbox } from './BarnCheckbox';
import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';
import { DokumentutsendingFeltnavn } from './useDokumentutsendingSkjema';

interface Props {
    legend: string;
    barnInnhold?: (barn: IBarnMedOpplysninger) => ReactNode;
}

export function BarnCheckboxGruppe({ legend, barnInnhold }: Props) {
    const { control } = useFormContext<DokumentutsendingFormValues>();

    const { field, fieldState } = useController({
        name: DokumentutsendingFeltnavn.VALGTE_BARN,
        control,
        rules: {
            validate: (barna: IBarnMedOpplysninger[]) =>
                barna.some(barn => barn.merket) ? undefined : 'Du må velge minst ett barn',
        },
    });

    const sorterteBarn = sorterBarnEtterFødselsdato(field.value);
    const merkedeBarn = field.value.filter((barn: IBarnMedOpplysninger) => barn.merket).map(barn => barn.ident);

    const oppdaterBarnMedNyMerketStatus = (barnaSomErMerket: string[]) => {
        field.onChange(
            field.value.map((barnMedOpplysninger: IBarnMedOpplysninger) => ({
                ...barnMedOpplysninger,
                merket: barnaSomErMerket.includes(barnMedOpplysninger.ident),
            }))
        );
    };

    return (
        <CheckboxGroup
            legend={legend}
            error={fieldState.error?.message}
            value={merkedeBarn}
            onChange={oppdaterBarnMedNyMerketStatus}
        >
            {sorterteBarn.map((barn: IBarnMedOpplysninger) => (
                <BarnCheckbox key={barn.ident} barn={barn}>
                    {barnInnhold?.(barn)}
                </BarnCheckbox>
            ))}
        </CheckboxGroup>
    );
}
