import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ExpandFilled, FileContent, InformationColored, Notes } from '@navikt/ds-icons';
import { Alert, BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { NavdsSpacing10 } from '@navikt/ds-tokens/dist/tokens';
import { FamilieSelect, FlexDiv } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import useDokument from '../../../hooks/useDokument';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import {
    BehandlerRolle,
    BehandlingResultat,
    BehandlingStatus,
    BehandlingSteg,
    Behandlingstype,
    BehandlingÅrsak,
    hentStegNummer,
} from '../../../typer/behandling';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import KorrigerEtterbetalingModal from './KorrigerEtterbetalingModal/KorrigerEtterbetalingModal';
import { PeriodetypeIVedtaksbrev, useVedtak } from './useVedtak';
import { VedtaksbegrunnelseTeksterProvider } from './VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import VedtaksperioderMedBegrunnelser from './VedtakBegrunnelserTabell/VedtaksperioderMedBegrunnelser/VedtaksperioderMedBegrunnelser';

interface IVedtakProps {
    åpenBehandling: IBehandling;
}

const Container = styled.div`
    max-width: 49rem;
`;

const StyledSkjemaSteg = styled(Skjemasteg)`
    .typo-innholdstittel {
        margin-bottom: 1.4rem;
    }
`;

const StyledFlexiDiv = styled(FlexDiv)`
    justify-content: space-between;
    max-width: 49rem;
`;

const KorrigertEtterbetalingsbeløpAlert = styled(Alert)`
    margin-bottom: 1.5rem;
`;

const Modaltekst = styled(BodyShort)`
    margin: 2rem 0;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const Knapperad = styled.div`
    display: flex;
    justify-content: center;
`;

const KnappHøyreHjørne = styled(Button)`
    position: absolute;
    top: ${NavdsSpacing10};
    right: ${NavdsSpacing10};
}
`;

interface FortsattInnvilgetPerioderSelect extends HTMLSelectElement {
    value: PeriodetypeIVedtaksbrev;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ åpenBehandling }) => {
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsakId } = useSakOgBehandlingParams();
    const { vurderErLesevisning, sendTilBeslutterNesteOnClick, behandlingsstegSubmitressurs } =
        useBehandling();

    const { overstyrFortsattInnvilgetVedtaksperioder, periodetypeIVedtaksbrev } = useVedtak({
        åpenBehandling,
    });

    const navigate = useNavigate();

    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [visKorrigerEtterbetalingModal, setVisKorrigerEtterbetalingModal] =
        React.useState<boolean>(false);

    const visSubmitKnapp =
        !vurderErLesevisning() && åpenBehandling?.status === BehandlingStatus.UTREDES;

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
        sendTilBeslutterNesteOnClick((visModal: boolean) => settVisModal(visModal));
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
            tittel={
                <StyledFlexiDiv>
                    <span>Vedtak</span>
                </StyledFlexiDiv>
            }
            forrigeOnClick={() =>
                navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/simulering`)
            }
            nesteOnClick={visSubmitKnapp ? sendTilBeslutter : undefined}
            nesteKnappTittel={erMigreringFraInfotrygd ? 'Bekreft migrering' : 'Til godkjenning'}
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            maxWidthStyle="100%"
            className={'vedtak'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
            steg={BehandlingSteg.BESLUTTE_VEDTAK}
        >
            <Dropdown>
                <KnappHøyreHjørne
                    forwardedAs={Dropdown.Toggle}
                    size="small"
                    variant="secondary"
                    icon={<ExpandFilled />}
                    iconPosition="right"
                >
                    Vedtak
                </KnappHøyreHjørne>
                <Dropdown.Menu>
                    <Dropdown.Menu.List>
                        <Dropdown.Menu.List.Item>Test</Dropdown.Menu.List.Item>
                        <Dropdown.Menu.List.Item>Test</Dropdown.Menu.List.Item>
                    </Dropdown.Menu.List>
                </Dropdown.Menu>
            </Dropdown>
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
                    <KorrigerEtterbetalingModal
                        erLesevisning={vurderErLesevisning()}
                        korrigertEtterbetaling={åpenBehandling.korrigertEtterbetaling}
                        behandlingId={åpenBehandling.behandlingId}
                        visModal={visKorrigerEtterbetalingModal}
                        onClose={() =>
                            setVisKorrigerEtterbetalingModal(!visKorrigerEtterbetalingModal)
                        }
                    />
                    <Container>
                        {åpenBehandling.korrigertEtterbetaling && (
                            <KorrigertEtterbetalingsbeløpAlert variant="info">
                                Etterbetalingsbeløp i brevet er manuelt korrigert
                            </KorrigertEtterbetalingsbeløpAlert>
                        )}
                        {åpenBehandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && (
                            <FamilieSelect
                                label="Velg brev med eller uten perioder"
                                erLesevisning={vurderErLesevisning()}
                                onChange={(
                                    event: React.ChangeEvent<FortsattInnvilgetPerioderSelect>
                                ): void => {
                                    overstyrFortsattInnvilgetVedtaksperioder(event.target.value);
                                }}
                                value={periodetypeIVedtaksbrev}
                            >
                                <option value={PeriodetypeIVedtaksbrev.UTEN_PERIODER}>
                                    Fortsatt innvilget: Uten perioder
                                </option>
                                <option value={PeriodetypeIVedtaksbrev.MED_PERIODER}>
                                    Fortsatt innvilget: Med perioder
                                </option>
                            </FamilieSelect>
                        )}
                        {åpenBehandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
                        åpenBehandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
                        åpenBehandling.status === BehandlingStatus.AVSLUTTET ? (
                            <Alert variant="info" style={{ margin: '2rem 0 1rem 0' }}>
                                {hentInfostripeTekst(åpenBehandling.årsak, åpenBehandling.status)}
                            </Alert>
                        ) : (
                            <VedtaksbegrunnelseTeksterProvider>
                                <VedtaksperioderMedBegrunnelser åpenBehandling={åpenBehandling} />
                            </VedtaksbegrunnelseTeksterProvider>
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
                        <Button
                            id={'korriger-etterbetaling'}
                            variant={'tertiary'}
                            size={'small'}
                            style={{ float: 'right' }}
                            onClick={() => setVisKorrigerEtterbetalingModal(true)}
                            icon={
                                åpenBehandling.korrigertEtterbetaling ? (
                                    <InformationColored aria-hidden />
                                ) : (
                                    <Notes aria-hidden />
                                )
                            }
                        >
                            {åpenBehandling.korrigertEtterbetaling ? (
                                <>Vis korrigert etterbetaling</>
                            ) : (
                                <>Korriger etterbetaling</>
                            )}
                        </Button>
                    </Container>

                    <Modal
                        open={visModal}
                        onClose={() => settVisModal(false)}
                        closeButton={true}
                        shouldCloseOnOverlayClick={false}
                    >
                        <Modal.Content>
                            <Heading size={'medium'} level={'2'}>
                                Totrinnskontroll
                            </Heading>
                            <Modaltekst>Behandlingen er nå sendt til totrinnskontroll</Modaltekst>
                            <Knapperad>
                                <Button
                                    key={'oppgavebenk'}
                                    variant={'secondary'}
                                    size={'medium'}
                                    onClick={() => {
                                        settVisModal(false);
                                        navigate('/oppgaver');
                                    }}
                                    children={'Gå til oppgavebenken'}
                                />
                                <KnappHøyre
                                    key={'saksoversikt'}
                                    variant={'secondary'}
                                    size={'medium'}
                                    onClick={() => {
                                        settVisModal(false);
                                        navigate(`/fagsak/${fagsakId}/saksoversikt`);
                                        window.location.reload();
                                    }}
                                    children={'Gå til saksoversikten'}
                                />
                            </Knapperad>
                        </Modal.Content>
                    </Modal>
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
