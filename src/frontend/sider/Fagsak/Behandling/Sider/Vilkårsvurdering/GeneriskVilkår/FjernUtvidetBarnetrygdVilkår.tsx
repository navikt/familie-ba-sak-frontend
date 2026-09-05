import { useSlettVilkår } from '@hooks/useSlettVilkår';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, Dialog, ErrorMessage } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { VilkårType } from '@typer/vilkår';
import { useState } from 'react';

interface Props {
    personIdent: string;
}

export function FjernUtvidetBarnetrygdVilkår({ personIdent }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const [visDialog, settVisDialog] = useState(false);

    const {
        mutate: slettVilkår,
        isPending: slettVilkårIsPending,
        error: slettVilkårError,
        reset: nullstillSlettVilkår,
    } = useSlettVilkår({
        onSuccess: oppdatertBehandling => settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling)),
    });

    const onOpenChange = (åpen: boolean) => {
        if (!åpen) {
            nullstillSlettVilkår();
        }
        settVisDialog(åpen);
    };

    return (
        <>
            <Box marginBlock={'space-20 space-0'}>
                <Button onClick={() => settVisDialog(true)} size="small" icon={<TrashIcon title="Fjern vilkår" />}>
                    Fjern vilkår
                </Button>
            </Box>
            <Dialog open={visDialog} onOpenChange={onOpenChange}>
                <Dialog.Popup role={'alertdialog'} closeOnOutsideClick={false} position={'center'}>
                    <Dialog.Header withClosebutton={false}>
                        <Dialog.Title>Fjern vilkåret utvidet barnetrygd</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <BodyLong>Er du sikker?</BodyLong>
                        {slettVilkårError && <ErrorMessage size="small">{slettVilkårError.message}</ErrorMessage>}
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button
                            loading={slettVilkårIsPending}
                            onClick={() =>
                                slettVilkår({
                                    behandlingId: behandling.behandlingId,
                                    personIdent,
                                    vilkårType: VilkårType.UTVIDET_BARNETRYGD,
                                })
                            }
                            size="small"
                        >
                            Bekreft
                        </Button>
                        <Dialog.CloseTrigger>
                            <Button variant="tertiary" size="small">
                                Avbryt
                            </Button>
                        </Dialog.CloseTrigger>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </>
    );
}
