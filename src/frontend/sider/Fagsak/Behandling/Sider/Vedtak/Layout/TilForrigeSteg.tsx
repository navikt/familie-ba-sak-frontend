import { useBehandlingId } from '@hooks/useBehandlingId';
import { useFagsakId } from '@hooks/useFagsakId';
import { Button } from '@navikt/ds-react';
import { useNavigate } from 'react-router';

export function TilForrigeSteg() {
    const navigate = useNavigate();
    const fagsakId = useFagsakId();
    const behandlingId = useBehandlingId();

    function onForrigeStegClicked() {
        navigate(`/fagsak/${fagsakId}/${behandlingId}/simulering`);
    }

    return (
        <Button variant={'tertiary'} onClick={onForrigeStegClicked}>
            Forrige steg
        </Button>
    );
}
