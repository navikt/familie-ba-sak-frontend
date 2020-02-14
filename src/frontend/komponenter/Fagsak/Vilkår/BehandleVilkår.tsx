import * as React from 'react';
import { IFagsak } from "../../../typer/fagsak";
import Skjemasteg from '../Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { useBehandlingVilkårContext } from './BehandleVilkårProvider';
import BehandlingVilkårSkjema from './BehandleVilkårSkjema';
import { useHistory } from 'react-router';

interface IProps {
    fagsak: IFagsak;
}

const BehandleVilkår: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const context = useBehandlingVilkårContext();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const history = useHistory()
    const {opprettVedtak, senderInn} = useFagsakApi(settVisFeilmeldinger, settOpprettelseFeilmelding)

    return (
        <Skjemasteg
            tittel={'Vilkår'}
            forrigeOnClick={() => {
                history.push(`/fagsak/opprett`);
            }}
            nesteOnClick={() => {
                opprettVedtak(context, fagsak)
            }}
            senderInn={senderInn}
        >
            <BehandlingVilkårSkjema
                opprettelseFeilmelding={opprettelseFeilmelding}
                visFeilmeldinger={visFeilmeldinger}
            />
        </Skjemasteg>
    )
};

export default BehandleVilkår;
