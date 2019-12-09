import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';

import { hentVedtaksbrev, IVedtaksBrev } from '../../../api/oppsummeringvedtak';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';

interface IVedtakProps {
    fagsak: IFagsak;
}

interface IOppsummeringFrameProps {
    content: string;
}

const OppsummeringFrame: React.FunctionComponent<IOppsummeringFrameProps> = ({ ...props }) => {
    return <iframe className="iframe" srcDoc={props.content} />;
};

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const [brev, setBrev] = React.useState('Genererer forhåndsvisning...');

    React.useEffect(() => {
        hentVedtaksbrev(fagsak.id)
            .then((response: Ressurs<IVedtaksBrev>) => {
                console.log(response);
                if (response.status === RessursStatus.SUKSESS) {
                    setBrev(response.data);
                } else {
                    setBrev(
                        response.errorMelding !== undefined
                            ? response.errorMelding
                            : response.melding !== undefined
                            ? response.melding
                            : 'kunne ikke generere forhåndsvisning.'
                    );
                }
            })
            .catch(error => {
                setBrev('kunne ikke generere forhåndsvisning. Internal Error: ' + error);
            });
    });

    return (
        <div className="oppsummering">
            <Systemtittel children={'Vedtaksbrev'} />

            <br />
            <OppsummeringFrame content={brev} />

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
