import { IDokumentInfo, IJournalpost } from '@navikt/familie-typer';
import Panel from 'nav-frontend-paneler';
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { DokumentIkon } from '../../ikoner/DokumentIkon';
import CreatableSelect from 'react-select/creatable';
import { HoyreChevron, NedChevron, OppChevron } from 'nav-frontend-chevron';
import { DokumentTittel, JournalpostTittel } from '../../typer/manuell-journalføring';
import { Label } from 'nav-frontend-skjema';

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

interface ITittel {
    value: string;
    label: string;
}

const dokumentTittelList: Array<ITittel> = Object.keys(DokumentTittel).map((_, index) => {
    return {
        value: Object.values(DokumentTittel)[index],
        label: Object.values(DokumentTittel)[index],
    };
});

const journalpostTittelList: Array<ITittel> = Object.keys(JournalpostTittel).map((_, index) => {
    return {
        value: Object.values(JournalpostTittel)[index],
        label: Object.values(JournalpostTittel)[index],
    };
});

const tittelList = dokumentTittelList.concat(journalpostTittelList);

const LogiskVedleggPanel: React.FC<IDokumentTittelPanelProps> = () => {
    const {
        settLogiskVedlegg,
        finnValgtDokument,
        settDokumentTittel,
        tilbakestilleDokumentTittel,
    } = useManuellJournalføringV2();

    const hentVedleggList = () => {
        const valgtDokument = finnValgtDokument();
        return valgtDokument
            ? valgtDokument.logiskeVedlegg.map(vedlegg => {
                  return {
                      value: vedlegg.tittel,
                      label: vedlegg.tittel,
                  };
              })
            : [];
    };

    const finnTittel = (options: Array<string>) => {
        return options.filter(value => Object.values(JournalpostTittel).find(v => v === value));
    };

    const genererDokumentTittelFraOptions = (options: Array<string>) => {
        return options.length === 0
            ? ''
            : options.reduce((tittel, option) => (tittel ? `${tittel}, ${option}` : `${option}`));
    };

    const handleOptions = (options: Array<string>) => {
        const tittel = finnTittel(options);
        if (tittel.length === 1) {
            settDokumentTittel(tittel[0]);
        } else if (tittel.length === 0) {
            const generertTittel = genererDokumentTittelFraOptions(options);
            if (generertTittel !== '') {
                settDokumentTittel(generertTittel);
            } else {
                tilbakestilleDokumentTittel();
            }
        } else {
            alert('TODO: Error message for conflicting tags');
        }

        settLogiskVedlegg(options);
    };

    return (
        <div>
            <Label htmlFor="select">Dokumentbesrivelse</Label>
            <CreatableSelect
                id="select"
                isClearable
                isMulti={true}
                options={tittelList}
                value={hentVedleggList()}
                onChange={options => {
                    handleOptions(
                        options instanceof Array ? options.map(({ value }) => value) : []
                    );
                }}
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
                {valgt && utvidet && <LogiskVedleggPanel tittel={dokument.tittel || 'No Tittle'} />}
            </DokumentPanel>
        </ThemeProvider>
    );
};
