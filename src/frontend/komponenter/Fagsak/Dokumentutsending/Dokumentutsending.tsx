import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Heading, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useDokumentutsending } from '../../../context/DokumentutsendingContext';
import { fagsakHeaderHøydeRem } from '../../../typer/styling';
import DokumentutsendingSkjema from './DokumentutsendingSkjema';

const Container = styled.div`
    display: grid;
    grid-template-columns: 35rem 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - ${fagsakHeaderHøydeRem}rem);
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;

const Dokumentutsending: React.FC = () => {
    const navigate = useNavigate();

    const { fagsakId, hentetDokument, settVisInnsendtBrevModal, visInnsendtBrevModal } =
        useDokumentutsending();

    return (
        <Container>
            <Modal open={visInnsendtBrevModal} onClose={() => settVisInnsendtBrevModal(false)}>
                <Modal.Content>
                    <Heading size="medium" level={'2'}>
                        Brevet er sendt
                    </Heading>
                    <Knapperad>
                        <Button
                            variant={'secondary'}
                            key={'til oppgavebenken'}
                            size={'medium'}
                            onClick={() => {
                                navigate('/oppgaver');
                            }}
                            children={'Se oppgavebenk'}
                        />
                        <KnappHøyre
                            variant={'secondary'}
                            key={'til saksoversikt'}
                            size={'medium'}
                            onClick={() => {
                                navigate(`/fagsak/${fagsakId}/saksoversikt`);
                                settVisInnsendtBrevModal(false);
                            }}
                            children={'Se saksoversikt'}
                        />
                    </Knapperad>
                </Modal.Content>
            </Modal>
            <DokumentutsendingSkjema />

            <iframe
                title={'dokument'}
                src={hentetDokument.status === RessursStatus.SUKSESS ? hentetDokument.data : ''}
                width={'100%'}
                height={'100%'}
            />
        </Container>
    );
};

export default Dokumentutsending;
