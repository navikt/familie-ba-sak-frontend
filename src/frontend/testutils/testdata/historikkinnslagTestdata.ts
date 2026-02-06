import type { Historikkinnslag } from '../../hooks/useHentHistorikkinnslag';

export function lagHistorikkInnslag(historikkinnslag?: Partial<Historikkinnslag>): Historikkinnslag {
    return {
        id: '1',
        dato: '01.01.26 12:00',
        tittel: 'En tittel',
        utførtAv: 'Sak Saksbehandler',
        rolle: 'SAKSBEHANDLER',
        beskrivelse: 'En beskrivende beskrivelse.',
        ...historikkinnslag,
    };
}

export * as HistorikkinnslagTestdata from './historikkinnslagTestdata';
