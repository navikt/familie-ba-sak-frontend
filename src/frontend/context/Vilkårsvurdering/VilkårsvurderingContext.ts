import constate from 'constate';
import * as React from 'react';
import { IBehandling } from '../../typer/behandling';
import { IFagsak } from '../../typer/fagsak';
import { IFelt, Valideringsstatus } from '../../typer/felt';
import { PersonType } from '../../typer/person';
import { IPersonResultat, IRestPersonResultat, IVilkårResultat } from '../../typer/vilkår';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';
import { useApp } from '../AppContext';
import { mapFraRestVilkårsvurderingTilUi } from './vilkårsvurdering';

interface IProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(
    ({ fagsak, åpenBehandling }: IProps) => {
        const { axiosRequest } = useApp();
        const [lagrerVilkår, settLagrerVilkår] = React.useState(false);

        const [vilkårsvurdering, settVilkårsvurdering] = React.useState<IPersonResultat[]>(
            åpenBehandling
                ? mapFraRestVilkårsvurderingTilUi(
                      åpenBehandling.personResultater,
                      åpenBehandling.personer
                  ).sort((personResultat: IPersonResultat) =>
                      personResultat.person.type === PersonType.SØKER ? -1 : 1
                  )
                : []
        );

        const settVilkårsvurderingFraApi = (personResultater: IRestPersonResultat[]) => {
            settVilkårsvurdering(
                åpenBehandling
                    ? mapFraRestVilkårsvurderingTilUi(
                          personResultater,
                          åpenBehandling.personer
                      ).sort((personResultat: IPersonResultat) =>
                          personResultat.person.type === PersonType.SØKER ? -1 : 1
                      )
                    : []
            );
        };

        const putVilkår = (
            vilkårsvurderingForPerson: IPersonResultat,
            redigerbartVilkår: IFelt<IVilkårResultat>
        ) => {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
            settLagrerVilkår(true);
            return axiosRequest<IRestPersonResultat[], IRestPersonResultat>({
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
                        },
                    ],
                },
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
            lagrerVilkår,
            settLagrerVilkår,
            erVilkårsvurderingenGyldig,
            hentVilkårMedFeil,
            putVilkår,
            settVilkårsvurdering,
            settVilkårsvurderingFraApi,
            vilkårsvurdering,
        };
    }
);

export { VilkårsvurderingProvider, useVilkårsvurdering };
