import { useRouteMatch } from 'react-router-dom';

const useSakOgBehandlingParams = () => {
    const match = useRouteMatch('/fagsak/:fagsakId/:behandlingId');

    const fagsakId = match === null ? '' : trekkUtFagsakId(match.url.split('/'));
    const behandlingId = match === null ? undefined : trekkUtBehandlingsId(match.url.split('/'));

    return {
        fagsakId,
        behandlingId,
    };
};

const trekkUtFagsakId = (matchPath: string[]): string => {
    return matchPath[2];
};

const trekkUtBehandlingsId = (matchPath: string[]): string | undefined => {
    const id = matchPath[3];

    return isNaN(parseInt(id)) ? undefined : id;
};

export default useSakOgBehandlingParams;
