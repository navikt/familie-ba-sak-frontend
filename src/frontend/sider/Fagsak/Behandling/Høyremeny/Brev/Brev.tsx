import { Button, Dialog, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFagsakContext } from '../../../FagsakContext';
import { Tab, useTabContext } from '../TabContextProvider';
import Brevskjema from './Brevskjema';

export function Brev() {
    const { fagsak } = useFagsakContext();
    const { settTab } = useTabContext();

    const navigate = useNavigate();

    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = useState(false);

    function onClose() {
        settVisInnsendtBrevModal(false);
        settTab(Tab.Historikk);
    }

    function navigerTilSaksoversikt() {
        settVisInnsendtBrevModal(false);
        navigate(`/fagsak/${fagsak.id}/saksoversikt`);
    }

    function navigerTilOppgaver() {
        settVisInnsendtBrevModal(false);
        navigate('/oppgaver');
    }

    return (
        <VStack marginBlock={'space-16'} marginInline={'space-20'}>
            <Brevskjema onSubmitSuccess={() => settVisInnsendtBrevModal(true)} />
            <Dialog open={visInnsendtBrevModal} onOpenChange={onClose}>
                <Dialog.Popup width={'small'} closeOnOutsideClick={false}>
                    <Dialog.Header>
                        <Dialog.Title>Brevet er sendt</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Footer>
                        <Button variant={'secondary'} size={'medium'} onClick={navigerTilSaksoversikt}>
                            Se saksoversikt
                        </Button>
                        <Button variant={'secondary'} size={'medium'} onClick={navigerTilOppgaver}>
                            Se oppgavebenk
                        </Button>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </VStack>
    );
}
