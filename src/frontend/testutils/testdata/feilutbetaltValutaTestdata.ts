import type { IRestFeilutbetaltValuta } from '@typer/eøs-feilutbetalt-valuta';

export function lagFeilutbetaltValuta(feilutbetaltValuta?: Partial<IRestFeilutbetaltValuta>): IRestFeilutbetaltValuta {
    return {
        id: 1,
        fom: '2024-01-01',
        tom: '2024-03-31',
        feilutbetaltBeløp: 500,
        ...feilutbetaltValuta,
    };
}

export * as FeilutbetaltValutaTestdata from './feilutbetaltValutaTestdata';
