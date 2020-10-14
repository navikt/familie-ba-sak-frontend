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

export const adressebeskyttelsestyper: Record<Adressebeskyttelsegradering, string> = {
    STRENGT_FORTROLIG: 'strengt fortrolig',
    STRENGT_FORTROLIG_UTLAND: 'strengt fortrolig utland',
    FORTROLIG: 'fortrolig',
    UGRADERT: 'ugradert',
};
