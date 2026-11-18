import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';
import { Button, Dialog, LocalAlert } from '@navikt/ds-react';
import { OpprettFagsakModalInnhold } from './OpprettFagsakModalInnhold';

export function OpprettFagsakModal() {
    const { tittel, erModalÅpen, lukkModal, args, bredde } = useModal(ModalType.OPPRETT_FAGSAK);

    return (
        <Dialog open={erModalÅpen} onOpenChange={lukkModal}>
            <Dialog.Popup width={bredde} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>{tittel}</Dialog.Title>
                </Dialog.Header>
                {erModalÅpen && (
                    <>
                        {args === undefined && (
                            <>
                                <Dialog.Body>
                                    <LocalAlert status="error">
                                        <LocalAlert.Header>
                                            <LocalAlert.Title>
                                                Feil oppstod ved innhenting av argumenter for modal.
                                            </LocalAlert.Title>
                                        </LocalAlert.Header>
                                    </LocalAlert>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Button key={'Bekreft'} variant={'primary'} disabled={true}>
                                        Opprett fagsak
                                    </Button>
                                    <Button key={'avbryt'} variant={'tertiary'} onClick={lukkModal}>
                                        Avbryt
                                    </Button>
                                </Dialog.Footer>
                            </>
                        )}
                        {args !== undefined && <OpprettFagsakModalInnhold personIdent={args.ident} />}
                    </>
                )}
            </Dialog.Popup>
        </Dialog>
    );
}
