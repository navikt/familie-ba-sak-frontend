import React from 'react';

import { isBefore, subDays } from 'date-fns';

import { Alert, Box, Button, Fieldset, Modal, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import OpprettBehandlingValg from './OpprettBehandlingValg';
import useOpprettBehandling from './useOpprettBehandling';
import { useFagsakContext } from '../../../../sider/Fagsak/FagsakContext';
import { Behandlingstype } from '../../../../typer/behandling';
import { dagensDato } from '../../../../utils/dato';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import Datovelger from '../../../Datovelger/Datovelger';

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
                <Fieldset
                    error={hentFrontendFeilmelding(opprettBehandlingSkjema.submitRessurs)}
                    legend={'Opprett ny behandling'}
                    hideLegend
                >
                    <VStack gap={'space-16'}>
                        <OpprettBehandlingValg
                            skjema={opprettBehandlingSkjema}
                            minimalFagsak={fagsak}
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
                    </VStack>
                </Fieldset>
                {søknadMottattDatoErMerEnn360DagerSiden && (
                    <Box marginBlock={'space-24 space-0'}>
                        <Alert variant={'warning'}>
                            Er mottatt dato riktig? <br />
                            Det er mer enn 360 dager siden denne datoen.
                        </Alert>
                    </Box>
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
