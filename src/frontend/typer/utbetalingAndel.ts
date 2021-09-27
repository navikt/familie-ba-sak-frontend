import webpack from 'webpack';

import { ISODateString, OptionType } from '@navikt/familie-form-elements';

export interface IRestEndretUtbetalingAndel {
    id?: number;
    personIdent?: string;
    prosent?: number;
    fom?: ISODateString;
    tom?: ISODateString;
    begrunnelse?: string;
    årsak?: IEndretUtbetalingAndelÅrsak;
}

export enum IEndretUtbetalingAndelÅrsak {
    DELT_BOSTED = 'DELT_BOSTED',
}

export const årsakTekst: { [key in IEndretUtbetalingAndelÅrsak]: string } = {
    DELT_BOSTED: 'Delt bosted',
};

export interface ÅrsakOption extends OptionType {
    årsak: IEndretUtbetalingAndelÅrsak;
}

export const årsakTilOption = (årsak: IEndretUtbetalingAndelÅrsak): ÅrsakOption => ({
    value: årsak.valueOf(),
    label: årsakTekst[årsak],
    årsak: årsak,
});

export const årsaker: IEndretUtbetalingAndelÅrsak[] = Object.keys(IEndretUtbetalingAndelÅrsak).map(
    k => k as IEndretUtbetalingAndelÅrsak
);
