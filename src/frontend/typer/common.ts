import type { ComboboxProps } from '@navikt/ds-react';

export interface IPar {
    id: string;
    navn: string;
}

export interface INøkkelPar {
    [key: string]: IPar;
}

export type OptionType = {
    value: string;
    label: string;
};

// Plaster inntil Aksel eksporterer typen
export type ComboboxOption = Exclude<ComboboxProps['options'], string[]>[number];
