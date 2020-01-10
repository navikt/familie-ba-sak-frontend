import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { axiosRequest } from '../../../api/axios';
import { hentAktivVedtaksbrev } from '../../../api/oppsummeringvedtak';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const history = useHistory();
    const [brev, setBrev] = React.useState<string>('Genererer forhåndsvisning...');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

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
                .catch(error => {
                    setErrorMessage('Ukjent feil, Kunne ikke generere forhåndsvisning.');
                });
        } else {
            setErrorMessage(
                'Vi finner ingen aktive vedtak på behandlingen, vennligst gå tilbake og fastsett vedtak.'
            );
        }
    }, []);

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
                        history.push(`/fagsak/${fagsak.id}/behandle`);
                    }}
                    children={'Tilbake'}
                />
                {errorMessage === undefined && (
                    <Knapp
                        type={'hoved'}
                        onClick={() => {
                            axiosRequest<IFagsak>({
                                method: 'POST',
                                url: `/familie-ba-sak/api/fagsak/${fagsak.id}/iverksett-vedtak`,
                            })
                                .then((response: Ressurs<IFagsak>) => {
                                    console.log(response);
                                })
                                .catch((error: AxiosError) => {
                                    console.log(error);
                                });
                        }}
                        children={'Iverksett'}
                    />
                )}
            </div>
        </div>
    );
};

export default OppsummeringVedtak;
