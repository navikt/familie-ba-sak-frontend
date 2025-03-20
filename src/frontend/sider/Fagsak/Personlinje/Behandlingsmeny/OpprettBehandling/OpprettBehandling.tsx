import React, { useState } from 'react';

import { isBefore, subDays } from 'date-fns';
import styled from 'styled-components';

import { Alert, Button, Dropdown, Fieldset, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';
import Datovelger from '../../../../../komponenter/datovelger/Datovelger';
import { Behandlingstype } from '../../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { dagensDato } from '../../../../../utils/dato';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

const StyledAlert = styled(Alert)`
    margin-top: 1.5rem;
`;

const StyledFieldset = styled(Fieldset)`
    && > div:not(:last-child):not(:empty) {
        margin-bottom: 1rem;
    }
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

    const søknadMottattDatoErMerEnn360DagerSiden =
        opprettBehandlingSkjema.felter.søknadMottattDato.verdi &&
        isBefore(opprettBehandlingSkjema.felter.søknadMottattDato.verdi, subDays(dagensDato, 360));

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
                        <StyledFieldset
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
                                    <Datovelger
                                        felt={opprettBehandlingSkjema.felter.migreringsdato}
                                        visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                                        label={'Ny migreringsdato'}
                                        maksDatoAvgrensning={maksdatoForMigrering}
                                    />
                                )}
                            {opprettBehandlingSkjema.felter.søknadMottattDato?.erSynlig && (
                                <Datovelger
                                    felt={opprettBehandlingSkjema.felter.søknadMottattDato}
                                    visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                                    label={'Mottatt dato'}
                                    kanKunVelgeFortid
                                />
                            )}
                            {opprettBehandlingSkjema.felter.klageMottattDato?.erSynlig && (
                                <Datovelger
                                    felt={opprettBehandlingSkjema.felter.klageMottattDato}
                                    visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                                    label={'Klage mottatt'}
                                    kanKunVelgeFortid
                                />
                            )}
                        </StyledFieldset>
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
