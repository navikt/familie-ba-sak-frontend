import * as React from 'react';
import { IFagsak } from "../../../typer/fagsak";
import Skjemasteg from '../Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { useBehandlingVilkårContext } from './BehandleVilkårProvider';
import BehandlingVilkårSkjema from './BehandleVilkårSkjema';
import { useHistory } from 'react-router';
import { useFagsakDispatch } from '../../FagsakProvider';

interface IProps {
    fagsak: IFagsak;
}

const BehandleVilkår: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const context = useBehandlingVilkårContext();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const history = useHistory()
    const api = useFagsakApi(settVisFeilmeldinger, settOpprettelseFeilmelding)

    return (
        <Skjemasteg
            tittel={'Vilkår'}
            forrigeOnClick={() => {
                history.push(`/fagsak/opprett`);
            }}
            nesteOnClick={() => {
                api.opprettVedtak(context, fagsak)
            }}
            senderInn={api.senderInn}
        >
            <BehandlingVilkårSkjema
                opprettelseFeilmelding={opprettelseFeilmelding}
                visFeilmeldinger={visFeilmeldinger}
            />
        </Skjemasteg>
    )
};

export default BehandleVilkår;
