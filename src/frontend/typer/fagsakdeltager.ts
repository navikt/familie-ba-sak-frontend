import type { Adressebeskyttelsegradering, kjønnType } from '@navikt/familie-typer';

import type { FagsakType } from './fagsak';

export enum FagsakDeltagerRolle {
    Barn = 'BARN',
    Forelder = 'FORELDER',
    Ukjent = 'UKJENT',
}

export interface IFagsakDeltager {
    navn?: string;
    ident: string;
    rolle: FagsakDeltagerRolle;
    kjønn?: kjønnType;
    fagsakId?: number;
    adressebeskyttelseGradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
    fagsakType?: FagsakType;
    erEgenAnsatt: boolean;
}

export interface ISøkParam {
    personIdent: string;
}
