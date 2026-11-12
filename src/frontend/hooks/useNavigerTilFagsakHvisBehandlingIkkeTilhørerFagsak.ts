import { useFagsak } from '@hooks/useFagsak';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Props {
    behandlingIdParam: number | undefined;
}

export function useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak({ behandlingIdParam }: Props) {
    const navigate = useNavigate();
    const fagsak = useFagsak();

    const fagsakId = fagsak.id;
    const erBehandlingDelAvFagsak = fagsak.behandlinger.some(it => it.behandlingId === behandlingIdParam);

    const navigerTilFagsak = useCallback(() => {
        navigate(`/fagsak/${fagsakId}`, { replace: true });
    }, [fagsakId, navigate]);

    useEffect(() => {
        if (behandlingIdParam !== undefined && !erBehandlingDelAvFagsak) {
            navigerTilFagsak();
        }
    }, [behandlingIdParam, erBehandlingDelAvFagsak, navigerTilFagsak]);
}
