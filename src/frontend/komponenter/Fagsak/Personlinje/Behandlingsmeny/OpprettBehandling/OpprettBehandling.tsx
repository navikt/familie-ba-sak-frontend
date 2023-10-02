import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, Button, Fieldset, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { Datofelt } from './Datofelt';
import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';
import { Behandlingstype } from '../../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import {
    erFør,
    iDag,
    kalenderDatoMedFallback,
    KalenderEnhet,
    TIDENES_ENDE,
    trekkFra,
} from '../../../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

const Knapperad = styled.div`
    margin-top: 2.5rem;
`;

const StyledModal = styled(Modal)`
    width: 35rem;
`;

const StyledAlert = styled(Alert)`
    margin-top: 1.5rem;
`;

const KnappVenstre = styled(Button)`
    margin-right: 1rem;
`;

const OpprettBehandling: React.FC<IProps> = ({ minimalFagsak }) => {
    const [visModal, settVisModal] = useState(false);
    const [visBekreftelseTilbakekrevingModal, settVisBekreftelseTilbakekrevingModal] =
        useState(false);

    const {
        onBekreft,
        opprettBehandlingSkjema,
        nullstillSkjemaStatus,
        bruker,
        maksdatoForMigrering,
        valideringErOk,
    } = useOpprettBehandling(
        minimalFagsak.id,
        () => settVisModal(false),
        () => {
            settVisModal(false);
            settVisBekreftelseTilbakekrevingModal(true);
        }
    );

    const lukkOpprettBehandlingModal = () => {
        nullstillSkjemaStatus();
        settVisModal(false);
    };

    const søknadMottattDato = kalenderDatoMedFallback(
        opprettBehandlingSkjema.felter.søknadMottattDato.verdi,
        TIDENES_ENDE
    );

    const søknadMottattDatoErMerEnn360DagerSiden = erFør(
        søknadMottattDato,
        trekkFra(iDag(), 360, KalenderEnhet.DAG)
    );

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Opprett behandling
            </Dropdown.Menu.List.Item>
            <StyledModal
                open={visModal}
                onClose={lukkOpprettBehandlingModal}
                aria-label="Opprett ny behandling"
            >
                <Modal.Content>
                    <Fieldset
                        error={hentFrontendFeilmelding(opprettBehandlingSkjema.submitRessurs)}
                        legend={
                            <Heading size="medium" level="2">
                                Opprett ny behandling
                            </Heading>
                        }
                    >
                        <OpprettBehandlingValg
                            skjema={opprettBehandlingSkjema}
                            minimalFagsak={minimalFagsak}
                            bruker={bruker}
                        />
                        {opprettBehandlingSkjema.felter.behandlingstype.verdi ===
                            Behandlingstype.MIGRERING_FRA_INFOTRYGD &&
                            opprettBehandlingSkjema.felter.migreringsdato?.erSynlig && (
                                <Datofelt
                                    skjemafelt={opprettBehandlingSkjema.felter.migreringsdato}
                                    visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                                    etikett={'Ny migreringsdato'}
                                    begrensninger={{
                                        maxDate: maksdatoForMigrering.toISOString(),
                                    }}
                                />
                            )}
                        {opprettBehandlingSkjema.felter.søknadMottattDato?.erSynlig && (
                            <Datofelt
                                skjemafelt={opprettBehandlingSkjema.felter.søknadMottattDato}
                                visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                                etikett={'Mottatt dato'}
                                begrensninger={{
                                    maxDate: new Date().toISOString(),
                                }}
                            />
                        )}
                        {opprettBehandlingSkjema.felter.kravMottattDato?.erSynlig && (
                            <Datofelt
                                skjemafelt={opprettBehandlingSkjema.felter.kravMottattDato}
                                visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                                etikett={'Krav mottatt'}
                                begrensninger={{
                                    maxDate: new Date().toISOString(),
                                }}
                            />
                        )}
                    </Fieldset>
                    {søknadMottattDatoErMerEnn360DagerSiden && (
                        <StyledAlert variant={'warning'}>
                            Er mottatt dato riktig? <br />
                            Det er mer enn 360 dager siden denne datoen.
                        </StyledAlert>
                    )}
                    <Knapperad>
                        <KnappVenstre
                            key={'bekreft'}
                            variant={valideringErOk() ? 'primary' : 'secondary'}
                            onClick={() =>
                                onBekreft(
                                    minimalFagsak.søkerFødselsnummer,
                                    minimalFagsak.fagsakType
                                )
                            }
                            children={'Bekreft'}
                            loading={
                                opprettBehandlingSkjema.submitRessurs.status ===
                                RessursStatus.HENTER
                            }
                            disabled={
                                opprettBehandlingSkjema.submitRessurs.status ===
                                RessursStatus.HENTER
                            }
                        />
                        <Button
                            key={'avbryt'}
                            variant="tertiary"
                            onClick={lukkOpprettBehandlingModal}
                            children={'Avbryt'}
                        />
                    </Knapperad>
                </Modal.Content>
            </StyledModal>
            <StyledModal
                open={visBekreftelseTilbakekrevingModal}
                onClose={() => settVisBekreftelseTilbakekrevingModal(false)}
                aria-label="Tilbakekrevingsbehandling opprettes"
            >
                <Modal.Content>
                    <Heading size="medium" level="2" spacing>
                        Tilbakekrevingsbehandling opprettes
                    </Heading>
                    Tilbakekrevingsbehandling opprettes, men det kan ta litt tid (ca 30 sekunder)
                    før den blir tilgjengelig i saksoversikten og oppgavebenken.
                    <Knapperad>
                        <Button
                            key={'oppgavebenk'}
                            variant="primary"
                            size="medium"
                            onClick={() => {
                                settVisBekreftelseTilbakekrevingModal(false);
                            }}
                            children={'Lukk'}
                        />
                    </Knapperad>
                </Modal.Content>
            </StyledModal>
        </>
    );
};

export default OpprettBehandling;
