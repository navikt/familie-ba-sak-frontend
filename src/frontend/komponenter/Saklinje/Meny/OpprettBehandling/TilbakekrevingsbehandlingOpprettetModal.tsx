import { BodyLong, Button, Dialog } from '@navikt/ds-react';
import { useFagsakContext } from '@sider/Fagsak/FagsakContext';
import { useNavigate } from 'react-router';

interface Props {
    lukkModal: () => void;
}

export function TilbakekrevingsbehandlingOpprettetModal({ lukkModal }: Props) {
    const { fagsak } = useFagsakContext();
    const navigate = useNavigate();

    function navigerTilOppgaver() {
        lukkModal();
        navigate('/oppgaver');
    }

    function navigerTilSaksoversikt() {
        lukkModal();
        navigate(`/fagsak/${fagsak.id}/saksoversikt`);
    }

    return (
        <Dialog open={true} onOpenChange={() => lukkModal()}>
            <Dialog.Popup width={'45rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Tilbakekrevingsbehandling opprettes</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong>
                        Tilbakekrevingsbehandling opprettes, men det kan ta litt tid (ca 30 sekunder) før den blir
                        tilgjengelig i saksoversikten og oppgavebenken.
                    </BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button variant={'primary'} onClick={navigerTilOppgaver}>
                        Gå til oppgavebenken
                    </Button>
                    <Button variant={'secondary'} onClick={navigerTilSaksoversikt}>
                        Gå til saksoversikten
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
