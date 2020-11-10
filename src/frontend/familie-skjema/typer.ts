import { Ressurs } from '@navikt/familie-typer';
import { ChangeEvent } from 'react';

export interface FeltState<Verdi> {
    feilmelding: string;
    valider: ValiderFelt<Verdi>;
    valideringsstatus: Valideringsstatus;
    verdi: Verdi;
}

export interface Felt<Verdi> {
    feilmelding: string;
    onChange(value: Verdi | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void;
    nullstill(): void;
    valider: ValiderFelt<Verdi>;
    valideringsstatus: Valideringsstatus;
    verdi: Verdi;
}

export enum Valideringsstatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

// eslint-disable-next-line
export type ValiderFelt<Verdi, Context = {}> = (
    felt: FeltState<Verdi>,
    context: Context
) => FeltState<Verdi>;

export const defaultValidator = <Verdi>(felt: FeltState<Verdi>) => ({
    ...felt,
    valideringsstatus: Valideringsstatus.OK,
});

export type FieldDictionary<Record extends unknown> = {
    [Key in keyof Record]: Felt<Record[Key]>;
};

export type FieldOutput<T extends unknown> = FieldDictionary<T> | Felt<T> | FieldDictionary<T>[];

export interface FieldBag {
    [key: string]: FieldOutput<unknown>;
}

export interface ISkjema<Felter extends FieldBag, SkjemaRespons> {
    felter: FieldDictionary<Felter>;
    skjemanavn: string;
    submitRessurs: Ressurs<SkjemaRespons>;
    visFeilmeldinger: boolean;
}
