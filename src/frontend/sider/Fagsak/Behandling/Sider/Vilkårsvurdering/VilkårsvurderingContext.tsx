import * as React from 'react';

import { useHttp } from '@navikt/familie-http';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';

import { mapFraRestVilkårsvurderingTilUi } from './utils';
import type { IBehandling } from '../../../../../typer/behandling';
import type {
    IAnnenVurdering,
    IPersonResultat,
    IRestAnnenVurdering,
    IRestNyttVilkår,
    IRestPersonResultat,
    IVilkårResultat,
    VilkårType,
} from '../../../../../typer/vilkår';

interface IProps extends React.PropsWithChildren {
    åpenBehandling: IBehandling;
}

export enum VilkårSubmit {
    PUT,
    POST,
    DELETE,
    NONE,
}

interface VilkårsvurderingContextValue {
    settVilkårsvurdering: React.Dispatch<React.SetStateAction<IPersonResultat[]>>;
    vilkårsvurdering: IPersonResultat[];
    vilkårSubmit: VilkårSubmit;
    settVilkårSubmit: React.Dispatch<React.SetStateAction<VilkårSubmit>>;
    putVilkår: (
        vilkårsvurderingForPerson: IPersonResultat,
        redigerbartVilkår: FeltState<IVilkårResultat>
    ) => Promise<Ressurs<IBehandling>>;
    putAnnenVurdering: (
        redigerbartAnnenVurdering: FeltState<IAnnenVurdering>
    ) => Promise<Ressurs<IBehandling>>;
    deleteVilkår: (personIdent: string, vilkårId: number) => Promise<Ressurs<IBehandling>>;
    postVilkår: (personIdent: string, vilkårType: VilkårType) => Promise<Ressurs<IBehandling>>;
    erVilkårsvurderingenGyldig: () => boolean;
    hentVilkårMedFeil: () => IVilkårResultat[];
    hentAndreVurderingerMedFeil: () => IAnnenVurdering[];
}

const VilkårsvurderingContext = React.createContext<VilkårsvurderingContextValue | undefined>(
    undefined
);

export const VilkårsvurderingProvider = ({ åpenBehandling, children }: IProps) => {
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

        return request<IRestPersonResultat, IBehandling>({
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
                        resultat: redigerbartVilkår.verdi.resultat.verdi,
                        resultatBegrunnelse: redigerbartVilkår.verdi.resultatBegrunnelse,
                        erEksplisittAvslagPåSøknad:
                            redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad,
                        avslagBegrunnelser: redigerbartVilkår.verdi.avslagBegrunnelser.verdi,
                        vilkårType: redigerbartVilkår.verdi.vilkårType,
                        vurderesEtter: redigerbartVilkår.verdi.vurderesEtter,
                        utdypendeVilkårsvurderinger:
                            redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi,
                    },
                ],
                andreVurderinger: [],
            },
        });
    };

    const putAnnenVurdering = (redigerbartAnnenVurdering: FeltState<IAnnenVurdering>) => {
        settVilkårSubmit(VilkårSubmit.PUT);

        return request<IRestAnnenVurdering, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${åpenBehandling?.behandlingId}/annenvurdering/${redigerbartAnnenVurdering.verdi.id}`,
            data: {
                id: redigerbartAnnenVurdering.verdi.id,
                begrunnelse: redigerbartAnnenVurdering.verdi.begrunnelse.verdi,
                behandlingId: redigerbartAnnenVurdering.verdi.behandlingId,
                endretAv: redigerbartAnnenVurdering.verdi.endretAv,
                endretTidspunkt: redigerbartAnnenVurdering.verdi.endretTidspunkt,
                erVurdert: redigerbartAnnenVurdering.verdi.erVurdert,
                resultat: redigerbartAnnenVurdering.verdi.resultat.verdi,
                type: redigerbartAnnenVurdering.verdi.type,
            },
        });
    };

    const deleteVilkår = (personIdent: string, vilkårId: number) => {
        settVilkårSubmit(VilkårSubmit.DELETE);

        return request<string, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${åpenBehandling?.behandlingId}/${vilkårId}`,
            data: personIdent,
        });
    };

    const postVilkår = (personIdent: string, vilkårType: VilkårType) => {
        settVilkårSubmit(VilkårSubmit.DELETE);

        return request<IRestNyttVilkår, IBehandling>({
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
                    ).length > 0 ||
                    personResultat.andreVurderinger.filter(
                        (annenVurdering: FeltState<IAnnenVurdering>) =>
                            annenVurdering.valideringsstatus !== Valideringsstatus.OK
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

    const hentAndreVurderingerMedFeil = (): IAnnenVurdering[] => {
        return vilkårsvurdering.reduce(
            (accAndreVurderingerMedFeil: IAnnenVurdering[], personResultat: IPersonResultat) => {
                return [
                    ...accAndreVurderingerMedFeil,
                    ...personResultat.andreVurderinger
                        .filter(
                            (vilkårResultat: FeltState<IAnnenVurdering>) =>
                                vilkårResultat.valideringsstatus === Valideringsstatus.FEIL
                        )
                        .map((annenVurdering: FeltState<IAnnenVurdering>) => annenVurdering.verdi),
                ];
            },
            []
        );
    };

    return (
        <VilkårsvurderingContext.Provider
            value={{
                deleteVilkår,
                postVilkår,
                erVilkårsvurderingenGyldig,
                hentVilkårMedFeil,
                hentAndreVurderingerMedFeil,
                vilkårSubmit,
                putVilkår,
                putAnnenVurdering,
                settVilkårSubmit,
                settVilkårsvurdering,
                vilkårsvurdering,
            }}
        >
            {children}
        </VilkårsvurderingContext.Provider>
    );
};

export const useVilkårsvurderingContext = () => {
    const context = React.useContext(VilkårsvurderingContext);

    if (context === undefined) {
        throw new Error(
            'useVilkårsvurderingContext må brukes innenfor en VilkårsvurderingProvider'
        );
    }
    return context;
};
