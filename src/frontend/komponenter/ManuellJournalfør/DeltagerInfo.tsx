import React from 'react';

import styled from 'styled-components';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

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

const MarginedDiv = styled.div`
    margin-right: 1rem;
`;

export const DeltagerInfo: React.FC<DeltagerProps> = ({ ikon, navn, undertittel, ident }) => {
    return (
        <div>
            <HSplit>
                <MarginedDiv>{ikon}</MarginedDiv>
                <div>
                    <Undertittel>{ident ? `${navn} | ${ident}` : navn}</Undertittel>
                    <Normaltekst>{undertittel}</Normaltekst>
                </div>
            </HSplit>
        </div>
    );
};
