import * as React from 'react';
import { useSøknad } from '../../../context/SøknadContext';
import { Sidetittel, Feilmelding } from 'nav-frontend-typografi';
import SøknadType from './SøknadType';
import SøkerOppholdINorge from './SøkerOppholdINorge';
import AnnenPart from './AnnenPart';
import Barna from './Barna';
import { Knapp } from 'nav-frontend-knapper';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { useHistory } from 'react-router';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { IBarnMedOpplysninger, ISøknadDTO } from '../../../typer/søknad';
import { useApp } from '../../../context/AppContext';
import { BehandlingSteg } from '../../../typer/behandling';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import RegistrerSøknadLeseversjon from './RegistrerSøknadLeseversjon';
import { erLesevisning } from '../../../utils/behandling';

const RegistrerSøknad: React.FunctionComponent = () => {
    const { axiosRequest } = useApp();
    const { fagsak, settFagsak } = useFagsakRessurser();
    const history = useHistory();

    const { feilmeldinger, søknad, settSøknad, erSøknadGyldig } = useSøknad();
    const [feilmelding, settFeilmelding] = React.useState('');

    const [søknadErLastetFraBackend, settSøknadErLastetFraBackend] = React.useState(false);

    const [senderInn, settSenderInn] = React.useState(false);

    const { hentSaksbehandlerRolle } = useApp();
    const { hentStegPåÅpenBehandling } = useFagsakRessurser();
    const visLeseversjon = (): boolean => {
        const saksbehandlerRolle = hentSaksbehandlerRolle();
        const steg = hentStegPåÅpenBehandling();
        if (saksbehandlerRolle && steg) {
            return erLesevisning(saksbehandlerRolle, steg);
        }
        history.push('/error');
        return true;
    };

    React.useEffect(() => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak.data);

            if (
                aktivBehandling &&
                parseInt(BehandlingSteg[aktivBehandling.steg], 10) >=
                    BehandlingSteg.VILKÅRSVURDERING
            ) {
                axiosRequest<ISøknadDTO, void>({
                    method: 'GET',
                    url: `/familie-ba-sak/api/behandlinger/${
                        hentAktivBehandlingPåFagsak(fagsak.data)?.behandlingId
                    }/søknad`,
                }).then((response: Ressurs<ISøknadDTO>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settSøknadErLastetFraBackend(true);
                        settSøknad({
                            ...response.data,
                            barnaMedOpplysninger: response.data.barnaMedOpplysninger.map(
                                (barnMedOpplysninger: IBarnMedOpplysninger) => ({
                                    ...barnMedOpplysninger,
                                    checked: true,
                                })
                            ),
                        });
                    }
                });
            }
        }
    }, [fagsak.status]);

    return (
        <div className={'søknad'}>
            <Sidetittel children={'Informasjon fra søknaden'} />
            <br />
            {søknadErLastetFraBackend && (
                <>
                    <br />
                    <AlertStripeAdvarsel
                        children={
                            'En søknad er allerede registrert på behandlingen. Vi har fylt ut søknaden i skjemaet.'
                        }
                    />
                    <br />
                </>
            )}

            <SøknadType settSøknad={settSøknad} søknad={søknad} />

            <SøkerOppholdINorge settSøknad={settSøknad} søknad={søknad} />

            <AnnenPart settSøknad={settSøknad} søknad={søknad} />

            <Barna søknad={søknad} />

            {feilmeldinger.length > 0 && (
                <Feiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={feilmeldinger}
                />
            )}

            <br />
            {visLeseversjon() && <RegistrerSøknadLeseversjon søknad={søknad} />}

            {feilmelding && <Feilmelding children={feilmelding} />}
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }} />
                <Knapp
                    onClick={() => {
                        if (fagsak.status === RessursStatus.SUKSESS && erSøknadGyldig()) {
                            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak.data);
                            settSenderInn(true);

                            axiosRequest<IFagsak, ISøknadDTO>({
                                method: 'POST',
                                data: søknad,
                                url: `/familie-ba-sak/api/behandlinger/${aktivBehandling?.behandlingId}/registrere-søknad-og-hent-persongrunnlag`,
                            }).then((response: Ressurs<IFagsak>) => {
                                settSenderInn(false);
                                if (response.status === RessursStatus.SUKSESS) {
                                    settFagsak(response);

                                    history.push(`/fagsak/${response.data.id}/vilkaarsvurdering`);
                                } else if (response.status === RessursStatus.FEILET) {
                                    settFeilmelding(response.melding);
                                } else {
                                    settFeilmelding('Registrering av søknaden feilet');
                                }
                            });
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
