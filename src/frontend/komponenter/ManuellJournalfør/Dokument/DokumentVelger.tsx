import React, { useEffect, useState } from 'react';

import { RessursStatus } from '@navikt/familie-typer';
import type { IDokumentInfo } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../../context/ManuellJournalførContext';
import { StyledEkspanderbartpanelBase } from '../StyledEkspanderbartpanelBase';
import { DokumentInfoStripe } from './DokumentInfoStripe';
import { EndreDokumentInfoPanel } from './EndreDokumentInfoPanel';

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    visFeilmeldinger: boolean;
}

export const DokumentVelger: React.FC<IDokumentVelgerProps> = ({ dokument, visFeilmeldinger }) => {
    const { dataForManuellJournalføring, valgtDokumentId, velgOgHentDokumentData } =
        useManuellJournalfør();
    const [åpen, settÅpen] = useState(false);

    const valgt = dokument.dokumentInfoId === valgtDokumentId;
    const journalpostId =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.journalpostId
            : '';

    useEffect(() => {
        if (visFeilmeldinger) {
            settÅpen(true);
        }
    }, [visFeilmeldinger]);

    return (
        <StyledEkspanderbartpanelBase
            visFeilmeldinger={visFeilmeldinger}
            valgt={valgt}
            tittel={
                <DokumentInfoStripe
                    valgt={valgt}
                    journalpostId={journalpostId}
                    dokument={dokument}
                />
            }
            apen={åpen}
            onClick={() => {
                settÅpen(!åpen);
                if (!valgt && journalpostId && dokument.dokumentInfoId) {
                    velgOgHentDokumentData(dokument.dokumentInfoId);
                }
            }}
        >
            <EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={visFeilmeldinger} />
        </StyledEkspanderbartpanelBase>
    );
};
