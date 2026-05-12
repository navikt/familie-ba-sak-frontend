import styled from 'styled-components';

import { Box, LocalAlert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringContext } from '../ManuellJournalføringContext';

const DokumentDiv = styled.div`
    width: 100%;
    height: 100%;
`;

export const DokumentPanel = () => {
    const { hentetDokument } = useManuellJournalføringContext();
    return (
        <DokumentDiv>
            {hentetDokument.status === RessursStatus.SUKSESS && (
                <iframe title={'dokument'} src={hentetDokument.data} width={'100%'} height={'100%'} />
            )}
            {(hentetDokument.status === RessursStatus.FEILET ||
                hentetDokument.status === RessursStatus.FUNKSJONELL_FEIL) && (
                <Box marginBlock={'space-8 space-0'}>
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{hentetDokument.frontendFeilmelding}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            )}
            {hentetDokument.status === RessursStatus.IKKE_TILGANG && (
                <Box marginBlock={'space-8 space-0'}>
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>Ikke tilgang til dokument</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            )}
        </DokumentDiv>
    );
};
