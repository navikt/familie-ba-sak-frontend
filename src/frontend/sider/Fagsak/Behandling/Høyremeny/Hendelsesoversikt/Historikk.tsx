import * as React from 'react';

import styled from 'styled-components';

import HendelseItem from './komponenter/HendelseItem';
import type { Hendelse } from './typer';

interface Props {
    hendelser: Hendelse[];
}

const HistorikkListe = styled.ul`
    min-height: 3.125rem;
    list-style: none;
    padding-left: 1.25rem;
`;

export function Historikk({ hendelser }: Props) {
    return (
        <HistorikkListe>
            {hendelser?.map((hendelse: Hendelse) => (
                <HendelseItem key={hendelse.id} hendelse={hendelse} />
            ))}
        </HistorikkListe>
    );
}
