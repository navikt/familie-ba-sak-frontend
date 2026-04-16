import React, { useState } from 'react';

import { useNavigate } from 'react-router';

import { Button, Modal, VStack } from '@navikt/ds-react';

import Brevskjema from './Brevskjema';
import { useBrukerContext } from '../../../BrukerContext';
import { useFagsakContext } from '../../../FagsakContext';
import { Tab, useTabContext } from '../TabContextProvider';

export function Brev() {
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();
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
            <Brevskjema onSubmitSuccess={() => settVisInnsendtBrevModal(true)} bruker={bruker} />
            {visInnsendtBrevModal && (
                <Modal open={true} onClose={onClose} header={{ heading: 'Brevet er sendt' }} portal={true}>
                    <Modal.Footer>
                        <Button variant={'secondary'} size={'medium'} onClick={navigerTilSaksoversikt}>
                            Se saksoversikt
                        </Button>
                        <Button variant={'secondary'} size={'medium'} onClick={navigerTilOppgaver}>
                            Se oppgavebenk
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </VStack>
    );
}
