import type { IRestPersonResultat } from '@typer/vilkår';

export function lagPersonResultat(personResultat: Partial<IRestPersonResultat>): IRestPersonResultat {
    return {
        personIdent: '12345678903',
        vilkårResultater: [],
        andreVurderinger: [],
        ...personResultat,
    };
}
