import { Knapp } from 'nav-frontend-knapper';
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

    React.useEffect(() => {
        hentVedtaksbrev(fagsak)
            .then((response: Ressurs<IVedtaksBrev>) => {
                setBrev(response.data);
            })
            .catch(error => {
                setBrev('kunne ikke generere forhåndsvisning. Internal Error: ' + error);
            });
    });

    return (
        <div className="oppsummering">
            <Systemtittel children={'Vedtaksbrev'} />
            <br />
            <iframe className="iframe" srcDoc={brev} />
            <br />
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
