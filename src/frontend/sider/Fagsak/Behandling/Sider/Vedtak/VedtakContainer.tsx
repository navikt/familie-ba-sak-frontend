import { useBehandlingId } from '@hooks/useBehandlingId';
import { useHentAlleBegrunnelser } from '@hooks/useHentAlleBegrunnelser';
import { useHentFeilutbetaltValuta } from '@hooks/useHentFeilutbetaltValuta';
import { useHentKorrigertEtterbetaling } from '@hooks/useHentKorrigertEtterbetaling';
import { useHentKorrigertVedtak } from '@hooks/useHentKorrigertVedtak';
import { useHentSammensattKontrollsak } from '@hooks/useHentSammensattKontrollsak';
import { useHentVedtaksperioder } from '@hooks/useHentVedtaksperioder';
import { BodyShort, Box, ErrorMessage, Loader, LocalAlert, Stack, VStack } from '@navikt/ds-react';
import { EndringstidspunktDialogProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/Endringstidspunkt/EndringstidspunktDialogContext';
import { FeilutbetaltValutaTabellProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { KorrigertEtterbetalingProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerEtterbetaling/KorrigertEtterbetalingContext';
import { KorrigertVedtakProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/KorrigertVedtakContext';
import { RefusjonEøsTabellProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/RefusjonEøs/RefusjonEøsTabellContext';
import { SammensattKontrollsakProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/SammensattKontrollsak/SammensattKontrollsakContext';
import { SendtTilTotrinnskontrollModalProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/Totrinnskontroll/SendtTilTotrinnskontrollModalContext';
import { AlleBegrunnelserProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/AlleBegrunnelserContext';
import { VedtaksperioderProvider } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/VedtaksperioderContext';
import { erDefinert } from '@utils/commons';
import type { PropsWithChildren } from 'react';

export function VedtakContainer({ children }: PropsWithChildren) {
    const behandlingId = useBehandlingId();

    const {
        data: korrigertEtterbetaling,
        isPending: korrigertEtterbetalingIsPending,
        error: korrigertEtterbetalingError,
    } = useHentKorrigertEtterbetaling(behandlingId);

    const {
        data: korrigertVedtak,
        isPending: korrigertVedtakIsPending,
        error: korrigertVedtakError,
    } = useHentKorrigertVedtak(behandlingId);

    const {
        data: vedtaksperioder,
        isPending: vedtaksperioderIsPending,
        error: vedtaksperioderError,
    } = useHentVedtaksperioder(behandlingId);

    const {
        data: alleBegrunnelser,
        isPending: alleBegrunnelserIsPending,
        error: alleBegrunnelserError,
    } = useHentAlleBegrunnelser();

    const {
        data: sammensattKontrollsak,
        isPending: sammensattKontrollsakIsPending,
        error: sammensattKontrollsakError,
    } = useHentSammensattKontrollsak(behandlingId);

    const {
        data: feilutbetaltValutaPerioder,
        isPending: feilutbetaltValutaPerioderIsPending,
        error: feilutbetaltValutaPerioderError,
    } = useHentFeilutbetaltValuta(behandlingId);

    if (
        vedtaksperioderIsPending ||
        alleBegrunnelserIsPending ||
        sammensattKontrollsakIsPending ||
        feilutbetaltValutaPerioderIsPending ||
        korrigertEtterbetalingIsPending ||
        korrigertVedtakIsPending
    ) {
        return (
            <Box margin={'space-48'}>
                <Stack direction={'row'} justify={'center'} align={'center'} gap={'space-8'}>
                    <Loader size={'medium'} />
                    <BodyShort weight={'semibold'}>Laster vedtak...</BodyShort>
                </Stack>
            </Box>
        );
    }

    if (
        vedtaksperioderError ||
        alleBegrunnelserError ||
        sammensattKontrollsakError ||
        feilutbetaltValutaPerioderError ||
        korrigertEtterbetalingError ||
        korrigertVedtakError
    ) {
        const errors = [
            vedtaksperioderError,
            alleBegrunnelserError,
            sammensattKontrollsakError,
            feilutbetaltValutaPerioderError,
            korrigertEtterbetalingError,
            korrigertVedtakError,
        ].filter(error => erDefinert(error));
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
                    <SendtTilTotrinnskontrollModalProvider>
                        <FeilutbetaltValutaTabellProvider feilutbetaltValutaPerioder={feilutbetaltValutaPerioder}>
                            <RefusjonEøsTabellProvider>
                                <EndringstidspunktDialogProvider>
                                    <KorrigertEtterbetalingProvider
                                        korrigertEtterbetaling={korrigertEtterbetaling ?? undefined}
                                    >
                                        <KorrigertVedtakProvider korrigertVedtak={korrigertVedtak ?? undefined}>
                                            {children}
                                        </KorrigertVedtakProvider>
                                    </KorrigertEtterbetalingProvider>
                                </EndringstidspunktDialogProvider>
                            </RefusjonEøsTabellProvider>
                        </FeilutbetaltValutaTabellProvider>
                    </SendtTilTotrinnskontrollModalProvider>
                </VedtaksperioderProvider>
            </AlleBegrunnelserProvider>
        </SammensattKontrollsakProvider>
    );
}
