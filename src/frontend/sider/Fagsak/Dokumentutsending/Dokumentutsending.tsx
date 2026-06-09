import { Fagsaklinje } from '@komponenter/Saklinje/Fagsaklinje';
import { useNavigate } from 'react-router';

import { Button, HGrid, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useDokumentutsendingContext } from './DokumentutsendingContext';
import { DokumentutsendingSkjema } from './DokumentutsendingSkjema';
import { useFagsakContext } from '../FagsakContext';

export function Dokumentutsending() {
    const { fagsak } = useFagsakContext();
    const navigate = useNavigate();

    const { hentetDokument, settVisInnsendtBrevModal, visInnsendtBrevModal } = useDokumentutsendingContext();

    return (
        <>
            <Fagsaklinje />
            <HGrid columns={'35rem 1fr'} height={'100%'}>
                {visInnsendtBrevModal && (
                    <Modal
                        open
                        onClose={() => settVisInnsendtBrevModal(false)}
                        header={{ heading: 'Brevet er sendt', size: 'medium' }}
                        portal
                    >
                        <Modal.Footer>
                            <Button
                                variant={'secondary'}
                                key={'til saksoversikt'}
                                size={'medium'}
                                onClick={() => {
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
                                    navigate('/oppgaver');
                                }}
                                children={'Se oppgavebenk'}
                            />
                        </Modal.Footer>
                    </Modal>
                )}
                <DokumentutsendingSkjema />
                <iframe
                    title={'dokument'}
                    src={hentetDokument.status === RessursStatus.SUKSESS ? hentetDokument.data : ''}
                    width={'100%'}
                    height={'100%'}
                />
            </HGrid>
        </>
    );
}
