import { Ressurs } from '@navikt/familie-typer';
import { ChangeEvent } from 'react';

export interface FeltState<Value> {
    feilmelding: string;
    valider: ValiderFelt<Value>;
    valideringsstatus: Valideringsstatus;
    value: Value;
}

export type FeltOnChange<Value> = (
    value: Value | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => void;

export interface Felt<Value> {
    feilmelding: string;
    hentNavInputProps(visFeilmelding: boolean): NavInputProps<Value>;
    nullstill(): void;
    onChange: FeltOnChange<Value>;
    valider: ValiderFelt<Value>;
    valideringsstatus: Valideringsstatus;
    value: Value;
}

export interface NavInputProps<Value> {
    feil: string | undefined;
    id: string;
    name: string;
    onChange: FeltOnChange<Value>;
    value: Value;
}

export enum Valideringsstatus {
    FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
    OK = 'OK',
    IKKE_VALIDERT = 'IKKE_VALIDERT',
}

// eslint-disable-next-line
export type Valideringscontext = { [key: string]: any };
export type ValiderFelt<Verdi> = (
    felt: FeltState<Verdi>,
    valideringscontext?: Valideringscontext
) => FeltState<Verdi>;

export const defaultValidator = <Verdi>(felt: FeltState<Verdi>) => ({
    ...felt,
    valideringsstatus: Valideringsstatus.OK,
});

export type FieldDictionary<Record extends unknown> = {
    [Key in keyof Record]: Felt<Record[Key]>;
};

export interface ISkjema<Felter, SkjemaRespons> {
    felter: FieldDictionary<Felter>;
    submitRessurs: Ressurs<SkjemaRespons>;
    skjemanavn: string;
    visFeilmeldinger: boolean;
}
