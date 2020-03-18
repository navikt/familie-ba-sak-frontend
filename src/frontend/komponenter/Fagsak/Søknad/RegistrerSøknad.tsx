import * as React from 'react';
import { useSøknad } from '../../../context/SøknadContext';
import { Sidetittel, Feilmelding } from 'nav-frontend-typografi';
import SøknadType from './SøknadType';
import SøkerOppholdINorge from './SøkerOppholdINorge';
import AnnenPart from './AnnenPart';
import Barn from './Barn';
import { Knapp } from 'nav-frontend-knapper';
import { registrerSøknad } from '../../../api/søknad';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { IFagsak } from '../../../typer/fagsak';
import { useFagsakContext } from '../../FagsakProvider';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { axiosRequest } from '../../../api/axios';
import { useHistory } from 'react-router';

const RegistrerSøknad: React.FunctionComponent = () => {
    const history = useHistory();

    const { feilmeldinger, søknad, settSøknad, erSøknadGyldig } = useSøknad();
    const [feilmelding, settFeilmelding] = React.useState('');

    const fagsak = useFagsakContext().fagsak;

    const [senderInn, settSenderInn] = React.useState(false);

    React.useEffect(() => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            axiosRequest({
                method: 'GET',
                url: `/familie-ba-sak/api/behandlinger/${
                    hentAktivBehandlingPåFagsak(fagsak.data)?.behandlingId
                }/søknad`,
            });
        }
    }, [fagsak.status]);

    return (
        <div className={'søknad'}>
            <Sidetittel children={'Informasjon fra søknaden'} />
            <br />

            <SøknadType settSøknad={settSøknad} søknad={søknad} />

            <SøkerOppholdINorge settSøknad={settSøknad} søknad={søknad} />

            <AnnenPart settSøknad={settSøknad} søknad={søknad} />

            <Barn settSøknad={settSøknad} søknad={søknad} />

            {feilmeldinger.length > 0 && (
                <Feiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={feilmeldinger}
                />
            )}

            <br />

            {feilmelding && <Feilmelding children={feilmelding} />}
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }} />
                <Knapp
                    onClick={() => {
                        if (fagsak.status === RessursStatus.SUKSESS && erSøknadGyldig()) {
                            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak.data);
                            settSenderInn(true);
                            registrerSøknad(søknad, aktivBehandling).then(
                                (response: Ressurs<IFagsak>) => {
                                    settSenderInn(false);
                                    if (response.status === RessursStatus.SUKSESS) {
                                        history.push(
                                            `/fagsak/${response.data.id}/vilkårsvurdering`
                                        );
                                    } else if (response.status === RessursStatus.FEILET) {
                                        settFeilmelding(response.melding);
                                    } else {
                                        settFeilmelding('Registrering av søknaden feilet');
                                    }
                                }
                            );
                        }
                    }}
                    children={'Bekreft og fortsett'}
                    spinner={senderInn}
                />
            </div>
        </div>
    );
};

export default RegistrerSøknad;
