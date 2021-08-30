import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';

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
    const history = useHistory();

    const {
        fagsak,
        hentetForhåndsvisning,
        settVisInnsendtBrevModal,
        visInnsendtBrevModal,
    } = useDokumentutsending();

    return (
        <Container>
            {visInnsendtBrevModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Brevet er sendt',
                        lukkKnapp: true,
                        visModal: visInnsendtBrevModal,
                        actions: [
                            <Knapp
                                key={'til oppgavebenken'}
                                mini={true}
                                onClick={() => {
                                    history.push('/oppgaver');
                                }}
                                children={'Gå til oppgavebenken'}
                            />,
                            <Knapp
                                key={'til dokumentoversikt'}
                                mini={true}
                                onClick={() => {
                                    history.push(`/${fagsak.id}/dokumentliste`);
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
                src={
                    hentetForhåndsvisning.status === RessursStatus.SUKSESS
                        ? hentetForhåndsvisning.data
                        : ''
                }
                width={'100%'}
                height={'100%'}
            />
        </Container>
    );
};

export default Dokumentutsending;
