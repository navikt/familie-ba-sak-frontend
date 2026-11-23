import { kjønnType } from '@navikt/familie-typer';
import { FagsakId } from '@typer/fagsak';

import { FagsakDeltagerRolle, type IFagsakDeltager } from '../../typer/fagsakdeltager';

export function lagFagsakDeltager(fagsakDeltager: Partial<IFagsakDeltager> = {}): IFagsakDeltager {
    return {
        navn: 'Test Testersen',
        ident: '12345678910',
        rolle: FagsakDeltagerRolle.Forelder,
        kjønn: kjønnType.MANN,
        fagsakId: FagsakId.fra(1),
        harTilgang: true,
        erEgenAnsatt: false,
        ...fagsakDeltager,
    };
}

export * as FagsakDeltagerTestdata from './fagsakDeltagerTestdata';
