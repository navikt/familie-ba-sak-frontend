import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';

import { hentAktivVedtaksbrev, IVedtaksBrev } from '../../../api/oppsummeringvedtak';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const [brev, setBrev] = React.useState('Genererer forhåndsvisning...');
    const [errorMessage, setErrorMessage] = React.useState(undefined);

    React.useEffect(() => {
        hentAktivVedtaksbrev(fagsak)
            .then((response: Ressurs<IVedtaksBrev>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    setBrev(response.data);
                    setErrorMessage(undefined);
                } else {
                    setErrorMessage(
                        response.melding !== undefined
                            ? response.melding
                            : 'Kunne ikke generere forhåndsvisning.'
                    );
                }
            })
            .catch(error => {
                const displayed = 'Internal Error: Kunne ikke generere forhåndsvisning.';
                setErrorMessage(displayed);
            });
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
            <Knapp
                onClick={() => {
                    alert('TODO: send to backend');
                }}
            >
                Send
            </Knapp>
        </div>
    );
};

export default OppsummeringVedtak;
