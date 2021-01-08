import React from 'react';

import styled from 'styled-components';
import { AnyStyledComponent } from 'styled-components/index';

import navFarger from 'nav-frontend-core';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenkepanel from 'nav-frontend-lenkepanel';

import { IDokumentInfo, RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';
import { feilDekoratør } from '../FeilDekoratør';
import { DokumentInfoStripe } from './DokumentInfoStripe';
import { EndreDokumentInfoPanel } from './EndreDokumentInfoPanel';

const dokumentPanelDekoratør = <T extends unknown>(
    component: AnyStyledComponent | React.ComponentType<T>
) => styled(component)`
    && {
        margin-top: 20px;
        width: 560px;
        height: 100%;
    }
`;

const DokumentBoksValgt = styled(dokumentPanelDekoratør(Ekspanderbartpanel))`
    && {
        border: 3px solid ${navFarger.fokusFarge};
        &:hover {
            border-color: ${navFarger.navBla};
        }
        &:focus {
            border-color: ${navFarger.fokusFarge};
        }
    }
`;

const DokumentBoksUvalgt = styled(dokumentPanelDekoratør(Lenkepanel))`
    && {
        border: 1px solid ${navFarger.navMorkGra};
        &:hover {
            border-color: ${navFarger.navBla};
        }
        &:focus {
            border-color: ${navFarger.fokusFarge};
        }
    }
`;

const PanelFeilValgt = feilDekoratør(DokumentBoksValgt);

const PanelFeilUvalgt = feilDekoratør(DokumentBoksUvalgt);

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
}

export const DokumentVelger: React.FC<IDokumentVelgerProps> = ({ dokument }) => {
    const {
        dataForManuellJournalføring,
        valgtDokumentId,
        velgOgHentDokumentData,
        harFeil,
    } = useManuellJournalfør();

    const valgt = dokument.dokumentInfoId === valgtDokumentId;
    const journalpostId =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.journalpostId
            : undefined;
    const DokumentBoks = harFeil(dokument)
        ? valgt
            ? PanelFeilValgt
            : PanelFeilUvalgt
        : valgt
        ? DokumentBoksValgt
        : DokumentBoksUvalgt;

    return (
        <DokumentBoks
            tittel={
                <DokumentInfoStripe
                    journalpostId={journalpostId}
                    dokument={dokument}
                ></DokumentInfoStripe>
            }
            tittelProps="normaltekst"
            href="#"
            onClick={() => {
                if (!valgt && journalpostId && dokument.dokumentInfoId) {
                    velgOgHentDokumentData(dokument.dokumentInfoId);
                }
            }}
        >
            {!valgt && (
                <DokumentInfoStripe
                    journalpostId={journalpostId}
                    dokument={dokument}
                ></DokumentInfoStripe>
            )}
            {valgt && <EndreDokumentInfoPanel />}
        </DokumentBoks>
    );
};
