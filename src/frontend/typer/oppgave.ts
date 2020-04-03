export interface IOppgave {
    id: number;
    tildeltEnhetsnr: string;
    journalpostId: string;
    saksreferanse: string;
    aktoerid: string;
    tilordnetRessurs: string;
    behandlingstema: string;
    oppgavetype: string;
    prioritet: string;
    status: string;
}

export enum Oppgavetype {
    Journalføring = 'Journalføring',
    Behandle = 'Behandle sak',
    GodkjenneVedat = 'Godkjenne vedat',
    BeandleUnderkjentVedtak = 'Behandle underkjent vedtak',
    BehandleSED = 'Behandle SED',
    Fremlegg = 'Fremlegg',
    InnhentDokumentasjon = 'Innhent dokumentasjon?',
    KontaktBruker = 'Kontakt bruker',
    VurderHenvendelse = 'Vurder henvendelse',
    VurderKonsekvensForYtelse = 'Vurder konsekvens for ytelse',
}
