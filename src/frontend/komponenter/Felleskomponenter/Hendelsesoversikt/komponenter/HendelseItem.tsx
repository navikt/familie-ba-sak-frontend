import React from 'react';

import { BehandlerRolle, behandlerRoller } from '../../../../typer/behandling';
import type { Hendelse } from '../typer';

interface IHendelseItemProps {
    hendelse: Hendelse;
}

const HendelseItem = ({ hendelse }: IHendelseItemProps) => (
    <li>
        <p className={'hendelsesnavn'}>{hendelse.tittel}</p>
        {hendelse.beskrivelse && <p className={'hendelsesbeskrivelse'}>{hendelse.beskrivelse}</p>}
        <p className={'hendelsesdato'}>{`${hendelse.dato}`}</p>
        <p className={'hendelsesdato'}>{`${hendelse.utførtAv} ${
            hendelse.rolle.toString() !== BehandlerRolle[BehandlerRolle.SYSTEM] &&
            behandlerRoller[hendelse.rolle]
                ? `(${behandlerRoller[hendelse.rolle].navn})`
                : ''
        }`}</p>
    </li>
);

export default HendelseItem;
