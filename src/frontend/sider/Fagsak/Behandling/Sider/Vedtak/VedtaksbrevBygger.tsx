import * as React from 'react';

import { FileTextIcon } from '@navikt/aksel-icons';
import { Alert, Button } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import FeilutbetaltValuta from './FeilutbetaltValuta/FeilutbetaltValuta';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import RefusjonEøs from './RefusjonEøs/RefusjonEøs';
import { RefusjonEøsTabell } from './RefusjonEøsNy/RefusjonEøsTabell';
import { useRefusjonEøsTabellContext } from './RefusjonEøsNy/RefusjonEøsTabellContext';
import SammensattKontrollsak from './SammensattKontrollsak/SammensattKontrollsak';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';
import { BehandlingKorrigertAlert } from './Vedtak';
import { useVedtakContext } from './VedtakContext';
import Vedtaksperioder from './Vedtaksperioder/Vedtaksperioder';
import { useAppContext } from '../../../../../context/AppContext';
import useDokument from '../../../../../hooks/useDokument';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import { BrevmottakereAlert } from '../../../../../komponenter/Brevmottaker/BrevmottakereAlert';
import PdfVisningModal from '../../../../../komponenter/PdfVisningModal/PdfVisningModal';
import {
    BehandlerRolle,
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    BehandlingÅrsak,
    hentStegNummer,
    type IBehandling,
} from '../../../../../typer/behandling';
import type { IPersonInfo } from '../../../../../typer/person';
import { ToggleNavn } from '../../../../../typer/toggles';
import { useBehandlingContext } from '../../context/BehandlingContext';
import { useTilbakekrevingsvedtakMotregning } from '../Simulering/UlovfestetMotregning/useTilbakekrevingsvedtakMotregning';

interface Props {
    åpenBehandling: IBehandling;
    bruker: IPersonInfo;
}

export const VedtaksbrevBygger: React.FunctionComponent<Props> = ({ åpenBehandling, bruker }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { hentSaksbehandlerRolle, toggles } = useAppContext();
    const { vurderErLesevisning } = useBehandlingContext();
    const { hentForhåndsvisning, nullstillDokument, visDokumentModal, hentetDokument, settVisDokumentModal } =
        useDokument();

    const { vedtaksperioderMedBegrunnelserRessurs } = useVedtakContext();
    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();

    const { erSammensattKontrollsak } = useSammensattKontrollsakContext();

    const { oppdaterTilbakekrevingsvedtakMotregning } = useTilbakekrevingsvedtakMotregning(åpenBehandling);

    const erLesevisning = vurderErLesevisning();

    const automatiskBehandlingMedFortsattInnvilgetSomResultat =
        åpenBehandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && åpenBehandling.skalBehandlesAutomatisk;

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
        } else if (årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV) {
            return 'Behandling bruker manuelt skrevet vedtaksbrev. Forhåndsvis for å se brevet.';
        } else return '';
    };

    const hentVedtaksbrev = () => {
        const vedtak = åpenBehandling.vedtak;
        const rolle = hentSaksbehandlerRolle();
        const genererBrevUnderBehandling =
            rolle &&
            rolle > BehandlerRolle.VEILEDER &&
            hentStegNummer(åpenBehandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const genererBrevUnderBeslutning =
            rolle &&
            rolle === BehandlerRolle.BESLUTTER &&
            hentStegNummer(åpenBehandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const httpMethod = genererBrevUnderBehandling || genererBrevUnderBeslutning ? 'POST' : 'GET';

        hentForhåndsvisning({
            method: httpMethod,
            url: `/familie-ba-sak/api/dokument/vedtaksbrev/${vedtak?.id}`,
        });
    };

    const hentBrevForTilbakekrevingsvedtakMotregning = () => {
        const behandlingId = åpenBehandling.behandlingId;
        const rolle = hentSaksbehandlerRolle();
        const genererBrevUnderBehandling =
            rolle !== undefined &&
            rolle > BehandlerRolle.VEILEDER &&
            hentStegNummer(åpenBehandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const genererBrevUnderBeslutning =
            rolle !== undefined &&
            rolle === BehandlerRolle.BESLUTTER &&
            hentStegNummer(åpenBehandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const httpMethod = genererBrevUnderBehandling || genererBrevUnderBeslutning ? 'POST' : 'GET';

        hentForhåndsvisning({
            method: httpMethod,
            url: `/familie-ba-sak/api/behandling/${behandlingId}/tilbakekrevingsvedtak-motregning/pdf`,
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
                {åpenBehandling.korrigertEtterbetaling && (
                    <BehandlingKorrigertAlert variant="info">
                        Etterbetalingsbeløp i brevet er manuelt korrigert
                    </BehandlingKorrigertAlert>
                )}
                {åpenBehandling.korrigertVedtak && (
                    <BehandlingKorrigertAlert variant="info">Vedtaket er korrigert etter § 35</BehandlingKorrigertAlert>
                )}
                <BrevmottakereAlert
                    bruker={bruker}
                    erPåBehandling={true}
                    erLesevisning={erLesevisning}
                    brevmottakere={åpenBehandling?.brevmottakere ?? []}
                    åpenBehandling={åpenBehandling}
                />
                {åpenBehandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
                åpenBehandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                åpenBehandling.status === BehandlingStatus.AVSLUTTET ? (
                    <Alert variant="info" style={{ margin: '2rem 0 1rem 0' }}>
                        {hentInfostripeTekst(
                            åpenBehandling.årsak,
                            åpenBehandling.status,
                            automatiskBehandlingMedFortsattInnvilgetSomResultat
                        )}
                    </Alert>
                ) : (
                    <>
                        {erSammensattKontrollsak ? (
                            <SammensattKontrollsak />
                        ) : (
                            <>
                                <Vedtaksperioder
                                    åpenBehandling={åpenBehandling}
                                    vedtaksperioderMedBegrunnelserRessurs={vedtaksperioderMedBegrunnelserRessurs}
                                />
                                {erFeilutbetaltValutaTabellSynlig && (
                                    <FeilutbetaltValuta
                                        feilutbetaltValutaListe={åpenBehandling.feilutbetaltValuta}
                                        behandlingId={åpenBehandling.behandlingId}
                                        fagsakId={fagsakId}
                                        erLesevisning={erLesevisning}
                                    />
                                )}
                                {erRefusjonEøsTabellSynlig && toggles[ToggleNavn.brukNyRefusjonEøsForm] && (
                                    <RefusjonEøsTabell />
                                )}
                                {erRefusjonEøsTabellSynlig && !toggles[ToggleNavn.brukNyRefusjonEøsForm] && (
                                    <RefusjonEøs
                                        refusjonEøsListe={åpenBehandling.refusjonEøs ?? []}
                                        behandlingId={åpenBehandling.behandlingId}
                                        fagsakId={fagsakId}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}

                {!automatiskBehandlingMedFortsattInnvilgetSomResultat && (
                    <Button
                        id={'forhandsvis-vedtaksbrev'}
                        variant={'secondary'}
                        size={'medium'}
                        onClick={() => {
                            settVisDokumentModal(true);
                            hentVedtaksbrev();
                        }}
                        loading={hentetDokument.status === RessursStatus.HENTER}
                        icon={<FileTextIcon aria-hidden />}
                    >
                        Vis vedtaksbrev
                    </Button>
                )}

                {åpenBehandling.tilbakekrevingsvedtakMotregning !== null && (
                    <TilbakekrevingsvedtakMotregning
                        tilbakekrevingsvedtakMotregning={åpenBehandling.tilbakekrevingsvedtakMotregning}
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
};
