import React from 'react';

import { Tabs } from '@navikt/ds-react';

import IkonDokumenter from './Hendelsesoversikt/ikoner/IkonDokumenter';
import IkonHistorikk from './Hendelsesoversikt/ikoner/IkonHistorikk';
import IkonMeldinger from './Hendelsesoversikt/ikoner/IkonMeldinger';
import IkonTotrinnskontroll from './Hendelsesoversikt/ikoner/IkonTotrinnskontroll';
import styles from './Tabvelger.module.css';
import { Behandlingstype } from '../../../../typer/behandling';
import { useBehandlingContext } from '../context/BehandlingContext';
import { TabValg } from './Hendelsesoversikt/typer';

interface Props {
    skalViseTotrinnskontroll: boolean;
}

export function Tabvelger({ skalViseTotrinnskontroll }: Props) {
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const erLesevisning = vurderErLesevisning();
    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    return (
        <Tabs.List className={styles.tabsListe}>
            {skalViseTotrinnskontroll && (
                <Tabs.Tab
                    value={TabValg.Totrinnskontroll}
                    label={TabValg.Totrinnskontroll}
                    icon={<IkonTotrinnskontroll />}
                />
            )}
            <Tabs.Tab value={TabValg.Historikk} label={TabValg.Historikk} icon={<IkonHistorikk />} />
            <Tabs.Tab value={TabValg.Dokumenter} label={TabValg.Dokumenter} icon={<IkonDokumenter />} />
            {!erLesevisning && !erMigreringFraInfotrygd && (
                <Tabs.Tab value={TabValg.Meldinger} label={'Send brev'} icon={<IkonMeldinger />} />
            )}
        </Tabs.List>
    );
}
