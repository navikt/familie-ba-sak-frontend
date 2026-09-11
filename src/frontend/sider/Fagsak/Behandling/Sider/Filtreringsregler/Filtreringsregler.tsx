import { useBehandlingId } from '@hooks/useBehandlingId';
import { useFagsakId } from '@hooks/useFagsakId';
import { BehandlingSteg } from '@typer/behandling';
import { useNavigate } from 'react-router';
import Skjemasteg from '../Skjemasteg';
import { Filtreringsreglerliste } from './Filtreringsreglerliste';

const Filtreringsregler = () => {
    const fagsakId = useFagsakId();
    const behandlingId = useBehandlingId();
    const navigate = useNavigate();

    return (
        <Skjemasteg
            skalViseForrigeKnapp={false}
            tittel={'Filtreringsregler'}
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
