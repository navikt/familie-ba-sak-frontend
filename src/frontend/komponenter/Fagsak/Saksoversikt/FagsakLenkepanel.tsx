import { Normaltekst } from 'nav-frontend-typografi';
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
            <thead className={'fagsak-panel__tabell-header'}>
                <tr>
                    <th>
                        <Normaltekst>Fagsaktype</Normaltekst>
                    </th>
                    <th>
                        <Normaltekst>Gjelder</Normaltekst>
                    </th>
                    <th>
                        <Normaltekst>Status</Normaltekst>
                    </th>
                </tr>
            </thead>
            <tbody className={'fagsak-panel__tabell-body'}>
                <tr>
                    <td>
                        <Normaltekst>
                            {behandling ? kategorier[behandling.kategori].navn : '-'}
                        </Normaltekst>
                    </td>
                    <td>
                        <Normaltekst>
                            {behandling ? underkategorier[behandling.underkategori].navn : '-'}
                        </Normaltekst>
                    </td>
                    <td>
                        <Normaltekst>{fagsakStatus[fagsak.status].navn}</Normaltekst>
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
