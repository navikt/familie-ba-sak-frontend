import { ISODateString, OptionType } from '@navikt/familie-form-elements';

export interface IRestEndretUtbetalingAndel {
    personIdent: string;
    prosent: number;
    fom: ISODateString;
    tom: ISODateString;
    begrunnelse: string;
    årsak: IEndretUtbetalingAndelÅrsak;
}

export enum IEndretUtbetalingAndelÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
}

export interface ÅrsakOption extends OptionType {
    årsak: IEndretUtbetalingAndelÅrsak;
}

export const årsaker: IEndretUtbetalingAndelÅrsak[] = Object.keys(IEndretUtbetalingAndelÅrsak).map(
    k => k as IEndretUtbetalingAndelÅrsak
);

const snakeCaseTilSentenceCase = (snakeCase: string) =>
    snakeCase
        .split('_')
        .join(' ')
        .toLowerCase()
        .replace(/\w/, førsteBokstav => førsteBokstav.toUpperCase());

export const årsakOptions: ÅrsakOption[] = årsaker.map(årsak => ({
    value: årsak.valueOf(),
    label: snakeCaseTilSentenceCase(årsak.valueOf()),
    årsak: årsak,
}));
