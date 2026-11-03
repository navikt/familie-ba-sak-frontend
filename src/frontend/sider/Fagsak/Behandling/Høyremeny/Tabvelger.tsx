import { useErNyttOppsett } from '@hooks/useKonsept';
import { ClockDashedIcon, FileTextIcon, NotePencilIcon, PersonCheckmarkIcon } from '@navikt/aksel-icons';
import { Tabs } from '@navikt/ds-react';
import { useBehandling } from '../../../../hooks/useBehandling';
import { useErLesevisning } from '../../../../hooks/useErLesevisning';
import { Behandlingstype } from '../../../../typer/behandling';
import IkonHistorikk from './Ikoner/IkonHistorikk';
import IkonMeldinger from './Ikoner/IkonMeldinger';
import IkonTotrinnskontroll from './Ikoner/IkonTotrinnskontroll';
import { Tab } from './TabContextProvider';
import styles from './Tabvelger.module.css';
import { useSkalViseTotrinnskontroll } from './useSkalViseTotrinnskontroll';

export function Tabvelger() {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const skalViseTotrinnskontroll = useSkalViseTotrinnskontroll();
    const erNyttOppsett = useErNyttOppsett();

    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    return (
        <Tabs.List className={styles.tabsListe}>
            {skalViseTotrinnskontroll && (
                <Tabs.Tab
                    value={Tab.Totrinnskontroll}
                    label={Tab.Totrinnskontroll}
                    icon={
                        erNyttOppsett ? (
                            <PersonCheckmarkIcon aria-hidden fontSize="1.25rem" />
                        ) : (
                            <IkonTotrinnskontroll />
                        )
                    }
                />
            )}
            <Tabs.Tab
                value={Tab.Historikk}
                label={Tab.Historikk}
                icon={erNyttOppsett ? <ClockDashedIcon aria-hidden fontSize="1.25rem" /> : <IkonHistorikk />}
            />
            {!erLesevisning && !erMigreringFraInfotrygd && (
                <Tabs.Tab
                    value={Tab.Meldinger}
                    label={'Send brev'}
                    icon={erNyttOppsett ? <NotePencilIcon aria-hidden fontSize="1.25rem" /> : <IkonMeldinger />}
                />
            )}
            {erNyttOppsett && (
                <Tabs.Tab
                    value={Tab.Dokumenter}
                    label={Tab.Dokumenter}
                    icon={<FileTextIcon aria-hidden fontSize="1.25rem" />}
                />
            )}
        </Tabs.List>
    );
}
