export interface IToast {
    alertType: AlertType;
    tekst: string;
}

export enum ToastTyper {
    OPPGAVE_PLUKKET = 'OPPGAVE_PLUKKET',
    OPPGAVE_TILBAKESTILT = 'OPPGAVE_TILBAKESTILT',
    FANT_IKKE_FAGSAK = 'FANT_IKKE_FAGSAK',
    MANGLER_TILGANG = 'MANGLER_TILGANG',
}

export enum AlertType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}
