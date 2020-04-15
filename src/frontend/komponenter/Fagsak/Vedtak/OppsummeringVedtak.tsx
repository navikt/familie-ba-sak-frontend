import { AxiosError } from 'axios';
import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Systemtittel } from 'nav-frontend-typografi';
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

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();
    const [makeItRain, settMakeItRain] = React.useState(false);

    const history = useHistory();

    const [brev, setBrev] = React.useState<string>('Genererer forhåndsvisning...');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const [submitFeil, settSubmitFeil] = React.useState('');

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
    }, []);

    const visSubmitKnapp =
        aktivBehandling?.status === BehandlingStatus.OPPRETTET ||
        aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER;

    return (
        <div className="oppsummering">
            {makeItRain && <Confetti />}
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
                    onClick={() => history.push(`/fagsak/${fagsak.id}/oppsummeringberegning`)}
                    children={'Tilbake'}
                />
                {errorMessage === undefined && visSubmitKnapp && (
                    <Knapp
                        type={'hoved'}
                        onClick={() => {
                            axiosRequest<IFagsak, void>({
                                method: 'POST',
                                url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/${
                                    aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER
                                        ? 'iverksett-vedtak'
                                        : 'send-til-beslutter'
                                }`,
                            }).then((response: Ressurs<IFagsak>) => {
                                if (response.status === RessursStatus.SUKSESS) {
                                    settFagsak(response);

                                    if (
                                        aktivBehandling?.status ===
                                        BehandlingStatus.SENDT_TIL_BESLUTTER
                                    ) {
                                        settMakeItRain(true);
                                        setTimeout(() => {
                                            settMakeItRain(false);
                                        }, 10000);
                                    }
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
