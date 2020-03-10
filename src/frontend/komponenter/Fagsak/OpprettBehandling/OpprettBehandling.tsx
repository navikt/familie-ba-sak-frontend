import * as React from 'react';

import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { useOpprettBehandlingContext } from './OpprettBehandlingProvider';
import OpprettBehandlingSkjema from './OpprettBehandlingSkjema';

interface IProps {
    fagsak: IFagsak;
}

const OpprettBehandling: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const context = useOpprettBehandlingContext();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const { opprettBehandling, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    return (
        <div className={'opprettbehandling'}>
            <Skjemasteg
                tittel={'Opprett behandling'}
                nesteOnClick={() => {
                    opprettBehandling(context, {
                        barnasIdenter: context.barnasIdenter.map(barnIdent => barnIdent.verdi),
                        behandlingType: context.behandlingstype,
                        søkersIdent: fagsak.søkerFødselsnummer,
                        kategori: context.kategori,
                        underkategori: context.underkategori,
                    });
                }}
                senderInn={senderInn}
            >
                <OpprettBehandlingSkjema
                    fagsak={fagsak}
                    opprettelseFeilmelding={opprettelseFeilmelding}
                    visFeilmeldinger={visFeilmeldinger}
                />
            </Skjemasteg>
        </div>
    );
};

export default OpprettBehandling;
