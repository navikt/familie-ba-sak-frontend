import { useBehandling } from '@hooks/useBehandling';
import { useOpprettSammensattKontrollsakError } from '@hooks/useOpprettSammensattKontrollsakError';
import { useSlettSammensattKontrollsakError } from '@hooks/useSlettSammensattKontrollsakError';
import { BrevmottakereBehandlingAdvarsel } from '@komponenter/Brevmottaker/BrevmottakereBehandlingAdvarsel';
import { Mottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import { Box, LocalAlert, VStack } from '@navikt/ds-react';
import { ForhåndsvisVedtaksbrev } from '@sider/Fagsak/Behandling/Sider/Vedtak/ForhåndsvisVedtaksbrev';
import { IngenVedtaksbrevbyggerAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/IngenVedtaksbrevbyggerAdvarsel';
import { KorrigertEtterbetalingAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerEtterbetaling/KorrigertEtterbetalingAdvarsel';
import { KorrigertVedtakAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/KorrigertVedtakAdvarsel';
import { Vedtaksmeny } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksmeny/Vedtaksmeny';
import { BehandlingResultat, BehandlingStatus, BehandlingÅrsak } from '@typer/behandling';
import { FeilutbetaltValutaTabell } from './FeilutbetaltValuta/FeilutbetaltValutaTabell';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { RefusjonEøsTabell } from './RefusjonEøs/RefusjonEøsTabell';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import { SammensattKontrollsak } from './SammensattKontrollsak/SammensattKontrollsak';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { UkjentAdresseAlert } from './UkjentAdresseAlert';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';
import { Vedtaksperioder } from './Vedtaksperioder/Vedtaksperioder';

export function VedtaksbrevBygger() {
    const behandling = useBehandling();

    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();

    const slettSammensattKontrollsakError = useSlettSammensattKontrollsakError(behandling.behandlingId);
    const opprettSammensattKontrollsakError = useOpprettSammensattKontrollsakError(behandling.behandlingId);

    const brukerHarUtenlandskAdresse = behandling.brevmottakere.some(
        mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
    );

    const automatiskBehandlingMedFortsattInnvilgetSomResultat =
        behandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && behandling.skalBehandlesAutomatisk;

    const erBehandlingMedVedtaksbrevbygger =
        behandling.årsak !== BehandlingÅrsak.DØDSFALL_BRUKER && behandling.status !== BehandlingStatus.AVSLUTTET;

    return (
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
                {!brukerHarUtenlandskAdresse && <UkjentAdresseAlert />}
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
                {!automatiskBehandlingMedFortsattInnvilgetSomResultat && <ForhåndsvisVedtaksbrev />}
                {behandling.tilbakekrevingsvedtakMotregning && <TilbakekrevingsvedtakMotregning />}
            </VStack>
        </VStack>
    );
}
