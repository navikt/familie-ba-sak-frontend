import type { Regionkode } from '../RegionCombobox/region';

export const VALUTAKODE_TIL_LABEL = {
    SEK: 'SEK - Svensk krone',
    DKK: 'DKK - Dansk krone',
    GBP: 'GBP - Britisk pund',
    BGN: 'BGN - Bulgarsk lev',
    EUR: 'EUR - Euro',
    ISK: 'ISK - Islandsk krone',
    HRK: 'HRK - Kroatisk kuna',
    PLN: 'PLN - Polsk zloty',
    RON: 'RON - Rumensk leu',
    CHF: 'CHF - Sveitsisk franc',
    CZK: 'CZK - Tsjekkisk koruna',
    HUF: 'HUF - Ungarsk forint',
} satisfies Record<string, string>;

export type Valutakode = keyof typeof VALUTAKODE_TIL_LABEL;

export const EØS_VALUTAKODER: readonly Valutakode[] = [
    'DKK',
    'SEK',
    'BGN',
    'CHF',
    'CZK',
    'EUR',
    'GBP',
    'HRK',
    'HUF',
    'ISK',
    'PLN',
    'RON',
];

export const VALUTAKODE_TIL_REGIONKODE: Record<Valutakode, Regionkode> = {
    DKK: 'DK',
    SEK: 'SE',
    ISK: 'IS',
    EUR: 'EU',
    PLN: 'PL',
    BGN: 'BG',
    CZK: 'CZ',
    HUF: 'HU',
    HRK: 'HR',
    RON: 'RO',
    GBP: 'GB',
    CHF: 'CH',
};
