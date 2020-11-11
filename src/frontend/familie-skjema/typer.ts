import { Ressurs } from '@navikt/familie-typer';
import { ChangeEvent } from 'react';

export interface FeltState<Value> {
    feilmelding: string;
    valider: ValiderFelt<Value>;
    valideringsstatus: Valideringsstatus;
    value: Value;
}

export interface Felt<Value> {
    feilmelding: string;
    onChange(value: Value | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void;
    nullstill(): void;
    valider: ValiderFelt<Value>;
    valideringsstatus: Valideringsstatus;
    value: Value;
    hentNavInputProps(visFeilmelding: boolean): NavInputProps<Value>;
}

export interface NavInputProps<Value> {
    id: string;
    name: string;
    feil: string | undefined;
    value: Value;
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

export interface FieldBag {
    [key: string]: FieldDictionary<unknown>;
}

export interface ISkjema<Felter extends FieldBag, SkjemaRespons> {
    felter: FieldDictionary<Felter>;
    skjemanavn: string;
    submitRessurs: Ressurs<SkjemaRespons>;
    visFeilmeldinger: boolean;
}
