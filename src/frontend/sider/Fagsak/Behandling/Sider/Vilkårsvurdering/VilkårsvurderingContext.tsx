import { useBehandling } from '@hooks/useBehandling';
import { useHttp } from '@navikt/familie-http';
import type { FeltState } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import type { IBehandling } from '@typer/behandling';
import type {
    IPersonResultat,
    IRestAnnenVurdering,
    IRestNyttVilkår,
    IRestPersonResultat,
    IVilkårResultat,
    VilkårType,
} from '@typer/vilkår';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { mapFraRestVilkårsvurderingTilUi } from './utils';
import { erAnnenVurderingGyldig } from './validering';

export enum VilkårSubmit {
    PUT,
    POST,
    DELETE,
    NONE,
}

interface VilkårsvurderingContextValue {
    settVilkårsvurdering: Dispatch<SetStateAction<IPersonResultat[]>>;
    vilkårsvurdering: IPersonResultat[];
    vilkårSubmit: VilkårSubmit;
    settVilkårSubmit: Dispatch<SetStateAction<VilkårSubmit>>;
    putVilkår: (
        vilkårsvurderingForPerson: IPersonResultat,
        redigerbartVilkår: FeltState<IVilkårResultat>
    ) => Promise<Ressurs<IBehandling>>;
    postVilkår: (personIdent: string, vilkårType: VilkårType) => Promise<Ressurs<IBehandling>>;
    erVilkårsvurderingenGyldig: () => boolean;
    hentVilkårMedFeil: () => IVilkårResultat[];
    hentAndreVurderingerMedFeil: () => IRestAnnenVurdering[];
}

const VilkårsvurderingContext = createContext<VilkårsvurderingContextValue | undefined>(undefined);

export const VilkårsvurderingProvider = ({ children }: PropsWithChildren) => {
    const { request } = useHttp();

    const behandling = useBehandling();

    const [vilkårSubmit, settVilkårSubmit] = useState(VilkårSubmit.NONE);

    const [vilkårsvurdering, settVilkårsvurdering] = useState<IPersonResultat[]>(
        mapFraRestVilkårsvurderingTilUi(behandling.personResultater, behandling.personer)
    );

    useEffect(() => {
        settVilkårsvurdering(mapFraRestVilkårsvurderingTilUi(behandling.personResultater, behandling.personer));
    }, [behandling]);

    const putVilkår = (vilkårsvurderingForPerson: IPersonResultat, redigerbartVilkår: FeltState<IVilkårResultat>) => {
        settVilkårSubmit(VilkårSubmit.PUT);

        return request<IRestPersonResultat, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${behandling.behandlingId}/${redigerbartVilkår.verdi.id}`,
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
                        erEksplisittAvslagPåSøknad: redigerbartVilkår.verdi.erEksplisittAvslagPåSøknad,
                        avslagBegrunnelser: redigerbartVilkår.verdi.avslagBegrunnelser.verdi,
                        vilkårType: redigerbartVilkår.verdi.vilkårType,
                        vurderesEtter: redigerbartVilkår.verdi.vurderesEtter,
                        utdypendeVilkårsvurderinger: redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi,
                        begrunnelseForManuellKontroll: redigerbartVilkår.verdi.begrunnelseForManuellKontroll,
                        erOpprinneligPreutfyltIBehandling: redigerbartVilkår.verdi.erOpprinneligPreutfyltIBehandling,
                    },
                ],
                andreVurderinger: [],
            },
        });
    };

    const postVilkår = (personIdent: string, vilkårType: VilkårType) => {
        settVilkårSubmit(VilkårSubmit.DELETE);

        return request<IRestNyttVilkår, IBehandling>({
            method: 'POST',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${behandling.behandlingId}`,
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
                    personResultat.andreVurderinger.some(annenVurdering => !erAnnenVurderingGyldig(annenVurdering))
                );
            }).length === 0
        );
    };

    const hentVilkårMedFeil = (): IVilkårResultat[] => {
        return vilkårsvurdering.reduce((accVilkårMedFeil: IVilkårResultat[], personResultat: IPersonResultat) => {
            return [
                ...accVilkårMedFeil,
                ...personResultat.vilkårResultater
                    .filter(
                        (vilkårResultat: FeltState<IVilkårResultat>) =>
                            vilkårResultat.valideringsstatus === Valideringsstatus.FEIL
                    )
                    .map((vilkårResultat: FeltState<IVilkårResultat>) => vilkårResultat.verdi),
            ];
        }, []);
    };

    const hentAndreVurderingerMedFeil = (): IRestAnnenVurdering[] => {
        return vilkårsvurdering.flatMap((personResultat: IPersonResultat) =>
            personResultat.andreVurderinger.filter(annenVurdering => !erAnnenVurderingGyldig(annenVurdering))
        );
    };

    return (
        <VilkårsvurderingContext.Provider
            value={{
                postVilkår,
                erVilkårsvurderingenGyldig,
                hentVilkårMedFeil,
                hentAndreVurderingerMedFeil,
                vilkårSubmit,
                putVilkår,
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
    const context = useContext(VilkårsvurderingContext);

    if (context === undefined) {
        throw new Error('useVilkårsvurderingContext må brukes innenfor en VilkårsvurderingProvider');
    }
    return context;
};
