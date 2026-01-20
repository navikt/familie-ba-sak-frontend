import React from 'react';

import { Link as ReactRouterLink } from 'react-router';
import styled from 'styled-components';

import { Alert, BodyShort, Box, HStack, Link, LinkCard, VStack } from '@navikt/ds-react';
import { AFontSizeHeadingMedium, AFontSizeXlarge, ASpacing16, ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

import type { VisningBehandling } from './visningBehandling';
import { BehandlingStatus } from '../../../typer/behandling';
import type { IBehandlingstema } from '../../../typer/behandlingstema';
import { tilBehandlingstema } from '../../../typer/behandlingstema';
import { FagsakType } from '../../../typer/fagsak';
import { hentAktivBehandlingPåMinimalFagsak, hentFagsakStatusVisning } from '../../../utils/fagsak';
import { useFagsakContext } from '../FagsakContext';

export const SaksoversiktPanelBredde = `calc(10 * ${ASpacing16})`;

const HeaderTekst = styled(BodyShort)`
    font-size: ${AFontSizeXlarge};
`;

const BodyTekst = styled(BodyShort)`
    font-size: ${AFontSizeHeadingMedium};
`;

const FagsakPanel = styled(Box)`
    width: ${SaksoversiktPanelBredde};
    margin-top: ${ASpacing8};
`;

const StyledAlert = styled(Alert)`
    width: ${SaksoversiktPanelBredde};
    margin-top: ${ASpacing8};
`;

function Innholdstabell() {
    const { fagsak } = useFagsakContext();

    const behandlingstema: IBehandlingstema | undefined =
        fagsak.løpendeKategori &&
        fagsak.løpendeUnderkategori &&
        tilBehandlingstema(fagsak.løpendeKategori, fagsak.løpendeUnderkategori);
    return (
        <HStack gap="20">
            <div>
                <HeaderTekst spacing>Behandlingstema</HeaderTekst>
                <BodyTekst weight="semibold">{behandlingstema ? behandlingstema.navn : '-'}</BodyTekst>
            </div>
            <div>
                <HeaderTekst spacing>Status</HeaderTekst>
                <BodyTekst weight="semibold">{hentFagsakStatusVisning(fagsak)}</BodyTekst>
            </div>
        </HStack>
    );
}

function FagsakTypeLabel() {
    const { fagsak } = useFagsakContext();
    switch (fagsak.fagsakType) {
        case FagsakType.INSTITUSJON:
            return <StyledAlert variant={'info'}>Dette er en institusjonssak</StyledAlert>;
        case FagsakType.BARN_ENSLIG_MINDREÅRIG:
            return <StyledAlert variant={'info'}>Dette er en enslig mindreårig-sak</StyledAlert>;
        case FagsakType.SKJERMET_BARN:
            return <StyledAlert variant={'info'}>Dette er en skjermet barn-sak</StyledAlert>;
        default:
            return null;
    }
}

const genererHoverTekst = (behandling: VisningBehandling) => {
    return behandling.status === BehandlingStatus.AVSLUTTET ? 'Gå til gjeldende vedtak' : 'Gå til åpen behandling';
};

export function FagsakLenkepanel() {
    const { fagsak } = useFagsakContext();
    const aktivBehandling: VisningBehandling | undefined = hentAktivBehandlingPåMinimalFagsak(fagsak);

    return (
        <>
            {aktivBehandling ? (
                <Box width={SaksoversiktPanelBredde} marginBlock={'8 0'}>
                    <LinkCard>
                        <LinkCard.Title>
                            <LinkCard.Anchor asChild={true}>
                                <Link as={ReactRouterLink} to={`/fagsak/${fagsak.id}/${aktivBehandling.behandlingId}`}>
                                    {genererHoverTekst(aktivBehandling)}
                                </Link>
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                        <LinkCard.Description>
                            <VStack paddingBlock={'4 0'}>
                                <Innholdstabell />
                            </VStack>
                        </LinkCard.Description>
                    </LinkCard>
                </Box>
            ) : (
                <FagsakPanel borderColor="border-strong" borderWidth="1" borderRadius="small" padding="8">
                    <Innholdstabell />
                </FagsakPanel>
            )}
            <FagsakTypeLabel />
        </>
    );
}
