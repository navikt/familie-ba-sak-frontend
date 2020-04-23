import { Hendelse } from '../typer';

import React from 'react';
import { BehandlerRolle } from '../../../../typer/behandling';

interface IHendelseItemProps {
    hendelse: Hendelse;
}

const HendelseItem = ({ hendelse }: IHendelseItemProps) => (
    <li>
        <p className={'hendelsesnavn'}>{hendelse.tittel}</p>
        {hendelse.beskrivelse && <p className={'hendelsesbeskrivelse'}>{hendelse.beskrivelse}</p>}
        <p className={'hendelsesdato'}>{`${hendelse.dato}`}</p>
        <p className={'hendelsesdato'}>{`${hendelse.utførtAv} ${
            hendelse.rolle !== BehandlerRolle.SYSTEM
                ? `(${hendelse.rolle.toString().toLowerCase()})`
                : ''
        }`}</p>
    </li>
);

export default HendelseItem;
