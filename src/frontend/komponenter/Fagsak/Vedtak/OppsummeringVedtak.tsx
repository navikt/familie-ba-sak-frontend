import * as React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { Alert, Heading } from '@navikt/ds-react';
import { FamilieSelect, FlexDiv } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import useDokument from '../../../hooks/useDokument';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
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
import { ToggleNavn } from '../../../typer/toggles';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { PeriodetypeIVedtaksbrev, useVedtak } from './useVedtak';
import { VedtaksbegrunnelseTeksterProvider } from './VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
import EndreEndringstidspunkt from './VedtakBegrunnelserTabell/EndreEndringstidspunkt';
import VedtaksperioderMedBegrunnelser from './VedtakBegrunnelserTabell/VedtaksperioderMedBegrunnelser/VedtaksperioderMedBegrunnelser';

interface IVedtakProps {
    åpenBehandling: IBehandling;
}

const Container = styled.div`
    max-width: 49rem;
    #forhandsvis-vedtaksbrev {
        float: right;
    }
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

const StyleHeading = styled(Heading)`
    display: flex;
`;

interface FortsattInnvilgetPerioderSelect extends HTMLSelectElement {
    value: PeriodetypeIVedtaksbrev;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ åpenBehandling }) => {
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsakId } = useSakOgBehandlingParams();
    const { erLesevisning, sendTilBeslutterNesteOnClick, behandlingsstegSubmitressurs } =
        useBehandling();

    const { overstyrFortsattInnvilgetVedtaksperioder, periodetypeIVedtaksbrev } = useVedtak({
        åpenBehandling,
    });

    const history = useHistory();
    const { toggles } = useApp();

    const {
        hentForhåndsvisning,
        nullstillDokument,
        visDokumentModal,
        hentetDokument,
        settVisDokumentModal,
    } = useDokument();
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const visSubmitKnapp = !erLesevisning() && åpenBehandling?.status === BehandlingStatus.UTREDES;

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
                    <StyleHeading size="large" level="1">
                        Vedtak
                    </StyleHeading>
                    {åpenBehandling.endringstidspunkt && (
                        <EndreEndringstidspunkt åpenBehandling={åpenBehandling} />
                    )}
                </StyledFlexiDiv>
            }
            forrigeOnClick={() =>
                history.push(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/simulering`)
            }
            nesteOnClick={visSubmitKnapp ? sendTilBeslutter : undefined}
            nesteKnappTittel={erMigreringFraInfotrygd ? 'Bekreft migrering' : 'Til godkjenning'}
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            maxWidthStyle="100%"
            className={'vedtak'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
            steg={BehandlingSteg.BESLUTTE_VEDTAK}
        >
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
                    <Container>
                        {åpenBehandling.resultat === BehandlingResultat.FORTSATT_INNVILGET &&
                            toggles[ToggleNavn.fortsattInnvilgetMedPerioder] && (
                                <FamilieSelect
                                    label="Velg brev med eller uten perioder"
                                    erLesevisning={erLesevisning()}
                                    onChange={(
                                        event: React.ChangeEvent<FortsattInnvilgetPerioderSelect>
                                    ): void => {
                                        overstyrFortsattInnvilgetVedtaksperioder(
                                            event.target.value
                                        );
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
                                <b>
                                    {hentInfostripeTekst(
                                        åpenBehandling.årsak,
                                        åpenBehandling.status
                                    )}
                                </b>
                            </Alert>
                        ) : (
                            <VedtaksbegrunnelseTeksterProvider>
                                <VedtaksperioderMedBegrunnelser åpenBehandling={åpenBehandling} />
                            </VedtaksbegrunnelseTeksterProvider>
                        )}

                        <IkonKnapp
                            id={'forhandsvis-vedtaksbrev'}
                            erLesevisning={false}
                            label={'Vis vedtaksbrev'}
                            ikon={<DokumentIkon />}
                            onClick={() => settVisDokumentModal(!visDokumentModal)}
                            spinner={hentetDokument.status === RessursStatus.HENTER}
                            ikonPosisjon={IkonPosisjon.VENSTRE}
                            mini={true}
                        />
                    </Container>
                    {visModal && (
                        <UIModalWrapper
                            modal={{
                                tittel: 'Totrinnskontroll',
                                lukkKnapp: false,
                                visModal: visModal,
                                actions: [
                                    <Knapp
                                        key={'saksoversikt'}
                                        mini={true}
                                        onClick={() => {
                                            settVisModal(false);
                                            history.push(`/fagsak/${fagsakId}/saksoversikt`);
                                            window.location.reload();
                                        }}
                                        children={'Gå til saksoversikten'}
                                    />,
                                    <Knapp
                                        key={'oppgavebenk'}
                                        type={'hoved'}
                                        mini={true}
                                        onClick={() => {
                                            settVisModal(false);
                                            history.push('/oppgaver');
                                        }}
                                        children={'Gå til oppgavebenken'}
                                    />,
                                ],
                            }}
                        >
                            <Normaltekst>Behandlingen er nå sendt til totrinnskontroll</Normaltekst>
                        </UIModalWrapper>
                    )}
                </>
            ) : erMigreringFraInfotrygd ? (
                <AlertStripeInfo>
                    {`Du er inne på en migreringsbehandling og det sendes ingen vedtaksbrev.`}
                </AlertStripeInfo>
            ) : (
                <AlertStripeInfo>
                    {`Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.`}
                </AlertStripeInfo>
            )}
        </StyledSkjemaSteg>
    );
};

export default OppsummeringVedtak;
