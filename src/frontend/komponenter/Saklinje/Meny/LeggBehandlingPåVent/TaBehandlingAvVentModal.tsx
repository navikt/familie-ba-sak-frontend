import { useState } from 'react';

import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { settPåVentÅrsaker } from '@typer/behandling';
import type { IBehandling } from '@typer/behandling';
import { defaultFunksjonellFeil } from '@typer/feilmeldinger';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import { BodyShort, Box, Button, LocalAlert, Modal } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

interface Props {
    lukkModal: () => void;
}

export function TaBehandlingAvVentModal({ lukkModal }: Props) {
    const { request } = useHttp();
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

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
                        ` Årsak: ${settPåVentÅrsaker[behandling?.aktivSettPåVent?.årsak]}. `}
                </BodyShort>
                <BodyShort>
                    {`Frist: ${isoStringTilFormatertString({
                        isoString: behandling?.aktivSettPåVent?.frist,
                        tilFormat: Datoformat.DATO,
                    })}. `}
                    Gå via meny for å endre årsak og frist på ventende behandling.
                </BodyShort>
                <Box marginBlock={'space-16 space-0'}>
                    <BodyShort>Ønsker du å fortsette behandlingen?</BodyShort>
                </Box>

                {submitRessurs.status === RessursStatus.FEILET && (
                    <Box paddingBlock={'space-0 space-16'}>
                        <LocalAlert status="error">
                            <LocalAlert.Header>
                                <LocalAlert.Title>{submitRessurs.frontendFeilmelding}</LocalAlert.Title>
                            </LocalAlert.Header>
                        </LocalAlert>
                    </Box>
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
                <Button key={'Nei'} variant="tertiary" onClick={lukkModal} children={'Nei'} />
            </Modal.Footer>
        </Modal>
    );
}
