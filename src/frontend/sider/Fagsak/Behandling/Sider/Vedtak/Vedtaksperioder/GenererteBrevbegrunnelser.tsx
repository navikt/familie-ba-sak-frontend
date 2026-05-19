import { useHentGenererteBrevbegrunnelser } from '@hooks/useHentGenererteBrevbegrunnelser';
import { useVedtaksperiodeContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/VedtaksperiodeContext';

import { BodyShort, ErrorMessage, HStack, Label, Loader, VStack } from '@navikt/ds-react';

export function GenererteBrevbegrunnelser() {
    const { vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();

    const {
        data: genererteBrevbegrunnelser,
        isPending: genererteBrevbegrunnelserIsPending,
        error: genererteBrevbegrunnelserError,
    } = useHentGenererteBrevbegrunnelser(vedtaksperiodeMedBegrunnelser.id);

    if (genererteBrevbegrunnelserIsPending) {
        return (
            <VStack gap={'space-4'}>
                <Label>Begrunnelse(r)</Label>
                <HStack gap={'space-6'}>
                    <Loader size={'xsmall'} />
                    <BodyShort textColor={'subtle'} size={'small'}>
                        Laster begrunnelse(r)...
                    </BodyShort>
                </HStack>
            </VStack>
        );
    }

    if (genererteBrevbegrunnelserError) {
        return (
            <VStack gap={'space-4'}>
                <Label>Begrunnelse(r)</Label>
                <ErrorMessage size={'small'}>{genererteBrevbegrunnelserError.message}</ErrorMessage>
            </VStack>
        );
    }

    if (genererteBrevbegrunnelser.length === 0) {
        return (
            <VStack gap={'space-4'}>
                <Label>Begrunnelse(r)</Label>
                <BodyShort textColor={'subtle'} size={'small'}>
                    Ingen begrunnelse(r).
                </BodyShort>
            </VStack>
        );
    }

    return (
        <VStack gap={'space-0'}>
            <Label>Begrunnelse(r)</Label>
            <ul>
                {genererteBrevbegrunnelser
                    .toSorted((b1, b2) => b1.localeCompare(b2))
                    .map((begrunnelse, index) => (
                        <li key={`begrunnelse-${index}`}>
                            <BodyShort>{begrunnelse}</BodyShort>
                        </li>
                    ))}
            </ul>
        </VStack>
    );
}
