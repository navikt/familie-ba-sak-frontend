import { useFagsakId } from '@hooks/useFagsakId';
import { BodyShort, Box, Button, Dialog } from '@navikt/ds-react';
import { useSendtTilTotrinnskontrollModalContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/Totrinnskontroll/SendtTilTotrinnskontrollModalContext';
import { useNavigate } from 'react-router';

export function SendtTilTotrinnskontrollModal() {
    const { erModalÅpen, lukkModal } = useSendtTilTotrinnskontrollModalContext();

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
        <Dialog open={erModalÅpen} onOpenChange={lukkModal}>
            <Dialog.Popup width={'small'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Totrinnskontroll</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Box marginBlock={'space-16'}>
                        <BodyShort>Behandlingen er nå sendt til totrinnskontroll.</BodyShort>
                    </Box>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button variant={'secondary'} size={'medium'} onClick={onNavigerTilSaksoversiktClicked}>
                        Gå til saksoversikten
                    </Button>
                    <Button variant={'primary'} size={'medium'} onClick={onNavigerTilOppgavebenkenClicked}>
                        Gå til oppgavebenken
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
