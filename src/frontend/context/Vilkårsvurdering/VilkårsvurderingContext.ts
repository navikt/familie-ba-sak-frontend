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
import { lagNyVilkårsvurderingMedNyttVilkår, hentVilkårsvurderingMedEkstraVilkår } from './vilkårsvurdering';

interface IProps {
    fagsak: IFagsak;
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ fagsak }: IProps) => {
    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);
    const [periodeResultater, settPeriodeResultater] = React.useState<IPeriodeResultat[]>(
        hentVilkårForPersoner(aktivBehandling?.personer)
    );

    const settVilkårForPeriodeResultat = (
        personIdent: string,
        vilkårResultat: IVilkårResultat
    ): void => {
        settPeriodeResultater(
            lagNyVilkårsvurderingMedNyttVilkår(periodeResultater, personIdent, vilkårResultat)
        );
    };

    const leggTilVilkår = (personIdent: string, vilkårType: VilkårType): void => {
        settPeriodeResultater(
            hentVilkårsvurderingMedEkstraVilkår(periodeResultater, personIdent, vilkårType)
        );
    };

    return {
        leggTilVilkår,
        periodeResultater,
        settPeriodeResultater,
        settVilkårForPeriodeResultat,
    };
});

export { VilkårsvurderingProvider, useVilkårsvurdering };
