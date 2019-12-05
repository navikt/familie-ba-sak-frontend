import { IFagsak } from '../../../typer/fagsak';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

interface IVedtakProps {
    fagsak: IFagsak;
}

interface IOppsummeringFrameProps {
    content: string;
    [name: string]: any;
}

const OppsummeringFrame: React.FunctionComponent<IOppsummeringFrameProps> = ({ ...props }) => {
    const iframe = React.createRef<HTMLIFrameElement>();
    React.useEffect(() => {
        iframe.current.contentDocument.body.innerHTML = props.content;
    });

    return <iframe ref={iframe} className="iframe" />;
};

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    return (
        <div className="oppsummering">
            <Systemtittel children={'Vedtaksbrev'} />
            <br />
            <OppsummeringFrame content="<h1>hello</h1>" />
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
