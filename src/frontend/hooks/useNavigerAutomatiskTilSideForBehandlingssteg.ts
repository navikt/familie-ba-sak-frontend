import { useCallback, useEffect, useRef } from 'react';

import { Path } from '@app/path';
import { useFagsak } from '@hooks/useFagsak';
import {
    erViPåUdefinertFagsakSide,
    erViPåUlovligSteg,
    finnSideForBehandlingssteg,
} from '@sider/Fagsak/Behandling/Sider/sider';
import type { IBehandling } from '@typer/behandling';
import { useLocation, useNavigate } from 'react-router';

interface Props {
    behandling: IBehandling;
}

export function useNavigerAutomatiskTilSideForBehandlingssteg({ behandling }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const fagsak = useFagsak();

    const forrigeBehandlingId = useRef<number | undefined>(undefined);

    const pathname = location.pathname;
    const behandlingId = behandling.behandlingId;

    const navigerTilSideForBehandlingssteg = useCallback(() => {
        const side = finnSideForBehandlingssteg(behandling);
        if (!side) {
            return;
        }
        if (erViPåUdefinertFagsakSide(pathname) || erViPåUlovligSteg(pathname, side)) {
            const url = `${Path.fagsak(fagsak.id).behandling(behandlingId).root}/${side.href}`;
            navigate(url, { replace: true });
        }
    }, [fagsak, behandling, pathname, navigate]);

    useEffect(() => {
        if (behandlingId !== forrigeBehandlingId.current) {
            forrigeBehandlingId.current = behandlingId;
            navigerTilSideForBehandlingssteg();
        }
    }, [behandlingId, navigerTilSideForBehandlingssteg]);
}
