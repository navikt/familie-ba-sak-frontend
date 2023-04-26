import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { FileContent } from '@navikt/ds-icons';
import { Alert, Button } from '@navikt/ds-react';
import { hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import { useSimulering } from '../../../context/SimuleringContext';
import useDokument from '../../../hooks/useDokument';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    Behandlingstype,
    BehandlingÅrsak,
    hentStegNummer,
} from '../../../typer/behandling';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { BehandlingSendtTilTotrinnskontrollModal } from './BehandlingSendtTilTotrinnskontrollModal';
import { BrevmottakereAlert } from './BrevmottakereAlert';
import FeilutbetaltValuta from './FeilutbetaltValuta/FeilutbetaltValuta';
import RefusjonEøs from './RefusjonEøs/RefusjonEøs';
import { VedtaksbegrunnelseTeksterProvider } from './VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import VedtaksperioderMedBegrunnelser from './VedtakBegrunnelserTabell/VedtaksperioderMedBegrunnelser/VedtaksperioderMedBegrunnelser';
import Vedtaksmeny from './Vedtaksmeny';

interface IVedtakProps {
    åpenBehandling: IBehandling;
}

const StyledSkjemaSteg = styled(Skjemasteg)`
    .typo-innholdstittel {
        margin-bottom: 1.4rem;
    }
`;

export const BehandlingKorrigertAlert = styled(Alert)`
    margin-bottom: 1.5rem;
`;

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ åpenBehandling }) => {
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsakId } = useSakOgBehandlingParams();
    const { vurderErLesevisning, sendTilBeslutterNesteOnClick, behandlingsstegSubmitressurs } =
        useBehandling();

    const { behandlingErMigreringMedAvvikUtenforBeløpsgrenser } = useSimulering();

    const erLesevisning = vurderErLesevisning();

    const { minimalFagsak: minimalFagsakRessurs } = useFagsakContext();

    const personer = åpenBehandling?.personer ?? [];
    const brevmottakere = åpenBehandling?.brevmottakere ?? [];
    const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);

    const navigate = useNavigate();

    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const visSubmitKnapp = !erLesevisning && åpenBehandling?.status === BehandlingStatus.UTREDES;

    const [visFeilutbetaltValuta, settVisFeilutbetaltValuta] = React.useState(
        åpenBehandling.feilutbetaltValuta.length > 0
    );
    const [visRefusjonEøs, settVisRefusjonEøs] = React.useState(
        åpenBehandling.refusjonEøs.length > 0
    );
    const [erUlagretNyFeilutbetaltValutaPeriode, settErUlagretNyFeilutbetaltValutaPeriode] =
        React.useState(false);

    const [erUlagretNyRefusjonEøsPeriode, settErUlagretNyRefusjonEøsPeriode] =
        React.useState(false);

    React.useEffect(() => {
        settVisFeilutbetaltValuta(åpenBehandling.feilutbetaltValuta.length > 0);
        settVisRefusjonEøs(åpenBehandling.refusjonEøs.length > 0);
    }, [åpenBehandling]);

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

    const sendTilBeslutter = () => {
        sendTilBeslutterNesteOnClick(
            (visModal: boolean) => settVisModal(visModal),
            erUlagretNyFeilutbetaltValutaPeriode,
            erUlagretNyRefusjonEøsPeriode
        );
    };

    const erMigreringFraInfotrygd = åpenBehandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
    const erBehandlingMedVedtaksbrevutsending =
        åpenBehandling.type !== Behandlingstype.TEKNISK_ENDRING &&
        åpenBehandling.årsak !== BehandlingÅrsak.SATSENDRING &&
        !erMigreringFraInfotrygd;

    const hentInfostripeTekst = (årsak: BehandlingÅrsak, status: BehandlingStatus): string => {
        if (status === BehandlingStatus.AVSLUTTET) {
            return 'Behandlingen er avsluttet. Du kan se vedtaksbrevet ved å trykke på "Vis vedtaksbrev".';
        } else if (årsak === BehandlingÅrsak.DØDSFALL_BRUKER) {
            return 'Vedtak om opphør på grunn av dødsfall er automatisk generert.';
        } else if (årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV) {
            return 'Behandling bruker manuelt skrevet vedtaksbrev. Forhåndsvis for å se brevet.';
        } else return '';
    };

    return (
        <StyledSkjemaSteg
            tittel="Vedtak"
            forrigeOnClick={() =>
                navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/simulering`)
            }
            nesteOnClick={visSubmitKnapp ? sendTilBeslutter : undefined}
            nesteKnappTittel={
                erMigreringFraInfotrygd && !behandlingErMigreringMedAvvikUtenforBeløpsgrenser
                    ? 'Bekreft migrering'
                    : 'Til godkjenning'
            }
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            maxWidthStyle="54rem"
            className={'vedtak'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
            steg={BehandlingSteg.BESLUTTE_VEDTAK}
        >
            <Vedtaksmeny
                åpenBehandling={åpenBehandling}
                erBehandlingMedVedtaksbrevutsending={erBehandlingMedVedtaksbrevutsending}
                visFeilutbetaltValuta={() => settVisFeilutbetaltValuta(true)}
                visRefusjonEøs={() => settVisRefusjonEøs(true)}
            />

            {erBehandlingMedVedtaksbrevutsending ? (
                <>
                    <PdfVisningModal
                        onRequestOpen={() => {
                            if (hentetDokument.status !== RessursStatus.HENTER) {
                                hentVedtaksbrev();
                            }
                        }}
                        åpen={visDokumentModal}
                        onRequestClose={() => {
                            settVisDokumentModal(false);
                            nullstillDokument();
                        }}
                        pdfdata={hentetDokument}
                    />
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
                            brevmottakere={brevmottakere}
                            institusjon={minimalFagsak?.institusjon}
                            personer={personer}
                            åpenBehandling={åpenBehandling}
                            fagsakType={minimalFagsak?.fagsakType}
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
                                        skjulFeilutbetaltValuta={() =>
                                            settVisFeilutbetaltValuta(false)
                                        }
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
                                        erLesevisning={erLesevisning}
                                        skjulRefusjonEøs={() => settVisRefusjonEøs(false)}
                                    />
                                )}
                            </>
                        )}
                        <Button
                            id={'forhandsvis-vedtaksbrev'}
                            variant={'secondary'}
                            size={'medium'}
                            onClick={() => settVisDokumentModal(!visDokumentModal)}
                            loading={hentetDokument.status === RessursStatus.HENTER}
                            icon={<FileContent aria-hidden />}
                        >
                            Vis vedtaksbrev
                        </Button>
                    </div>

                    <BehandlingSendtTilTotrinnskontrollModal
                        visModal={visModal}
                        settVisModal={settVisModal}
                    />
                </>
            ) : erMigreringFraInfotrygd ? (
                <Alert variant="info">
                    {`Du er inne på en migreringsbehandling og det sendes ingen vedtaksbrev.`}
                </Alert>
            ) : (
                <Alert variant="info">
                    {`Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.`}
                </Alert>
            )}
        </StyledSkjemaSteg>
    );
};

export default OppsummeringVedtak;
