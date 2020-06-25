import * as React from 'react';

import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import OpprettBehandlingSkjema from './OpprettBehandlingSkjema';
import {
    useOpprettBehandling,
    IOpprettBehandlingBarn,
} from '../../../context/OpprettBehandlingContext';
import { Behandlingstype, BehandlingSteg } from '../../../typer/behandling';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

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

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);
    const aktivErÅpen = aktivBehandling
        ? BehandlingSteg[aktivBehandling.steg] !== BehandlingSteg.BEHANDLING_AVSLUTTET
        : false;

    const nesteOnClick = () => {
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
    };

    return (
        <div className={'opprettbehandling'}>
            <Skjemasteg
                tittel={'Opprett behandling'}
                nesteOnClick={!aktivErÅpen ? nesteOnClick : undefined}
                senderInn={senderInn}
            >
                {!aktivErÅpen ? (
                    <OpprettBehandlingSkjema
                        opprettelseFeilmelding={opprettelseFeilmelding}
                        visFeilmeldinger={visFeilmeldinger}
                    />
                ) : (
                    <AlertStripeInfo>
                        Det finnes allerede en åpen behandling. Gå til{' '}
                        {<Lenke href={`/fagsak/${fagsak.id}`} children={'behandling.'} />}
                    </AlertStripeInfo>
                )}
            </Skjemasteg>
        </div>
    );
};

export default OpprettBehandling;
