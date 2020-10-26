import * as React from 'react';

import { Hendelse, Tabs } from './typer';

import HendelseItem from './komponenter/HendelseItem';
import classNames from 'classnames';
import Brev from './BrevModul/Brev';
import Header from './Header/Header';

export { Hendelse };

export interface IHendelsesoversiktProps {
    className?: string;
    hendelser: Hendelse[];
}

const tilHendelseItem = (hendelse: Hendelse) => (
    <HendelseItem key={hendelse.id} hendelse={hendelse} />
);

const Hendelsesoversikt = ({ hendelser, className }: IHendelsesoversiktProps) => {
    const [aktivTab, settAktivTab] = React.useState<Tabs>(Tabs.Historikk);

    return (
        <div className={classNames('hendelsesoversikt', className)}>
            <Header aktivTab={aktivTab} settAktivTab={settAktivTab} />
            {aktivTab === Tabs.Historikk && hendelser.length > 0 && (
                <div className={'historikk'}>
                    <ul className={'hendelsesoversikt__list'}>{hendelser?.map(tilHendelseItem)}</ul>
                </div>
            )}
            {aktivTab === Tabs.Meldinger && (
                <Brev onOkIModalClick={() => settAktivTab(Tabs.Historikk)} />
            )}
        </div>
    );
};

export default Hendelsesoversikt;
