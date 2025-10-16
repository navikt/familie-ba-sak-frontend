import React from 'react';

import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';

import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import { EksternLenke } from '../../../ikoner/EksternLenke';
import FamilieBaseKnapp from '../../../komponenter/FamilieBaseKnapp';

const DokumentInfoStripeContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

const DokumentTittelContainer = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
`;

const DokumentTittelDiv = styled.div`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const StyledDokumentIkonDiv = styled.div`
    margin: 0 16px 0 0;
    min-width: 48px;
    min-height: 48px;
`;

const StyledÅpenDokument = styled(FamilieBaseKnapp)`
    margin-left: 10px;
`;

interface IDokumentInfoStripeProps {
    valgt: boolean;
    journalpostId: string;
    dokument: IDokumentInfo;
}

export const DokumentInfoStripe: React.FC<IDokumentInfoStripeProps> = ({ valgt, journalpostId, dokument }) => {
    return (
        <DokumentInfoStripeContainer>
            <StyledDokumentIkonDiv>
                <DokumentIkon filled={valgt} width={48} height={48} />
            </StyledDokumentIkonDiv>
            <DokumentTittelContainer>
                <DokumentTittelDiv>
                    {dokument.tittel || 'Ukjent'}
                    <StyledÅpenDokument
                        onClick={() => {
                            window.open(
                                `/familie-ba-sak/api/journalpost/${journalpostId}/dokument/${dokument.dokumentInfoId}`,
                                '_blank'
                            );
                        }}
                    >
                        <EksternLenke />
                    </StyledÅpenDokument>
                </DokumentTittelDiv>
                {dokument.logiskeVedlegg.map((it, index) => (
                    <BodyShort key={index}>{it.tittel}</BodyShort>
                ))}
            </DokumentTittelContainer>
        </DokumentInfoStripeContainer>
    );
};
