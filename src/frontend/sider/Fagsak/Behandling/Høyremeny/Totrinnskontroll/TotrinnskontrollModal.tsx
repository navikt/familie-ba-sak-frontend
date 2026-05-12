import { useNavigate } from 'react-router';

import { BodyShort, Box, Button, Modal } from '@navikt/ds-react';

import { useTotrinnskontrollModalContext } from './TotrinnskontrollModalContextProvider';
import { TotrinnskontrollBeslutning } from '../../../../../typer/totrinnskontroll';
import { useFagsakContext } from '../../../FagsakContext';

const beslutningstekst: Record<TotrinnskontrollBeslutning, string> = {
    [TotrinnskontrollBeslutning.IKKE_VURDERT]: 'Beslutning er ikke vurdert. Ta kontakt med barnetrygdteamet.',
    [TotrinnskontrollBeslutning.GODKJENT]: 'Behandlingen er godkjent, og vedtaket er iverksatt.',
    [TotrinnskontrollBeslutning.UNDERKJENT]: 'Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler.',
};

export function TotrinnskontrollModal() {
    const { fagsak } = useFagsakContext();
    const { beslutning, lukkModal } = useTotrinnskontrollModalContext();

    const navigate = useNavigate();

    function onClose() {
        lukkModal();
    }

    function navigerTilSaksoversikt() {
        lukkModal();
        navigate(`/fagsak/${fagsak.id}/saksoversikt`);
    }

    function navigerTilOppgavebenk() {
        lukkModal();
        navigate('/oppgaver');
    }

    return (
        <Modal open={true} onClose={onClose} header={{ heading: 'Totrinnskontroll' }} portal={true}>
            <Modal.Body>
                <Box marginBlock={'space-8'}>
                    <BodyShort>{beslutningstekst[beslutning]}</BodyShort>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'} size={'medium'} onClick={navigerTilSaksoversikt}>
                    Se saksoversikt
                </Button>
                <Button variant={'secondary'} size={'medium'} onClick={navigerTilOppgavebenk}>
                    Se oppgavebenk
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
