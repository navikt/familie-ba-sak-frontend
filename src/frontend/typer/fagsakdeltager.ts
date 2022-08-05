import type { Adressebeskyttelsegradering, kjønnType } from '@navikt/familie-typer';

import type { FagsakType } from './fagsak';

export enum FagsakDeltagerRolle {
    Barn = 'BARN',
    Forelder = 'FORELDER',
    Ukjent = 'UKJENT',
}

export const fagsakdeltagerRoller: Record<FagsakDeltagerRolle, Record<kjønnType, string>> = {
    BARN: {
        MANN: 'BARN',
        KVINNE: 'BARN',
        UKJENT: 'BARN',
    },
    FORELDER: {
        MANN: 'FAR',
        KVINNE: 'MOR',
        UKJENT: 'FORELDER',
    },
    UKJENT: {
        MANN: '',
        KVINNE: '',
        UKJENT: '',
    },
};

export interface IFagsakDeltager {
    navn?: string;
    ident: string;
    rolle: FagsakDeltagerRolle;
    kjønn?: kjønnType;
    fagsakId?: number;
    adressebeskyttelseGradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
    fagsakType?: FagsakType;
}

export interface ISøkParam {
    personIdent: string;
}
