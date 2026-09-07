import { useBehandling } from '@hooks/useBehandling';
import { useOpprettSammensattKontrollsakError } from '@hooks/useOpprettSammensattKontrollsakError';
import { useSlettSammensattKontrollsakError } from '@hooks/useSlettSammensattKontrollsakError';
import { BrevmottakereBehandlingAdvarsel } from '@komponenter/Brevmottaker/BrevmottakereBehandlingAdvarsel';
import { Box, LocalAlert, VStack } from '@navikt/ds-react';
import { ForhåndsvisVedtaksbrev } from '@sider/Fagsak/Behandling/Sider/Vedtak/ForhåndsvisVedtaksbrev';
import { IngenVedtaksbrevbyggerAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/IngenVedtaksbrevbyggerAdvarsel';
import { KorrigertEtterbetalingAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerEtterbetaling/KorrigertEtterbetalingAdvarsel';
import { KorrigertVedtakAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/KorrigertVedtakAdvarsel';
import { Layout } from '@sider/Fagsak/Behandling/Sider/Vedtak/Layout/Layout';
import { useErBehandlingMedVedtaksbrev } from '@sider/Fagsak/Behandling/Sider/Vedtak/useErBehandlingMedVedtaksbrev';
import { Vedtaksmeny } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksmeny/Vedtaksmeny';
import { BehandlingUtenVedtaksbrevAdvarsel } from './BehandlingUtenVedtaksbrevAdvarsel';
import { FeilutbetaltValutaTabell } from './FeilutbetaltValuta/FeilutbetaltValutaTabell';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { RefusjonEøsTabell } from './RefusjonEøs/RefusjonEøsTabell';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import { SammensattKontrollsak } from './SammensattKontrollsak/SammensattKontrollsak';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { UkjentAdresseAlert } from './UkjentAdresseAlert';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';
import { useErAutomatiskBehandlingFortsattInnvilget } from './useErAutomatiskBehandlingFortsattInnvilget';
import { useErBehandlingMedVedtaksbrevbygger } from './useErBehandlingMedVedtaksbrevbygger';
import { useHarBrevmottakerMedUtenlandskAdresse } from './useHarBrevmottakerMedUtenlandskAdresse';
import { Vedtaksperioder } from './Vedtaksperioder/Vedtaksperioder';

export function Vedtak() {
    const behandling = useBehandling();

    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();

    const slettSammensattKontrollsakError = useSlettSammensattKontrollsakError(behandling.behandlingId);
    const opprettSammensattKontrollsakError = useOpprettSammensattKontrollsakError(behandling.behandlingId);

    const erBehandlingMedVedtaksbrev = useErBehandlingMedVedtaksbrev();
    const harBrevmottakerMedUtenlandskAdresse = useHarBrevmottakerMedUtenlandskAdresse();
    const erAutomatiskBehandlingFortsattInnvilget = useErAutomatiskBehandlingFortsattInnvilget();
    const erBehandlingMedVedtaksbrevbygger = useErBehandlingMedVedtaksbrevbygger();

    if (!erBehandlingMedVedtaksbrev) {
        return (
            <Layout>
                <BehandlingUtenVedtaksbrevAdvarsel />
            </Layout>
        );
    }

    return (
        <Layout>
            <VStack gap={'space-24'}>
                <Vedtaksmeny />
                <VStack gap={'space-12'}>
                    {slettSammensattKontrollsakError && (
                        <LocalAlert status={'error'}>
                            <LocalAlert.Header>
                                <LocalAlert.Title>{slettSammensattKontrollsakError.message}</LocalAlert.Title>
                            </LocalAlert.Header>
                        </LocalAlert>
                    )}
                    {opprettSammensattKontrollsakError && (
                        <LocalAlert status={'error'}>
                            <LocalAlert.Header>
                                <LocalAlert.Title>{opprettSammensattKontrollsakError.message}</LocalAlert.Title>
                            </LocalAlert.Header>
                        </LocalAlert>
                    )}
                    {behandling.korrigertEtterbetaling && <KorrigertEtterbetalingAdvarsel />}
                    {behandling.korrigertVedtak && <KorrigertVedtakAdvarsel />}
                    <BrevmottakereBehandlingAdvarsel kilde={'vedtak'} />
                    {!harBrevmottakerMedUtenlandskAdresse && <UkjentAdresseAlert />}
                    {!erBehandlingMedVedtaksbrevbygger && <IngenVedtaksbrevbyggerAdvarsel />}
                    {erBehandlingMedVedtaksbrevbygger && (
                        <Box marginBlock={'space-24'}>
                            {sammensattKontrollsak && <SammensattKontrollsak />}
                            {!sammensattKontrollsak && (
                                <VStack gap={'space-12 space-40'}>
                                    <Vedtaksperioder />
                                    {erFeilutbetaltValutaTabellSynlig && <FeilutbetaltValutaTabell />}
                                    {erRefusjonEøsTabellSynlig && <RefusjonEøsTabell />}
                                </VStack>
                            )}
                        </Box>
                    )}
                    {!erAutomatiskBehandlingFortsattInnvilget && <ForhåndsvisVedtaksbrev />}
                    {behandling.tilbakekrevingsvedtakMotregning && <TilbakekrevingsvedtakMotregning />}
                </VStack>
            </VStack>
        </Layout>
    );
}
