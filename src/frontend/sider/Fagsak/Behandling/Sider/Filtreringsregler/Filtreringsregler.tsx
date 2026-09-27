import { useBehandling } from '@hooks/useBehandling';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useFagsakId } from '@hooks/useFagsakId';
import { BehandlingSteg, BehandlingÅrsak } from '@typer/behandling';
import { useNavigate } from 'react-router';
import Skjemasteg from '../Skjemasteg';
import { Filtreringsreglerliste } from './Filtreringsreglerliste';

const Filtreringsregler = () => {
    const fagsakId = useFagsakId();
    const behandlingId = useBehandlingId();
    const behandling = useBehandling();
    const navigate = useNavigate();

    return (
        <Skjemasteg
            skalViseForrigeKnapp={behandling.årsak === BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD}
            tittel={'Filtreringsregler'}
            forrigeOnClick={() => {
                navigate(`/fagsak/${fagsakId}/${behandlingId}/registrer-soknad`);
            }}
            nesteOnClick={() => {
                navigate(`/fagsak/${fagsakId}/${behandlingId}/vilkaarsvurdering`);
            }}
            maxWidthStyle={'80rem'}
            senderInn={false}
            steg={BehandlingSteg.FILTRERING_AUTOMATISK_BEHANDLING}
        >
            <Filtreringsreglerliste />
        </Skjemasteg>
    );
};

export default Filtreringsregler;
