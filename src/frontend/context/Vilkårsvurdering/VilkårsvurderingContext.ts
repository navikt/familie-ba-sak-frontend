import constate from 'constate';
import * as React from 'react';

import { IFagsak } from '../../typer/fagsak';
import {
    hentVilkårForPersoner,
    IPersonResultat,
    IVilkårResultat,
    VilkårType,
} from '../../typer/vilkår';
import {
    lagNyVilkårsvurderingMedNyttVilkår,
    hentVilkårsvurderingMedEkstraVilkår,
} from './vilkårsvurdering';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';
import { kjørValidering } from './validering';
import { Valideringsstatus, IFelt } from '../../typer/felt';

interface IProps {
    fagsak: IFagsak;
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ fagsak }: IProps) => {
    const [vilkårsvurdering, settVilkårsvurdering] = React.useState<IPersonResultat[]>(
        hentVilkårForPersoner(hentAktivBehandlingPåFagsak(fagsak)?.personer ?? [])
    );

    const settVilkårForPeriodeResultat = (
        personIdent: string,
        vilkårResultat: IFelt<IVilkårResultat>
    ): void => {
        settVilkårsvurdering(
            kjørValidering(
                lagNyVilkårsvurderingMedNyttVilkår(vilkårsvurdering, personIdent, vilkårResultat)
            )
        );
    };

    const leggTilVilkår = (personIdent: string, vilkårType: VilkårType): void => {
        settVilkårsvurdering(
            kjørValidering(
                hentVilkårsvurderingMedEkstraVilkår(vilkårsvurdering, personIdent, vilkårType)
            )
        );
    };

    const erVilkårsvurderingenGyldig = (): boolean => {
        return (
            vilkårsvurdering.filter((periodeResultat: IPersonResultat) => {
                return (
                    periodeResultat.vilkårResultater.filter(
                        (vilkårResultat: IFelt<IVilkårResultat>) =>
                            vilkårResultat.valideringsstatus !== Valideringsstatus.OK
                    ).length > 0
                );
            }).length === 0
        );
    };

    const hentVilkårMedFeil = (): IVilkårResultat[] => {
        return vilkårsvurdering.reduce(
            (accVilkårMedFeil: IVilkårResultat[], personResultat: IPersonResultat) => {
                return [
                    ...accVilkårMedFeil,
                    ...personResultat.vilkårResultater
                        .filter(
                            (vilkårResultat: IFelt<IVilkårResultat>) =>
                                vilkårResultat.valideringsstatus === Valideringsstatus.FEIL
                        )
                        .map((vilkårResultat: IFelt<IVilkårResultat>) => vilkårResultat.verdi),
                ];
            },
            []
        );
    };

    return {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        leggTilVilkår,
        settVilkårForPeriodeResultat,
        settVilkårsvurdering,
        vilkårsvurdering,
    };
});

export { VilkårsvurderingProvider, useVilkårsvurdering };
