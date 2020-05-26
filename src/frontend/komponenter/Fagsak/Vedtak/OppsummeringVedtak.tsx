import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { aktivVedtak } from '../../../api/fagsak';
import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { BehandlingStatus } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import PdfFrame from './PdfFrame';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();
    const { erLesevisning, åpenBehandling } = useBehandling();

    const history = useHistory();

    const [pdf, setPdf] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const [submitFeil, settSubmitFeil] = React.useState('');
    const [senderInn, settSenderInn] = React.useState(false);

    React.useEffect(() => {
        const aktivtVedtak = aktivVedtak(fagsak);
        const httpMethod = visSubmitKnapp ? 'POST' : 'GET';
        if (aktivtVedtak) {
            axiosRequest<string, void>({
                method: httpMethod,
                url: `/familie-ba-sak/api/dokument/vedtaksbrev/${aktivtVedtak?.id}`,
            })
                .then((response: Ressurs<string>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        setPdf(`data:application/pdf;base64,${response.data}`);
                        setErrorMessage(undefined);
                    } else if (response.status === RessursStatus.FEILET) {
                        setErrorMessage(response.frontendFeilmelding);
                    } else {
                        setErrorMessage('Ukjent feil, kunne ikke generere forhåndsvisning.');
                    }
                })
                .catch((_error: AxiosError) => {
                    setErrorMessage('Ukjent feil, Kunne ikke generere forhåndsvisning.');
                });
        } else {
            setErrorMessage(
                'Vi finner ingen aktive vedtak på behandlingen, vennligst gå tilbake og fastsett vedtak.'
            );
        }
    }, [fagsak, axiosRequest]);

    const visSubmitKnapp =
        !erLesevisning() &&
        (åpenBehandling?.status === BehandlingStatus.UNDERKJENT_AV_BESLUTTER ||
            åpenBehandling?.status === BehandlingStatus.OPPRETTET);

    const sendInn = () => {
        settSenderInn(true);
        settSubmitFeil('');
        axiosRequest<IFagsak, void>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/send-til-beslutter`,
        }).then((response: Ressurs<IFagsak>) => {
            settSenderInn(false);
            if (response.status === RessursStatus.SUKSESS) {
                settVisModal(true);
                settFagsak(response);
            } else if (
                response.status === RessursStatus.FEILET ||
                response.status === RessursStatus.IKKE_TILGANG
            ) {
                settSubmitFeil(response.melding);
                settSenderInn(false);
            }
        });
    };

    return (
        <Skjemasteg
            tittel={'Vedtaksbrev'}
            forrigeOnClick={() => history.push(`/fagsak/${fagsak.id}/tilkjent-ytelse`)}
            nesteOnClick={visSubmitKnapp ? sendInn : undefined}
            nesteKnappTittel={'Til godkjenning'}
            senderInn={senderInn}
            maxWidthStyle="100%"
        >
            <div className="oppsummering">
                {errorMessage === undefined ? (
                    <PdfFrame file={pdf} />
                ) : (
                    <AlertStripe type="feil">{errorMessage}</AlertStripe>
                )}

                {submitFeil !== '' && <Feilmelding>{submitFeil}</Feilmelding>}
            </div>
            {visModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Totrinnsvurdering',
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
                                children={'Gå til Oppgavebenken'}
                            />,
                        ],
                    }}
                >
                    <Normaltekst>Behandlingen er nå sendt til totrinnskontroll</Normaltekst>
                </UIModalWrapper>
            )}
        </Skjemasteg>
    );
};

export default OppsummeringVedtak;
