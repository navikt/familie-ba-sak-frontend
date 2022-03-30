import React from 'react';

import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';

const DokumentDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const DokumentDataAlert = styled(AlertStripeFeil)`
    margin-top: 10px;
    width: 100%;
    height: 3rem;
`;

export const DokumentPanel: React.FC = () => {
    const { hentetDokument } = useManuellJournalfør();
    return (
        <DokumentDiv>
            {hentetDokument.status === RessursStatus.SUKSESS && (
                <iframe
                    title={'dokument'}
                    src={hentetDokument.data}
                    width={'100%'}
                    height={'100%'}
                ></iframe>
            )}
            {(hentetDokument.status === RessursStatus.FEILET ||
                hentetDokument.status === RessursStatus.FUNKSJONELL_FEIL) && (
                <DokumentDataAlert children={hentetDokument.frontendFeilmelding} />
            )}
            {hentetDokument.status === RessursStatus.IKKE_TILGANG && (
                <DokumentDataAlert children={'Ikke tilgang til dokument'} />
            )}
        </DokumentDiv>
    );
};
