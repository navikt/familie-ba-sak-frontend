import { AlertStripeType } from 'nav-frontend-alertstriper';

export interface IToast {
    alertstripeType: AlertStripeType;
    tekst: string;
}

export enum ToastTyper {
    OPPGAVE_PLUKKET = 'OPPGAVE_PLUKKET',
    OPPGAVE_TILBAKESTILT = 'OPPGAVE_TILBAKESTILT',
    FANT_IKKE_FAGSAK = 'FANT_IKKE_FAGSAK',
    MANGLER_TILGANG = 'MANGLER_TILGANG',
}
