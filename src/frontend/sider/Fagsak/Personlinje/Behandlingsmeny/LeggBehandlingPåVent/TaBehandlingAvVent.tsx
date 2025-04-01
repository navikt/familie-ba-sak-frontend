import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Button, Dropdown, Modal } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandlingContext } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { settPåVentÅrsaker } from '../../../../../typer/behandling';
import { defaultFunksjonellFeil } from '../../../../../typer/feilmeldinger';
import { Datoformat, isoStringTilFormatertString } from '../../../../../utils/dato';

const StyledBodyShort = styled(BodyShort)`
    padding-bottom: 1rem;
`;
const StyledAlert = styled(Alert)`
    padding-bottom: 1rem;
`;

const TaBehandlingAvVent: React.FC = () => {
    const { request } = useHttp();
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const [visModal, settVisModal] = useState<boolean>(false);
    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    const lukkModal = () => {
        settVisModal(false);
    };

    const deaktiverVentingPåBehandling = () => {
        settSubmitRessurs(byggHenterRessurs());

        request<undefined, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/sett-på-vent/${behandling.behandlingId}/fortsettbehandling`,
        })
            .then((ressurs: Ressurs<IBehandling>) => {
                settÅpenBehandling(ressurs);
                settSubmitRessurs(ressurs);
                lukkModal();
            })
            .catch(() => {
                settSubmitRessurs(byggFeiletRessurs(defaultFunksjonellFeil));
            });
    };

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                Fortsett behandling
            </Dropdown.Menu.List.Item>

            {visModal && (
                <Modal
                    header={{ heading: 'Fortsett behandling', size: 'small' }}
                    open
                    onClose={lukkModal}
                    width={'35rem'}
                    portal
                >
                    <Modal.Body>
                        <BodyShort>
                            Behandlingen er satt på vent.
                            {behandling?.aktivSettPåVent &&
                                ` Årsak: ${
                                    settPåVentÅrsaker[behandling?.aktivSettPåVent?.årsak]
                                }. `}
                        </BodyShort>
                        <StyledBodyShort>
                            {`Frist: ${isoStringTilFormatertString({
                                isoString: behandling?.aktivSettPåVent?.frist,
                                tilFormat: Datoformat.DATO,
                            })}. `}
                            Gå via meny for å endre årsak og frist på ventende behandling.
                        </StyledBodyShort>

                        <BodyShort>Ønsker du å fortsette behandlingen?</BodyShort>

                        {submitRessurs.status === RessursStatus.FEILET && (
                            <StyledAlert variant="error">
                                {submitRessurs.frontendFeilmelding}
                            </StyledAlert>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            key={'Bekreft'}
                            variant="primary"
                            size="small"
                            onClick={deaktiverVentingPåBehandling}
                            children={'Ja, fortsett'}
                            loading={submitRessurs.status === RessursStatus.HENTER}
                        />
                        <Button
                            key={'Nei'}
                            variant="tertiary"
                            onClick={lukkModal}
                            children={'Nei'}
                        />
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default TaBehandlingAvVent;
