import { useToastContext } from '@context/ToastContext';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSlettBrevmottaker } from '@hooks/useSlettBrevmottaker';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';
import { BrevmottakerDetaljer } from '../Felles/BrevmottakerDetaljer';

interface Props {
    brevmottaker: BrevmottakerBehandling;
}

export function BrevmottakerDetaljerBehandling({ brevmottaker }: Props) {
    const erLesevisning = useErLesevisning();

    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { settToast } = useToastContext();

    const {
        mutate: slettBrevmottaker,
        isPending: slettBrevmottakerIsPending,
        error: slettBrevmottakerError,
    } = useSlettBrevmottaker({
        onSuccess: oppdatertBehandling => {
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
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
