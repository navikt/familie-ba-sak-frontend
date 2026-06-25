import { createContext, type PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import {
    finnSiderForBehandling,
    type Kontrollside,
    KontrollertStatus,
    type SideId,
} from '@sider/Fagsak/Behandling/Sider/sider';
import { BehandlerRolle, BehandlingStatus } from '@typer/behandling';
import { hentSideHref } from '@utils/miljø';
import { useLocation } from 'react-router';

interface KontrollsiderContext {
    kontrollsider: Kontrollside[];
    settIkkeKontrollerteSiderTilManglerKontroll: () => void;
}

const Context = createContext<KontrollsiderContext | undefined>(undefined);

export function KontrollsiderProvider({ children }: PropsWithChildren) {
    const location = useLocation();
    const saksbehandler = useSaksbehandler();
    const behandling = useBehandling();

    const [kontrollerteStatuser, setKontrollerteStatuser] = useState<Partial<Record<SideId, KontrollertStatus>>>({});

    // Forhindrer ny liste ved hver render, viktig pga. equality-check.
    const sider = useMemo(() => finnSiderForBehandling(behandling), [behandling]);

    const erPåFatterVedtak = behandling.status === BehandlingStatus.FATTER_VEDTAK;
    const erBeslutter = saksbehandler.rolle === BehandlerRolle.BESLUTTER;
    const erIkkeSaksbehandlerPåBehandlingen = saksbehandler.email !== behandling.endretAv; // TODO : Er dette egentlig korrekt?
    const kanBeslutteVedtak = erPåFatterVedtak && erBeslutter && erIkkeSaksbehandlerPåBehandlingen;

    const sideHref = hentSideHref(location.pathname);
    const åpenSideId = sider.find(side => side.href === sideHref)?.id;

    const besøkteSideErIkkeKontrollert =
        åpenSideId !== undefined && kontrollerteStatuser[åpenSideId] !== KontrollertStatus.KONTROLLERT;

    if (kanBeslutteVedtak && besøkteSideErIkkeKontrollert) {
        setKontrollerteStatuser(prev => ({
            ...prev,
            [åpenSideId]: KontrollertStatus.KONTROLLERT,
        }));
    }

    const kontrollsider = useMemo(
        () =>
            sider.map(side => ({
                ...side,
                kontrollertStatus: kontrollerteStatuser[side.id] ?? KontrollertStatus.IKKE_KONTROLLERT,
            })),
        [sider, kontrollerteStatuser]
    );

    const settIkkeKontrollerteSiderTilManglerKontroll = useCallback(() => {
        if (!kanBeslutteVedtak) {
            return;
        }
        setKontrollerteStatuser(forrige => {
            const nyeStatuser = { ...forrige };
            sider.forEach(side => {
                const status = nyeStatuser[side.id] ?? KontrollertStatus.IKKE_KONTROLLERT;
                if (status === KontrollertStatus.IKKE_KONTROLLERT) {
                    nyeStatuser[side.id] = KontrollertStatus.MANGLER_KONTROLL;
                }
            });
            return nyeStatuser;
        });
    }, [kanBeslutteVedtak, sider]);

    const value = useMemo(
        () => ({ kontrollsider, settIkkeKontrollerteSiderTilManglerKontroll }),
        [kontrollsider, settIkkeKontrollerteSiderTilManglerKontroll]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useKontrollsiderContext() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useKontrollsiderContext må brukes innenfor en KontrollsiderProvider.');
    }
    return context;
}
