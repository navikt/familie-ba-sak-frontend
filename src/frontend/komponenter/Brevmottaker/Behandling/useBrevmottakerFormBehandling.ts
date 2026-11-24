import { useToastContext } from '@context/ToastContext';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useOpprettBrevmottaker } from '@hooks/useOpprettBrevmottaker';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/BehandlingContext';
import { useQueryClient } from '@tanstack/react-query';
import type { Brevmottaker } from '@typer/brevmottaker';
import { useBrevmottakerForm } from '../Felles/Form/useBrevmottakerForm';

interface Props {
    onSubmitSuccess: () => void;
}

export function useBrevmottakerFormBehandling({ onSubmitSuccess }: Props) {
    const queryClient = useQueryClient();

    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { settToast } = useToastContext();

    const { mutateAsync: opprettBrevmottaker } = useOpprettBrevmottaker();

    async function lagreBrevmottaker(brevmottaker: Brevmottaker) {
        const oppdatertBehandling = await opprettBrevmottaker({
            behandlingId: behandling.behandlingId,
            ...brevmottaker,
        });
        queryClient.setQueryData(queryKeys.behandling(oppdatertBehandling), oppdatertBehandling);
        settÅpenBehandling(oppdatertBehandling);
        settToast(ToastTyper.BREVMOTTAKER_LAGRET, { alertType: AlertType.SUCCESS, tekst: 'Brevmottaker ble lagret' });
    }

    return useBrevmottakerForm({ lagreBrevmottaker, onSubmitSuccess });
}
