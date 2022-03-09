import * as React from 'react';

import classNames from 'classnames';

import { useApp } from '../../../context/AppContext';
import { BrevModulProvider } from '../../../context/BrevModulContext';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlerRolle, BehandlingStatus } from '../../../typer/behandling';
import Brev from './BrevModul/Brev';
import Header from './Header/Header';
import HendelseItem from './komponenter/HendelseItem';
import Totrinnskontroll from './Totrinnskontroll/Totrinnskontroll';
import type { Hendelse } from './typer';
import { Tabs } from './typer';

export interface IHendelsesoversiktProps {
    className?: string;
    hendelser: Hendelse[];
    åpenBehandling: IBehandling;
}

const tilHendelseItem = (hendelse: Hendelse) => (
    <HendelseItem key={hendelse.id} hendelse={hendelse} />
);

const Hendelsesoversikt = ({ hendelser, className, åpenBehandling }: IHendelsesoversiktProps) => {
    const { hentSaksbehandlerRolle } = useApp();

    const skalViseTotrinnskontroll =
        BehandlerRolle.BESLUTTER === hentSaksbehandlerRolle() &&
        åpenBehandling?.status === BehandlingStatus.FATTER_VEDTAK;

    const [aktivTab, settAktivTab] = React.useState<Tabs>(
        skalViseTotrinnskontroll ? Tabs.Totrinnskontroll : Tabs.Historikk
    );

    return (
        <div className={classNames('hendelsesoversikt', className)}>
            <BrevModulProvider>
                <Header
                    aktivTab={aktivTab}
                    settAktivTab={settAktivTab}
                    skalViseTotrinnskontroll={skalViseTotrinnskontroll}
                />
                {aktivTab === Tabs.Totrinnskontroll && (
                    <Totrinnskontroll åpenBehandling={åpenBehandling} />
                )}
                {aktivTab === Tabs.Historikk && hendelser.length > 0 && (
                    <div className={'historikk'}>
                        <ul className={'hendelsesoversikt__list'}>
                            {hendelser?.map(tilHendelseItem)}
                        </ul>
                    </div>
                )}
                {aktivTab === Tabs.Meldinger && (
                    <Brev onOkIModalClick={() => settAktivTab(Tabs.Historikk)} />
                )}
            </BrevModulProvider>
        </div>
    );
};

export default Hendelsesoversikt;
