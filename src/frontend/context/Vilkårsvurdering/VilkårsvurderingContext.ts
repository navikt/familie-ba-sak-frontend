import constate from 'constate';
import * as React from 'react';

import { IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import {
    hentVilkårForPersoner,
    IPeriodeResultat,
    IVilkårResultat,
    VilkårType,
} from '../../typer/vilkår';
import {
    lagNyVilkårsvurderingMedNyttVilkår,
    hentVilkårsvurderingMedEkstraVilkår,
} from './vilkårsvurdering';

interface IProps {
    fagsak: IFagsak;
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ fagsak }: IProps) => {
    const [vilkårsvurdering, settVilkårsvurdering] = React.useState<IPeriodeResultat[]>([]);

    const settVilkårForPeriodeResultat = (
        personIdent: string,
        vilkårResultat: IVilkårResultat
    ): void => {
        settVilkårsvurdering(
            lagNyVilkårsvurderingMedNyttVilkår(vilkårsvurdering, personIdent, vilkårResultat)
        );
    };

    const leggTilVilkår = (personIdent: string, vilkårType: VilkårType): void => {
        settVilkårsvurdering(
            hentVilkårsvurderingMedEkstraVilkår(vilkårsvurdering, personIdent, vilkårType)
        );
    };

    return {
        leggTilVilkår,
        vilkårsvurdering,
        settVilkårsvurdering,
        settVilkårForPeriodeResultat,
    };
});

export { VilkårsvurderingProvider, useVilkårsvurdering };
