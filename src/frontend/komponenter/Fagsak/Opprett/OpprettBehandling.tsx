import * as React from 'react';
import { useOpprettBehandlingContext } from './OpprettBehandlingProvider';
import OpprettBehandlingSkjema from './OpprettBehandlingSkjema';
import Skjemasteg from '../Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { Behandlingstype } from '../../../typer/fagsak';

const OpprettBehandling: React.FunctionComponent = () => {
    const context = useOpprettBehandlingContext();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const api = useFagsakApi(settVisFeilmeldinger, settOpprettelseFeilmelding);

    const opprettBehandling = api.opprettBehandling;
    const senderInn = api.senderInn;

    return (
        <div className={'opprett'}>
            <Skjemasteg
                tittel={'Opprett behandling'}
                nesteOnClick={() => {
                    opprettBehandling(
                        context,
                        {
                            barnasFødselsnummer: context.barnasFødselsnummer.map(
                                barnFødselsnummer => barnFødselsnummer.verdi
                            ),
                            behandlingType: context.behandlingstype,
                            fødselsnummer: context.søkersFødselsnummer.verdi,
                            kategori: context.kategori,
                            underkategori: context.underkategori,
                        },
                        context.behandlingstype !== Behandlingstype.MIGRERING_FRA_INFOTRYGD
                            ? 'vilkår'
                            : 'beregning'
                    );
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
