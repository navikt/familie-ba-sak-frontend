import { kjønnType } from '@navikt/familie-typer';

export enum FagsakDeltagerRolle {
    Barn = 'BARN',
    Forelder = 'FORELDER',
}

export interface IFagsakDeltager {
    navn: string;
    ident: string;
    rolle: FagsakDeltagerRolle;
    kjønn?: kjønnType;
    fagsakId?: string;
}
