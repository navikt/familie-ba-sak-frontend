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

export enum Enhet {
    Alle = 'Alle',
    Drammen = 'Drammen',
    Sandnes = 'Sandnes',
    Vadsø = 'Vadsø',
    Oslo = 'Oslo',
    Stord = 'Stord',
    LevangerSteinkjer = 'Levanger-Steinkjer',
}

export enum Saksbehandler {
    Alle = 'Alle (fordelte og ufordelte)',
    AlleUfordelte = 'Alle (ufordelte)',
}

export enum Gjelder {
    Alle = 'Alle',
    ab0270 = 'Uspesifisert',
    ab0180 = 'Ordinær',
    ab0096 = 'Utvidet',
    ab0058 = 'EØS',
}

export enum Oppgavetype {
    Alle = 'Alle',
    Journalføring = 'Journalføring',
    Behandle = 'Behandle sak',
    GodkjenneVedtak = 'Godkjenne vedtak',
    BehandleUnderkjentVedtak = 'Behandle underkjent vedtak',
    BehandleSED = 'Behandle SED',
    Fremlegg = 'Fremlegg',
    InnhentDokumentasjon = 'Innhent dokumentasjon?',
    KontaktBruker = 'Kontakt bruker',
    VurderHenvendelse = 'Vurder henvendelse',
    VurderKonsekvensForYtelse = 'Vurder konsekvens for ytelse',
}

export enum Enhetsmappe {
    Alle = 'Alle',
    Uplasserte = 'Uplasserte',
    EM10 = '10 Søknader-klar til behandling',
    EM20 = '20 AVventer dokumentasjon',
    EM30 = '30 Klager klar til behandling',
    EM40 = '40 Revurdering klar til behandling',
    EM41 = '41 Revurdering',
    EM50 = '50 Tilbakekreving klar til behandling',
}

export enum Prioritet {
    Alle = 'Alle',
    Normal = 'Normal',
    Høy = 'Høy',
    Lav = 'Lav',
}
