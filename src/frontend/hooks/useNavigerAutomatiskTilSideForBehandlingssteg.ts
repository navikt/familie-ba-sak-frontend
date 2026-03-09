import { useCallback, useEffect, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router';

import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
} from '../sider/Fagsak/Behandling/Sider/sider';
import { useFagsakContext } from '../sider/Fagsak/FagsakContext';
import type { IBehandling } from '../typer/behandling';

interface Props {
    behandling: IBehandling;
}

export function useNavigerAutomatiskTilSideForBehandlingssteg({ behandling }: Props) {
    const { fagsak } = useFagsakContext();

    const location = useLocation();
    const navigate = useNavigate();
    const forrigeBehandlingId = useRef<number | undefined>(undefined);

    const pathname = location.pathname;
    const behandlingId = behandling.behandlingId;

    const navigerTilSideForBehandlingssteg = useCallback(() => {
        const side = finnSideForBehandlingssteg(behandling);
        if (!side) {
            return;
        }
        if (erViPåUdefinertFagsakSide(pathname) || erViPåUlovligSteg(pathname)) {
            navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/${side.href}`, { replace: true });
        }
    }, [fagsak, behandling, pathname, navigate]);

    useEffect(() => {
        if (behandlingId !== forrigeBehandlingId.current) {
            forrigeBehandlingId.current = behandlingId;
            navigerTilSideForBehandlingssteg();
        }
    }, [behandlingId, navigerTilSideForBehandlingssteg]);
}
