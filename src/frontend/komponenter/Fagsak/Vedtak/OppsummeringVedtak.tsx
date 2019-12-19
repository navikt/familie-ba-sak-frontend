import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { hentAktivVedtaksbrev } from '../../../api/oppsummeringvedtak';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const [brev, setBrev] = React.useState<string>('Genererer forhåndsvisning...');
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const [redirect, showRedirect] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (
            !!fagsak?.behandlinger
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
            showRedirect(true);
            setErrorMessage(
                'Behandling ikke funnet. Klikk på lenken nedenfor for å opprett en behandling.'
            );
        }
    });

    return (
        <div className="oppsummering">
            {errorMessage === undefined ? (
                <div>
                    <Systemtittel children={'Vedtaksbrev'} />
                    <br />
                    <iframe className="iframe" srcDoc={brev} />
                    <br />
                </div>
            ) : (
                <AlertStripe type="feil">{errorMessage}</AlertStripe>
            )}
            {redirect && (
                <div>
                    <br />
                    <a href={'/fagsak/' + fagsak.id + '/behandle'}>Opprett Ny Behandling</a>
                    <br />
                    <br />
                </div>
            )}
            <Knapp
                onClick={() => {
                    alert('Send to backend');
                }}
            >
                Send
            </Knapp>
        </div>
    );
};

export default OppsummeringVedtak;
