import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useSøknad } from '../../../context/SøknadContext';
import { BehandlingSteg, IBehandling, hentStegNummer } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { IBarnMedOpplysninger, IRestRegistrerSøknad, ISøknadDTO } from '../../../typer/søknad';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import AnnenPart from './AnnenPart';
import Barna from './Barna';
import SøknadType from './SøknadType';

interface IProps {
    åpenBehandling: IBehandling;
}

const RegistrerSøknad: React.FunctionComponent<IProps> = ({ åpenBehandling }) => {
    const { axiosRequest } = useApp();
    const { fagsak, settFagsak } = useFagsakRessurser();
    const { erLesevisning } = useBehandling();
    const history = useHistory();

    const { feilmeldinger, søknad, settSøknadOgValider } = useSøknad();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [feilmelding, settFeilmelding] = React.useState('');
    const [frontendllFeilmelding, settFrontendFeilmelding] = React.useState('');

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
                    history.push(
                        `/fagsak/${response.data.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`
                    );
                } else if (response.status === RessursStatus.FEILET) {
                    // TODO: Her sjekker vi om feilmeldingen gjelder valideringsfeil
                    if (response.frontendFeilmelding.includes('Du har gjort endringer')) {
                        settFrontendFeilmelding(response.frontendFeilmelding);
                        settVisModal(true);
                    } else {
                        settFeilmelding(response.frontendFeilmelding);
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
            if (
                åpenBehandling &&
                hentStegNummer(åpenBehandling.steg) >=
                    hentStegNummer(BehandlingSteg.VILKÅRSVURDERING)
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
            className={'søknad'}
            tittel={'Informasjon fra søknaden'}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    if (fagsak.status === RessursStatus.SUKSESS) {
                        history.push(
                            `/fagsak/${fagsak.data.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`
                        );
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

            {visModal && (
                <UIModalWrapper
                    modal={{
                        className: 'søknad-modal',
                        tittel: 'Er du sikker på at du vil gå videre?',
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
                    <Normaltekst className={'søknad-modal__fjern-vilkår-advarsel'}>
                        {frontendllFeilmelding}
                    </Normaltekst>
                </UIModalWrapper>
            )}
        </Skjemasteg>
    );
};

export default RegistrerSøknad;
