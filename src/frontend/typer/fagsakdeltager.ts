import { kjønnType } from '@navikt/familie-typer';
import { Adressebeskyttelsegradering } from '../../../node_dist/frontend/typer/person';

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
    adressebeskyttelsegradering?: Adressebeskyttelsegradering;
    harTilgang: boolean;
}

export interface ISøkParam {
    personIdent: string;
}
