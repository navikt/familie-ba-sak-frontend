import { kjønnType } from '@navikt/familie-typer';
import type { NoBrand } from '@typer/brand';
import { FagsakId } from '@typer/fagsak';

import { FagsakDeltagerRolle, type IFagsakDeltager } from '@typer/fagsakdeltager';

export function lagFagsakDeltager(fagsakDeltager: Partial<NoBrand<IFagsakDeltager>> = {}): IFagsakDeltager {
    const { fagsakId = 'fagsakId' in fagsakDeltager ? undefined : 1, ...resten } = fagsakDeltager;
    return {
        navn: 'Test Testersen',
        ident: '12345678910',
        rolle: FagsakDeltagerRolle.Forelder,
        kjønn: kjønnType.MANN,
        harTilgang: true,
        erEgenAnsatt: false,
        ...resten,
        fagsakId: fagsakId === undefined ? undefined : FagsakId.fra(fagsakId),
    };
}

export * as FagsakDeltagerTestdata from './fagsakDeltagerTestdata';
