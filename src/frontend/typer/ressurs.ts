export enum RessursStatus {
    FEILET = 'FEILET',
    HENTER = 'HENTER',
    IKKE_HENTET = 'IKKE_HENTET',
    IKKE_TILGANG = 'IKKE_TILGANG',
    SUKSESS = 'SUKSESS',
}

export type ApiRessurs<T> = {
    data: T;
    status: RessursStatus;
    melding: string;
    frontendFeilmelding?: string;
    stacktrace: string;
};

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

export const byggFeiletRessurs = <T>(frontendFeilmelding: string): Ressurs<T> => {
    return {
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
