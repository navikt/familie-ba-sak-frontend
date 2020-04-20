export declare enum RessursStatus {
    FEILET = "FEILET",
    HENTER = "HENTER",
    IKKE_HENTET = "IKKE_HENTET",
    IKKE_TILGANG = "IKKE_TILGANG",
    SUKSESS = "SUKSESS"
}
export declare type Ressurs<T> = {
    status: RessursStatus.IKKE_HENTET;
} | {
    status: RessursStatus.HENTER;
} | {
    data: T;
    status: RessursStatus.SUKSESS;
} | {
    melding: string;
    status: RessursStatus.IKKE_TILGANG;
} | {
    errorMelding?: string;
    melding: string;
    status: RessursStatus.FEILET;
};
export declare const byggTomRessurs: <T>() => Ressurs<T>;
export declare const byggFeiletRessurs: <T>(melding: string, error?: Error | undefined) => Ressurs<T>;
export declare const byggSuksessRessurs: <T>(data: T) => Ressurs<T>;
