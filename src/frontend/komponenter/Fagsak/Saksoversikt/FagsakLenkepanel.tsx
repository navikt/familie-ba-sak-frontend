import React from 'react';

import classNames from 'classnames';

import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Panel from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';

import {
    BehandlingStatus,
    IBehandling,
    kategorier,
    underkategorier,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak, hentFagsakStatusVisning } from '../../../utils/fagsak';

interface IBehandlingLenkepanel {
    fagsak: IFagsak;
}

interface IInnholdstabell {
    fagsak: IFagsak;
    behandling?: IBehandling;
}

const Innholdstabell: React.FC<IInnholdstabell> = ({ fagsak, behandling }) => {
    return (
        <table className={'fagsak-panel__tabell'}>
            <thead>
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
            <tbody>
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
                        <Normaltekst>{hentFagsakStatusVisning(fagsak)}</Normaltekst>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const genererHoverTekst = (behandling: IBehandling) => {
    return behandling.status === BehandlingStatus.AVSLUTTET
        ? 'Gå til gjeldende vedtak'
        : 'Gå til åpen behandling';
};

const FagsakLenkepanel: React.FC<IBehandlingLenkepanel> = ({ fagsak }) => {
    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(fagsak);

    return aktivBehandling ? (
        <LenkepanelBase
            title={genererHoverTekst(aktivBehandling)}
            className={classNames('fagsak-panel', 'fagsak-lenkepanel')}
            href={`/fagsak/${fagsak.id}/${aktivBehandling.behandlingId}`}
        >
            <Innholdstabell fagsak={fagsak} behandling={aktivBehandling} />
        </LenkepanelBase>
    ) : (
        <Panel className={'fagsak-panel'}>
            <Innholdstabell fagsak={fagsak} behandling={aktivBehandling} />
        </Panel>
    );
};

export default FagsakLenkepanel;
