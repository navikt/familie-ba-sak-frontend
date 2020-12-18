import React from 'react';

import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { IDokumentInfo } from '@navikt/familie-typer';

import { DokumentIkon } from '../../../ikoner/DokumentIkon';

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

interface IDokumentInfoStripeProps {
    dokument: IDokumentInfo;
}

export const DokumentInfoStripe: React.FC<IDokumentInfoStripeProps> = ({ dokument }) => {
    return (
        <DokumentInfoStripeContainer>
            <StyledDokumentIkon width={48} height={48} />
            <DokumentTittelContainer>
                <DokumentTittelDiv>{dokument.tittel || 'Ukjent'}</DokumentTittelDiv>
                {dokument.logiskeVedlegg.map((it, index) => (
                    <Normaltekst key={index}>{it.tittel}</Normaltekst>
                ))}
            </DokumentTittelContainer>
        </DokumentInfoStripeContainer>
    );
};
