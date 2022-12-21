import React, { useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Button, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { RessursStatus } from '@navikt/familie-typer';

import { Behandlingstype } from '../../../../../typer/behandling';
import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import { Datofelt } from './Datofelt';
import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

const Knapperad = styled.div`
    margin-top: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const StyledModal = styled(Modal)`
    width: 35rem;
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
                    <Heading size="medium" level="2" spacing>
                        Opprett ny behandling
                    </Heading>
                    <SkjemaGruppe
                        feil={hentFrontendFeilmelding(opprettBehandlingSkjema.submitRessurs)}
                    >
                        <SkjultLegend>Opprett ny behandling</SkjultLegend>
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
                                        maxDate: maksdatoForMigrering().toISOString(),
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
                    </SkjemaGruppe>
                    <Knapperad>
                        <div>
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
                        </div>
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
