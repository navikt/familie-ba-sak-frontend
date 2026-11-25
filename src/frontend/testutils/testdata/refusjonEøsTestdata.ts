import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';

export function lagRefusjonEøs(refusjonEøs?: Partial<IRestRefusjonEøs>): IRestRefusjonEøs {
    return {
        id: 1,
        fom: '2024-01-01',
        tom: '2024-03-31',
        refusjonsbeløp: 500,
        land: 'SE',
        refusjonAvklart: true,
        ...refusjonEøs,
    };
}

export * as RefusjonEøsTestdata from './refusjonEøsTestdata';
