import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';

import { BehandlingStatus } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useApp } from '../../../context/AppContext';
import { aktivVedtak } from '../../../api/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';
import NavFrontendSpinner from 'nav-frontend-spinner';
// @ts-ignore
import { Document, Page } from 'react-pdf';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const { settFagsak, erLesevisning } = useFagsakRessurser();

    const history = useHistory();

    const [brev, setBrev] = React.useState<string>('Genererer forhåndsvisning...');
    const [antallSider, setAntallSider] = React.useState<number>(0);
    const [pdf, setPDF] = React.useState<Blob>(new Blob());
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const [submitFeil, settSubmitFeil] = React.useState('');
    const [senderInn, settSenderInn] = React.useState(false);

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    React.useEffect(() => {
        const aktivtVedtak = aktivVedtak(fagsak);
        if (aktivtVedtak) {
            axiosRequest<ArrayBuffer, void>({
                method: 'GET',
                url: `/familie-ba-sak/api/dokument/vedtak-html/${aktivtVedtak?.id}`,
            })
                .then((response: Ressurs<ArrayBuffer>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        setPDF(new Blob([response.data], { type: 'application/pdf' }));
                        setBrev(response.melding || response.status);
                        setErrorMessage(undefined);
                    } else if (response.status === RessursStatus.FEILET) {
                        setErrorMessage(response.melding);
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
        (aktivBehandling?.status === BehandlingStatus.UNDERKJENT_AV_BESLUTTER ||
            aktivBehandling?.status === BehandlingStatus.OPPRETTET);

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

    const onDocumentLoadSuccess = (numPages: number) => {
        setAntallSider(numPages);
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
                    <div className="flexContainer">
                        <iframe title="Vedtaksbrev" className="iframe" srcDoc={brev} />
                        <br />
                        {pdf.type === 'application/pdf' && (
                            <div /*style={style.PDF}*/>
                                <Document
                                    file={pdf}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    error={'Kunne ikke laste inn PDF-fil.'}
                                    noData={<NavFrontendSpinner />}
                                    loading={<NavFrontendSpinner />}
                                >
                                    <br />
                                    {Array.from(new Array(antallSider), (_el, index) => (
                                        <>
                                            <Page
                                                key={`page_${index + 1}`}
                                                pageNumber={index + 1}
                                            />
                                            <br />
                                        </>
                                    ))}
                                </Document>
                            </div>
                        )}
                    </div>
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
