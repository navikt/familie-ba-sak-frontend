import { IDokumentInfo, IJournalpost } from '@navikt/familie-typer';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import styled from 'styled-components';
import { DokumentIkon } from '../../ikoner/DokumentIkon';
import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import navFarger from 'nav-frontend-core';

const DokumentPanel = styled(Panel)`
    margin-top: 20px;
    width: 27rem;
    height: 100%;
    border: ${(props: { valgt: boolean }) =>
        `${props.valgt ? '3px' : '1px'} solid ${
            props.valgt ? navFarger.fokusFarge : navFarger.navMorkGra
        }`};
    &:hover {
        border-color: ${navFarger.navBla};
    }
`;

const DokumentInfoStripeContainer = styled.div`
    display: flex;
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
}

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
    valgt: boolean;
}

const DokumentInfo: React.FC<IDokumentInfoProps> = ({ dokument, journalpost }) => {
    return (
        <div>
            <Undertittel>{dokument.tittel || 'Ukjent'}</Undertittel>
            <Normaltekst>Mottatt: {journalpost.datoMottatt}</Normaltekst>
            <Normaltekst>{dokument.brevkode || 'Ukjent'}</Normaltekst>
        </div>
    );
};

const StyledDokumentIkon = styled(DokumentIkon)`
    margin: 0 16px 0 0;
`;

const DokumentInfoStripe: React.FC<IDokumentInfoStripeProps> = ({ dokument, journalpost }) => {
    return (
        <DokumentInfoStripeContainer>
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
    return (
        <DokumentPanel
            valgt={valgt}
            border
            onClick={() => {
                if (!valgt) {
                    hentDokumentData(journalpost.journalpostId, dokument.dokumentInfoId || '0');
                    settValgtDokumentId(dokument.dokumentInfoId);
                }
            }}
        >
            <DokumentInfoStripe dokument={dokument} journalpost={journalpost} />
        </DokumentPanel>
    );
};
