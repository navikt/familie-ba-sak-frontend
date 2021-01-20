import React from 'react';

import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { IDokumentInfo } from '@navikt/familie-typer';

import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import { EksternLenke } from '../../../ikoner/EksternLenke';

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

const DokumentTittelDiv = styled.div`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const StyledDokumentIkon = styled(DokumentIkon)`
    margin: 0 16px 0 0;
    min-width: 48px;
    min-height: 48px;
`;

const StyledÅpenDokument = styled.button`
    margin-left: 10px;
`;

interface IDokumentInfoStripeProps {
    valgt: boolean;
    journalpostId: string;
    dokument: IDokumentInfo;
}

export const DokumentInfoStripe: React.FC<IDokumentInfoStripeProps> = ({
    valgt,
    journalpostId,
    dokument,
}) => {
    return (
        <DokumentInfoStripeContainer>
            <StyledDokumentIkon filled={valgt} width={48} height={48} />
            <DokumentTittelContainer>
                <DokumentTittelDiv>
                    {dokument.tittel || 'Ukjent'}
                    <StyledÅpenDokument
                        onClick={() => {
                            window.open(
                                `/proxy/api/hentDokument/${journalpostId}/hent/${dokument.dokumentInfoId}`,
                                '_blank'
                            );
                        }}
                    >
                        <EksternLenke />
                    </StyledÅpenDokument>
                </DokumentTittelDiv>
                {dokument.logiskeVedlegg.map((it, index) => (
                    <Normaltekst key={index}>{it.tittel}</Normaltekst>
                ))}
            </DokumentTittelContainer>
        </DokumentInfoStripeContainer>
    );
};
