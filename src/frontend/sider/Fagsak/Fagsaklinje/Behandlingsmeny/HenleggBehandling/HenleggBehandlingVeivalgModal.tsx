import React from 'react';

import { useNavigate } from 'react-router';

import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react';

import { ModalType } from '../../../../../context/ModalContext';
import { useModal } from '../../../../../hooks/useModal';
import { HenleggÅrsak } from '../../../../../typer/behandling';
import { useFagsakContext } from '../../../FagsakContext';

export function HenleggBehandlingVeivalgModal() {
    const { args, erModalÅpen, tittel, lukkModal, bredde } = useModal(ModalType.HENLEGG_BEHANDLING_VEIVALG);

    return (
        <Modal
            open={erModalÅpen}
            width={bredde}
            header={{ heading: tittel, size: 'medium' }}
            onClose={() => lukkModal()}
            portal={true}
        >
            {erModalÅpen && (
                <>
                    {args === undefined && (
                        <Modal.Body>
                            <Alert variant={'error'}>En feil oppstod ved innlasting av modalen.</Alert>
                        </Modal.Body>
                    )}
                    {args !== undefined && <Innhold årsak={args.årsak} />}
                </>
            )}
        </Modal>
    );
}

interface InnholdProps {
    årsak: HenleggÅrsak;
}

function Innhold({ årsak }: InnholdProps) {
    const { fagsak } = useFagsakContext();
    const { lukkModal } = useModal(ModalType.HENLEGG_BEHANDLING_VEIVALG);
    const navigate = useNavigate();

    function gåTilSaksoversikt() {
        lukkModal();
        navigate(`/fagsak/${fagsak.id}/saksoversikt`);
    }

    function gåTilOppgaver() {
        lukkModal();
        navigate('/oppgaver');
    }

    return (
        <>
            <Modal.Body>
                <BodyShort>
                    {årsak === HenleggÅrsak.SØKNAD_TRUKKET
                        ? 'Behandlingen er henlagt og brev til bruker er sendt.'
                        : 'Behandlingen er henlagt.'}
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'} size={'medium'} onClick={gåTilSaksoversikt}>
                    Se saksoversikt
                </Button>
                <Button variant={'secondary'} size={'medium'} onClick={gåTilOppgaver}>
                    Se oppgavebenk
                </Button>
            </Modal.Footer>
        </>
    );
}
