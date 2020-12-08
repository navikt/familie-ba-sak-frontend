import React from 'react';

import styled from 'styled-components';

import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

const JournalførMotSakDiv = styled.div`
    margin-top: 20px;
`;

const Sakstype = styled.div`
    font-size: 1.2rem;
`;

export const JournalførMotSak: React.FC = () => {
    return (
        <JournalførMotSakDiv>
            <Undertittel>Journalfør Mot</Undertittel>
            <br />
            <RadioGruppe>
                <Radio label={<Sakstype>Fagsak (behandling)</Sakstype>} name="velgSakstype" />
                <Radio label={<Sakstype>Generell sak</Sakstype>} name="velgSakstype" />
            </RadioGruppe>
        </JournalførMotSakDiv>
    );
};
