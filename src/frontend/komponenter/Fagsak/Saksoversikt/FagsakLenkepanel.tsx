import React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Box, LinkPanel } from '@navikt/ds-react';
import { ASpacing16, ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

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

const FagsakPanelMedAktivBehandling = styled(LinkPanel)`
    width: calc(10 * ${ASpacing16});
    margin-top: ${ASpacing8};
    padding: ${ASpacing8};
`;

const FagsakPanel = styled(Box)`
    width: calc(10 * ${ASpacing16});
    margin-top: ${ASpacing8};
`;

const StyledAlert = styled(Alert)`
    width: calc(10 * ${ASpacing16});
    margin-top: ${ASpacing8};
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
            return <StyledAlert variant={'info'}>Dette er en institusjonssak</StyledAlert>;
        case FagsakType.BARN_ENSLIG_MINDREÅRIG:
            return <StyledAlert variant={'info'}>Dette er en enslig mindreårig-sak</StyledAlert>;
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

    return (
        <>
            {aktivBehandling ? (
                <FagsakPanelMedAktivBehandling
                    title={genererHoverTekst(aktivBehandling)}
                    href={`/fagsak/${minimalFagsak.id}/${aktivBehandling.behandlingId}`}
                >
                    <LinkPanel.Description>
                        <Innholdstabell minimalFagsak={minimalFagsak} />
                    </LinkPanel.Description>
                </FagsakPanelMedAktivBehandling>
            ) : (
                <FagsakPanel
                    borderColor="border-strong"
                    borderWidth="1"
                    borderRadius="small"
                    padding="8"
                >
                    <Innholdstabell minimalFagsak={minimalFagsak} />
                </FagsakPanel>
            )}
            <FagsakTypeLabel fagsakType={minimalFagsak.fagsakType}></FagsakTypeLabel>
        </>
    );
};

export default FagsakLenkepanel;
