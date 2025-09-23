import React from 'react';

import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Button, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useDokumentutsendingContext } from './DokumentutsendingContext';
import DokumentutsendingSkjema from './DokumentutsendingSkjema';
import type { IPersonInfo } from '../../../typer/person';
import { fagsakHeaderHøydeRem } from '../../../typer/styling';

const Container = styled.div`
    display: grid;
    grid-template-columns: 35rem 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - ${fagsakHeaderHøydeRem}rem);
`;

interface Props {
    bruker: IPersonInfo;
}

const Dokumentutsending: React.FC<Props> = ({ bruker }) => {
    const navigate = useNavigate();

    const { fagsakId, hentetDokument, settVisInnsendtBrevModal, visInnsendtBrevModal } = useDokumentutsendingContext();

    return (
        <Container>
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
                                navigate(`/fagsak/${fagsakId}/saksoversikt`);
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
            <DokumentutsendingSkjema bruker={bruker} />

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
