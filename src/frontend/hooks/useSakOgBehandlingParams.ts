import { useMatch } from 'react-router';

const useSakOgBehandlingParams = (): { fagsakId?: string; behandlingId?: string } => {
    const matchFagsakIdOgBehandlingId = useMatch('/fagsak/:fagsakId/:behandlingId/*');
    const matchBareFagsakId = useMatch('/fagsak/:fagsakId/*');

    if (matchFagsakIdOgBehandlingId) {
        return {
            fagsakId:
                matchFagsakIdOgBehandlingId.params.fagsakId &&
                isNaN(parseInt(matchFagsakIdOgBehandlingId.params.fagsakId))
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
            fagsakId:
                matchBareFagsakId.params.fagsakId &&
                isNaN(parseInt(matchBareFagsakId.params.fagsakId))
                    ? undefined
                    : matchBareFagsakId.params.fagsakId,
            behandlingId: undefined,
        };
    }

    return { fagsakId: undefined, behandlingId: undefined };
};

export default useSakOgBehandlingParams;
