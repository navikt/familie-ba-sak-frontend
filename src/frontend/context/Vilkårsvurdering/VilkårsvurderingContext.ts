import * as React from 'react';

import constate from 'constate';

import { useHttp } from '@navikt/familie-http';
import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';

import { IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import {
    IPersonResultat,
    IRestNyttVilkår,
    IRestPersonResultat,
    IVilkårResultat,
    VilkårType,
} from '../../typer/vilkår';
import { mapFraRestVilkårsvurderingTilUi, mapFraUiTilRestResultat } from './vilkårsvurdering';

interface IProps {
    åpenBehandling: IBehandling;
}

export enum VilkårSubmit {
    PUT,
    POST,
    DELETE,
    NONE,
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ åpenBehandling }: IProps) => {
    const { request } = useHttp();
    const [vilkårSubmit, settVilkårSubmit] = React.useState(VilkårSubmit.NONE);

    const [vilkårsvurdering, settVilkårsvurdering] = React.useState<IPersonResultat[]>(
        åpenBehandling
            ? mapFraRestVilkårsvurderingTilUi(
                  åpenBehandling.personResultater,
                  åpenBehandling.personer
              )
            : []
    );

    React.useEffect(() => {
        settVilkårsvurdering(
            åpenBehandling
                ? mapFraRestVilkårsvurderingTilUi(
                      åpenBehandling.personResultater,
                      åpenBehandling.personer
                  )
                : []
        );
    }, [åpenBehandling]);

    const putVilkår = (
        vilkårsvurderingForPerson: IPersonResultat,
        redigerbartVilkår: FeltState<IVilkårResultat>
    ) => {
        settVilkårSubmit(VilkårSubmit.PUT);

        return request<IRestPersonResultat, IFagsak>({
            method: 'PUT',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${åpenBehandling?.behandlingId}/${redigerbartVilkår.verdi.id}`,
            data: {
                personIdent: vilkårsvurderingForPerson.personIdent,
                vilkårResultater: [
                    {
                        begrunnelse: redigerbartVilkår.verdi.begrunnelse.verdi,
                        behandlingId: redigerbartVilkår.verdi.behandlingId,
                        endretAv: redigerbartVilkår.verdi.endretAv,
                        endretTidspunkt: redigerbartVilkår.verdi.endretTidspunkt,
                        erAutomatiskVurdert: redigerbartVilkår.verdi.erAutomatiskVurdert,
                        erVurdert: redigerbartVilkår.verdi.erVurdert,
                        id: redigerbartVilkår.verdi.id,
                        periodeFom: redigerbartVilkår.verdi.periode.verdi.fom,
                        periodeTom: redigerbartVilkår.verdi.periode.verdi.tom,
                        resultat: mapFraUiTilRestResultat(
                            redigerbartVilkår.verdi.resultat.verdi,
                            redigerbartVilkår.verdi.erAvslag
                        ),
                        vilkårType: redigerbartVilkår.verdi.vilkårType,
                    },
                ],
            },
        });
    };

    const deleteVilkår = (personIdent: string, vilkårId: number) => {
        settVilkårSubmit(VilkårSubmit.DELETE);

        return request<string, IFagsak>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${åpenBehandling?.behandlingId}/${vilkårId}`,
            data: personIdent,
        });
    };

    const postVilkår = (personIdent: string, vilkårType: VilkårType) => {
        settVilkårSubmit(VilkårSubmit.DELETE);

        return request<IRestNyttVilkår, IFagsak>({
            method: 'POST',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${åpenBehandling?.behandlingId}`,
            data: { personIdent, vilkårType },
        });
    };

    const erVilkårsvurderingenGyldig = (): boolean => {
        return (
            vilkårsvurdering.filter((personResultat: IPersonResultat) => {
                return (
                    personResultat.vilkårResultater.filter(
                        (vilkårResultat: FeltState<IVilkårResultat>) =>
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
                            (vilkårResultat: FeltState<IVilkårResultat>) =>
                                vilkårResultat.valideringsstatus === Valideringsstatus.FEIL
                        )
                        .map((vilkårResultat: FeltState<IVilkårResultat>) => vilkårResultat.verdi),
                ];
            },
            []
        );
    };

    return {
        deleteVilkår,
        postVilkår,
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        vilkårSubmit,
        putVilkår,
        settVilkårSubmit,
        settVilkårsvurdering,
        vilkårsvurdering,
    };
});

export { VilkårsvurderingProvider, useVilkårsvurdering };
