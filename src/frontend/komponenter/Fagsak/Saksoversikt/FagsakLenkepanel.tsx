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
                        <Systemtittel>Fagsaktype</Systemtittel>
                    </th>
                    <th>
                        <Systemtittel>Gjelder</Systemtittel>
                    </th>
                    <th>
                        <Systemtittel>Status</Systemtittel>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Undertittel>
                            {behandling ? kategorier[behandling.kategori].navn : '-'}
                        </Undertittel>
                    </td>
                    <td>
                        <Undertittel>
                            {behandling ? underkategorier[behandling.underkategori].navn : '-'}
                        </Undertittel>
                    </td>
                    <td>
                        <Undertittel>{fagsakStatus[fagsak.status].navn}</Undertittel>
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
        <LenkepanelBase
            className={classNames('fagsak-panel', 'fagsak-lenkepanel')}
            href={`/fagsak/${fagsak.id}/${behandling.behandlingId}`}
        >
            <Innholdstabell fagsak={fagsak} behandling={behandling} />
        </LenkepanelBase>
    ) : (
        <Panel className={'fagsak-panel'}>
            <Innholdstabell fagsak={fagsak} behandling={behandling} />
        </Panel>
    );
};

export default FagsakLenkepanel;
