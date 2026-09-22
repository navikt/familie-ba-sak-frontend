import { useSlettVilkår } from '@hooks/useSlettVilkår';
import { TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, ErrorMessage, Modal } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { VilkårType } from '@typer/vilkår';
import { useState } from 'react';

interface Props {
    personIdent: string;
}

export function FjernUtvidetBarnetrygdVilkår({ personIdent }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const [visModal, settVisModal] = useState(false);

    const {
        mutate: slettVilkår,
        isPending: slettVilkårIsPending,
        error: slettVilkårError,
        reset: nullstillSlettVilkår,
    } = useSlettVilkår({
        onSuccess: oppdatertBehandling => settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling)),
    });

    const onCloseModal = () => {
        nullstillSlettVilkår();
        settVisModal(false);
    };

    return (
        <>
            <Box marginBlock={'space-20 space-0'}>
                <Button onClick={() => settVisModal(true)} size="small" icon={<TrashIcon title="Fjern vilkår" />}>
                    Fjern vilkår
                </Button>
            </Box>

            {visModal && (
                <Modal
                    open
                    onClose={onCloseModal}
                    header={{
                        heading: 'Fjern vilkåret utvidet barnetrygd',
                        size: 'small',
                        closeButton: false,
                    }}
                    width={'35rem'}
                    portal
                >
                    <Modal.Body>
                        Er du sikker?
                        {slettVilkårError && <ErrorMessage size="small">{slettVilkårError.message}</ErrorMessage>}
                    </Modal.Body>
                    <Modal.Footer>
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
                        <Button variant="tertiary" onClick={onCloseModal} size="small">
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
