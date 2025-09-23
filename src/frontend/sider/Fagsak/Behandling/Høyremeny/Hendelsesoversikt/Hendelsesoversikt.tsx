import * as React from 'react';

import styled from 'styled-components';

import { ASpacing5 } from '@navikt/ds-tokens/dist/tokens';

import Brev from './BrevModul/Brev';
import Header from './Header/Header';
import HendelseItem from './komponenter/HendelseItem';
import Totrinnskontroll from './Totrinnskontroll/Totrinnskontroll';
import type { Hendelse } from './typer';
import { Tabs } from './typer';
import { useAppContext } from '../../../../../context/AppContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlerRolle, BehandlingStatus } from '../../../../../typer/behandling';
import type { IPersonInfo } from '../../../../../typer/person';

interface IHendelsesoversiktProps {
    hendelser: Hendelse[];
    åpenBehandling: IBehandling;
    bruker: IPersonInfo;
}

const tilHendelseItem = (hendelse: Hendelse) => <HendelseItem key={hendelse.id} hendelse={hendelse} />;

const høydePersonlinje = '8rem';
const høydeBehandlingskort = '18rem';
const høydeTabs = '4rem';

const HistorikkTab = styled.div`
    height: calc(100vh - ${høydePersonlinje} - ${høydeBehandlingskort} - ${høydeTabs});
    overflow: auto;
`;

const HistorikkListe = styled.ul`
    padding-left: ${ASpacing5};
    list-style: none;
`;

const Hendelsesoversikt = ({ hendelser, åpenBehandling, bruker }: IHendelsesoversiktProps) => {
    const { hentSaksbehandlerRolle } = useAppContext();

    const skalViseTotrinnskontroll =
        BehandlerRolle.BESLUTTER === hentSaksbehandlerRolle() &&
        åpenBehandling?.status === BehandlingStatus.FATTER_VEDTAK;

    const [aktivTab, settAktivTab] = React.useState<Tabs>(
        skalViseTotrinnskontroll ? Tabs.Totrinnskontroll : Tabs.Historikk
    );

    return (
        <div>
            <Header
                aktivTab={aktivTab}
                settAktivTab={settAktivTab}
                skalViseTotrinnskontroll={skalViseTotrinnskontroll}
            />
            {aktivTab === Tabs.Totrinnskontroll && <Totrinnskontroll åpenBehandling={åpenBehandling} />}
            {aktivTab === Tabs.Historikk && hendelser.length > 0 && (
                <HistorikkTab>
                    <HistorikkListe>{hendelser?.map(tilHendelseItem)}</HistorikkListe>
                </HistorikkTab>
            )}
            {aktivTab === Tabs.Meldinger && <Brev onIModalClick={() => settAktivTab(Tabs.Historikk)} bruker={bruker} />}
        </div>
    );
};

export default Hendelsesoversikt;
