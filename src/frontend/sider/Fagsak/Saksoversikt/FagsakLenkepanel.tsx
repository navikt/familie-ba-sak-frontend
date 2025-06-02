import React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Box, HStack, LinkPanel } from '@navikt/ds-react';
import {
    AFontSizeHeadingMedium,
    AFontSizeXlarge,
    ASpacing16,
    ASpacing8,
} from '@navikt/ds-tokens/dist/tokens';

import type { VisningBehandling } from './visningBehandling';
import { BehandlingStatus } from '../../../typer/behandling';
import type { IBehandlingstema } from '../../../typer/behandlingstema';
import { tilBehandlingstema } from '../../../typer/behandlingstema';
import { FagsakType, type IMinimalFagsak } from '../../../typer/fagsak';
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

export const SaksoversiktPanelBredde = `calc(10 * ${ASpacing16})`;

const HeaderTekst = styled(BodyShort)`
    font-size: ${AFontSizeXlarge};
`;

const BodyTekst = styled(BodyShort)`
    font-size: ${AFontSizeHeadingMedium};
`;

const FagsakPanelMedAktivBehandling = styled(LinkPanel)`
    width: ${SaksoversiktPanelBredde};
    margin-top: ${ASpacing8};
    padding: ${ASpacing8};
`;

const FagsakPanel = styled(Box)`
    width: ${SaksoversiktPanelBredde};
    margin-top: ${ASpacing8};
`;

const StyledAlert = styled(Alert)`
    width: ${SaksoversiktPanelBredde};
    margin-top: ${ASpacing8};
`;

const Innholdstabell: React.FC<IInnholdstabell> = ({ minimalFagsak }) => {
    const behandlingstema: IBehandlingstema | undefined =
        minimalFagsak.løpendeKategori &&
        minimalFagsak.løpendeUnderkategori &&
        tilBehandlingstema(minimalFagsak.løpendeKategori, minimalFagsak.løpendeUnderkategori);
    return (
        <HStack gap="20">
            <div>
                <HeaderTekst spacing>Behandlingstema</HeaderTekst>
                <BodyTekst weight="semibold">
                    {behandlingstema ? behandlingstema.navn : '-'}
                </BodyTekst>
            </div>
            <div>
                <HeaderTekst spacing>Status</HeaderTekst>
                <BodyTekst weight="semibold">{hentFagsakStatusVisning(minimalFagsak)}</BodyTekst>
            </div>
        </HStack>
    );
};

const FagsakTypeLabel: React.FC<IFagsakTypeLabel> = ({ fagsakType }) => {
    switch (fagsakType) {
        case FagsakType.INSTITUSJON:
            return <StyledAlert variant={'info'}>Dette er en institusjonssak</StyledAlert>;
        case FagsakType.BARN_ENSLIG_MINDREÅRIG:
            return <StyledAlert variant={'info'}>Dette er en enslig mindreårig-sak</StyledAlert>;
        case FagsakType.SKJERMET_BARN:
            return <StyledAlert variant={'info'}>Dette er en skjermet barn-sak</StyledAlert>;
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
