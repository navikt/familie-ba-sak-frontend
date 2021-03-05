import * as React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';

import { useHttp } from '@navikt/familie-http';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useSøknad } from '../../../context/SøknadContext';
import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IRestRegistrerSøknad } from '../../../typer/søknad';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import Annet from './Annet';
import Barna from './Barna';
import MålformVelger from './MålformVelger';
import SøknadType from './SøknadType';

interface IProps {
    åpenBehandling: IBehandling;
}

const FjernVilkårAdvarsel = styled(Normaltekst)`
    white-space: pre-wrap;
    padding-bottom: 3.5rem;
`;

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const RegistrerSøknad: React.FunctionComponent<IProps> = ({ åpenBehandling }) => {
    const { request } = useHttp();
    const { fagsak, settFagsak } = useFagsakRessurser();
    const { erLesevisning } = useBehandling();
    const history = useHistory();

    const {
        erSøknadGyldig,
        feilmeldinger,
        settSøknadOgValider,
        søknad,
        søknadErLastetFraBackend,
    } = useSøknad();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [feilmelding, settFeilmelding] = React.useState('');
    const [frontendFeilmelding, settFrontendFeilmelding] = React.useState('');

    const [senderInn, settSenderInn] = React.useState(false);
    const [visModal, settVisModal] = React.useState<boolean>(false);

    const nesteAction = (bekreftEndringerViaFrontend: boolean) => {
        if (åpenBehandling && erSøknadGyldig(søknad)) {
            settSenderInn(true);

            request<IRestRegistrerSøknad, IFagsak>({
                method: 'POST',
                data: { søknad, bekreftEndringerViaFrontend },
                url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/registrere-søknad-og-hent-persongrunnlag`,
            }).then((response: Ressurs<IFagsak>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    settFagsak(response);
                    history.push(
                        `/fagsak/${response.data.id}/${åpenBehandling.behandlingId}/vilkaarsvurdering`
                    );
                } else if (response.status === RessursStatus.FUNKSJONELL_FEIL) {
                    settFrontendFeilmelding(response.frontendFeilmelding);
                    settVisModal(true);
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settFeilmelding(response.frontendFeilmelding);
                } else {
                    settFeilmelding('Registrering av søknaden feilet');
                }
            });
        } else {
            settVisFeilmeldinger(true);
        }
    };

    return (
        <StyledSkjemasteg
            className={'søknad'}
            tittel={'Registrer opplysninger fra søknaden'}
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

            <Barna settSøknadOgValider={settSøknadOgValider} søknad={søknad} />

            <MålformVelger settSøknadOgValider={settSøknadOgValider} søknad={søknad} />

            <Annet settSøknadOgValider={settSøknadOgValider} søknad={søknad} />

            {feilmeldinger.length > 0 && visFeilmeldinger && (
                <Feiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={feilmeldinger}
                />
            )}

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
                                spinner={senderInn}
                                disabled={senderInn}
                            />,
                        ],
                    }}
                >
                    <FjernVilkårAdvarsel>{frontendFeilmelding}</FjernVilkårAdvarsel>
                </UIModalWrapper>
            )}
        </StyledSkjemasteg>
    );
};

export default RegistrerSøknad;
