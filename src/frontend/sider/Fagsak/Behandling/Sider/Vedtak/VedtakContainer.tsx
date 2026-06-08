import type { PropsWithChildren } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useHentAlleBegrunnelser } from '@hooks/useHentAlleBegrunnelser';
import { useHentSammensattKontrollsak } from '@hooks/useHentSammensattKontrollsak';
import { useHentVedtaksperioder } from '@hooks/useHentVedtaksperioder';
import { AlleBegrunnelserProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/AlleBegrunnelserContext';
import { FeilutbetaltValutaTabellProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { RefusjonEøsTabellProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/RefusjonEøs/RefusjonEøsTabellContext';
import { SammensattKontrollsakProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/SammensattKontrollsakContext';
import { VedtaksperioderProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/VedtaksperioderContext';
import { erDefinert } from '@utils/commons';

import { BodyShort, Box, ErrorMessage, Loader, LocalAlert, Stack, VStack } from '@navikt/ds-react';

export function VedtakContainer({ children }: PropsWithChildren) {
    const behandling = useBehandling();

    const {
        data: vedtaksperioder,
        isPending: vedtaksperioderIsPending,
        error: vedtaksperioderError,
    } = useHentVedtaksperioder(behandling.behandlingId);

    const {
        data: alleBegrunnelser,
        isPending: alleBegrunnelserIsPending,
        error: alleBegrunnelserError,
    } = useHentAlleBegrunnelser();

    const {
        data: sammensattKontrollsak,
        isPending: sammensattKontrollsakIsPending,
        error: sammensattKontrollsakError,
    } = useHentSammensattKontrollsak(behandling.behandlingId);

    if (vedtaksperioderIsPending || alleBegrunnelserIsPending || sammensattKontrollsakIsPending) {
        return (
            <Box margin={'space-48'}>
                <Stack direction={'row'} justify={'center'} align={'center'} gap={'space-8'}>
                    <Loader size={'medium'} />
                    <BodyShort weight={'semibold'}>Laster vedtak...</BodyShort>
                </Stack>
            </Box>
        );
    }

    if (vedtaksperioderError || alleBegrunnelserError || sammensattKontrollsakError) {
        const errors = [vedtaksperioderError, alleBegrunnelserError, sammensattKontrollsakError].filter(error =>
            erDefinert(error)
        );
        return (
            <Box margin={'space-48'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>En teknisk feil oppstod.</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <VStack gap={'space-16'}>
                            Klarte ikke å hente inn vedtak.
                            {errors.map(error => (
                                <ErrorMessage key={error.message}>{error.message}</ErrorMessage>
                            ))}
                        </VStack>
                    </LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    return (
        <SammensattKontrollsakProvider sammensattKontrollsak={sammensattKontrollsak ?? undefined}>
            <AlleBegrunnelserProvider alleBegrunnelser={alleBegrunnelser}>
                <VedtaksperioderProvider vedtaksperioder={vedtaksperioder}>
                    <FeilutbetaltValutaTabellProvider>
                        <RefusjonEøsTabellProvider>{children}</RefusjonEøsTabellProvider>
                    </FeilutbetaltValutaTabellProvider>
                </VedtaksperioderProvider>
            </AlleBegrunnelserProvider>
        </SammensattKontrollsakProvider>
    );
}
