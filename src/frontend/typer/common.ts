export interface IPar {
    id: string;
    navn: string;
}

export interface INøkkelPar {
    [key: string]: IPar;
}

export const hentPar = (
    nøkkel: string | undefined,
    nøkkelPar: INøkkelPar,
    defaultValue: string
): string => {
    return Object.values(nøkkelPar).find((par: IPar) => par.id === nøkkel)?.id ?? defaultValue;
};

export interface IRestTilgang {
    saksbehandlerHarTilgang: boolean;
    adressebeskyttelsegradering: Adressebeskyttelsegradering;
}

export enum Adressebeskyttelsegradering {
    STRENGT_FORTROLIG = 'STRENGT_FORTROLIG',
    STRENGT_FORTROLIG_UTLAND = 'STRENGT_FORTROLIG_UTLAND',
    FORTROLIG = 'FORTROLIG',
    UGRADERT = 'UGRADERT',
}

export const adressebeskyttelsestyper: INøkkelPar = {
    STRENGT_FORTROLIG: {
        id: 'STRENGT_FORTROLIG',
        navn: 'strengt fortrolig',
    },
    STRENGT_FORTROLIG_UTLAND: {
        id: 'STRENGT_FORTROLIG_UTLAND',
        navn: 'strengt fortrolig utland',
    },
    FORTROLIG: {
        id: 'FORTROLIG',
        navn: 'fortrolig',
    },
    UGRADERT: {
        id: 'UGRADERT',
        navn: 'ugradert',
    },
};
