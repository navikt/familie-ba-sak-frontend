import * as React from 'react';

import styled from 'styled-components';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { Tabs } from '../typer';
import Dokumenterknapp from './Dokumenterknapp';
import Historikkknapp from './Historikkknapp';
import Meldingerknapp from './Meldingerknapp';
import TotrinnskontrollKnapp from './TotrinnskontrollKnapp';

interface IProps {
    aktivTab: Tabs;
    settAktivTab: (tab: Tabs) => void;
    skalViseTotrinnskontroll: boolean;
}

const StyledHeader = styled.header`
    height: 4rem;
    margin-bottom: 1rem;
    display: flex;
`;

const Header = ({ aktivTab, settAktivTab, skalViseTotrinnskontroll }: IProps) => {
    const { erLesevisning } = useBehandling();

    return (
        <StyledHeader>
            {skalViseTotrinnskontroll && (
                <TotrinnskontrollKnapp
                    aktiv={aktivTab === Tabs.Totrinnskontroll}
                    onClick={() => settAktivTab(Tabs.Totrinnskontroll)}
                />
            )}
            <Historikkknapp
                aktiv={aktivTab === Tabs.Historikk}
                onClick={() => settAktivTab(Tabs.Historikk)}
            />
            <Dokumenterknapp
                aktiv={aktivTab === Tabs.Dokumenter}
                onClick={() => settAktivTab(Tabs.Dokumenter)}
            />
            <Meldingerknapp
                aktiv={aktivTab === Tabs.Meldinger}
                disabled={erLesevisning()}
                onClick={() => settAktivTab(Tabs.Meldinger)}
            />
        </StyledHeader>
    );
};

export default Header;
