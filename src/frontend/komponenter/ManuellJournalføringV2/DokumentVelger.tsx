import { IDokumentInfo, IJournalpost } from '@navikt/familie-typer';
import { HoyreChevron } from 'nav-frontend-chevron';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import styled from 'styled-components';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { DokumentIkon } from '../../ikoner/DokumentIkon';

const DokumentPanel = styled(Panel)`
    margin-top: 5px;
    width: 24rem;
    height: 100%;
`;

const RightAlign = styled.div`
    margin-left: auto;
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

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
}

const DokumentTittel = styled.td`
    font-weight: bold;
`;

const DokumentInfo: React.FC<IDokumentInfoProps> = ({ dokument, journalpost }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <DokumentTittel>{dokument.tittel || 'Ukjent'}</DokumentTittel>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Motatt: {journalpost.datoMottatt}</td>
                    </tr>
                    <tr>
                        <td>{dokument.brevkode || 'Ukjent'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const DokumentInfoStripe: React.FC<IDokumentInfoProps> = ({ dokument, journalpost }) => {
    return (
        <DokumentInfoStripeContainer>
            <DokumentIkon />
            <DokumentInfo dokument={dokument} journalpost={journalpost}></DokumentInfo>
            <RightAlign>
                <HoyreChevron></HoyreChevron>
            </RightAlign>
        </DokumentInfoStripeContainer>
    );
};

export const DokumentVelger: React.FC<IDokumentVelgerProps> = ({ dokument, journalpost }) => {
    const { hentDokumentData } = useManuellJournalføringV2();

    return (
        <DokumentPanel
            border
            onClick={() => {
                hentDokumentData(journalpost.journalpostId, dokument.dokumentInfoId || '0');
            }}
        >
            <DokumentInfoStripe dokument={dokument} journalpost={journalpost}></DokumentInfoStripe>
        </DokumentPanel>
    );
};
