import * as React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button, ErrorSummary, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import Annet from './Annet';
import Barna from './Barna';
import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';
import { useSøknadContext } from './SøknadContext';
import SøknadType from './SøknadType';
import { LeggTilBarnModal } from '../../../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '../../../../../komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import MålformVelger from '../../../../../komponenter/MålformVelger';
import { BehandlingSteg } from '../../../../../typer/behandling';
import { sjekkGjelderInstitusjon } from '../../../../../typer/fagsak';
import type { IBarnMedOpplysninger } from '../../../../../typer/søknad';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';

const FjernVilkårAdvarsel = styled(BodyShort)`
    white-space: pre-wrap;
`;

const StyledSkjemasteg = styled(Skjemasteg)`
    max-width: 40rem;
`;

const RegistrerSøknadGammel: React.FC = () => {
    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning } = useBehandlingContext();

    const {
        hentFeilTilOppsummering,
        nesteAction,
        settVisBekreftModal,
        skjema,
        søknadErLastetFraBackend,
        visBekreftModal,
    } = useSøknadContext();

    const erLesevisning = vurderErLesevisning();
    const gjelderInstitusjon = sjekkGjelderInstitusjon(fagsak);

    function onLeggTilBarn(barn: IBarnMedOpplysninger) {
        skjema.felter.barnaMedOpplysninger.validerOgSettFelt([...skjema.felter.barnaMedOpplysninger.verdi, barn]);
    }

    return (
        <LeggTilBarnModalContextProvider
            barn={skjema.felter.barnaMedOpplysninger.verdi}
            onLeggTilBarn={onLeggTilBarn}
            harBrevmottaker={behandling.brevmottakere.length > 0}
        >
            {!erLesevisning && <LeggTilBarnModal />}
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

                {!erLesevisning && <LeggTilBarnKnapp />}

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
                            <ErrorSummary.Item href={`#${item.skjemaelementId}`}>{item.feilmelding}</ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}

                {visBekreftModal && (
                    <Modal
                        open
                        onClose={() => settVisBekreftModal(false)}
                        header={{
                            heading: 'Er du sikker på at du vil gå videre?',
                            size: 'small',
                            closeButton: false,
                        }}
                        width={'35rem'}
                    >
                        <Modal.Body>
                            <FjernVilkårAdvarsel>
                                {skjema.submitRessurs.status === RessursStatus.FEILET ||
                                    (skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL &&
                                        skjema.submitRessurs.frontendFeilmelding)}
                            </FjernVilkårAdvarsel>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                key={'ja'}
                                variant={'primary'}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                    nesteAction(true);
                                }}
                                children={'Ja'}
                                loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                                disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                            />
                            <Button
                                variant={'secondary'}
                                key={'nei'}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                }}
                                children={'Nei'}
                            />
                        </Modal.Footer>
                    </Modal>
                )}
            </StyledSkjemasteg>
        </LeggTilBarnModalContextProvider>
    );
};

export default RegistrerSøknadGammel;
