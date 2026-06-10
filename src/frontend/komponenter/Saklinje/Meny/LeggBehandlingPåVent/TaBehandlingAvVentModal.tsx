import { useTaBehandlingAvVent } from '@hooks/useTaBehandlingAvVent';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { settPåVentÅrsaker } from '@typer/behandling';
import { defaultFunksjonellFeil } from '@typer/feilmeldinger';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import { BodyShort, Box, Button, LocalAlert, Modal } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

interface Props {
    lukkModal: () => void;
}

export function TaBehandlingAvVentModal({ lukkModal }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const {
        mutate: taBehandlingAvVent,
        isPending,
        error,
    } = useTaBehandlingAvVent({
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));
            lukkModal();
        },
    });

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

                {error && (
                    <Box paddingBlock={'space-0 space-16'}>
                        <LocalAlert status="error">
                            <LocalAlert.Header>
                                <LocalAlert.Title>{error.message || defaultFunksjonellFeil}</LocalAlert.Title>
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
                    onClick={() => taBehandlingAvVent(behandling.behandlingId)}
                    loading={isPending}
                >
                    Ja, fortsett
                </Button>
                <Button key={'Nei'} variant="tertiary" onClick={lukkModal}>
                    Nei
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
