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
          frontendFeilmelding: string;
          status: RessursStatus.IKKE_TILGANG;
      }
    | {
          melding?: string; // Teknisk melding som bare skal brukes til logging
          frontendFeilmelding: string;
          status: RessursStatus.FEILET;
      };

export const byggTomRessurs = <T>(): Ressurs<T> => {
    return {
        status: RessursStatus.IKKE_HENTET,
    };
};

export const byggDataRessurs = <T>(data: T): Ressurs<T> => {
    return {
        status: RessursStatus.SUKSESS,
        data,
    };
};

export const byggHenterRessurs = <T>(): Ressurs<T> => {
    return {
        status: RessursStatus.HENTER,
    };
};

export const byggFeiletRessurs = <T>(frontendFeilmelding: string, error?: Error): Ressurs<T> => {
    return {
        melding: error ? error.message : undefined,
        frontendFeilmelding,
        status: RessursStatus.FEILET,
    };
};

export const byggSuksessRessurs = <T>(data: T): Ressurs<T> => {
    return {
        data,
        status: RessursStatus.SUKSESS,
    };
};
