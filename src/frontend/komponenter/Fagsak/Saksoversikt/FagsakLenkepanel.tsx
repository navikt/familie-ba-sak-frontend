import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { fagsakStatus, IFagsak } from '../../../typer/fagsak';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { IBehandling, kategorier, underkategorier } from '../../../typer/behandling';
import Panel from 'nav-frontend-paneler';
import classNames from 'classnames';

interface IBehandlingLenkepanel {
    fagsak: IFagsak;
}

interface IInnholdstabell {
    fagsak: IFagsak;
    behandling?: IBehandling;
}

const Innholdstabell: React.FC<IInnholdstabell> = ({ fagsak, behandling }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <Undertittel>Fagsaktype</Undertittel>
                    </th>
                    <th>
                        <Undertittel>Gjelder</Undertittel>
                    </th>
                    <th>
                        <Undertittel>Status</Undertittel>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Systemtittel>
                            {behandling ? kategorier[behandling.kategori].navn : '-'}
                        </Systemtittel>
                    </td>
                    <td>
                        <Systemtittel>
                            {behandling ? underkategorier[behandling.underkategori].navn : '-'}
                        </Systemtittel>
                    </td>
                    <td>
                        <Systemtittel>{fagsakStatus[fagsak.status].navn}</Systemtittel>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const FagsakLenkepanel: React.FC<IBehandlingLenkepanel> = ({ fagsak }) => {
    const behandling: IBehandling | undefined = fagsak.behandlinger.find(
        behandling => behandling.aktiv
    );

    return behandling ? (
        <LenkepanelBase className={classNames('fagsak-panel', 'fagsak-lenkepanel')} href="#">
            <Innholdstabell fagsak={fagsak} behandling={behandling} />
        </LenkepanelBase>
    ) : (
        <Panel className={'fagsak-panel'}>
            <Innholdstabell fagsak={fagsak} behandling={behandling} />
        </Panel>
    );
};

export default FagsakLenkepanel;
