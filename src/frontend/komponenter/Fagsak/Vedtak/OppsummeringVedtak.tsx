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
    const iframe = React.useRef();

    React.useEffect(() => {
        iframe.current.contentDocument.body.innerHTML = props.content;
    });

    return <iframe className="iframe" ref={iframe} />;
};

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    const [brev, setBrev] = React.useState('Genererer forhåndsvisning...');

    React.useEffect(() => {
        hentVedtaksbrev(fagsak.id)
            .then((response: Ressurs<IVedtaksBrev>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    setBrev(response.data.content);
                } else {
                    setBrev(
                        'kunne ikke generere forhåndsvisning'.concat(
                            response.errorMelding !== undefined
                                ? ': ' + response.errorMelding
                                : response.melding !== undefined
                                ? ': ' + response.melding
                                : '.'
                        )
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
