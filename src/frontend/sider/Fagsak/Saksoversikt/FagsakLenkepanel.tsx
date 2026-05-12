import { Link as ReactRouterLink } from 'react-router';
import styled from 'styled-components';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, HStack, InfoCard, Link, LinkCard, VStack } from '@navikt/ds-react';
import { FontSizeHeadingMedium, FontSizeXlarge } from '@navikt/ds-tokens/dist/tokens';

import type { VisningBehandling } from './visningBehandling';
import { BehandlingStatus } from '../../../typer/behandling';
import type { IBehandlingstema } from '../../../typer/behandlingstema';
import { tilBehandlingstema } from '../../../typer/behandlingstema';
import { FagsakStatus, FagsakType } from '../../../typer/fagsak';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { hentAktivBehandlingPåMinimalFagsak, hentFagsakStatusVisning } from '../../../utils/fagsak';
import { useFagsakContext } from '../FagsakContext';

export const SaksoversiktPanelBredde = `calc(10 * var(--ax-space-64))`;

const HeaderTekst = styled(BodyShort)`
    font-size: ${FontSizeXlarge};
`;

const BodyTekst = styled(BodyShort)`
    font-size: ${FontSizeHeadingMedium};
`;

function Innholdstabell() {
    const { fagsak } = useFagsakContext();

    const behandlingstema: IBehandlingstema | undefined =
        fagsak.løpendeKategori &&
        fagsak.løpendeUnderkategori &&
        tilBehandlingstema(fagsak.løpendeKategori, fagsak.løpendeUnderkategori);
    const fagsakErLåst = fagsak.status === FagsakStatus.LÅST;
    return (
        <HStack gap="space-80">
            <div>
                <HeaderTekst spacing>Behandlingstema</HeaderTekst>
                <BodyTekst weight="semibold">{behandlingstema ? behandlingstema.navn : '-'}</BodyTekst>
            </div>
            <div>
                <HeaderTekst spacing>Status</HeaderTekst>
                <BodyTekst weight="semibold">{hentFagsakStatusVisning(fagsak)}</BodyTekst>
            </div>
            {fagsakErLåst && fagsak.låstTidspunkt && (
                <div>
                    <HeaderTekst spacing>Låst dato</HeaderTekst>
                    <BodyTekst weight="semibold">
                        {isoStringTilFormatertString({
                            isoString: fagsak.låstTidspunkt,
                            tilFormat: Datoformat.DATO,
                        })}
                    </BodyTekst>
                </div>
            )}
        </HStack>
    );
}

function FagsakTypeLabel() {
    const { fagsak } = useFagsakContext();
    switch (fagsak.fagsakType) {
        case FagsakType.INSTITUSJON:
            return (
                <Box marginBlock={'space-64 space-0'} maxWidth={SaksoversiktPanelBredde}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            Dette er en institusjonssak
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
        case FagsakType.BARN_ENSLIG_MINDREÅRIG:
            return (
                <Box marginBlock={'space-64 space-0'} maxWidth={SaksoversiktPanelBredde}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            Dette er en enslig mindreårig-sak
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
        case FagsakType.SKJERMET_BARN:
            return (
                <Box marginBlock={'space-64 space-0'} maxWidth={SaksoversiktPanelBredde}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            Dette er en skjermet barn-sak
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            );
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
                <Box width={SaksoversiktPanelBredde} marginBlock={'space-32 space-0'}>
                    <LinkCard>
                        <LinkCard.Title>
                            <LinkCard.Anchor asChild={true}>
                                <Link as={ReactRouterLink} to={`/fagsak/${fagsak.id}/${aktivBehandling.behandlingId}`}>
                                    {genererHoverTekst(aktivBehandling)}
                                </Link>
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                        <LinkCard.Description>
                            <VStack paddingBlock={'space-16 space-0'}>
                                <Innholdstabell />
                            </VStack>
                        </LinkCard.Description>
                    </LinkCard>
                </Box>
            ) : (
                <Box
                    width={SaksoversiktPanelBredde}
                    marginBlock={'space-32 space-0'}
                    borderColor="neutral-strong"
                    borderWidth="1"
                    borderRadius="2"
                    padding="space-32"
                >
                    <Innholdstabell />
                </Box>
            )}
            <FagsakTypeLabel />
        </>
    );
}
