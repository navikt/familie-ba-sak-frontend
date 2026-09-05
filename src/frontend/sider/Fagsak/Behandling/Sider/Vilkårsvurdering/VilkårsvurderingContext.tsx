import { useBehandling } from '@hooks/useBehandling';
import type { IPersonResultat, IRestAnnenVurdering, IRestVilkårResultat } from '@typer/vilkår';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';

import { mapFraRestPersonResultatTilPersonResultat } from './utils';
import { erAnnenVurderingGyldig, erVilkårResultatGyldig } from './validering';

interface VilkårsvurderingContextValue {
    vilkårsvurdering: IPersonResultat[];
    vilkårMedFeil: IRestVilkårResultat[];
    andreVurderingerMedFeil: IRestAnnenVurdering[];
    erVilkårsvurderingenGyldig: boolean;
}

const VilkårsvurderingContext = createContext<VilkårsvurderingContextValue | undefined>(undefined);

export function VilkårsvurderingProvider({ children }: PropsWithChildren) {
    const behandling = useBehandling();

    const value = useMemo<VilkårsvurderingContextValue>(() => {
        const vilkårsvurdering = mapFraRestPersonResultatTilPersonResultat(
            behandling.personResultater,
            behandling.personer
        );

        const vilkårMedFeil = vilkårsvurdering.flatMap(personResultat =>
            personResultat.vilkårResultater.filter(
                vilkårResultat => !erVilkårResultatGyldig(vilkårResultat, personResultat.person)
            )
        );

        const andreVurderingerMedFeil = vilkårsvurdering.flatMap(personResultat =>
            personResultat.andreVurderinger.filter(annenVurdering => !erAnnenVurderingGyldig(annenVurdering))
        );

        return {
            vilkårsvurdering,
            vilkårMedFeil,
            andreVurderingerMedFeil,
            erVilkårsvurderingenGyldig: vilkårMedFeil.length === 0 && andreVurderingerMedFeil.length === 0,
        };
    }, [behandling]);

    return <VilkårsvurderingContext.Provider value={value}>{children}</VilkårsvurderingContext.Provider>;
}

export function useVilkårsvurderingContext() {
    const context = useContext(VilkårsvurderingContext);

    if (context === undefined) {
        throw new Error('useVilkårsvurderingContext må brukes innenfor en VilkårsvurderingProvider');
    }
    return context;
}
