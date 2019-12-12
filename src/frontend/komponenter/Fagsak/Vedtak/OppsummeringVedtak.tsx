import { Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';

import { hentVedtaksbrev, IVedtaksBrev } from '../../../api/oppsummeringvedtak';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const [brev, setBrev] = React.useState('Genererer forhåndsvisning...');
    const [errorMessage, setErrorMessage] = React.useState(undefined);

    React.useEffect(() => {
        hentVedtaksbrev(fagsak)
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
                setBrev(displayed);
                setErrorMessage(displayed);
            });
    });

    const content =
        errorMessage === undefined ? (
            <div>
                <Systemtittel children={'Vedtaksbrev'} />
                <br />
                <iframe className="iframe" srcDoc={brev} />
                <br />
            </div>
        ) : (
            <SkjemaGruppe children="" feil={{ feilmelding: errorMessage }} />
        );

    return (
        <div className="oppsummering">
            {content}
            <Knapp
                onClick={() => {
                    alert('TODO: send to backend');
                }}
            >
                {' '}
                Send
            </Knapp>
        </div>
    );
};

export default OppsummeringVedtak;
