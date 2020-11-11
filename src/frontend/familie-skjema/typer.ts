import { Ressurs } from '@navikt/familie-typer';
import { ChangeEvent } from 'react';

export interface FeltState<Verdi> {
    feilmelding: string;
    valider: ValiderFelt<Verdi>;
    valideringsstatus: Valideringsstatus;
    verdi: Verdi;
}

export type FeltOnChange<Verdi> = (
    verdi: Verdi | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => void;

export interface Felt<Verdi> {
    feilmelding: string;
    hentNavInputProps(visFeilmelding: boolean): NavInputProps<Verdi>;
    nullstill(): void;
    onChange: FeltOnChange<Verdi>;
    valider: ValiderFelt<Verdi>;
    valideringsstatus: Valideringsstatus;
    verdi: Verdi;
}

export interface NavInputProps<Verdi> {
    feil: string | undefined;
    id: string;
    name: string;
    onChange: FeltOnChange<Verdi>;
    value: Verdi;
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
