import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { BrevmottakereBehandlingAdvarsel } from '@komponenter/Brevmottaker/BrevmottakereBehandlingAdvarsel';
import { Mottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';
import { ForhåndsvisVedtaksbrev } from '@sider/Fagsak/Behandling/Sider/Vedtak/ForhåndsvisVedtaksbrev';
import { KorrigertEtterbetalingAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigertEtterbetalingAdvarsel';
import { KorrigertVedtakAdvarsel } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigertVedtakAdvarsel';
import {
    BehandlerRolle,
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    BehandlingÅrsak,
    hentStegNummer,
} from '@typer/behandling';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard } from '@navikt/ds-react';

import { FeilutbetaltValutaTabell } from './FeilutbetaltValuta/FeilutbetaltValutaTabell';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { RefusjonEøsTabell } from './RefusjonEøs/RefusjonEøsTabell';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import { SammensattKontrollsak } from './SammensattKontrollsak/SammensattKontrollsak';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { UkjentAdresseAlert } from './UkjentAdresseAlert';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';
import { Vedtaksperioder } from './Vedtaksperioder/Vedtaksperioder';
import useDokument from '../../../../../hooks/useDokument';
import PdfVisningModal from '../../../../../komponenter/PdfVisningModal/PdfVisningModal';
import { useTilbakekrevingsvedtakMotregning } from '../Simulering/UlovfestetMotregning/useTilbakekrevingsvedtakMotregning';

export function VedtaksbrevBygger() {
    const saksbehandler = useSaksbehandler();
    const erLesevisning = useErLesevisning();
    const behandling = useBehandling();

    const { hentForhåndsvisning, nullstillDokument, visDokumentModal, hentetDokument, settVisDokumentModal } =
        useDokument();

    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();
    const { oppdaterTilbakekrevingsvedtakMotregning } = useTilbakekrevingsvedtakMotregning(behandling);

    const brukerHarUtenlandskAdresse = behandling.brevmottakere.some(
        mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE
    );

    const automatiskBehandlingMedFortsattInnvilgetSomResultat =
        behandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && behandling.skalBehandlesAutomatisk;

    const hentInfostripeTekst = (
        årsak: BehandlingÅrsak,
        status: BehandlingStatus,
        automatiskBehandlingMedFortsattInnvilgetSomResultat: boolean
    ): string => {
        if (automatiskBehandlingMedFortsattInnvilgetSomResultat) {
            return 'Automatisk behandling med resultat "Fortsatt innvilget" sender ikke vedtaksbrev.';
        } else if (status === BehandlingStatus.AVSLUTTET) {
            return 'Behandlingen er avsluttet. Du kan se vedtaksbrevet ved å trykke på "Vis vedtaksbrev".';
        } else if (årsak === BehandlingÅrsak.DØDSFALL_BRUKER) {
            return 'Vedtak om opphør på grunn av dødsfall er automatisk generert.';
        } else return '';
    };

    const hentBrevForTilbakekrevingsvedtakMotregning = () => {
        const genererBrevUnderBehandling =
            saksbehandler.rolle > BehandlerRolle.VEILEDER &&
            hentStegNummer(behandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const genererBrevUnderBeslutning =
            saksbehandler.rolle === BehandlerRolle.BESLUTTER &&
            hentStegNummer(behandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const httpMethod = genererBrevUnderBehandling || genererBrevUnderBeslutning ? 'POST' : 'GET';

        hentForhåndsvisning({
            method: httpMethod,
            url: `/familie-ba-sak/api/behandling/${behandling.behandlingId}/tilbakekrevingsvedtak-motregning/pdf`,
        });
    };

    return (
        <>
            {visDokumentModal && (
                <PdfVisningModal
                    onRequestClose={() => {
                        settVisDokumentModal(false);
                        nullstillDokument();
                    }}
                    pdfdata={hentetDokument}
                />
            )}
            <div>
                {behandling.korrigertEtterbetaling && <KorrigertEtterbetalingAdvarsel />}
                {behandling.korrigertVedtak && <KorrigertVedtakAdvarsel />}
                <BrevmottakereBehandlingAdvarsel kilde={'vedtak'} />
                {!brukerHarUtenlandskAdresse && <UkjentAdresseAlert />}
                {behandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
                behandling.status === BehandlingStatus.AVSLUTTET ? (
                    <Box marginBlock={'space-32 space-16'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                {hentInfostripeTekst(
                                    behandling.årsak,
                                    behandling.status,
                                    automatiskBehandlingMedFortsattInnvilgetSomResultat
                                )}
                            </InfoCard.Message>
                        </InfoCard>
                    </Box>
                ) : (
                    <>
                        {sammensattKontrollsak ? (
                            <SammensattKontrollsak />
                        ) : (
                            <>
                                <Vedtaksperioder />
                                {erFeilutbetaltValutaTabellSynlig && <FeilutbetaltValutaTabell />}
                                {erRefusjonEøsTabellSynlig && <RefusjonEøsTabell />}
                            </>
                        )}
                    </>
                )}
                {!automatiskBehandlingMedFortsattInnvilgetSomResultat && <ForhåndsvisVedtaksbrev />}
                {behandling.tilbakekrevingsvedtakMotregning !== null && (
                    <TilbakekrevingsvedtakMotregning
                        tilbakekrevingsvedtakMotregning={behandling.tilbakekrevingsvedtakMotregning}
                        oppdaterTilbakekrevingsvedtakMotregning={oppdaterTilbakekrevingsvedtakMotregning}
                        settVisDokumentModal={settVisDokumentModal}
                        hentBrevForTilbakekrevingsvedtakMotregning={hentBrevForTilbakekrevingsvedtakMotregning}
                        hentetDokument={hentetDokument}
                        erLesevisning={erLesevisning}
                    />
                )}
            </div>
        </>
    );
}
