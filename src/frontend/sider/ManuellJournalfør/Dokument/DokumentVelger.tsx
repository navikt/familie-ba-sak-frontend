import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { ExpansionCard } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import type { IDokumentInfo } from '@navikt/familie-typer';

import { DokumentInfoStripe } from './DokumentInfoStripe';
import { EndreDokumentInfoPanel } from './EndreDokumentInfoPanel';
import { useManuellJournalførContext } from '../../../context/ManuellJournalførContext';

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    visFeilmeldinger: boolean;
}

const StyledExpansionCard = styled(ExpansionCard)`
    margin-top: 1rem;
    width: 100%;
`;

export const DokumentVelger: React.FC<IDokumentVelgerProps> = ({ dokument, visFeilmeldinger }) => {
    const { dataForManuellJournalføring, valgtDokumentId, velgOgHentDokumentData } =
        useManuellJournalførContext();
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
        <StyledExpansionCard
            open={åpen}
            onToggle={() => {
                settÅpen(!åpen);
                if (!valgt && journalpostId && dokument.dokumentInfoId) {
                    velgOgHentDokumentData(dokument.dokumentInfoId);
                }
            }}
            size="small"
            aria-label="Dokumentvelger"
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title>
                    <DokumentInfoStripe
                        valgt={valgt}
                        journalpostId={journalpostId}
                        dokument={dokument}
                    />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={visFeilmeldinger} />
            </ExpansionCard.Content>
        </StyledExpansionCard>
    );
};
