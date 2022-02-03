import React from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';

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
    const { hentetForhåndsvisning } = useManuellJournalfør();
    return (
        <DokumentDiv>
            {hentetForhåndsvisning.status === RessursStatus.SUKSESS && (
                <iframe
                    title={'dokument'}
                    src={hentetForhåndsvisning.data}
                    width={'100%'}
                    height={'100%'}
                ></iframe>
            )}
            {(hentetForhåndsvisning.status === RessursStatus.FEILET ||
                hentetForhåndsvisning.status === RessursStatus.FUNKSJONELL_FEIL) && (
                <DokumentDataAlert children={hentetForhåndsvisning.frontendFeilmelding} />
            )}
            {hentetForhåndsvisning.status === RessursStatus.IKKE_TILGANG && (
                <DokumentDataAlert children={'Ikke tilgang til dokument'} />
            )}
        </DokumentDiv>
    );
};
