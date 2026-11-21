import { useFagsak } from '@hooks/useFagsak';
import { BodyShort, Button, Dialog } from '@navikt/ds-react';
import { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';
import { useNavigate } from 'react-router';

import { useTotrinnskontrollModalContext } from './TotrinnskontrollModalContextProvider';

const beslutningstekst: Record<TotrinnskontrollBeslutning, string> = {
    [TotrinnskontrollBeslutning.IKKE_VURDERT]: 'Beslutning er ikke vurdert. Ta kontakt med barnetrygdteamet.',
    [TotrinnskontrollBeslutning.GODKJENT]: 'Behandlingen er godkjent, og vedtaket er iverksatt.',
    [TotrinnskontrollBeslutning.UNDERKJENT]: 'Behandlingen er ikke godkjent og er sendt tilbake til saksbehandler.',
};

export function TotrinnskontrollModal() {
    const fagsak = useFagsak();

    const { beslutning, lukkModal } = useTotrinnskontrollModalContext();

    const navigate = useNavigate();

    function navigerTilSaksoversikt() {
        lukkModal();
        navigate(`/fagsak/${fagsak.id}/saksoversikt`);
    }

    function navigerTilOppgavebenk() {
        lukkModal();
        navigate('/oppgaver');
    }

    return (
        <Dialog open={true} onOpenChange={lukkModal}>
            <Dialog.Popup width={'small'} closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>Totrinnskontroll</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyShort>{beslutningstekst[beslutning]}</BodyShort>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button variant={'secondary'} size={'medium'} onClick={navigerTilSaksoversikt}>
                        Gå til saksoversikten
                    </Button>
                    <Button variant={'primary'} size={'medium'} onClick={navigerTilOppgavebenk}>
                        Gå til oppgavebenken
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
