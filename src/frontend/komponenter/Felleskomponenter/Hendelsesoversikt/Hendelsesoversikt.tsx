import * as React from 'react';

import classNames from 'classnames';

import { BrevModulProvider } from '../../../context/BrevModulContext';
import Brev from './BrevModul/Brev';
import Header from './Header/Header';
import HendelseItem from './komponenter/HendelseItem';
import { Hendelse, Tabs } from './typer';

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
            <BrevModulProvider>
                <Header aktivTab={aktivTab} settAktivTab={settAktivTab} />
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
