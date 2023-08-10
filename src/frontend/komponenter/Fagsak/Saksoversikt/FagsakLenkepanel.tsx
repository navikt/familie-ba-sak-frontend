import React from 'react';

import classNames from 'classnames';

import { Alert, BodyShort, LinkPanel, Panel } from '@navikt/ds-react';

import type { VisningBehandling } from './visningBehandling';
import { BehandlingStatus } from '../../../typer/behandling';
import type { IBehandlingstema } from '../../../typer/behandlingstema';
import { tilBehandlingstema } from '../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import { hentAktivBehandlingPåMinimalFagsak, hentFagsakStatusVisning } from '../../../utils/fagsak';

interface IFagsakTypeLabel {
    fagsakType: FagsakType;
}

interface IBehandlingLenkepanel {
    minimalFagsak: IMinimalFagsak;
}

interface IInnholdstabell {
    minimalFagsak: IMinimalFagsak;
    behandling?: VisningBehandling;
}

const Innholdstabell: React.FC<IInnholdstabell> = ({ minimalFagsak }) => {
    const behandlingstema: IBehandlingstema | undefined =
        minimalFagsak.løpendeKategori &&
        minimalFagsak.løpendeUnderkategori &&
        tilBehandlingstema(minimalFagsak.løpendeKategori, minimalFagsak.løpendeUnderkategori);
    return (
        <table className={'fagsak-panel__tabell'}>
            <thead>
                <tr>
                    <th>
                        <BodyShort>Behandlingstema</BodyShort>
                    </th>
                    <th>
                        <BodyShort>Status</BodyShort>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <BodyShort>{behandlingstema ? behandlingstema.navn : '-'}</BodyShort>
                    </td>
                    <td>
                        <BodyShort>{hentFagsakStatusVisning(minimalFagsak)}</BodyShort>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const FagsakTypeLabel: React.FC<IFagsakTypeLabel> = ({ fagsakType }) => {
    switch (fagsakType) {
        case FagsakType.INSTITUSJON:
            return (
                <Alert
                    className="fagsak-type-label"
                    children={'Dette er en institusjonssak'}
                    variant={'info'}
                ></Alert>
            );
        case FagsakType.BARN_ENSLIG_MINDREÅRIG:
            return (
                <Alert
                    className="fagsak-type-label"
                    children={'Dette er en enslig mindreårig sak'}
                    variant={'info'}
                ></Alert>
            );
        default:
            return null;
    }
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
        <>
            <LinkPanel
                title={genererHoverTekst(aktivBehandling)}
                className={classNames('fagsak-panel', 'fagsak-lenkepanel')}
                href={`/fagsak/${minimalFagsak.id}/${aktivBehandling.behandlingId}`}
            >
                <LinkPanel.Description>
                    <Innholdstabell minimalFagsak={minimalFagsak} />
                </LinkPanel.Description>
            </LinkPanel>
            <FagsakTypeLabel fagsakType={minimalFagsak.fagsakType}></FagsakTypeLabel>
        </>
    ) : (
        <>
            <Panel className={'fagsak-panel'} border>
                <Innholdstabell minimalFagsak={minimalFagsak} />
            </Panel>
            <FagsakTypeLabel fagsakType={minimalFagsak.fagsakType}></FagsakTypeLabel>
        </>
    );
};

export default FagsakLenkepanel;
