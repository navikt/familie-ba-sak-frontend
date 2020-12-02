import { IDokumentInfo, IJournalpost } from '@navikt/familie-typer';
import Panel from 'nav-frontend-paneler';
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DokumentIkon } from '../../ikoner/DokumentIkon';
import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';

const DokumentPanel = styled(Panel)`
    margin-top: 20px;
    width: 27rem;
    height: 100%;
    border: ${props => `${props.theme.borderWidth} solid ${props.theme.borderColor}`};
    &:hover {
        border-color: ${props => `${props.theme.hoverBorderColor}`};
    }
`;

const DokumentInfoStripeContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

interface IDokumentInfoProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
}

interface IDokumentInfoStripeProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
    valgt: boolean;
    utvidet: boolean;
    onClick: () => void;
}

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
    valgt: boolean;
}

const DokumentTittelDiv = styled.td`
    font-weight: bold;
`;

const DokumentInfo: React.FC<IDokumentInfoProps> = ({ dokument, journalpost }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <DokumentTittelDiv>{dokument.tittel || 'Ukjent'}</DokumentTittelDiv>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mottatt: {journalpost.datoMottatt}</td>
                    </tr>
                    <tr>
                        <td>{dokument.brevkode || 'Ukjent'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const StyledDokumentIkon = styled(DokumentIkon)`
    margin: 0 16px 0 0;
`;

const DokumentInfoStripe: React.FC<IDokumentInfoStripeProps> = ({
    dokument,
    journalpost,
    valgt,
    onClick,
}) => {
    return (
        <DokumentInfoStripeContainer
            onClick={() => {
                if (!valgt) {
                    onClick();
                }
            }}
        >
            <StyledDokumentIkon />
            <DokumentInfo dokument={dokument} journalpost={journalpost}></DokumentInfo>
        </DokumentInfoStripeContainer>
    );
};

export const DokumentVelger: React.FC<IDokumentVelgerProps> = ({
    dokument,
    journalpost,
    valgt,
}) => {
    const { hentDokumentData, settValgtDokumentId } = useManuellJournalføring();
    const [utvidet, settUtvidet] = useState<boolean>(false);
    const theme = {
        borderWidth: valgt ? '3px' : '1px',
        borderColor: valgt ? '#254b6d' : 'black',
        hoverBorderColor: '#0067c5',
    };

    return (
        <ThemeProvider theme={theme}>
            <DokumentPanel
                border
                onClick={() => {
                    if (!valgt) {
                        hentDokumentData(journalpost.journalpostId, dokument.dokumentInfoId || '0');
                        settValgtDokumentId(dokument.dokumentInfoId);
                        settUtvidet(false);
                    }
                }}
            >
                <DokumentInfoStripe
                    dokument={dokument}
                    journalpost={journalpost}
                    valgt={valgt}
                    utvidet={valgt && utvidet}
                    onClick={() => {
                        settUtvidet(!utvidet);
                    }}
                ></DokumentInfoStripe>
            </DokumentPanel>
        </ThemeProvider>
    );
};
