import * as React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button, ErrorSummary } from '@navikt/ds-react';
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

const FjernVilkårAdvarsel = styled(BodyShort)`
    white-space: pre-wrap;
    padding-bottom: 3.5rem;
`;

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const RegistrerSøknad: React.FC = () => {
    const { vurderErLesevisning, gjelderInstitusjon } = useBehandling();
    const erLesevisning = vurderErLesevisning();

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
            nesteKnappTittel={erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
            senderInn={skjema.submitRessurs.status === RessursStatus.HENTER}
            steg={BehandlingSteg.REGISTRERE_SØKNAD}
        >
            {søknadErLastetFraBackend && !erLesevisning && (
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

            {!gjelderInstitusjon && <SøknadType />}

            <Barna />

            <MålformVelger
                målformFelt={skjema.felter.målform}
                visFeilmeldinger={skjema.visFeilmeldinger}
                erLesevisning={erLesevisning}
            />

            <Annet />

            {(skjema.submitRessurs.status === RessursStatus.FEILET ||
                skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                <Alert variant="error">{skjema.submitRessurs.frontendFeilmelding}</Alert>
            )}
            {skjema.visFeilmeldinger && hentFeilTilOppsummering().length > 0 && (
                <ErrorSummary heading={'For å gå videre må du rette opp følgende:'} size="small">
                    {hentFeilTilOppsummering().map(item => (
                        <ErrorSummary.Item href={`#${item.skjemaelementId}`}>
                            {item.feilmelding}
                        </ErrorSummary.Item>
                    ))}
                </ErrorSummary>
            )}

            {visBekreftModal && (
                <UIModalWrapper
                    modal={{
                        className: 'søknad-modal',
                        tittel: 'Er du sikker på at du vil gå videre?',
                        lukkKnapp: false,
                        visModal: visBekreftModal,
                        actions: [
                            <Button
                                variant={'secondary'}
                                key={'nei'}
                                size={'small'}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                }}
                                children={'Nei'}
                            />,
                            <Button
                                key={'ja'}
                                variant={'primary'}
                                size={'small'}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                    nesteAction(true);
                                }}
                                children={'Ja'}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
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
