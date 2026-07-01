import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { BrevmottakereAlert } from '@komponenter/Brevmottaker/BrevmottakereAlert';
import { ForhåndsvisVedtaksbrev } from '@sider/Fagsak/Behandling/Sider/Vedtak/ForhåndsvisVedtaksbrev';
import { BehandlingResultat, BehandlingStatus, BehandlingÅrsak } from '@typer/behandling';

import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, InfoCard } from '@navikt/ds-react';

import { FeilutbetaltValutaTabell } from './FeilutbetaltValuta/FeilutbetaltValutaTabell';
import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValuta/FeilutbetaltValutaTabellContext';
import { RefusjonEøsTabell } from './RefusjonEøs/RefusjonEøsTabell';
import { useRefusjonEøsTabellContext } from './RefusjonEøs/RefusjonEøsTabellContext';
import { SammensattKontrollsak } from './SammensattKontrollsak/SammensattKontrollsak';
import { useSammensattKontrollsakContext } from './SammensattKontrollsak/SammensattKontrollsakContext';
import { TilbakekrevingsvedtakMotregning } from './UlovfestetMotregning/TilbakekrevingsvedtakMotregning';
import { Vedtaksperioder } from './Vedtaksperioder/Vedtaksperioder';

export function VedtaksbrevBygger() {
    const erLesevisning = useErLesevisning();
    const bruker = useBruker();
    const behandling = useBehandling();

    const { erFeilutbetaltValutaTabellSynlig } = useFeilutbetaltValutaTabellContext();
    const { erRefusjonEøsTabellSynlig } = useRefusjonEøsTabellContext();
    const { sammensattKontrollsak } = useSammensattKontrollsakContext();

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

    return (
        <>
            <div>
                {behandling.korrigertEtterbetaling && (
                    <Box marginBlock={'space-24'}>
                        <InfoCard data-color="info">
                            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                Etterbetalingsbeløp i brevet er manuelt korrigert
                            </InfoCard.Message>
                        </InfoCard>
                    </Box>
                )}
                {behandling.korrigertVedtak && (
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
                    brevmottakere={behandling.brevmottakere ?? []}
                    åpenBehandling={behandling}
                />
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
                {behandling.tilbakekrevingsvedtakMotregning !== null && <TilbakekrevingsvedtakMotregning />}
            </div>
        </>
    );
}
