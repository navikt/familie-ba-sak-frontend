import constate from 'constate';
import * as React from 'react';
import { IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../typer/felt';
import {
    IPersonResultat,
    IRestNyttVilkår,
    IRestPersonResultat,
    IVilkårResultat,
    VilkårType,
} from '../../typer/vilkår';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';
import { useApp } from '../AppContext';
import { mapFraRestVilkårsvurderingTilUi } from './vilkårsvurdering';

interface IProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

export enum VilkårSubmit {
    PUT,
    POST,
    DELETE,
    NONE,
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(
    ({ fagsak, åpenBehandling }: IProps) => {
        const { axiosRequest } = useApp();
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
            redigerbartVilkår: IFelt<IVilkårResultat>
        ) => {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
            settVilkårSubmit(VilkårSubmit.PUT);

            return axiosRequest<IFagsak, IRestPersonResultat>({
                method: 'PUT',
                url: `/familie-ba-sak/api/vilkaarsvurdering/${aktivBehandling?.behandlingId}/${redigerbartVilkår.verdi.id}`,
                data: {
                    personIdent: vilkårsvurderingForPerson.personIdent,
                    vilkårResultater: [
                        {
                            begrunnelse: redigerbartVilkår.verdi.begrunnelse.verdi,
                            id: redigerbartVilkår.verdi.id,
                            periodeFom: redigerbartVilkår.verdi.periode.verdi.fom,
                            periodeTom: redigerbartVilkår.verdi.periode.verdi.tom,
                            resultat: redigerbartVilkår.verdi.resultat.verdi,
                            vilkårType: redigerbartVilkår.verdi.vilkårType,
                            endretAv: redigerbartVilkår.verdi.endretAv,
                            endretTidspunkt: redigerbartVilkår.verdi.endretTidspunkt,
                            behandlingId: redigerbartVilkår.verdi.behandlingId,
                        },
                    ],
                },
            });
        };

        const deleteVilkår = (personIdent: string, vilkårId: number) => {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
            settVilkårSubmit(VilkårSubmit.DELETE);

            return axiosRequest<IFagsak, string>({
                method: 'DELETE',
                url: `/familie-ba-sak/api/vilkaarsvurdering/${aktivBehandling?.behandlingId}/${vilkårId}`,
                data: personIdent,
            });
        };

        const postVilkår = (personIdent: string, vilkårType: VilkårType) => {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
            settVilkårSubmit(VilkårSubmit.DELETE);

            return axiosRequest<IFagsak, IRestNyttVilkår>({
                method: 'POST',
                url: `/familie-ba-sak/api/vilkaarsvurdering/${aktivBehandling?.behandlingId}`,
                data: { personIdent, vilkårType },
            });
        };

        const erVilkårsvurderingenGyldig = (): boolean => {
            return (
                vilkårsvurdering.filter((personResultat: IPersonResultat) => {
                    return (
                        personResultat.vilkårResultater.filter(
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
    }
);

export { VilkårsvurderingProvider, useVilkårsvurdering };
