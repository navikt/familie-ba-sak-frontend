import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
    byggHenterRessurs,
} from '@navikt/familie-typer';
import { AxiosError } from 'axios';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Feilmelding } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { aktivVedtakPåBehandling } from '../../../api/fagsak';
import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { UtbetalingBegrunnelserProvider } from '../../../context/UtbetalingBegrunnelseContext';
import {
    BehandlingStatus,
    BehandlingSteg,
    BehandlingÅrsak,
    hentStegNummer,
    IBehandling,
} from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import UtbetalingBegrunnelseTabell from './UtbetalingBegrunnelserTabell/UtbetalingBegrunnelseTabell';
import PdfVisningModal from '../../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import { BehandlerRolle } from '../../../../../node_dist/frontend/typer/behandling';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { IRestUtbetalingBegrunnelse } from '../../../typer/vedtak';
import styled from 'styled-components';

interface IVedtakProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const StyledFeilmelding = styled(Feilmelding)`
    margin-top: 1rem;
`;

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak, åpenBehandling }) => {
    const { axiosRequest, hentSaksbehandlerRolle, innloggetSaksbehandler } = useApp();
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
            axiosRequest<string, void>({
                method: httpMethod,
                url: `/familie-ba-sak/api/dokument/vedtaksbrev/${aktivtVedtak?.id}`,
            })
                .then((response: Ressurs<string>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settVedtaksbrev(
                            byggDataRessurs(`data:application/pdf;base64,${response.data}`)
                        );
                    } else if (response.status === RessursStatus.FEILET) {
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

    const minst1PeriodeErBegrunnet = () => {
        return (
            (aktivVedtak?.utbetalingBegrunnelser.filter(
                (utbetalingsbegrunnelse: IRestUtbetalingBegrunnelse) => {
                    return (
                        utbetalingsbegrunnelse.begrunnelseType &&
                        utbetalingsbegrunnelse.vedtakBegrunnelse
                    );
                }
            ).length ?? []) > 0
        );
    };

    const sendInn = () => {
        if (minst1PeriodeErBegrunnet()) {
            settSenderInn(true);
            settSubmitFeil('');
            axiosRequest<IFagsak, void>({
                method: 'POST',
                url: `/familie-ba-sak/api/fagsaker/${
                    fagsak.id
                }/send-til-beslutter?behandlendeEnhet=${innloggetSaksbehandler?.enhet ?? '9999'}`,
            }).then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settVisModal(true);
                    settFagsak(response);
                } else if (response.status === RessursStatus.FEILET) {
                    settSubmitFeil(response.frontendFeilmelding);
                }
            });
        } else {
            settSubmitFeil(
                'Vedtaksbrevet mangler begrunnelse. Du må legge til minst 1 begrunnelse.'
            );
        }
    };

    return (
        <Skjemasteg
            tittel={'Vedtaksbrev'}
            forrigeOnClick={() =>
                history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/tilkjent-ytelse`)
            }
            nesteOnClick={visSubmitKnapp ? sendInn : undefined}
            nesteKnappTittel={'Til godkjenning'}
            senderInn={senderInn}
            maxWidthStyle="100%"
            className={'vedtaksbrev'}
        >
            {åpenBehandling.årsak !== BehandlingÅrsak.TEKNISK_OPPHØR ? (
                <>
                    <PdfVisningModal
                        onRequestOpen={hentVedtaksbrev}
                        åpen={visVedtaksbrev}
                        onRequestClose={() => {
                            settVisVedtaksbrev(false);
                            settVedtaksbrev(byggTomRessurs());
                        }}
                        pdfdata={vedtaksbrev}
                    />

                    <UtbetalingBegrunnelserProvider
                        fagsak={fagsak}
                        aktivVedtak={aktivVedtak}
                        hentVedtaksbrev={hentVedtaksbrev}
                    >
                        <UtbetalingBegrunnelseTabell åpenBehandling={åpenBehandling} />
                    </UtbetalingBegrunnelserProvider>

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
