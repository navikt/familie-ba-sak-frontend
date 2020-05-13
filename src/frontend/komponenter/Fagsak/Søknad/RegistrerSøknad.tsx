import * as React from 'react';
import { useSøknad } from '../../../context/SøknadContext';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import SøknadType from './SøknadType';
import SøkerOppholdINorge from './SøkerOppholdINorge';
import AnnenPart from './AnnenPart';
import Barna from './Barna';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { useHistory } from 'react-router';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { IBarnMedOpplysninger, IRestRegistrerSøknad, ISøknadDTO } from '../../../typer/søknad';
import { useApp } from '../../../context/AppContext';
import { BehandlingSteg } from '../../../typer/behandling';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';

const RegistrerSøknad: React.FunctionComponent = () => {
    const { axiosRequest } = useApp();
    const { fagsak, settFagsak, erLesevisning } = useFagsakRessurser();
    const history = useHistory();

    const { feilmeldinger, søknad, settSøknadOgValider } = useSøknad();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [feilmelding, settFeilmelding] = React.useState('');

    const [søknadErLastetFraBackend, settSøknadErLastetFraBackend] = React.useState(false);

    const [senderInn, settSenderInn] = React.useState(false);

    const [visModal, settVisModal] = React.useState<boolean>(false);

    const nesteAction = (bekreftEndringerViaFrontend: boolean) => {
        if (fagsak.status === RessursStatus.SUKSESS && feilmeldinger.length === 0) {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak.data);
            settSenderInn(true);

            axiosRequest<IFagsak, IRestRegistrerSøknad>({
                method: 'POST',
                data: { søknad, bekreftEndringerViaFrontend },
                url: `/familie-ba-sak/api/behandlinger/${aktivBehandling?.behandlingId}/registrere-søknad-og-hent-persongrunnlag/v2`,
            }).then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);
                    history.push(`/fagsak/${response.data.id}/vilkaarsvurdering`);
                } else if (response.status === RessursStatus.FEILET) {
                    if (
                        response.melding ==
                        'Saksbehandler forsøker å fjerne vilkår fra vilkårsvurdering'
                    ) {
                        settVisModal(true);
                    } else {
                        settFeilmelding(response.melding);
                    }
                } else {
                    settFeilmelding('Registrering av søknaden feilet');
                }
            });
        } else {
            settVisFeilmeldinger(true);
        }
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
                        settSøknadOgValider({
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
        <Skjemasteg
            tittel={'Informasjon fra søknaden'}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    if (fagsak.status === RessursStatus.SUKSESS) {
                        history.push(`/fagsak/${fagsak.data.id}/vilkaarsvurdering`);
                    } else {
                        settFeilmelding('Kunne ikke finne id på fagsak.');
                    }
                } else {
                    nesteAction(false);
                }
            }}
            nesteKnappTittel={erLesevisning() ? 'Neste' : 'Bekreft og fortsett'}
            senderInn={senderInn}
        >
            <div className={'søknad'}>
                {søknadErLastetFraBackend && !erLesevisning() && (
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

                <SøknadType settSøknadOgValider={settSøknadOgValider} søknad={søknad} />

                <SøkerOppholdINorge settSøknadOgValider={settSøknadOgValider} søknad={søknad} />

                <AnnenPart settSøknadOgValider={settSøknadOgValider} søknad={søknad} />

                <Barna søknad={søknad} />

                {feilmeldinger.length > 0 && visFeilmeldinger && (
                    <Feiloppsummering
                        tittel={'For å gå videre må du rette opp følgende:'}
                        feil={feilmeldinger}
                    />
                )}

                <br />

                {feilmelding && <Feilmelding children={feilmelding} />}
            </div>

            {visModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Advarsel om fjerning av vilkår',
                        lukkKnapp: false,
                        visModal: visModal,
                        actions: [
                            <Knapp
                                key={'nei'}
                                mini={true}
                                onClick={() => {
                                    settVisModal(false);
                                }}
                                children={'Nei'}
                            />,
                            <Knapp
                                key={'ja'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    settVisModal(false);
                                    nesteAction(true);
                                }}
                                children={'Ja'}
                            />,
                        ],
                    }}
                >
                    <Normaltekst>
                        advarseltekst m/vilkår og spørsmål om man er sikker på at man vil fjerne
                    </Normaltekst>
                </UIModalWrapper>
            )}
        </Skjemasteg>
    );
};

export default RegistrerSøknad;
