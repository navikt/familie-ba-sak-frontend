import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IFagsak } from '../../../typer/fagsak';

interface IProps {
    fagsak: IFagsak;
}

const FastsettVedtak: React.FunctionComponent<IProps> = ({ fagsak }) => {
    return (
        <div>
            <Systemtittel children={'Behandle sak'} />

            <br />
            <Normaltekst children={`Søker: ${fagsak.behandlinger[0].søker}`} />
            {fagsak.behandlinger[0].barna.map(barn => {
                return <Normaltekst key={barn} children={`Barn: ${barn}`} />;
            })}
        </div>
    );
};

export default FastsettVedtak;
