import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { ABorderDivider } from '@navikt/ds-tokens/dist/tokens';
import { RessursStatus } from '@navikt/familie-typer';

import BehandlingRouter from './BehandlingRouter';
import Høyremeny from './Høyremeny/Høyremeny';
import { BehandlingProvider } from '../../../context/behandlingContext/BehandlingContext';
import { useHentOgSettBehandling } from '../../../context/behandlingContext/HentOgSettBehandlingContext';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import type { IPersonInfo } from '../../../typer/person';
import Venstremeny from '../../Felleskomponenter/Venstremeny/Venstremeny';
import Personlinje from '../Personlinje/Personlinje';

interface Props {
    bruker: IPersonInfo;
    fagsak: IMinimalFagsak;
}

const FlexContainer = styled.div`
    display: flex;
`;

const VenstremenyContainer = styled.div`
    min-width: 1rem;
    border-right: 1px solid ${ABorderDivider};
    overflow: hidden;
`;

const HovedinnholdContainer = styled.div`
    height: calc(100vh - 6rem);
    flex: 1;
    overflow: auto;
`;

const HøyremenyContainer = styled.div`
    border-left: 1px solid ${ABorderDivider};
    overflow-x: hidden;
    overflow-y: scroll;
`;

const BehandlingContainer: React.FC<Props> = ({ bruker, fagsak }) => {
    const { behandlingRessurs } = useHentOgSettBehandling();

    switch (behandlingRessurs.status) {
        case RessursStatus.SUKSESS:
            return (
                <BehandlingProvider behandling={behandlingRessurs.data}>
                    <Personlinje
                        bruker={bruker}
                        minimalFagsak={fagsak}
                        behandling={behandlingRessurs.data}
                    />
                    <FlexContainer>
                        <VenstremenyContainer>
                            <Venstremeny />
                        </VenstremenyContainer>
                        <HovedinnholdContainer>
                            <BehandlingRouter bruker={bruker} fagsak={fagsak} />
                        </HovedinnholdContainer>
                        <HøyremenyContainer>
                            <Høyremeny bruker={bruker} />
                        </HøyremenyContainer>
                    </FlexContainer>
                </BehandlingProvider>
            );
        case RessursStatus.IKKE_TILGANG:
            return (
                <Alert
                    variant="warning"
                    children={`Du har ikke tilgang til å se denne behandlingen.`}
                />
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <Alert children={behandlingRessurs.frontendFeilmelding} variant="error" />;
        default:
            return <div />;
    }
};

export default BehandlingContainer;
