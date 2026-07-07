import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import {
    OpprettBehandlingFelt,
    type OpprettBehandlingFormValues,
} from '@komponenter/Saklinje/Meny/OpprettBehandling/useOpprettBehandlingSkjema';
import type { ComboboxOption } from '@typer/common';
import { ForelderBarnRelasjonRolle } from '@typer/person';
import { hentAlder } from '@utils/formatter';
import { onOptionSelected } from '@utils/skjema';
import { useController, useFormContext } from 'react-hook-form';

import { UNSAFE_Combobox } from '@navikt/ds-react';

export function ValgteBarnFelt() {
    const erLesevisning = useErLesevisning();
    const bruker = useBruker();

    const { control } = useFormContext<OpprettBehandlingFormValues>();

    const {
        field: { value },
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

    // TODO: sjekk Personvelger.tsx for inspo
    return (
        <UNSAFE_Combobox
            label={'Legg til juridiske barn for migrering'}
            isMultiSelect
            readOnly={isSubmitting || erLesevisning}
            options={barn}
            selectedOptions={value.map(barn => barn.value)}
            onToggleSelected={(valgtOption, isSelected) => onOptionSelected(valgtOption, isSelected)}
            error={error?.message}
        />
    );
}
