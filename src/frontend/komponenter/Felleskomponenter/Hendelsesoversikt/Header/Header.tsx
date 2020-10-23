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
    height: 3.125rem;
    background: #f8f8f8;
    margin-left: 1px;
    padding: 0 1.25rem;
    border-bottom: 1px solid #c6c2bf;
`;

const Header = ({ aktivTab, settAktivTab }: IProps) => {
    const { erLesevisning } = useBehandling();

    return (
        <StyledHeader>
            <Historikkknapp
                aktiv={aktivTab === Tabs.Historikk}
                onClick={() => settAktivTab(Tabs.Historikk)}
            />
            <Meldingerknapp
                aktiv={aktivTab === Tabs.Meldinger}
                disabled={erLesevisning()}
                onClick={() => settAktivTab(Tabs.Meldinger)}
            />
            <Dokumenterknapp
                aktiv={aktivTab === Tabs.Dokumenter}
                onClick={() => settAktivTab(Tabs.Dokumenter)}
            />
        </StyledHeader>
    );
};

export default Header;
