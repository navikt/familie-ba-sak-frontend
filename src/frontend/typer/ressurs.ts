export enum RessursStatus {
    FEILET = 'FEILET',
    HENTER = 'HENTER',
    IKKE_HENTET = 'IKKE_HENTET',
    IKKE_TILGANG = 'IKKE_TILGANG',
    SUKSESS = 'SUKSESS',
}

export type Ressurs<T> =
    | {
          status: RessursStatus.IKKE_HENTET;
      }
    | {
          status: RessursStatus.HENTER;
      }
    | {
          data: T;
          status: RessursStatus.SUKSESS;
      }
    | {
          melding: string;
          status: RessursStatus.IKKE_TILGANG;
      }
    | {
          errorMelding?: string;
          melding: string;
          status: RessursStatus.FEILET;
      };

export const byggTomRessurs = <T>(): Ressurs<T> => {
    return {
        status: RessursStatus.IKKE_HENTET,
    };
};

export const byggFeiletRessurs = <T>(melding: string, error?: Error): Ressurs<T> => {
    return {
        errorMelding: error ? error.message : undefined,
        melding,
        status: RessursStatus.FEILET,
    };
};
