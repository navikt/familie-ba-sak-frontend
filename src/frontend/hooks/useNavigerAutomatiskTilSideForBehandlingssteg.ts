import { useErViPåUgyldigSideForBehandling } from '@hooks/useErViPåUgyldigSideForBehandling';
import { useFagsak } from '@hooks/useFagsak';
import { finnSideForBehandlingssteg } from '@sider/Fagsak/Behandling/Sider/sider';
import type { IBehandling } from '@typer/behandling';
import { useEffect, useEffectEvent } from 'react';
import { useNavigate } from 'react-router';

interface Props {
    behandling: IBehandling;
}

export function useNavigerAutomatiskTilSideForBehandlingssteg({ behandling }: Props) {
    const navigate = useNavigate();
    const fagsak = useFagsak();
    const erViPåUgyldigSideForBehandling = useErViPåUgyldigSideForBehandling(behandling);

    const side = finnSideForBehandlingssteg(behandling);

    const navigerTilSideForBehandlingssteg = useEffectEvent((behandlingId: number) => {
        if (side && erViPåUgyldigSideForBehandling) {
            navigate(`/fagsak/${fagsak.id}/${behandlingId}/${side.href}`, { replace: true });
        }
    });

    useEffect(() => {
        navigerTilSideForBehandlingssteg(behandling.behandlingId);
    }, [behandling.behandlingId]);
}
