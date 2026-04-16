import { FileTextIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Button, InfoCard } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { FeilutbetaltValutaTabell } from './FeilutbetaltValuta/FeilutbetaltValutaTabell';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { RefusjonEøsTabell } from './RefusjonEøs/RefusjonEøsTabell';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import SammensattKontrollsak from './SammensattKontrollsak/SammensattKontrollsak';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';
import Vedtaksperioder from './Vedtaksperioder/Vedtaksperioder';
import useDokument from '../../../../../hooks/useDokument';
import { useSaksbehandler } from '../../../../../hooks/useSaksbehandler';
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
import { useBehandlingContext } from '../../context/BehandlingContext';
import { useTilbakekrevingsvedtakMotregning } from '../Simulering/UlovfestetMotregning/useTilbakekrevingsvedtakMotregning';

interface Props {
    åpenBehandling: IBehandling;
    bruker: IPersonInfo;
}

export const VedtaksbrevBygger = ({ åpenBehandling, bruker }: Props) => {
    const { vurderErLesevisning } = useBehandlingContext();
    const { hentForhåndsvisning, nullstillDokument, visDokumentModal, hentetDokument, settVisDokumentModal } =
        useDokument();

    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();

    const { erSammensattKontrollsak } = useSammensattKontrollsakContext();

    const { oppdaterTilbakekrevingsvedtakMotregning } = useTilbakekrevingsvedtakMotregning(åpenBehandling);

    const saksbehandler = useSaksbehandler();

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
        const genererBrevUnderBehandling =
            saksbehandler.rolle > BehandlerRolle.VEILEDER &&
            hentStegNummer(åpenBehandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const genererBrevUnderBeslutning =
            saksbehandler.rolle === BehandlerRolle.BESLUTTER &&
            hentStegNummer(åpenBehandling.steg) === hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const httpMethod = genererBrevUnderBehandling || genererBrevUnderBeslutning ? 'POST' : 'GET';

        hentForhåndsvisning({
            method: httpMethod,
            url: `/familie-ba-sak/api/dokument/vedtaksbrev/${vedtak?.id}`,
        });
    };

    const hentBrevForTilbakekrevingsvedtakMotregning = () => {
        const behandlingId = åpenBehandling.behandlingId;
        const genererBrevUnderBehandling =
            saksbehandler.rolle > BehandlerRolle.VEILEDER &&
            hentStegNummer(åpenBehandling.steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

        const genererBrevUnderBeslutning =
            saksbehandler.rolle === BehandlerRolle.BESLUTTER &&
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
                    <Box marginBlock={'space-24'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                Etterbetalingsbeløp i brevet er manuelt korrigert
                            </InfoCard.Message>
                        </InfoCard>
                    </Box>
                )}
                {åpenBehandling.korrigertVedtak && (
                    <Box marginBlock={'space-24'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                Vedtaket er korrigert etter § 35
                            </InfoCard.Message>
                        </InfoCard>
                    </Box>
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
                    <Box marginBlock={'space-32 space-16'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                {hentInfostripeTekst(
                                    åpenBehandling.årsak,
                                    åpenBehandling.status,
                                    automatiskBehandlingMedFortsattInnvilgetSomResultat
                                )}
                            </InfoCard.Message>
                        </InfoCard>
                    </Box>
                ) : (
                    <>
                        {erSammensattKontrollsak ? (
                            <SammensattKontrollsak />
                        ) : (
                            <>
                                <Vedtaksperioder åpenBehandling={åpenBehandling} />
                                {erFeilutbetaltValutaTabellSynlig && <FeilutbetaltValutaTabell />}
                                {erRefusjonEøsTabellSynlig && <RefusjonEøsTabell />}
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
