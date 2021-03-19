import * as React from 'react';

import { AxiosError } from 'axios';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Feilmelding } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
    byggHenterRessurs,
} from '@navikt/familie-typer';

import { aktivVedtakPåBehandling } from '../../../api/fagsak';
import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { VedtakBegrunnelserProvider } from '../../../context/VedtakBegrunnelserContext';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    BehandlingÅrsak,
    hentStegNummer,
    IBehandling,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { ToggleNavn } from '../../../typer/toggles';
import { IRestVedtakBegrunnelse } from '../../../typer/vedtak';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import BegrunnelseTabell from './VedtakBegrunnelserTabell/VedtakBegrunnelser';

interface IVedtakProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const StyledFeilmelding = styled(Feilmelding)`
    margin-top: 1rem;
`;

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak, åpenBehandling }) => {
    const { hentSaksbehandlerRolle, innloggetSaksbehandler, toggles } = useApp();
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const { erLesevisning } = useBehandling();

    const history = useHistory();

    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [visVedtaksbrev, settVisVedtaksbrev] = React.useState(false);

    const [submitFeil, settSubmitFeil] = React.useState('');
    const [senderInn, settSenderInn] = React.useState(false);

    const [vedtaksbrev, settVedtaksbrev] = React.useState(byggTomRessurs<string>());

    const aktivVedtak = hentAktivVedtakPåBehandlig(åpenBehandling);
    const visSubmitKnapp = !erLesevisning() && åpenBehandling?.status === BehandlingStatus.UTREDES;

    const hentVedtaksbrev = () => {
        const aktivtVedtak = aktivVedtakPåBehandling(åpenBehandling);
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

        if (aktivtVedtak) {
            settVedtaksbrev(byggHenterRessurs());
            request<void, string>({
                method: httpMethod,
                url: `/familie-ba-sak/api/dokument/vedtaksbrev/${aktivtVedtak?.id}`,
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

    const minstEnPeriodeErBegrunnet = (vedtakBegrunnelser: IRestVedtakBegrunnelse[]) => {
        const begrunnelsenErUtfylt = (vedtakBegrunnelse: IRestVedtakBegrunnelse) =>
            vedtakBegrunnelse.begrunnelseType && vedtakBegrunnelse.begrunnelse;

        return (
            vedtakBegrunnelser.filter((vedtakBegrunnelse: IRestVedtakBegrunnelse) =>
                begrunnelsenErUtfylt(vedtakBegrunnelse)
            ).length > 0
        );
    };

    const sendInn = () => {
        if (
            (aktivVedtak && minstEnPeriodeErBegrunnet(aktivVedtak.begrunnelser)) ||
            åpenBehandling.årsak === BehandlingÅrsak.TEKNISK_OPPHØR
        ) {
            settSenderInn(true);
            settSubmitFeil('');
            request<void, IFagsak>({
                method: 'POST',
                url: `/familie-ba-sak/api/fagsaker/${
                    fagsak.id
                }/send-til-beslutter?behandlendeEnhet=${innloggetSaksbehandler?.enhet ?? '9999'}`,
            }).then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settVisModal(true);
                    settFagsak(response);
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settSubmitFeil(response.frontendFeilmelding);
                }
            });
        } else {
            settSubmitFeil(
                'Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.'
            );
        }
    };

    return (
        <Skjemasteg
            tittel={'Vedtak'}
            forrigeOnClick={() =>
                toggles[ToggleNavn.visSimulering]
                    ? history.push(
                          `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/simulering`
                      )
                    : history.push(
                          `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`
                      )
            }
            nesteOnClick={visSubmitKnapp ? sendInn : undefined}
            nesteKnappTittel={'Til godkjenning'}
            senderInn={senderInn}
            maxWidthStyle="100%"
            className={'vedtak'}
        >
            {åpenBehandling.årsak !== BehandlingÅrsak.TEKNISK_OPPHØR ? (
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

                    <VedtakBegrunnelserProvider fagsak={fagsak} aktivVedtak={aktivVedtak}>
                        <BegrunnelseTabell åpenBehandling={åpenBehandling} />
                    </VedtakBegrunnelserProvider>

                    <Knapp
                        mini={true}
                        onClick={() => settVisVedtaksbrev(!visVedtaksbrev)}
                        children={'Vis vedtaksbrev'}
                    />

                    {submitFeil !== '' && <StyledFeilmelding>{submitFeil}</StyledFeilmelding>}

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
                                            history.push(`/fagsak/${fagsak.id}/saksoversikt`);
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
                    {`Den forrige behandlingen er annullert, og det er ${
                        åpenBehandling.status === BehandlingStatus.AVSLUTTET
                            ? 'ikke sendt ut brev til søker'
                            : 'ikke generert brev'
                    }`}
                </AlertStripeInfo>
            )}
        </Skjemasteg>
    );
};

export default OppsummeringVedtak;
