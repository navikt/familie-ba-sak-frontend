import { useFagsakId } from '@hooks/useFagsakId';
import { useNavigate } from 'react-router';

import { BodyShort, Box, Button, Modal } from '@navikt/ds-react';

export interface Props {
    lukkModal: () => void;
}

export function SendtTilTotrinnskontrollModal({ lukkModal }: Props) {
    const navigate = useNavigate();
    const fagsakId = useFagsakId();

    function onNavigerTilSaksoversiktClicked() {
        lukkModal();
        navigate(`/fagsak/${fagsakId}/saksoversikt`);
    }

    function onNavigerTilOppgavebenkenClicked() {
        lukkModal();
        navigate('/oppgaver');
    }

    return (
        <Modal open={true} onClose={lukkModal} header={{ heading: 'Totrinnskontroll' }} portal={true}>
            <Modal.Body>
                <Box marginBlock={'space-16'}>
                    <BodyShort>Behandlingen er nå sendt til totrinnskontroll.</BodyShort>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'} size={'medium'} onClick={onNavigerTilSaksoversiktClicked}>
                    Gå til saksoversikten
                </Button>
                <Button variant={'primary'} size={'medium'} onClick={onNavigerTilOppgavebenkenClicked}>
                    Gå til oppgavebenken
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
