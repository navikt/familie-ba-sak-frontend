import { RessursStatus } from '@navikt/familie-typer';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import styled from 'styled-components';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';

interface DeltagerProps {
    ikon: React.ReactNode;
    navn: string;
    type: string;
    ident: string;
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

const DeltagerInfo: React.FC<DeltagerProps> = ({ ikon, navn, type, ident }) => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
    const MarginedDiv = styled.div`
        margin-right: 16px;
    `;
    return dataForManuellJournalføring.status === RessursStatus.SUKSESS ? (
        <div>
            <HSplit>
                <MarginedDiv>{ikon}</MarginedDiv>
                <div>
                    <Undertittel>{navn}</Undertittel>
                    <Normaltekst>{type}</Normaltekst>
                    <Normaltekst>{ident}</Normaltekst>
                </div>
            </HSplit>
        </div>
    ) : (
        <></>
    );
};

export const Deltager: React.FC<DeltagerProps> = ({ ikon, navn, type, ident, children }) => {
    return (
        <DeltagerDiv>
            <Ekspanderbartpanel
                tittel={<DeltagerInfo ikon={ikon} navn={navn} type={type} ident={ident} />}
            >
                {children}
            </Ekspanderbartpanel>
        </DeltagerDiv>
    );
};
