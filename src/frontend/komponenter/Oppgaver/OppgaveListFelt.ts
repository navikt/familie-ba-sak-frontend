export enum ListFelt {
    OPPRETTET_TIDSPUNKT = 'OPPRETTET_TIDSPUNKT',
    OPPGAVETYPE = 'OPPGAVETYPE',
    BEHANDLINGSTEMA = 'BEHANDLINGSTEMA',
    FRIST_FERDIGSTILLELSE = 'FRIST_FERDIGSTILLELSE',
    PRIORITET = 'PRIORITET',
    BRUKER = 'BRUKER',
    TILDELT_ENHETSNR = 'TILDELT_ENHETSNR',
    TILORDNET_RESSURS = 'TILORDNET_RESSURS',
    HANDLINGER = 'HANDLINGER',
    BESKRIVELSE = 'BESKRIVELSE',
}

export enum FeltSortOrder {
    NONE = 'none',
    ASCENDANT = 'ascendant',
    DESCENDANT = 'descendant',
}

export const feltLabelMap = new Map<ListFelt, string>([
    [ListFelt.OPPRETTET_TIDSPUNKT, 'Reg. dato'],
    [ListFelt.OPPGAVETYPE, 'Oppgavetype'],
    [ListFelt.BEHANDLINGSTEMA, 'Gjelder'],
    [ListFelt.FRIST_FERDIGSTILLELSE, 'Frist'],
    [ListFelt.PRIORITET, 'Prioritet'],
    [ListFelt.BRUKER, 'Bruker'],
    [ListFelt.TILDELT_ENHETSNR, 'Enhet'],
    [ListFelt.TILORDNET_RESSURS, 'Saksbehandler'],
    [ListFelt.HANDLINGER, 'Handlinger'],
    [ListFelt.BESKRIVELSE, 'Beskrivelse'],
]);

export const oppgaveFeltMap = new Map<ListFelt, string>([
    [ListFelt.OPPRETTET_TIDSPUNKT, 'opprettetTidspunkt'],
    [ListFelt.OPPGAVETYPE, 'oppgavetype'],
    [ListFelt.BEHANDLINGSTEMA, 'behandlingstema'],
    [ListFelt.FRIST_FERDIGSTILLELSE, 'fristFerdigstillelse'],
    [ListFelt.PRIORITET, 'prioritet'],
    [ListFelt.BRUKER, 'bruker'],
    [ListFelt.TILDELT_ENHETSNR, 'tildeltEnhetsnr'],
    [ListFelt.TILORDNET_RESSURS, 'tilordnetRessurs'],
    [ListFelt.HANDLINGER, 'handlinger'],
    [ListFelt.BESKRIVELSE, 'beskrivelse'],
]);

export const ariaSortMap = new Map<FeltSortOrder, 'none' | 'descending' | 'ascending'>([
    [FeltSortOrder.NONE, 'none'],
    [FeltSortOrder.DESCENDANT, 'descending'],
    [FeltSortOrder.ASCENDANT, 'ascending'],
]);

export const sortLenkClassNameMap = new Map<
    FeltSortOrder,
    '' | 'tabell__th--sortert-desc' | 'tabell__th--sortert-asc'
>([
    [FeltSortOrder.NONE, ''],
    [FeltSortOrder.DESCENDANT, 'tabell__th--sortert-desc'],
    [FeltSortOrder.ASCENDANT, 'tabell__th--sortert-asc'],
]);

export const initFeltOrder = new Map<ListFelt, FeltSortOrder>([
    [ListFelt.OPPRETTET_TIDSPUNKT, FeltSortOrder.NONE],
    [ListFelt.OPPGAVETYPE, FeltSortOrder.NONE],
    [ListFelt.BEHANDLINGSTEMA, FeltSortOrder.NONE],
    [ListFelt.FRIST_FERDIGSTILLELSE, FeltSortOrder.NONE],
    [ListFelt.PRIORITET, FeltSortOrder.NONE],
    [ListFelt.TILDELT_ENHETSNR, FeltSortOrder.NONE],
    [ListFelt.TILORDNET_RESSURS, FeltSortOrder.NONE],
]);
