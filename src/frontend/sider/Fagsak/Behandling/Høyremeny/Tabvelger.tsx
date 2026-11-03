import { ClockDashedIcon, FileTextIcon, NotePencilIcon, PersonCheckmarkIcon } from '@navikt/aksel-icons';
import { Tabs } from '@navikt/ds-react';
import { useBehandling } from '../../../../hooks/useBehandling';
import { useErLesevisning } from '../../../../hooks/useErLesevisning';
import { Behandlingstype } from '../../../../typer/behandling';
import { Tab } from './TabContextProvider';
import styles from './Tabvelger.module.css';
import { useSkalViseTotrinnskontroll } from './useSkalViseTotrinnskontroll';

export function Tabvelger() {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const skalViseTotrinnskontroll = useSkalViseTotrinnskontroll();

    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    return (
        <Tabs.List className={styles.tabsListe}>
            {skalViseTotrinnskontroll && (
                <Tabs.Tab
                    value={Tab.Totrinnskontroll}
                    label={Tab.Totrinnskontroll}
                    icon={<PersonCheckmarkIcon aria-hidden fontSize="1.25rem" />}
                />
            )}
            <Tabs.Tab
                value={Tab.Historikk}
                label={Tab.Historikk}
                icon={<ClockDashedIcon aria-hidden fontSize="1.25rem" />}
            />
            {!erLesevisning && !erMigreringFraInfotrygd && (
                <Tabs.Tab
                    value={Tab.Meldinger}
                    label={'Send brev'}
                    icon={<NotePencilIcon aria-hidden fontSize="1.25rem" />}
                />
            )}
            <Tabs.Tab
                value={Tab.Dokumenter}
                label={Tab.Dokumenter}
                icon={<FileTextIcon aria-hidden fontSize="1.25rem" />}
            />
        </Tabs.List>
    );
}
