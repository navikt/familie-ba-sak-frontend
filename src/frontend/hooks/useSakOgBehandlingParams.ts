import { useHistory } from 'react-router-dom';

const useSakOgBehandlingParams = () => {
    const history = useHistory();
    const paths = history.location.pathname.split('/');
    const fagsakId = paths[2];
    const behandlingId = paths[3];

    return {
        fagsakId,
        behandlingId,
    };
};

export default useSakOgBehandlingParams;
