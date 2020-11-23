import { IDokumentInfo, IJournalpost } from '@navikt/familie-typer';
import Panel from 'nav-frontend-paneler';
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { DokumentIkon } from '../../ikoner/DokumentIkon';
import CreatableSelect from 'react-select/creatable';
import { HoyreChevron, NedChevron, OppChevron } from 'nav-frontend-chevron';

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

interface IDokumentTittelPanelProps {
    tittel: string;
}

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
    valgt: boolean;
}

enum EndreKnappStatus {
    UVALGT,
    VALGT,
    UTVIDET,
}

interface IEndreKnappProps {
    status: EndreKnappStatus;
    onClick: () => void;
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

const StyledDokumentIkon = styled(DokumentIkon)`
    margin: 0 16px 0 0;
`;

const EndreDiv = styled.div`
    text-decoration: underline;
    text-align: right;
    width: 5rem;
    margin-left: auto;
`;

const EndreDivVanlig = styled(EndreDiv)`
    color: black;
`;

const EndreDivAktiv = styled(EndreDiv)`
    color: #0067c5;
`;

const EndreKnapp: React.FC<IEndreKnappProps> = ({ status, onClick }) => {
    switch (status) {
        case EndreKnappStatus.UVALGT:
            return (
                <EndreDivVanlig onClick={onClick}>
                    <HoyreChevron />
                </EndreDivVanlig>
            );
        case EndreKnappStatus.VALGT:
            return (
                <EndreDivAktiv onClick={onClick}>
                    Endre
                    <NedChevron />
                </EndreDivAktiv>
            );
        case EndreKnappStatus.UTVIDET:
            return (
                <EndreDivAktiv onClick={onClick}>
                    Lukk
                    <OppChevron />
                </EndreDivAktiv>
            );
    }
};

const DokumentInfoStripe: React.FC<IDokumentInfoStripeProps> = ({
    dokument,
    journalpost,
    valgt,
    utvidet,
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
            <EndreKnapp
                status={
                    utvidet
                        ? EndreKnappStatus.UTVIDET
                        : valgt
                        ? EndreKnappStatus.VALGT
                        : EndreKnappStatus.UVALGT
                }
                onClick={onClick}
            />
        </DokumentInfoStripeContainer>
    );
};

const sampleOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const DokumentTittelPanel: React.FC<IDokumentTittelPanelProps> = ({ tittel }) => {
    return (
        <div>
            <CreatableSelect
                isClearable
                isMulti={true}
                options={sampleOptions}
                defaultInputValue={tittel}
            />
        </div>
    );
};

export const DokumentVelger: React.FC<IDokumentVelgerProps> = ({
    dokument,
    journalpost,
    valgt,
}) => {
    const { hentDokumentData, settValgtDokumentId } = useManuellJournalføringV2();
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
                {valgt && utvidet && (
                    <DokumentTittelPanel tittel={dokument.tittel || 'No Tittle'} />
                )}
            </DokumentPanel>
        </ThemeProvider>
    );
};
