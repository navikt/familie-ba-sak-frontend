import { BehandlerRolle, Hendelse } from '../typer';

import React from 'react';

interface IHendelseItemProps {
    hendelse: Hendelse;
}

const HendelseItem = ({ hendelse }: IHendelseItemProps) => (
    <li>
        <p className={'hendelsesnavn'}>{hendelse.tittel}</p>
        {hendelse.beskrivelse && <p className={'hendelsesbeskrivelse'}>{hendelse.beskrivelse}</p>}
        <p className={'hendelsesdato'}>{`${hendelse.dato}`}</p>
        <p className={'hendelsesdato'}>{`${hendelse.utførtAv} ${
            hendelse.rolle !== BehandlerRolle.SYSTEM ? `(${hendelse.rolle.toLowerCase()})` : ''
        }`}</p>
    </li>
);

export default HendelseItem;
