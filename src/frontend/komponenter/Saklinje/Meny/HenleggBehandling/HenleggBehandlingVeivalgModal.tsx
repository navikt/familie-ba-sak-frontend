import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';
import { BodyShort, Button, Dialog, LocalAlert } from '@navikt/ds-react';
import { useFagsakContext } from '@sider/Fagsak/FagsakContext';
import { HenleggÅrsak } from '@typer/behandling';
import { useNavigate } from 'react-router';

export function HenleggBehandlingVeivalgModal() {
    const { args, erModalÅpen, tittel, lukkModal, bredde } = useModal(ModalType.HENLEGG_BEHANDLING_VEIVALG);

    return (
        <Dialog open={erModalÅpen} onOpenChange={() => lukkModal()}>
            <Dialog.Popup width={bredde} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>{tittel}</Dialog.Title>
                </Dialog.Header>
                {erModalÅpen && args === undefined && (
                    <Dialog.Body>
                        <LocalAlert status="error">
                            <LocalAlert.Header>
                                <LocalAlert.Title>En feil oppstod ved innlasting av modalen.</LocalAlert.Title>
                            </LocalAlert.Header>
                        </LocalAlert>
                    </Dialog.Body>
                )}
                {args !== undefined && <Innhold årsak={args.årsak} />}
            </Dialog.Popup>
        </Dialog>
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
            <Dialog.Body>
                <BodyShort>
                    {årsak === HenleggÅrsak.SØKNAD_TRUKKET
                        ? 'Behandlingen er henlagt og brev til bruker er sendt.'
                        : 'Behandlingen er henlagt.'}
                </BodyShort>
            </Dialog.Body>
            <Dialog.Footer>
                <Button variant={'secondary'} size={'medium'} onClick={gåTilSaksoversikt}>
                    Se saksoversikt
                </Button>
                <Button variant={'secondary'} size={'medium'} onClick={gåTilOppgaver}>
                    Se oppgavebenk
                </Button>
            </Dialog.Footer>
        </>
    );
}
