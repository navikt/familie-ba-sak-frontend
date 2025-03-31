import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalførContext } from '../../../context/ManuellJournalførContext';

const DokumentDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const DokumentDataAlert = styled(Alert)`
    margin-top: 10px;
    width: 100%;
`;

export const DokumentPanel: React.FC = () => {
    const { hentetDokument } = useManuellJournalførContext();
    return (
        <DokumentDiv>
            {hentetDokument.status === RessursStatus.SUKSESS && (
                <iframe
                    title={'dokument'}
                    src={hentetDokument.data}
                    width={'100%'}
                    height={'100%'}
                />
            )}
            {(hentetDokument.status === RessursStatus.FEILET ||
                hentetDokument.status === RessursStatus.FUNKSJONELL_FEIL) && (
                <DokumentDataAlert variant="error" children={hentetDokument.frontendFeilmelding} />
            )}
            {hentetDokument.status === RessursStatus.IKKE_TILGANG && (
                <DokumentDataAlert variant="error" children={'Ikke tilgang til dokument'} />
            )}
        </DokumentDiv>
    );
};
