import { useFagsak } from '@hooks/useFagsak';
import { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';
import { useNavigate } from 'react-router';

import { BodyShort, Box, Button, Modal } from '@navikt/ds-react';

import { useTotrinnskontrollModalContext } from './TotrinnskontrollModalContextProvider';

const beslutningstekst: Record<TotrinnskontrollBeslutning, string> = {
    [TotrinnskontrollBeslutning.IKKE_VURDERT]: 'Beslutning er ikke vurdert. Ta kontakt med barnetrygdteamet.',
    [TotrinnskontrollBeslutning.GODKJENT]: 'Behandlingen er godkjent, og vedtaket er iverksatt.',
    [TotrinnskontrollBeslutning.UNDERKJENT]: 'Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler.',
};

export function TotrinnskontrollModal() {
    const fagsak = useFagsak();

    const { beslutning, lukkModal } = useTotrinnskontrollModalContext();

    const navigate = useNavigate();

    function navigerTilSaksoversikt() {
        lukkModal();
        navigate(`/fagsak/${fagsak.id}/saksoversikt`);
    }

    function navigerTilOppgavebenk() {
        lukkModal();
        navigate('/oppgaver');
    }

    return (
        <Modal open={true} onClose={lukkModal} header={{ heading: 'Totrinnskontroll' }} portal={true}>
            <Modal.Body>
                <Box marginBlock={'space-16'}>
                    <BodyShort>{beslutningstekst[beslutning]}</BodyShort>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'} size={'medium'} onClick={navigerTilSaksoversikt}>
                    Gå til saksoversikten
                </Button>
                <Button variant={'primary'} size={'medium'} onClick={navigerTilOppgavebenk}>
                    Gå til oppgavebenken
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
