import * as React from 'react';

import { AxiosError } from 'axios';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import Alertstripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import { DokumentIkon } from '../../../ikoner/DokumentIkon';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    Behandlingstype,
    BehandlingÅrsak,
    hentStegNummer,
    IBehandling,
} from '../../../typer/behandling';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import IkonKnapp, { IkonPosisjon } from '../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { VedtaksbegrunnelseTeksterProvider } from './VedtakBegrunnelserTabell/Context/VedtaksbegrunnelseTeksterContext';
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

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ åpenBehandling }) => {
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsakId } = useSakOgBehandlingParams();
    const { request } = useHttp();
    const { erLesevisning, sendTilBeslutterNesteOnClick, behandlingsstegSubmitressurs } =
        useBehandling();

    const history = useHistory();

    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [visVedtaksbrev, settVisVedtaksbrev] = React.useState(false);

    const [vedtaksbrev, settVedtaksbrev] = React.useState(byggTomRessurs<string>());

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

        if (vedtak) {
            settVedtaksbrev(byggHenterRessurs());
            request<void, string>({
                method: httpMethod,
                url: `/familie-ba-sak/api/dokument/vedtaksbrev/${vedtak?.id}`,
            })
                .then((response: Ressurs<string>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settVedtaksbrev(
                            byggDataRessurs(`data:application/pdf;base64,${response.data}`)
                        );
                    } else if (
                        response.status === RessursStatus.FEILET ||
                        response.status === RessursStatus.FUNKSJONELL_FEIL ||
                        response.status === RessursStatus.IKKE_TILGANG
                    ) {
                        settVedtaksbrev(response);
                    } else {
                        settVedtaksbrev(
                            byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                        );
                    }
                })
                .catch((_error: AxiosError) => {
                    settVedtaksbrev(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                });
        } else {
            settVedtaksbrev(
                byggFeiletRessurs(
                    'Vi finner ingen aktive vedtak på behandlingen, vennligst gå tilbake og fastsett vedtak.'
                )
            );
        }
    };

    const sendTilBeslutter = () => {
        sendTilBeslutterNesteOnClick((visModal: boolean) => settVisModal(visModal));
    };

    const erBehandlingMedVedtaksbrevutsending =
        åpenBehandling.type !== Behandlingstype.TEKNISK_ENDRING &&
        åpenBehandling.årsak !== BehandlingÅrsak.SATSENDRING;

    return (
        <Skjemasteg
            tittel={'Vedtak'}
            forrigeOnClick={() =>
                history.push(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/simulering`)
            }
            nesteOnClick={visSubmitKnapp ? sendTilBeslutter : undefined}
            nesteKnappTittel={'Til godkjenning'}
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            maxWidthStyle="100%"
            className={'vedtak'}
            feilmelding={hentFrontendFeilmelding(behandlingsstegSubmitressurs)}
        >
            {erBehandlingMedVedtaksbrevutsending ? (
                <>
                    <PdfVisningModal
                        onRequestOpen={() => {
                            if (vedtaksbrev.status !== RessursStatus.HENTER) {
                                hentVedtaksbrev();
                            }
                        }}
                        åpen={visVedtaksbrev}
                        onRequestClose={() => {
                            settVisVedtaksbrev(false);
                            settVedtaksbrev(byggTomRessurs());
                        }}
                        pdfdata={vedtaksbrev}
                    />
                    <Container>
                        {åpenBehandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
                        åpenBehandling.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ? (
                            <Alertstripe
                                type="info"
                                style={{ margin: '2rem 0 1rem 0' }}
                                form="inline"
                            >
                                <b>
                                    {åpenBehandling.årsak === BehandlingÅrsak.DØDSFALL_BRUKER
                                        ? 'Vedtak om opphør på grunn av dødsfall er automatisk generert.'
                                        : 'Behandling bruker manuelt skrevet vedtaksbrev. Forhåndsvis for å se brevet.'}
                                </b>
                            </Alertstripe>
                        ) : (
                            <VedtaksbegrunnelseTeksterProvider>
                                <VedtaksperioderMedBegrunnelser
                                    åpenBehandling={åpenBehandling}
                                    erLesevisning={erLesevisning()}
                                />
                            </VedtaksbegrunnelseTeksterProvider>
                        )}

                        <IkonKnapp
                            id={'forhandsvis-vedtaksbrev'}
                            erLesevisning={false}
                            label={'Vis vedtaksbrev'}
                            ikon={<DokumentIkon />}
                            onClick={() => settVisVedtaksbrev(!visVedtaksbrev)}
                            spinner={vedtaksbrev.status === RessursStatus.HENTER}
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
            ) : (
                <AlertStripeInfo>
                    {`Du er inne på en teknisk behandling og det finnes ingen vedtaksbrev.`}
                </AlertStripeInfo>
            )}
        </Skjemasteg>
    );
};

export default OppsummeringVedtak;
