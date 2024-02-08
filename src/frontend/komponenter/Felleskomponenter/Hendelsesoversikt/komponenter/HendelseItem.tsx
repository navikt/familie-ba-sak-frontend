import React from 'react';

import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';
import { ASpacing2, ASpacing3, ASpacing9 } from '@navikt/ds-tokens/dist/tokens';

import { BehandlerRolle, behandlerRoller } from '../../../../typer/behandling';
import type { Hendelse } from '../typer';

interface IHendelseItemProps {
    hendelse: Hendelse;
}

const Hendelsesbeskrivelse = styled(BodyShort)`
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: ${ASpacing2} 0;
`;

const ListeElement = styled.li`
    padding: ${ASpacing3} ${ASpacing3} ${ASpacing3} ${ASpacing9};
`;

const HendelseItem = ({ hendelse }: IHendelseItemProps) => (
    <ListeElement>
        <BodyShort weight="semibold">{hendelse.tittel}</BodyShort>
        {hendelse.beskrivelse && (
            <Hendelsesbeskrivelse>{hendelse.beskrivelse}</Hendelsesbeskrivelse>
        )}
        <BodyShort textColor="subtle">{`${hendelse.dato}`}</BodyShort>
        <BodyShort textColor="subtle">{`${hendelse.utførtAv} ${
            hendelse.rolle.toString() !== BehandlerRolle[BehandlerRolle.SYSTEM] &&
            behandlerRoller[hendelse.rolle]
                ? `(${behandlerRoller[hendelse.rolle].navn})`
                : ''
        }`}</BodyShort>
    </ListeElement>
);

export default HendelseItem;
