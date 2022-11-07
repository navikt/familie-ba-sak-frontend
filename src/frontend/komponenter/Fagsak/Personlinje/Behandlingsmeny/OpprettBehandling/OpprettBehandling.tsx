import React, { useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { Button, Heading, Modal } from '@navikt/ds-react';
import { Dropdown } from '@navikt/ds-react-internal';
import { RessursStatus } from '@navikt/familie-typer';

import type { IMinimalFagsak } from '../../../../../typer/fagsak';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';

interface IProps {
    minimalFagsak: IMinimalFagsak;
}

const Knapperad = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;

const StyledModal = styled(Modal)`
    width: 35rem;
`;

const KnappHøyre = styled(Button)`
    margin-left: 1rem;
`;

const OpprettBehandling: React.FC<IProps> = ({ minimalFagsak }) => {
    const [visModal, settVisModal] = useState(false);
    const [visBekreftelseTilbakekrevingModal, settVisBekreftelseTilbakekrevingModal] =
        useState(false);

    const { onBekreft, opprettBehandlingSkjema, nullstillSkjemaStatus, bruker } =
        useOpprettBehandling(
            minimalFagsak.id,
            () => settVisModal(false),
            () => {
                settVisModal(false);
                settVisBekreftelseTilbakekrevingModal(true);
            }
        );
    const {
        behandlingsårsak,
        behandlingstype,
        behandlingstema,
        migreringsdato,
        søknadMottattDato,
        valgteBarn,
    } = opprettBehandlingSkjema.felter;

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
                            behandlingstype={behandlingstype}
                            behandlingsårsak={behandlingsårsak}
                            behandlingstema={behandlingstema}
                            migreringsdato={migreringsdato}
                            søknadMottattDato={søknadMottattDato}
                            minimalFagsak={minimalFagsak}
                            visFeilmeldinger={opprettBehandlingSkjema.visFeilmeldinger}
                            bruker={bruker}
                            valgteBarn={valgteBarn}
                        />
                    </SkjemaGruppe>
                    <Knapperad>
                        <Button
                            key={'avbryt'}
                            variant="tertiary"
                            onClick={lukkOpprettBehandlingModal}
                            children={'Avbryt'}
                        />
                        <KnappHøyre
                            key={'bekreft'}
                            variant="primary"
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
