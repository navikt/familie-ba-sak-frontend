import { useBruker } from '@hooks/useBruker';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { ComboboxOption } from '@typer/common';
import { ForelderBarnRelasjonRolle } from '@typer/person';
import { hentAlder } from '@utils/formatter';
import { useController, useFormContext } from 'react-hook-form';

export function ValgteBarnFelt() {
    const bruker = useBruker();

    const { control } = useFormContext<OpprettBehandlingFormValues>();

    const {
        field: { value, onChange },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: OpprettBehandlingFelt.VALGTE_BARN,
        control,
    });

    const barn =
        bruker?.forelderBarnRelasjon
            .filter(relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
            .map<ComboboxOption>(relasjon => ({
                value: relasjon.personIdent,
                label: `${relasjon.navn} (${hentAlder(relasjon.fødselsdato)} år) | ${relasjon.personIdent}`,
            })) ?? [];

    function onToggleSelected(optionValue: string, isSelected: boolean) {
        const valgteBarn = value;
        const nyVerdi = isSelected
            ? [...valgteBarn, barn.find(b => b.value === optionValue)].filter(Boolean)
            : valgteBarn.filter(b => b.value !== optionValue);
        onChange(nyVerdi);
    }

    return (
        <UNSAFE_Combobox
            label={'Legg til juridiske barn for migrering'}
            isMultiSelect
            readOnly={isSubmitting}
            options={barn}
            selectedOptions={value.map(barn => barn.value)}
            onToggleSelected={onToggleSelected}
            error={error?.message}
        />
    );
}
