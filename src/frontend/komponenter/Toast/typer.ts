export interface IToast {
    alertType: AlertType;
    tekst: string;
}

export enum ToastTyper {
    OPPGAVE_PLUKKET = 'OPPGAVE_PLUKKET',
    OPPGAVE_TILBAKESTILT = 'OPPGAVE_TILBAKESTILT',
    FANT_IKKE_FAGSAK = 'FANT_IKKE_FAGSAK',
    MANGLER_TILGANG = 'MANGLER_TILGANG',
    ETTERBETALING_KORRIGERT = 'ETTERBETALING_KORRIGERT',
    KORRIGERT_ETTERBETALING_FJERNET = 'KORRIGERT_ETTERBETALING_FJERNET',
    SMÅBARNSTILLEGG_KORRIGERT = 'SMÅBARNSTILLEGG_KORRIGERT',
    BREVMOTTAKER_LAGRET = 'BREVMOTTAKER_LAGRET',
    BREVMOTTAKER_FJERNET = 'BREVMOTTAKER_FJERNET',
    KLARTE_IKKE_OPPDATERE_MODIA_KONTEKST = 'KLARTE_IKKE_OPPDATERE_MODIA_KONTEKST',
}

export enum AlertType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}
