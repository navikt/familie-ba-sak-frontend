import { useBehandling } from '@hooks/useBehandling';
import { BrevmottakereBehandlingAdvarsel } from '@komponenter/Brevmottaker/BrevmottakereBehandlingAdvarsel';
import { Mottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import { ForhåndsvisVedtaksbrev } from '@sider/Fagsak/Behandling/Sider/Vedtak/ForhåndsvisVedtaksbrev';
import { IngenVedtaksbrevbyggerAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/IngenVedtaksbrevbyggerAdvarsel';
import { KorrigertEtterbetalingAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigertEtterbetalingAdvarsel';
import { KorrigertVedtakAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigertVedtakAdvarsel';
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

    const brukerHarUtenlandskAdresse = behandling.brevmottakere.some(
        mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
    );

    const automatiskBehandlingMedFortsattInnvilgetSomResultat =
        behandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && behandling.skalBehandlesAutomatisk;

    const erBehandlingMedVedtaksbrevbygger =
        behandling.årsak !== BehandlingÅrsak.DØDSFALL_BRUKER && behandling.status !== BehandlingStatus.AVSLUTTET;

    return (
        <>
            <div>
                {behandling.korrigertEtterbetaling && <KorrigertEtterbetalingAdvarsel />}
                {behandling.korrigertVedtak && <KorrigertVedtakAdvarsel />}
                <BrevmottakereBehandlingAdvarsel kilde={'vedtak'} />
                {!brukerHarUtenlandskAdresse && <UkjentAdresseAlert />}
                {!erBehandlingMedVedtaksbrevbygger && <IngenVedtaksbrevbyggerAdvarsel />}
                {erBehandlingMedVedtaksbrevbygger && (
                    <>
                        {sammensattKontrollsak && <SammensattKontrollsak />}
                        {!sammensattKontrollsak && (
                            <>
                                <Vedtaksperioder />
                                {erFeilutbetaltValutaTabellSynlig && <FeilutbetaltValutaTabell />}
                                {erRefusjonEøsTabellSynlig && <RefusjonEøsTabell />}
                            </>
                        )}
                    </>
                )}
                {!automatiskBehandlingMedFortsattInnvilgetSomResultat && <ForhåndsvisVedtaksbrev />}
                {behandling.tilbakekrevingsvedtakMotregning && <TilbakekrevingsvedtakMotregning />}
            </div>
        </>
    );
}
