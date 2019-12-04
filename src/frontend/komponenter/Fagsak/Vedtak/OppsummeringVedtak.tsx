import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IFagsak } from '../../../typer/fagsak';

interface IVedtakProps {
    fagsak: IFagsak;
}

const OppsummeringVedtak: React.FunctionComponent<IVedtakProps> = ({ fagsak }) => {
    return (
        <div className="oppsummering">
            <Systemtittel children={'Vedtaksbrev'} />
            {fagsak.saksnummer}
        </div>
    );
};

export default OppsummeringVedtak;
