import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, Button, Dropdown, Fieldset, Modal } from '@navikt/ds-react';
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

const StyledAlert = styled(Alert)`
    margin-top: 1.5rem;
`;

const OpprettBehandling: React.FC<IProps> = ({ minimalFagsak }) => {
    const [visOpprettNyBehandlingModal, settVisOpprettNyBehandlingModal] = useState(false);
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
        () => settVisOpprettNyBehandlingModal(false),
        () => {
            settVisOpprettNyBehandlingModal(false);
            settVisBekreftelseTilbakekrevingModal(true);
        }
    );

    const lukkOpprettBehandlingModal = () => {
        nullstillSkjemaStatus();
        settVisOpprettNyBehandlingModal(false);
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
            <Dropdown.Menu.List.Item onClick={() => settVisOpprettNyBehandlingModal(true)}>
                Opprett behandling
            </Dropdown.Menu.List.Item>
            {visOpprettNyBehandlingModal && (
                <Modal
                    open
                    onClose={lukkOpprettBehandlingModal}
                    width={'35rem'}
                    portal={true}
                    header={{
                        heading: 'Opprett ny behandling',
                        size: 'medium',
                    }}
                >
                    <Modal.Body>
                        <Fieldset
                            error={hentFrontendFeilmelding(opprettBehandlingSkjema.submitRessurs)}
                            legend={'Opprett ny behandling'}
                            hideLegend
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
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
                    </Modal.Footer>
                </Modal>
            )}
            {visBekreftelseTilbakekrevingModal && (
                <Modal
                    open
                    onClose={() => settVisBekreftelseTilbakekrevingModal(false)}
                    width={'35rem'}
                    portal={true}
                    header={{
                        heading: 'Tilbakekrevingsbehandling opprettes',
                        size: 'medium',
                    }}
                >
                    <Modal.Body>
                        Tilbakekrevingsbehandling opprettes, men det kan ta litt tid (ca 30
                        sekunder) før den blir tilgjengelig i saksoversikten og oppgavebenken.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            key={'oppgavebenk'}
                            variant="primary"
                            size="medium"
                            onClick={() => {
                                settVisBekreftelseTilbakekrevingModal(false);
                            }}
                            children={'Lukk'}
                        />
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default OpprettBehandling;
