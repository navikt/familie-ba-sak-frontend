import React from 'react';

import classNames from 'classnames';

import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import Panel from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';

import { BehandlingStatus, kategorier, underkategorier } from '../../../typer/behandling';
import { IMinimalFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåMinimalFagsak, hentFagsakStatusVisning } from '../../../utils/fagsak';
import { VisningBehandling } from './visningBehandling';

interface IBehandlingLenkepanel {
    minimalFagsak: IMinimalFagsak;
}

interface IInnholdstabell {
    minimalFagsak: IMinimalFagsak;
    behandling?: VisningBehandling;
}

const Innholdstabell: React.FC<IInnholdstabell> = ({ minimalFagsak, behandling }) => {
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
                            {behandling?.kategori ? kategorier[behandling.kategori].navn : '-'}
                        </Normaltekst>
                    </td>
                    <td>
                        <Normaltekst>
                            {behandling?.underkategori
                                ? underkategorier[behandling.underkategori].navn
                                : '-'}
                        </Normaltekst>
                    </td>
                    <td>
                        <Normaltekst>{hentFagsakStatusVisning(minimalFagsak)}</Normaltekst>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const genererHoverTekst = (behandling: VisningBehandling) => {
    return behandling.status === BehandlingStatus.AVSLUTTET
        ? 'Gå til gjeldende vedtak'
        : 'Gå til åpen behandling';
};

const FagsakLenkepanel: React.FC<IBehandlingLenkepanel> = ({ minimalFagsak }) => {
    const aktivBehandling: VisningBehandling | undefined =
        hentAktivBehandlingPåMinimalFagsak(minimalFagsak);

    return aktivBehandling ? (
        <LenkepanelBase
            title={genererHoverTekst(aktivBehandling)}
            className={classNames('fagsak-panel', 'fagsak-lenkepanel')}
            href={`/fagsak/${minimalFagsak.id}/${aktivBehandling.behandlingId}`}
        >
            <Innholdstabell minimalFagsak={minimalFagsak} behandling={aktivBehandling} />
        </LenkepanelBase>
    ) : (
        <Panel className={'fagsak-panel'}>
            <Innholdstabell minimalFagsak={minimalFagsak} behandling={aktivBehandling} />
        </Panel>
    );
};

export default FagsakLenkepanel;
