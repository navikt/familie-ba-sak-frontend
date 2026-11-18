import { useTaBehandlingAvVent } from '@hooks/useTaBehandlingAvVent';
import { BodyShort, Box, Button, Dialog, LocalAlert } from '@navikt/ds-react';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { settPåVentÅrsaker } from '@typer/behandling';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

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
            settÅpenBehandling(behandling);
            lukkModal();
        },
    });

    return (
        <Dialog open onOpenChange={lukkModal}>
            <Dialog.Popup width={'35rem'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Fortsett behandling</Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
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
                                    <LocalAlert.Title>{error.message}</LocalAlert.Title>
                                </LocalAlert.Header>
                            </LocalAlert>
                        </Box>
                    )}
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        type={'submit'}
                        variant="primary"
                        size="small"
                        onClick={() => taBehandlingAvVent(behandling.behandlingId)}
                        loading={isPending}
                    >
                        Ja, fortsett
                    </Button>
                    <Button variant="tertiary" onClick={lukkModal}>
                        Nei
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
