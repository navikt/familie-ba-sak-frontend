import React from 'react';

import { isBefore, subDays } from 'date-fns';
import styled from 'styled-components';

import { Alert, Button, Fieldset, Modal } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { Behandlingstype } from '../../../../typer/behandling';
import { dagensDato } from '../../../../utils/dato';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import Datovelger from '../../../Datovelger/Datovelger';

const StyledAlert = styled(Alert)`
    margin-top: 1.5rem;
`;

const StyledFieldset = styled(Fieldset)`
    && > div:not(:last-child):not(:empty) {
        margin-bottom: 1rem;
    }
`;

interface Props {
    lukkModal: () => void;
    onTilbakekrevingsbehandlingOpprettet: () => void;
}

export function OpprettBehandlingModal({ lukkModal, onTilbakekrevingsbehandlingOpprettet }: Props) {
    const { fagsak } = useFagsakContext();

    const { onBekreft, opprettBehandlingSkjema, nullstillSkjemaStatus, bruker, maksdatoForMigrering, valideringErOk } =
        useOpprettBehandling(
            fagsak.id,
            () => lukkModal(),
            () => {
                lukkModal();
                onTilbakekrevingsbehandlingOpprettet();
            }
        );

    const lukkOpprettBehandlingModal = () => {
        nullstillSkjemaStatus();
        lukkModal();
    };

    const søknadMottattDatoErMerEnn360DagerSiden =
        opprettBehandlingSkjema.felter.søknadMottattDato.verdi &&
        isBefore(opprettBehandlingSkjema.felter.søknadMottattDato.verdi, subDays(dagensDato, 360));

    return (
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
                    <OpprettBehandlingValg skjema={opprettBehandlingSkjema} minimalFagsak={fagsak} bruker={bruker} />
                    {opprettBehandlingSkjema.felter.behandlingstype.verdi === Behandlingstype.MIGRERING_FRA_INFOTRYGD &&
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
                    variant={'primary'}
                    onClick={() => {
                        if (opprettBehandlingSkjema.submitRessurs.status === RessursStatus.HENTER) {
                            return;
                        }
                        onBekreft(fagsak.søkerFødselsnummer, fagsak.fagsakType);
                    }}
                    children={'Bekreft'}
                    loading={opprettBehandlingSkjema.submitRessurs.status === RessursStatus.HENTER}
                />
                <Button key={'avbryt'} variant="tertiary" onClick={lukkOpprettBehandlingModal} children={'Avbryt'} />
            </Modal.Footer>
        </Modal>
    );
}
