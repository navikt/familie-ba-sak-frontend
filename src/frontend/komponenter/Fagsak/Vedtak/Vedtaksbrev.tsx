import * as React from 'react';

import { FileTextIcon } from '@navikt/aksel-icons';
import { Alert, Button } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import FeilutbetaltValuta from './FeilutbetaltValuta/FeilutbetaltValuta';
import { BehandlingKorrigertAlert } from './OppsummeringVedtak';
import RefusjonEøs from './RefusjonEøs/RefusjonEøs';
import { VedtaksbegrunnelseTeksterProvider } from './VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import VedtaksperioderMedBegrunnelser from './VedtakBegrunnelserTabell/VedtaksperioderMedBegrunnelser/VedtaksperioderMedBegrunnelser';
import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useVedtaksperioder } from '../../../context/behandlingContext/useVedtaksperioder';
import useDokument from '../../../hooks/useDokument';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    BehandlingÅrsak,
    hentStegNummer,
    type IBehandling,
} from '../../../typer/behandling';
import type { IPersonInfo } from '../../../typer/person';
import { BrevmottakereAlert } from '../../Felleskomponenter/BrevmottakereAlert';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';

interface Props {
    åpenBehandling: IBehandling;
    bruker: IPersonInfo;
}

export const Vedtaksbrev: React.FunctionComponent<Props> = ({ åpenBehandling, bruker }) => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { hentSaksbehandlerRolle } = useApp();
    const { vurderErLesevisning } = useBehandling();
    const { vedtaksperioderMedBegrunnelserRessurs } = useVedtaksperioder();
    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const {
        visRefusjonEøs,
        settVisRefusjonEøs,
        visFeilutbetaltValuta,
        settVisFeilutbetaltValuta,
        settErUlagretNyRefusjonEøsPeriode,
        settErUlagretNyFeilutbetaltValutaPeriode,
    } = useVedtaksperioder();

    const erLesevisning = vurderErLesevisning();

    const hentInfostripeTekst = (årsak: BehandlingÅrsak, status: BehandlingStatus): string => {
        if (status === BehandlingStatus.AVSLUTTET) {
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

        const httpMethod =
            genererBrevUnderBehandling || genererBrevUnderBeslutning ? 'POST' : 'GET';

        hentForhåndsvisning({
            method: httpMethod,
            url: `/familie-ba-sak/api/dokument/vedtaksbrev/${vedtak?.id}`,
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
                    <BehandlingKorrigertAlert variant="info">
                        Vedtaket er korrigert etter § 35
                    </BehandlingKorrigertAlert>
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
                        {hentInfostripeTekst(åpenBehandling.årsak, åpenBehandling.status)}
                    </Alert>
                ) : (
                    <>
                        <VedtaksbegrunnelseTeksterProvider>
                            <VedtaksperioderMedBegrunnelser
                                åpenBehandling={åpenBehandling}
                                vedtaksperioderMedBegrunnelserRessurs={
                                    vedtaksperioderMedBegrunnelserRessurs
                                }
                            />
                        </VedtaksbegrunnelseTeksterProvider>
                        {visFeilutbetaltValuta && (
                            <FeilutbetaltValuta
                                feilutbetaltValutaListe={åpenBehandling.feilutbetaltValuta}
                                behandlingId={åpenBehandling.behandlingId}
                                fagsakId={fagsakId}
                                settErUlagretNyFeilutbetaltValutaPeriode={
                                    settErUlagretNyFeilutbetaltValutaPeriode
                                }
                                erLesevisning={erLesevisning}
                                skjulFeilutbetaltValuta={() => settVisFeilutbetaltValuta(false)}
                            />
                        )}
                        {visRefusjonEøs && (
                            <RefusjonEøs
                                refusjonEøsListe={åpenBehandling.refusjonEøs ?? []}
                                behandlingId={åpenBehandling.behandlingId}
                                fagsakId={fagsakId}
                                settErUlagretNyRefusjonEøsPeriode={
                                    settErUlagretNyRefusjonEøsPeriode
                                }
                                skjulRefusjonEøs={() => settVisRefusjonEøs(false)}
                            />
                        )}
                    </>
                )}
                <Button
                    id={'forhandsvis-vedtaksbrev'}
                    variant={'secondary'}
                    size={'medium'}
                    onClick={() => {
                        hentVedtaksbrev();
                    }}
                    loading={hentetDokument.status === RessursStatus.HENTER}
                    icon={<FileTextIcon aria-hidden />}
                >
                    Vis vedtaksbrev
                </Button>
            </div>
        </>
    );
};
