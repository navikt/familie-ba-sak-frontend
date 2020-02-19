import * as React from 'react';
import { useOpprettBehandlingContext } from './OpprettBehandlingProvider';
import OpprettBehandlingSkjema from './OpprettBehandlingSkjema';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';

const OpprettBehandling: React.FunctionComponent = () => {
    const context = useOpprettBehandlingContext();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const { opprettBehandling, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    return (
        <div className={'opprett'}>
            <Skjemasteg
                tittel={'Opprett behandling'}
                nesteOnClick={() => {
                    opprettBehandling(context, {
                        barnasIdenter: context.barnasIdenter.map(barnIdent => barnIdent.verdi),
                        behandlingType: context.behandlingstype,
                        ident: context.søkersIdent.verdi,
                        kategori: context.kategori,
                        underkategori: context.underkategori,
                    });
                }}
                senderInn={senderInn}
            >
                <OpprettBehandlingSkjema
                    opprettelseFeilmelding={opprettelseFeilmelding}
                    visFeilmeldinger={visFeilmeldinger}
                />
            </Skjemasteg>
        </div>
    );
};

export default OpprettBehandling;
