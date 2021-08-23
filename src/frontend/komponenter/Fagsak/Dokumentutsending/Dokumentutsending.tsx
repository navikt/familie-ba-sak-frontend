import React from 'react';

import styled from 'styled-components';

import { RessursStatus } from '@navikt/familie-typer';

import { useDokumentutsending } from '../../../context/DokumentutsendingContext';
import { IFagsak } from '../../../typer/fagsak';
import { fagsakHeaderHøydeRem } from '../../../typer/styling';
import DokumentutsendingSkjema from './DokumentutsendingSkjema';

const Container = styled.div`
    display: grid;
    grid-template-columns: 35rem 1fr;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    height: calc(100vh - ${fagsakHeaderHøydeRem}rem);
    padding: 2rem;
`;

interface IProps {
    fagsak: IFagsak;
}

const Dokumentutsending: React.FC<IProps> = ({ fagsak }) => {
    const { hentetForhåndsvisning } = useDokumentutsending();

    return (
        <Container>
            <DokumentutsendingSkjema fagsak={fagsak} />

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
