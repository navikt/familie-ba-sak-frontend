import { createContext, type PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna } from '@typer/behandling';
import { FeatureToggle } from '@typer/featureToggles';
import { Resultat, VilkårType } from '@typer/vilkår';

const RELEVANTE_VILKÅR_TYPER_FOR_KOPIERTE_VILKÅR = [VilkårType.BOR_MED_SØKER, VilkårType.BOSATT_I_RIKET];

function useInitielleEkspanderteIder(): Set<number> {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const toggles = useFeatureToggles();

    const vilkårResultater = behandling.personResultater.flatMap(it => it.vilkårResultater);

    if (erLesevisning) {
        const initielleIder = vilkårResultater.map(it => it.id);
        return new Set(initielleIder);
    }

    const vilkårResultatSomIkkeErVurdert = vilkårResultater
        .filter(it => it.resultat === Resultat.IKKE_VURDERT)
        .map(it => it.id);

    const erBehandlingMedKopieringsmuligheter = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);

    if (toggles[FeatureToggle.kanGenerereBarnasVilkar] && erBehandlingMedKopieringsmuligheter) {
        const ukompletteKopierteVilkårResultat = vilkårResultater
            .filter(it => RELEVANTE_VILKÅR_TYPER_FOR_KOPIERTE_VILKÅR.includes(it.vilkårType))
            .filter(it => it.utdypendeVilkårsvurderinger.length === 0)
            .map(it => it.id);
        return new Set<number>([...vilkårResultatSomIkkeErVurdert, ...ukompletteKopierteVilkårResultat]);
    } else {
        return new Set<number>(vilkårResultatSomIkkeErVurdert);
    }
}

interface VilkårResultPanelerContext {
    erVilkårResultatPanelEkspandert: (id: number) => boolean;
    åpneVilkårResultatPanel: (id: number) => void;
    lukkVilkårResultatPanel: (id: number) => void;
}

const Context = createContext<VilkårResultPanelerContext | undefined>(undefined);

export function VilkårResultatPanelerProvider({ children }: PropsWithChildren) {
    const initielleEkspanderteIdenter = useInitielleEkspanderteIder();

    const [ekspanderteIder, settEkspanderteIder] = useState<Set<number>>(initielleEkspanderteIdenter);

    const erVilkårResultatPanelEkspandert = useCallback((id: number) => ekspanderteIder.has(id), [ekspanderteIder]);

    const åpneVilkårResultatPanel = useCallback((id: number) => {
        settEkspanderteIder(forrige => {
            const neste = new Set(forrige);
            neste.add(id);
            return neste;
        });
    }, []);

    const lukkVilkårResultatPanel = useCallback((id: number) => {
        settEkspanderteIder(forrige => {
            const neste = new Set(forrige);
            neste.delete(id);
            return neste;
        });
    }, []);

    const value = useMemo(
        () => ({ erVilkårResultatPanelEkspandert, åpneVilkårResultatPanel, lukkVilkårResultatPanel }),
        [erVilkårResultatPanelEkspandert, åpneVilkårResultatPanel, lukkVilkårResultatPanel]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useVilkårResultatPaneler() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useVilkårResultatPaneler må brukes innenfor en VilkårResultatPanelerProvider.');
    }
    return context;
}

export function useVilkårResultatPanel(id: number) {
    const { erVilkårResultatPanelEkspandert, åpneVilkårResultatPanel, lukkVilkårResultatPanel } =
        useVilkårResultatPaneler();

    const erVilkårResultatEkspandert = erVilkårResultatPanelEkspandert(id);
    const åpneVilkårResultat = useCallback(() => åpneVilkårResultatPanel(id), [åpneVilkårResultatPanel, id]);
    const lukkVilkårResultat = useCallback(() => lukkVilkårResultatPanel(id), [lukkVilkårResultatPanel, id]);

    return useMemo(
        () => ({ erVilkårResultatEkspandert, åpneVilkårResultat, lukkVilkårResultat }),
        [erVilkårResultatEkspandert, åpneVilkårResultat, lukkVilkårResultat]
    );
}
