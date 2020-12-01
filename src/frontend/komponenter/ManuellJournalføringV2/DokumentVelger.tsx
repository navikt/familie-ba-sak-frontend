import { IDokumentInfo, IJournalpost } from '@navikt/familie-typer';
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { DokumentIkon } from '../../ikoner/DokumentIkon';
import CreatableSelect from 'react-select/creatable';
import { DokumentTittel, JournalpostTittel } from '../../typer/manuell-journalføring';
import { Label } from 'nav-frontend-skjema';
import Lenkepanel from 'nav-frontend-lenkepanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import navFarger from 'nav-frontend-core';

const DokumentPanel = styled(Lenkepanel)`
    margin-top: 20px;
    width: 560px;
    height: 100%;
    border: ${props => `${props.theme.borderWidth} solid ${props.theme.borderColor}`};
    &:hover {
        border-color: ${props => `${props.theme.hoverBorderColor}`};
    }
`;

const DokumentPanelValgt = styled(Ekspanderbartpanel)`
    margin-top: 20px;
    width: 560px;
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

interface IDokumentInfoStripeProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
    valgt: boolean;
    utvidet: boolean;
}

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    journalpost: IJournalpost;
    valgt: boolean;
}

const DokumentTittelDiv = styled.td`
    font-size: 1rem;
`;

const StyledDokumentIkon = styled(DokumentIkon)`
    margin: 0 16px 0 0;
    min-width: 48px;
    min-height: 48px;
`;

const DokumentInfoStripe: React.FC<IDokumentInfoStripeProps> = ({ dokument }) => {
    return (
        <DokumentInfoStripeContainer>
            <StyledDokumentIkon />
            <DokumentTittelDiv>{dokument.tittel || 'Ukjent'}</DokumentTittelDiv>
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

const LogiskVedleggPanel: React.FC = () => {
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

    const genererDokumentTittelFraOptions = (options: Array<string>) => {
        return options.length === 0
            ? ''
            : options.reduce((tittel, option) => (tittel ? `${tittel}, ${option}` : `${option}`));
    };

    const handleOptions = (options: Array<string>) => {
        const tags = options;
        if (tags.length === 1) {
            settDokumentTittel(tags[0]);
        } else {
            const generertTittel = genererDokumentTittelFraOptions(tags);
            if (generertTittel !== '') {
                settDokumentTittel(generertTittel);
            } else {
                tilbakestilleDokumentTittel();
            }
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
        borderColor: valgt ? navFarger.fokusFarge : navFarger.navMorkGra,
        hoverBorderColor: navFarger.navBla,
    };

    return (
        <ThemeProvider theme={theme}>
            {!valgt && (
                <DokumentPanel
                    border
                    tittelProps="normaltekst"
                    href="#"
                    onClick={() => {
                        if (!valgt) {
                            hentDokumentData(
                                journalpost.journalpostId,
                                dokument.dokumentInfoId || '0'
                            );
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
                    ></DokumentInfoStripe>
                </DokumentPanel>
            )}
            {valgt && (
                <DokumentPanelValgt
                    tittel={
                        <DokumentInfoStripe
                            dokument={dokument}
                            journalpost={journalpost}
                            valgt={valgt}
                            utvidet={valgt && utvidet}
                        ></DokumentInfoStripe>
                    }
                >
                    <LogiskVedleggPanel />
                </DokumentPanelValgt>
            )}
        </ThemeProvider>
    );
};
