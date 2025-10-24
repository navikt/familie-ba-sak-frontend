import * as React from 'react';

import styled from 'styled-components';

import Dokumenterknapp from './Dokumenterknapp';
import Historikkknapp from './Historikkknapp';
import Meldingerknapp from './Meldingerknapp';
import TotrinnskontrollKnapp from './TotrinnskontrollKnapp';
import { Behandlingstype } from '../../../../../../typer/behandling';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import { Tabs } from '../typer';

interface IProps {
    aktivTab: Tabs;
    settAktivTab: (tab: Tabs) => void;
    skalViseTotrinnskontroll: boolean;
}

const StyledHeader = styled.header`
    height: 4rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    padding-right: 0.25rem;
    padding-left: 0.25rem;
`;

const Header = ({ aktivTab, settAktivTab, skalViseTotrinnskontroll }: IProps) => {
    const { vurderErLesevisning, behandling } = useBehandlingContext();

    const erMigreringFraInfotrygd = behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    return (
        <StyledHeader>
            {skalViseTotrinnskontroll && (
                <TotrinnskontrollKnapp
                    aktiv={aktivTab === Tabs.Totrinnskontroll}
                    onClick={() => settAktivTab(Tabs.Totrinnskontroll)}
                />
            )}
            <Historikkknapp aktiv={aktivTab === Tabs.Historikk} onClick={() => settAktivTab(Tabs.Historikk)} />
            <Dokumenterknapp aktiv={aktivTab === Tabs.Dokumenter} onClick={() => settAktivTab(Tabs.Dokumenter)} />
            <Meldingerknapp
                aktiv={aktivTab === Tabs.Meldinger}
                disabled={vurderErLesevisning() || erMigreringFraInfotrygd}
                onClick={() => settAktivTab(Tabs.Meldinger)}
            />
        </StyledHeader>
    );
};

export default Header;
