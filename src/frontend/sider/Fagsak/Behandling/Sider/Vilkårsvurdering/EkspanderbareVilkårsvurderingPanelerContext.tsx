import { createContext, type PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna } from '@typer/behandling';
import { FeatureToggle } from '@typer/featureToggles';
import { Resultat, VilkårType } from '@typer/vilkår';

const RELEVANTE_VILKÅR_TYPER_FOR_KOPIERTE_VILKÅR = [VilkårType.BOR_MED_SØKER, VilkårType.BOSATT_I_RIKET];

function useInitielleEkspanderteIdenter(): Set<string> {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const toggles = useFeatureToggles();

    if (erLesevisning) {
        return new Set(behandling.personResultater.map(pr => pr.personIdent));
    }

    const erBehandlingMedKopieringsmuligheter = erRiktigBehandlingForKopieringAvVilkårFraSøkerTilBarna(behandling);
    const identer = new Set<string>();

    behandling.personResultater.forEach(pr => {
        const harIkkeVurdert = pr.vilkårResultater
            .map(pr => pr.resultat)
            .some(resultat => resultat === Resultat.IKKE_VURDERT);

        const harUkomplettKopiertVilkårResultat = pr.vilkårResultater
            .filter(vr => RELEVANTE_VILKÅR_TYPER_FOR_KOPIERTE_VILKÅR.includes(vr.vilkårType))
            .some(vr => vr.utdypendeVilkårsvurderinger.length === 0);

        const skalÅpneKopierteVilkår =
            erBehandlingMedKopieringsmuligheter &&
            harUkomplettKopiertVilkårResultat &&
            toggles[FeatureToggle.kanGenerereBarnasVilkar];

        if (harIkkeVurdert || skalÅpneKopierteVilkår) {
            identer.add(pr.personIdent);
        }
    });

    return identer;
}

interface EkspanderbareVilkårsvurderingPanelerContext {
    erPanelEkspandert: (ident: string) => boolean;
    ekspanderPanel: (ident: string) => void;
    kollapsPanel: (ident: string) => void;
    togglePanel: (ident: string) => void;
}

const Context = createContext<EkspanderbareVilkårsvurderingPanelerContext | undefined>(undefined);

export function EkspanderbareVilkårsvurderingPanelerProvider({ children }: PropsWithChildren) {
    const initielleEkspanderteIdenter = useInitielleEkspanderteIdenter();

    const [ekspanderteIdenter, settEkspanderteIdenter] = useState<Set<string>>(initielleEkspanderteIdenter);

    const erPanelEkspandert = useCallback((ident: string) => ekspanderteIdenter.has(ident), [ekspanderteIdenter]);

    const ekspanderPanel = useCallback((ident: string) => {
        settEkspanderteIdenter(forrige => {
            const neste = new Set(forrige);
            neste.add(ident);
            return neste;
        });
    }, []);

    const kollapsPanel = useCallback((ident: string) => {
        settEkspanderteIdenter(forrige => {
            const neste = new Set(forrige);
            neste.delete(ident);
            return neste;
        });
    }, []);

    const togglePanel = useCallback((ident: string) => {
        settEkspanderteIdenter(forrige => {
            const neste = new Set(forrige);
            if (neste.has(ident)) {
                neste.delete(ident);
            } else {
                neste.add(ident);
            }
            return neste;
        });
    }, []);

    const value = useMemo(
        () => ({ erPanelEkspandert, ekspanderPanel, kollapsPanel, togglePanel }),
        [erPanelEkspandert, ekspanderPanel, kollapsPanel, togglePanel]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useEkspanderbareVilkårsvurderingPaneler() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error(
            'useEkspanderbareVilkårsvurderingPaneler må brukes innenfor en EkspanderbareVilkårsvurderingPanelerProvider.'
        );
    }
    return context;
}
