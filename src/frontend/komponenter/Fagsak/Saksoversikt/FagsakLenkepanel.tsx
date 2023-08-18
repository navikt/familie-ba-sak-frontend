import React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

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

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const HeaderTekst = styled(BodyShort)`
    font-size: var(--a-font-size-xlarge);
    font-weight: var(--a-font-weight-regular);
`;

const BodyTekst = styled(BodyShort)`
    font-size: var(--a-font-size-heading-medium);
    font-weight: var(--a-font-weight-bold);
`;

const BehandlingstemaContainer = styled.div`
    margin-right: 5rem;
`;

const Innholdstabell: React.FC<IInnholdstabell> = ({ minimalFagsak }) => {
    const behandlingstema: IBehandlingstema | undefined =
        minimalFagsak.løpendeKategori &&
        minimalFagsak.løpendeUnderkategori &&
        tilBehandlingstema(minimalFagsak.løpendeKategori, minimalFagsak.løpendeUnderkategori);
    return (
        <Container>
            <BehandlingstemaContainer>
                <HeaderTekst spacing>Behandlingstema</HeaderTekst>
                <BodyTekst>{behandlingstema ? behandlingstema.navn : '-'}</BodyTekst>
            </BehandlingstemaContainer>
            <div>
                <HeaderTekst spacing>Status</HeaderTekst>
                <BodyTekst>{hentFagsakStatusVisning(minimalFagsak)}</BodyTekst>
            </div>
        </Container>
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
