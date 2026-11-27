import { useToastContext } from '@context/ToastContext';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSlettBrevmottaker } from '@hooks/useSlettBrevmottaker';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { useQueryClient } from '@tanstack/react-query';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';
import { BrevmottakerDetaljer } from '../Felles/BrevmottakerDetaljer';

interface Props {
    brevmottaker: BrevmottakerBehandling;
}

export function BrevmottakerDetaljerBehandling({ brevmottaker }: Props) {
    const queryClient = useQueryClient();

    const erLesevisning = useErLesevisning();
    const behandling = useBehandling();

    const { settToast } = useToastContext();

    const {
        mutate: slettBrevmottaker,
        isPending: slettBrevmottakerIsPending,
        error: slettBrevmottakerError,
    } = useSlettBrevmottaker({
        onSuccess: brevmottakere => {
            queryClient.setQueryData(queryKeys.brevmottakere(behandling), brevmottakere);
            queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandling.behandlingId) });
            settToast(ToastTyper.BREVMOTTAKER_FJERNET, { alertType: AlertType.SUCCESS, tekst: 'Brevmottaker fjernet' });
        },
    });

    function onSlettBrevmottaker() {
        slettBrevmottaker({ behandlingId: behandling.behandlingId, brevmottakerId: brevmottaker.id });
    }

    return (
        <BrevmottakerDetaljer
            brevmottaker={brevmottaker}
            erLesevisning={erLesevisning}
            onSlett={onSlettBrevmottaker}
            sletter={slettBrevmottakerIsPending}
            slettFeilmelding={slettBrevmottakerError?.message}
        />
    );
}
