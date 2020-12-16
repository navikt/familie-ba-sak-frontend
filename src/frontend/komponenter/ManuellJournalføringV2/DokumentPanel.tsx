import React from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';

const DokumentDiv = styled.div`
    width: 100%;
    height: 92vh;
`;

const DokumentDataAlert = styled(AlertStripeFeil)`
    margin-top: 10px;
    width: 100%;
    height: 3rem;
`;

export const DokumentPanel: React.FC = () => {
    const { dokumentData } = useManuellJournalføringV2();
    return (
        <DokumentDiv>
            {dokumentData.status === RessursStatus.SUKSESS && (
                <iframe
                    title={'dokument'}
                    src={dokumentData.data}
                    width={'100%'}
                    height={'100%'}
                ></iframe>
            )}
            {(dokumentData.status === RessursStatus.FEILET ||
                dokumentData.status === RessursStatus.FUNKSJONELL_FEIL) && (
                <DokumentDataAlert children={dokumentData.frontendFeilmelding} />
            )}
        </DokumentDiv>
    );
};
