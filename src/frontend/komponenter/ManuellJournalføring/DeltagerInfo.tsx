import React from 'react';

import styled from 'styled-components';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';

interface DeltagerProps {
    ikon: React.ReactNode;
    navn: string;
    ident: string;
    undertittel: string;
    children?: React.ReactNode | React.ReactNode[];
}

const HSplit = styled.div`
    display: flex;
    flex-direction: row;
`;

export const DeltagerInfo: React.FC<DeltagerProps> = ({ ikon, navn, undertittel, ident }) => {
    const { dataForManuellJournalføring } = useManuellJournalføring();
    const MarginedDiv = styled.div`
        margin-right: 16px;
    `;
    return dataForManuellJournalføring.status === RessursStatus.SUKSESS ? (
        <div>
            <HSplit>
                <MarginedDiv>{ikon}</MarginedDiv>
                <div>
                    <Undertittel>{ident ? `${navn} | ${ident}` : navn}</Undertittel>
                    <Normaltekst>{undertittel}</Normaltekst>
                </div>
            </HSplit>
        </div>
    ) : (
        <></>
    );
};
