export interface IPar {
    id: string;
    navn: string;
}
export interface INøkkelPar {
    [key: string]: IPar;
}
export declare const hentPar: (nøkkel: string | undefined, nøkkelPar: INøkkelPar, defaultValue: string) => string;
export type OptionType = {
    value: string;
    label: string;
};
