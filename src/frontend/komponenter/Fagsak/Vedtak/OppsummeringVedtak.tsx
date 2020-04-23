import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import { Feilmelding } from 'nav-frontend-typografi';
import * as React from 'react';
import Confetti from 'react-confetti';
import { useHistory } from 'react-router';

import { BehandlingStatus } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useApp } from '../../../context/AppContext';
import { aktivVedtak } from '../../../api/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();

    const history = useHistory();

    const [brev, setBrev] = React.useState<string>('Genererer forhåndsvisning...');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const [submitFeil, settSubmitFeil] = React.useState('');
    const [senderInn, settSenderInn] = React.useState(false);

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    React.useEffect(() => {
        const aktivtVedtak = aktivVedtak(fagsak);
        if (aktivtVedtak) {
            axiosRequest<string, void>({
                method: 'GET',
                url: `/familie-ba-sak/api/dokument/vedtak-html/${aktivtVedtak?.id}`,
            })
                .then((response: Ressurs<string>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        setBrev(response.data);
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
        aktivBehandling?.status === BehandlingStatus.UNDERKJENT_AV_BESLUTTER ||
        aktivBehandling?.status === BehandlingStatus.OPPRETTET;

    const sendInn = () => {
        settSenderInn(true);
        settSubmitFeil('');
        axiosRequest<IFagsak, void>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/send-til-beslutter`,
        }).then((response: Ressurs<IFagsak>) => {
            settSenderInn(false);
            if (response.status === RessursStatus.SUKSESS) {
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
            nesteKnappTittel={'Send til beslutter'}
            senderInn={senderInn}
            maxWidthStyle="100%"
        >
            <div className="oppsummering">
                {errorMessage === undefined ? (
                    <div>
                        <br />
                        <iframe title="Vedtaksbrev" className="iframe" srcDoc={brev} />
                        <br />
                    </div>
                ) : (
                    <AlertStripe type="feil">{errorMessage}</AlertStripe>
                )}

                {submitFeil !== '' && <Feilmelding>{submitFeil}</Feilmelding>}
            </div>
        </Skjemasteg>
    );
};

export default OppsummeringVedtak;
