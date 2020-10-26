import * as React from 'react';
import styled from 'styled-components';
import { useBehandling } from '../../../../context/BehandlingContext';
import Dokumenterknapp from './Dokumenterknapp';
import Historikkknapp from './Historikkknapp';
import Meldingerknapp from './Meldingerknapp';
import { Tabs } from '../typer';

interface IProps {
    aktivTab: Tabs;
    settAktivTab: (tab: Tabs) => void;
}

const StyledHeader = styled.div`
    height: 4rem;
    padding: 0 1.25rem;
    display: flex;
`;

const Header = ({ aktivTab, settAktivTab }: IProps) => {
    const { erLesevisning } = useBehandling();

    return (
        <StyledHeader>
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
