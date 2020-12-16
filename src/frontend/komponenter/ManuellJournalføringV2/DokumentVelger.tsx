import React from 'react';

import CreatableSelect from 'react-select/creatable';
import styled, { ThemeProvider } from 'styled-components';
import { AnyStyledComponent } from 'styled-components/index';

import navFarger from 'nav-frontend-core';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import { IDokumentInfo, RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { DokumentIkon } from '../../ikoner/DokumentIkon';
import { DokumentTittel, JournalpostTittel } from '../../typer/manuell-journalføring';
import { feilDekoratør } from './FeilDekoratør';

const dokumentPanelDekoratør = <T extends unknown>(
    component: AnyStyledComponent | React.ComponentType<T>
) => styled(component)`
    && {
        margin-top: 20px;
        width: 560px;
        height: 100%;
        border: ${props => `${props.borderWidth} solid ${props.borderColor}`};
        &:hover {
            border-color: ${props => `${props.hoverBorderColor}`};
        }
        &:focus {
            border-color: ${props => `${props.hoverBorderColor}`};
        }
    }
`;

const DokumentPanelUvalgt = dokumentPanelDekoratør(Lenkepanel);

const DokumentPanelValgt = dokumentPanelDekoratør(Ekspanderbartpanel);

const DokumentInfoStripeContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

const DokumentTittelContainer = styled.div`
    display: flex;
    justfify-content: left;
    flex-direction: column;
`;

interface IDokumentInfoStripeProps {
    dokument: IDokumentInfo;
}

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
}

const DokumentTittelDiv = styled.div`
    font-size: 1.2rem;
    margin-bottom: 10px;
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
            <DokumentTittelContainer>
                <DokumentTittelDiv>{dokument.tittel || 'Ukjent'}</DokumentTittelDiv>
                {dokument.logiskeVedlegg.map((it, index) => (
                    <Normaltekst key={index}>{it.tittel}</Normaltekst>
                ))}
            </DokumentTittelContainer>
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

const tittelList = journalpostTittelList.concat(dokumentTittelList);

const EndreDokumentInfoPanel: React.FC = () => {
    const {
        settLogiskeVedlegg,
        finnValgtDokument,
        settDokumentTittel,
        tilbakestillDokumentTittel,
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

    const tittelOption = () => {
        const valgtDokument = finnValgtDokument();
        return {
            value: valgtDokument?.tittel,
            label: valgtDokument?.tittel,
        };
    };

    return (
        <div>
            <Label htmlFor="tittelSelect">Dokumenttittel</Label>
            <CreatableSelect
                id="tittelSelect"
                isClearable
                isMulti={false}
                options={tittelList}
                value={tittelOption()}
                onChange={value => {
                    if (value && 'value' in value) {
                        settDokumentTittel(value.value || '');
                    } else {
                        tilbakestillDokumentTittel();
                    }
                }}
            />
            <br />
            <Label htmlFor="innholdSelect">Annet innhold</Label>
            <CreatableSelect
                id="innholdSelect"
                isClearable
                isMulti={true}
                options={tittelList}
                value={hentVedleggList()}
                onChange={options => {
                    console.log(options);
                    settLogiskeVedlegg(
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
        valgtDokumentId,
        velgOgHentDokumentData,
        harFeil,
    } = useManuellJournalføringV2();

    const valgt = dokument.dokumentInfoId === valgtDokumentId;
    const journalpostId =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.journalpostId
            : undefined;
    const theme = {
        borderWidth: valgt ? '3px' : '1px',
        borderColor: valgt ? navFarger.fokusFarge : navFarger.navMorkGra,
    };
    const DokumentPanel = valgt ? DokumentPanelValgt : DokumentPanelUvalgt;
    const Panel = harFeil(dokument) ? feilDekoratør(DokumentPanel) : DokumentPanel;

    return (
        <ThemeProvider theme={theme}>
            <div>
                {valgt ? (
                    <Panel tittel={<DokumentInfoStripe dokument={dokument}></DokumentInfoStripe>}>
                        <EndreDokumentInfoPanel />
                    </Panel>
                ) : (
                    <Panel
                        tittelProps="normaltekst"
                        href="#"
                        onClick={() => {
                            if (!valgt && journalpostId && dokument.dokumentInfoId) {
                                velgOgHentDokumentData(dokument.dokumentInfoId);
                            }
                        }}
                    >
                        <DokumentInfoStripe dokument={dokument}></DokumentInfoStripe>
                    </Panel>
                )}
            </div>
        </ThemeProvider>
    );
};
