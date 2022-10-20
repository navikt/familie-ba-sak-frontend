import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useDokumentutsending } from '../../../context/DokumentutsendingContext';
import { fagsakHeaderHøydeRem } from '../../../typer/styling';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import DokumentutsendingSkjema from './DokumentutsendingSkjema';

const Container = styled.div`
    display: grid;
    grid-template-columns: 35rem 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - ${fagsakHeaderHøydeRem}rem);
`;

const Dokumentutsending: React.FC = () => {
    const navigate = useNavigate();

    const { fagsakId, hentetDokument, settVisInnsendtBrevModal, visInnsendtBrevModal } =
        useDokumentutsending();

    return (
        <Container>
            {visInnsendtBrevModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Brevet er sendt',
                        lukkKnapp: true,
                        visModal: visInnsendtBrevModal,
                        actions: [
                            <Button
                                key={'til oppgavebenken'}
                                size="small"
                                variant="secondary"
                                onClick={() => {
                                    navigate('/oppgaver');
                                }}
                                children={'Gå til oppgavebenken'}
                            />,
                            <Button
                                key={'til dokumentoversikt'}
                                size="small"
                                variant="secondary"
                                onClick={() => {
                                    navigate(`/fagsak/${fagsakId}/dokumenter`);
                                }}
                                children={'Gå til Dokumentoversikt'}
                            />,
                        ],
                        onClose: () => settVisInnsendtBrevModal(false),
                    }}
                />
            )}
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
