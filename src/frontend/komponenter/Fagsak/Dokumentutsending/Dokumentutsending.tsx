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

const StyledModal = styled(Modal)`
    padding: 2.5rem;
    width: 35rem;
`;

const StyledModalHeader = styled(Heading)`
    margin-bottom: 2rem;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: center;
`;

const Dokumentutsending: React.FC = () => {
    const navigate = useNavigate();

    const { fagsakId, hentetDokument, settVisInnsendtBrevModal, visInnsendtBrevModal } =
        useDokumentutsending();

    return (
        <Container>
            <StyledModal
                open={visInnsendtBrevModal}
                onClose={() => settVisInnsendtBrevModal(false)}
            >
                <StyledModalHeader size="medium" level={'2'}>
                    Brevet er sendt
                </StyledModalHeader>
                <Knapperad>
                    <Button
                        variant={'secondary'}
                        key={'til oppgavebenken'}
                        size={'medium'}
                        onClick={() => {
                            navigate('/oppgaver');
                        }}
                        children={'Gå til oppgavebenken'}
                    />
                    <KnappHøyre
                        variant={'secondary'}
                        key={'til saksoversikt'}
                        size={'medium'}
                        onClick={() => {
                            navigate(`/fagsak/${fagsakId}/saksoversikt`);
                            settVisInnsendtBrevModal(false);
                        }}
                        children={'Gå til saksoversikt'}
                    />
                </Knapperad>
            </StyledModal>
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
