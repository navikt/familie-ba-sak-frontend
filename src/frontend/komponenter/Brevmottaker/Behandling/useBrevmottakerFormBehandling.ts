import { useToastContext } from '@context/ToastContext';
import { useOpprettBrevmottaker } from '@hooks/useOpprettBrevmottaker';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import type { Brevmottaker } from '@typer/brevmottaker';
import { useBrevmottakerForm } from '../Felles/Form/useBrevmottakerForm';

interface Props {
    onSubmitSuccess: () => void;
}

export function useBrevmottakerFormBehandling({ onSubmitSuccess }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { settToast } = useToastContext();

    const { mutateAsync: opprettBrevmottaker } = useOpprettBrevmottaker();

    async function lagreBrevmottaker(brevmottaker: Brevmottaker) {
        const oppdatertBehandling = await opprettBrevmottaker({
            behandlingId: behandling.behandlingId,
            ...brevmottaker,
        });
        settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
        settToast(ToastTyper.BREVMOTTAKER_LAGRET, { alertType: AlertType.SUCCESS, tekst: 'Mottaker ble lagret' });
    }

    return useBrevmottakerForm({ lagreBrevmottaker, onSubmitSuccess });
}
