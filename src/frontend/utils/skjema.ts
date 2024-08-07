import type { ComboboxOption } from '@navikt/ds-react/cjs/form/combobox/types';
import type { Felt } from '@navikt/familie-skjema';

export const onOptionSelected = (
    optionValue: string,
    isSelected: boolean,
    skjemafelt: Felt<ComboboxOption[]>,
    muligeValg: ComboboxOption[]
) => {
    if (isSelected) {
        const nyttValg = muligeValg.find(valg => valg.value === optionValue);
        nyttValg && skjemafelt.validerOgSettFelt([...skjemafelt.verdi, nyttValg]);
    } else {
        skjemafelt.validerOgSettFelt(skjemafelt.verdi.filter(valg => valg.value !== optionValue));
    }
};
