import { Tabs } from '@navikt/ds-react';

import IkonHistorikk from './Ikoner/IkonHistorikk';
import IkonMeldinger from './Ikoner/IkonMeldinger';
import IkonTotrinnskontroll from './Ikoner/IkonTotrinnskontroll';
import { Tab } from './TabContextProvider';
import styles from './Tabvelger.module.css';
import { useSkalViseTotrinnskontroll } from './useSkalViseTotrinnskontroll';
import { useBehandling } from '../../../../hooks/useBehandling';
import { useErLesevisning } from '../../../../hooks/useErLesevisning';
import { Behandlingstype } from '../../../../typer/behandling';

export function Tabvelger() {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const skalViseTotrinnskontroll = useSkalViseTotrinnskontroll();

    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    return (
        <Tabs.List className={styles.tabsListe}>
            {skalViseTotrinnskontroll && (
                <Tabs.Tab value={Tab.Totrinnskontroll} label={Tab.Totrinnskontroll} icon={<IkonTotrinnskontroll />} />
            )}
            <Tabs.Tab value={Tab.Historikk} label={Tab.Historikk} icon={<IkonHistorikk />} />
            {!erLesevisning && !erMigreringFraInfotrygd && (
                <Tabs.Tab value={Tab.Meldinger} label={'Send brev'} icon={<IkonMeldinger />} />
            )}
        </Tabs.List>
    );
}
