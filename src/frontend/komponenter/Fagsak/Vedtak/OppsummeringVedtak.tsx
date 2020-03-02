import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel, Feilmelding } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { axiosRequest } from '../../../api/axios';
import { hentAktivVedtaksbrev } from '../../../api/oppsummeringvedtak';
import { IFagsak, BehandlingStatus } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { AxiosError } from 'axios';
import { useFagsakDispatch, actions } from '../../FagsakProvider';
import { IBehandling } from '../../../typer/behandling';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const history = useHistory();
    const fagsakDispatcher = useFagsakDispatch();

    const [brev, setBrev] = React.useState<string>('Genererer forhåndsvisning...');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const [submitFeil, settSubmitFeil] = React.useState('');

    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => {
        return behandling.aktiv === true;
    });

    React.useEffect(() => {
        if (
            fagsak?.behandlinger
                ?.find(b => b.aktiv)
                ?.vedtakForBehandling?.find(vedtak => vedtak.aktiv)
        ) {
            hentAktivVedtaksbrev(fagsak)
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
    }, []);

    const visSubmitKnapp =
        aktivBehandling?.status === BehandlingStatus.OPPRETTET ||
        aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER;

    return (
        <div className="oppsummering">
            {errorMessage === undefined ? (
                <div>
                    <Systemtittel children={'Vedtaksbrev'} />
                    <br />
                    <iframe title="Vedtaksbrev" className="iframe" srcDoc={brev} />
                    <br />
                </div>
            ) : (
                <AlertStripe type="feil">{errorMessage}</AlertStripe>
            )}

            <div className={'oppsummering__navigering'}>
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        history.push(`/fagsak/${fagsak.id}/beregning`);
                    }}
                    children={'Tilbake'}
                />
                {errorMessage === undefined && visSubmitKnapp && (
                    <Knapp
                        type={'hoved'}
                        onClick={() => {
                            axiosRequest<IFagsak>({
                                method: 'POST',
                                url: `/familie-ba-sak/api/fagsak/${fagsak.id}/${
                                    aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER
                                        ? 'iverksett-vedtak'
                                        : 'send-til-beslutter'
                                }`,
                            }).then((response: Ressurs<IFagsak>) => {
                                if (response.status === RessursStatus.SUKSESS) {
                                    fagsakDispatcher({
                                        payload: response,
                                        type: actions.SETT_FAGSAK,
                                    });
                                } else if (response.status === RessursStatus.FEILET) {
                                    settSubmitFeil(response.melding);
                                }
                            });
                        }}
                        children={
                            aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER
                                ? 'Iverksett'
                                : 'Send til beslutter'
                        }
                    />
                )}
            </div>
            {submitFeil !== '' && <Feilmelding>{submitFeil}</Feilmelding>}
        </div>
    );
};

export default OppsummeringVedtak;
