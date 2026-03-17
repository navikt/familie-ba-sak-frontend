import type { Felt } from '@navikt/familie-skjema';

import type { OptionType } from '../typer/common';

export const onOptionSelected = (
    optionValue: string,
    isSelected: boolean,
    skjemafelt: Felt<OptionType[]>,
    muligeValg: OptionType[]
) => {
    if (isSelected) {
        const nyttValg = muligeValg.find(valg => valg.value === optionValue);
        if (nyttValg) skjemafelt.validerOgSettFelt([...skjemafelt.verdi, nyttValg]);
    } else {
        skjemafelt.validerOgSettFelt(skjemafelt.verdi.filter(valg => valg.value !== optionValue));
    }
};
