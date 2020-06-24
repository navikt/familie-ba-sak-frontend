import * as React from 'react';

import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import OpprettBehandlingSkjema from './OpprettBehandlingSkjema';
import {
    useOpprettBehandling,
    IOpprettBehandlingBarn,
} from '../../../context/OpprettBehandlingContext';
import { Behandlingstype } from '../../../typer/behandling';

interface IProps {
    fagsak: IFagsak;
}

const OpprettBehandling: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { barna, behandlingstype, kategori, underkategori } = useOpprettBehandling();

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
                    opprettBehandling({
                        behandlingType: behandlingstype,
                        søkersIdent: fagsak.søkerFødselsnummer,
                        kategori: kategori,
                        underkategori: underkategori,
                        barnasIdenter:
                            behandlingstype === Behandlingstype.MIGRERING_FRA_INFOTRYGD
                                ? barna
                                      .filter(
                                          (opprettBehandlingBarn: IOpprettBehandlingBarn) =>
                                              opprettBehandlingBarn.checked
                                      )
                                      .map(
                                          (opprettBehandlingBarn: IOpprettBehandlingBarn) =>
                                              opprettBehandlingBarn.barn.personIdent
                                      )
                                : [],
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
