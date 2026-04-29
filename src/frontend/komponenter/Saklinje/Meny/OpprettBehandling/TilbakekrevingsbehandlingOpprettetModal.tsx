import { useNavigate } from 'react-router';

import { BodyLong, Button, Modal } from '@navikt/ds-react';

import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';

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
        <Modal
            open={true}
            width={'45rem'}
            portal={true}
            header={{ heading: 'Tilbakekrevingsbehandling opprettes' }}
            onClose={() => lukkModal()}
        >
            <Modal.Body>
                <BodyLong>
                    Tilbakekrevingsbehandling opprettes, men det kan ta litt tid (ca 30 sekunder) før den blir
                    tilgjengelig i saksoversikten og oppgavebenken.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'primary'} onClick={navigerTilOppgaver}>
                    Gå til oppgavebenken
                </Button>
                <Button variant={'secondary'} onClick={navigerTilSaksoversikt}>
                    Gå til saksoversikten
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
