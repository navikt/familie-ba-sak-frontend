import { useFagsak } from '@hooks/useFagsak';
import { Button, Dialog, HStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router';

interface Props {
    erBrevSendtDialogÅpen: boolean;
    settErBrevSendtDialogÅpen: (erÅpen: boolean) => void;
}

export function BrevSendtDialog({ settErBrevSendtDialogÅpen, erBrevSendtDialogÅpen }: Props) {
    const navigate = useNavigate();
    const fagsak = useFagsak();

    return (
        <Dialog open={erBrevSendtDialogÅpen} onOpenChange={settErBrevSendtDialogÅpen}>
            <Dialog.Popup width={'24rem'}>
                <Dialog.Header>
                    <Dialog.Title>Brev er sendt</Dialog.Title>
                </Dialog.Header>
                <Dialog.Footer>
                    <HStack gap={'space-8'} justify="center" width={'100%'}>
                        <Dialog.CloseTrigger>
                            <Button
                                variant={'secondary'}
                                key={'saksoversikt'}
                                size={'medium'}
                                onClick={() => navigate(`/fagsak/${fagsak.id}/saksoversikt`)}
                            >
                                Se saksoversikt
                            </Button>
                        </Dialog.CloseTrigger>
                        <Dialog.CloseTrigger>
                            <Button
                                variant={'secondary'}
                                key={'oppgavebenken'}
                                size={'medium'}
                                onClick={() => navigate('/oppgaver')}
                            >
                                Se oppgavebenk
                            </Button>
                        </Dialog.CloseTrigger>
                    </HStack>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
