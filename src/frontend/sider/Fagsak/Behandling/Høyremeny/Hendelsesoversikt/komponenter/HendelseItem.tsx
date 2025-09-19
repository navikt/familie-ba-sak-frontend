import React from 'react';

import styled from 'styled-components';

import { BodyShort, HGrid, VStack } from '@navikt/ds-react';
import { ABorderDefault, ABorderSubtle, ASpacing1, ASpacing4, ASpacing6 } from '@navikt/ds-tokens/dist/tokens';

import { BehandlerRolle, behandlerRoller } from '../../../../../../typer/behandling';
import type { Hendelse } from '../typer';

interface IHendelseItemProps {
    hendelse: Hendelse;
}

const Hendelsesbeskrivelse = styled(BodyShort)`
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: ${ASpacing1} 0;
`;

const StyledVStack = styled(VStack)`
    margin-bottom: ${ASpacing6};
    margin-right: ${ASpacing4};
`;

const Sirkel = styled.div`
    border: 2px solid ${ABorderDefault};
    height: ${ASpacing4};
    width: ${ASpacing4};
    border-radius: 50%;
`;

const Strek = styled.div`
    height: 100%;
    width: 1px;
    background: ${ABorderSubtle};
    top: 2px;
    left: 0.5rem;
    transform: translateX(-0.5px);
`;
const HendelseItem = ({ hendelse }: IHendelseItemProps) => (
    <li>
        <HGrid columns="0.5rem 1fr" gap="4">
            <VStack align="center">
                <Sirkel />
                <Strek />
            </VStack>
            <StyledVStack>
                <BodyShort weight="semibold">{hendelse.tittel}</BodyShort>
                {hendelse.beskrivelse && <Hendelsesbeskrivelse>{hendelse.beskrivelse}</Hendelsesbeskrivelse>}
                <BodyShort textColor="subtle">{`${hendelse.dato}`}</BodyShort>
                <BodyShort textColor="subtle">{`${hendelse.utførtAv} ${
                    hendelse.rolle.toString() !== BehandlerRolle[BehandlerRolle.SYSTEM] &&
                    behandlerRoller[hendelse.rolle]
                        ? `(${behandlerRoller[hendelse.rolle].navn})`
                        : ''
                }`}</BodyShort>
            </StyledVStack>
        </HGrid>
    </li>
);

export default HendelseItem;
