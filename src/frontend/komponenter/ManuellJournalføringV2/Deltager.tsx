import React from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';

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

const DeltagerDiv = styled.div`
    width: 560px;
    margin-top: 20px;
`;

const DeltagerInfo: React.FC<DeltagerProps> = ({ ikon, navn, undertittel, ident }) => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
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

export const Deltager: React.FC<DeltagerProps> = ({ ikon, navn, ident, undertittel, children }) => {
    return (
        <DeltagerDiv>
            <Ekspanderbartpanel
                tittel={
                    <DeltagerInfo ikon={ikon} navn={navn} undertittel={undertittel} ident={ident} />
                }
            >
                {children}
            </Ekspanderbartpanel>
        </DeltagerDiv>
    );
};
