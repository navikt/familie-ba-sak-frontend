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

export type OptionType = {
    value: string;
    label: string;
};
