import { useToastContext } from '@context/ToastContext';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandling } from '@hooks/useBehandling';
import { useOpprettBrevmottaker } from '@hooks/useOpprettBrevmottaker';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { useQueryClient } from '@tanstack/react-query';
import type { Brevmottaker } from '@typer/brevmottaker';
import { useBrevmottakerForm } from '../Felles/Form/useBrevmottakerForm';

interface Props {
    onSubmitSuccess: () => void;
}

export function useBrevmottakerFormBehandling({ onSubmitSuccess }: Props) {
    const queryClient = useQueryClient();
    const behandling = useBehandling();

    const { settToast } = useToastContext();

    const { mutateAsync: opprettBrevmottaker } = useOpprettBrevmottaker();

    async function lagreBrevmottaker(brevmottaker: Brevmottaker) {
        const brevmottakere = await opprettBrevmottaker({
            behandlingId: behandling.behandlingId,
            ...brevmottaker,
        });
        queryClient.setQueryData(queryKeys.brevmottakere(behandling.behandlingId), brevmottakere);
        queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandling.behandlingId) });
        settToast(ToastTyper.BREVMOTTAKER_LAGRET, { alertType: AlertType.SUCCESS, tekst: 'Brevmottaker ble lagret' });
    }

    return useBrevmottakerForm({ lagreBrevmottaker, onSubmitSuccess });
}
