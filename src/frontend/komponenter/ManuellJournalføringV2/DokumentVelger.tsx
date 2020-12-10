import React from 'react';

import CreatableSelect from 'react-select/creatable';
import styled, { ThemeProvider } from 'styled-components';

import navFarger from 'nav-frontend-core';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { Label } from 'nav-frontend-skjema';

import { IDokumentInfo, RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { DokumentIkon } from '../../ikoner/DokumentIkon';
import { DokumentTittel, JournalpostTittel } from '../../typer/manuell-journalføring';

const DokumentPanel = styled(Lenkepanel)`
    && {
        margin-top: 20px;
        width: 560px;
        height: 100%;
        border: ${props => `${props.theme.borderWidth} solid ${props.theme.borderColor}`};
        &:hover {
            border-color: ${props => `${props.theme.hoverBorderColor}`};
        }
        &:focus {
            border-color: ${props => `${props.theme.hoverBorderColor}`};
        }
    }
`;

const DokumentPanelValgt = styled(Ekspanderbartpanel)`
    && {
        margin-top: 20px;
        width: 560px;
        height: 100%;
        border: ${props => `${props.theme.borderWidth} solid ${props.theme.borderColor}`};
        &:hover {
            border-color: ${props => `${props.theme.hoverBorderColor}`};
        }
        &:focus {
            border-color: ${props => `${props.theme.hoverBorderColor}`};
        }
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
}

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
}

const DokumentTittelDiv = styled.div`
    font-size: 1.2rem;
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

export const journalpostTittelList: Array<ITittel> = Object.keys(JournalpostTittel).map(
    (_, index) => {
        return {
            value: Object.values(JournalpostTittel)[index],
            label: Object.values(JournalpostTittel)[index],
        };
    }
);

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
            <Label htmlFor="select">Dokumentbeskrivelse</Label>
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

export const DokumentVelger: React.FC<IDokumentVelgerProps> = ({ dokument }) => {
    const {
        dataForManuellJournalføring,
        hentDokumentData,
        valgtDokumentId,
        settValgtDokumentId,
        valideringsfeil,
    } = useManuellJournalføringV2();
    const valgt = dokument.dokumentInfoId === valgtDokumentId;
    const journalpostId =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.journalpostId
            : undefined;
    const feil = valideringsfeil.get(dokument);
    const theme = {
        borderWidth: valgt ? '3px' : '1px',
        borderColor: feil ? navFarger.navRod : valgt ? navFarger.fokusFarge : navFarger.navMorkGra,
        hoverBorderColor: feil ? navFarger.navRod : navFarger.navBla,
    };

    return (
        <ThemeProvider theme={theme}>
            {valgt ? (
                <DokumentPanelValgt
                    tittel={<DokumentInfoStripe dokument={dokument}></DokumentInfoStripe>}
                >
                    <LogiskVedleggPanel />
                </DokumentPanelValgt>
            ) : (
                <DokumentPanel
                    tittelProps="normaltekst"
                    href="#"
                    onClick={() => {
                        if (!valgt && journalpostId && dokument.dokumentInfoId) {
                            hentDokumentData(journalpostId, dokument.dokumentInfoId);
                            settValgtDokumentId(dokument.dokumentInfoId);
                        }
                    }}
                >
                    <DokumentInfoStripe dokument={dokument}></DokumentInfoStripe>
                </DokumentPanel>
            )}
        </ThemeProvider>
    );
};
