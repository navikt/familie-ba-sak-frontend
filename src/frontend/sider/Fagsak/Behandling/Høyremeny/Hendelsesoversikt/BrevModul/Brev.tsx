import * as React from 'react';

import { useNavigate } from 'react-router';

import { Button, Modal, VStack } from '@navikt/ds-react';

import Brevskjema from './Brevskjema';
import { useBrukerContext } from '../../../../BrukerContext';
import { useFagsakContext } from '../../../../FagsakContext';

interface Props {
    onIModalClick: () => void;
}

export function Brev({ onIModalClick }: Props) {
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();

    const navigate = useNavigate();

    const [visInnsendtBrevModal, settVisInnsendtBrevModal] = React.useState(false);

    return (
        <VStack marginBlock={'space-16'} marginInline={'space-20'}>
            <Brevskjema onSubmitSuccess={() => settVisInnsendtBrevModal(true)} bruker={bruker} />
            {visInnsendtBrevModal && (
                <Modal
                    open
                    onClose={() => {
                        settVisInnsendtBrevModal(false);
                        onIModalClick();
                    }}
                    header={{
                        heading: 'Brevet er sendt',
                        size: 'medium',
                    }}
                    portal
                >
                    <Modal.Footer>
                        <Button
                            variant={'secondary'}
                            key={'til saksoversikt'}
                            size={'medium'}
                            onClick={() => {
                                onIModalClick();
                                navigate(`/fagsak/${fagsak.id}/saksoversikt`);
                                settVisInnsendtBrevModal(false);
                            }}
                            children={'Se saksoversikt'}
                        />
                        <Button
                            variant={'secondary'}
                            key={'til oppgavebenken'}
                            size={'medium'}
                            onClick={() => {
                                onIModalClick();
                                navigate('/oppgaver');
                            }}
                            children={'Se oppgavebenk'}
                        />
                    </Modal.Footer>
                </Modal>
            )}
        </VStack>
    );
}
