import * as React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import { BehandlingSteg } from '../../../typer/behandling';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import MålformVelger from '../../Felleskomponenter/MålformVelger';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import Annet from './Annet';
import Barna from './Barna';
import SøknadType from './SøknadType';

const FjernVilkårAdvarsel = styled(Normaltekst)`
    white-space: pre-wrap;
    padding-bottom: 3.5rem;
`;

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const RegistrerSøknad: React.FC = () => {
    const { erLesevisning } = useBehandling();

    const {
        hentFeilTilOppsummering,
        nesteAction,
        settVisBekreftModal,
        skjema,
        søknadErLastetFraBackend,
        visBekreftModal,
    } = useSøknad();

    return (
        <StyledSkjemasteg
            className={'søknad'}
            tittel={'Registrer opplysninger fra søknaden'}
            nesteOnClick={() => {
                nesteAction(false);
            }}
            nesteKnappTittel={erLesevisning() ? 'Neste' : 'Bekreft og fortsett'}
            senderInn={skjema.submitRessurs.status === RessursStatus.HENTER}
            steg={BehandlingSteg.REGISTRERE_SØKNAD}
        >
            {søknadErLastetFraBackend && !erLesevisning() && (
                <>
                    <br />
                    <Alert
                        variant="warning"
                        children={
                            'En søknad er allerede registrert på behandlingen. Vi har fylt ut søknaden i skjemaet.'
                        }
                    />
                    <br />
                </>
            )}

            <SøknadType />

            <Barna />

            <MålformVelger
                målformFelt={skjema.felter.målform}
                visFeilmeldinger={skjema.visFeilmeldinger}
                erLesevisning={erLesevisning()}
            />

            <Annet />

            {(skjema.submitRessurs.status === RessursStatus.FEILET ||
                skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                <Alert variant="error">{skjema.submitRessurs.frontendFeilmelding}</Alert>
            )}
            {skjema.visFeilmeldinger && hentFeilTilOppsummering().length > 0 && (
                <Feiloppsummering
                    tittel={'For å gå videre må du rette opp følgende:'}
                    feil={hentFeilTilOppsummering()}
                />
            )}

            {visBekreftModal && (
                <UIModalWrapper
                    modal={{
                        className: 'søknad-modal',
                        tittel: 'Er du sikker på at du vil gå videre?',
                        lukkKnapp: false,
                        visModal: visBekreftModal,
                        actions: [
                            <Knapp
                                key={'nei'}
                                mini={true}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                }}
                                children={'Nei'}
                            />,
                            <Knapp
                                key={'ja'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                    nesteAction(true);
                                }}
                                children={'Ja'}
                                spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                                disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            />,
                        ],
                    }}
                >
                    <FjernVilkårAdvarsel>
                        {skjema.submitRessurs.status === RessursStatus.FEILET ||
                            (skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL &&
                                skjema.submitRessurs.frontendFeilmelding)}
                    </FjernVilkårAdvarsel>
                </UIModalWrapper>
            )}
        </StyledSkjemasteg>
    );
};

export default RegistrerSøknad;
