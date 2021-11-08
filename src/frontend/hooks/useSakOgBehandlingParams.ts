import { useRouteMatch } from 'react-router-dom';

const useSakOgBehandlingParams = (): { fagsakId?: string; behandlingId?: string } => {
    const matchFagsakIdOgBehandlingId = useRouteMatch<{
        fagsakId: string;
        behandlingId: string;
    }>('/fagsak/:fagsakId/:behandlingId');

    const matchBareFagsakId = useRouteMatch<{
        fagsakId: string;
    }>('/fagsak/:fagsakId');

    if (matchFagsakIdOgBehandlingId) {
        return {
            fagsakId: isNaN(parseInt(matchFagsakIdOgBehandlingId.params.fagsakId))
                ? undefined
                : matchFagsakIdOgBehandlingId.params.fagsakId,
            behandlingId:
                matchFagsakIdOgBehandlingId.params.behandlingId &&
                isNaN(parseInt(matchFagsakIdOgBehandlingId.params.behandlingId))
                    ? undefined
                    : matchFagsakIdOgBehandlingId.params.behandlingId,
        };
    }

    if (matchBareFagsakId) {
        return {
            fagsakId: isNaN(parseInt(matchBareFagsakId.params.fagsakId))
                ? undefined
                : matchBareFagsakId.params.fagsakId,
            behandlingId: undefined,
        };
    }

    return { fagsakId: undefined, behandlingId: undefined };
};

export default useSakOgBehandlingParams;
