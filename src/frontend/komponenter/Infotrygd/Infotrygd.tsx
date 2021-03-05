import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';

const InfotrygdContainer = styled.div`
    margin: 1rem;
`;

const SakshistorikkKnapp = styled(Knapp)`
    margin-top: 4rem;
    width: 16rem;
`;

const VedtakshistorikkKnapp = styled(Knapp)`
    margin-top: 1rem;
    width: 16rem;
`;

export const Infotrygd: React.FC = () => {
    const history = useHistory();

    return (
        <InfotrygdContainer>
            <Innholdstittel>Historikkvisninger for Infotrygd</Innholdstittel>
            <SakshistorikkKnapp
                key={'sakshistorikk'}
                onClick={() => {
                    history.push('/infotrygd/sakshistorikk');
                }}
            >
                Sakshistorikk
            </SakshistorikkKnapp>
            <br />
            <VedtakshistorikkKnapp
                key={'vedtakshistorikk'}
                onClick={() => {
                    history.push('/infotrygd/vedtakshistorikk');
                }}
            >
                Vedtakshistorikk
            </VedtakshistorikkKnapp>
        </InfotrygdContainer>
    );
};
