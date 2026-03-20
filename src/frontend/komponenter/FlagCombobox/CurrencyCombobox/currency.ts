import type { RegionCode } from '../RegionCombobox/region';

export type CurrencyCode =
    | 'DKK'
    | 'SEK'
    | 'ISK'
    | 'EUR'
    | 'PLN'
    | 'BGN'
    | 'CZK'
    | 'HUF'
    | 'HRK'
    | 'RON'
    | 'GBP'
    | 'CHF';

export const EØS_CURRENCY_CODES: CurrencyCode[] = [
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

export const CURRENCY_CODE_TO_REGION_CODE: Record<CurrencyCode, RegionCode> = {
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

export const CURRENCY_CODE_LABELS: Record<CurrencyCode, string> = {
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
};
