import { useVisTekniskFeilModal } from '@context/TekniskFeilModalContext';
import { useTilbakestillFordelingPåOppgave } from '@hooks/useTilbakestillFordelingPåOppgave';
import { Button } from '@navikt/ds-react';
import type { IOppgave } from '@typer/oppgave';

import { useOppgavebenkContext } from './OppgavebenkContext';

interface Props {
    oppgave: IOppgave;
}

export function TilbakestillOppgave({ oppgave }: Props) {
    const { oppdaterOppgave } = useOppgavebenkContext();

    const visTekniskFeilModal = useVisTekniskFeilModal();

    const { mutate: tilbakestillFordelingPåOppgave, isPending } = useTilbakestillFordelingPåOppgave({
        onSuccess: oppdatertOppgave => oppdaterOppgave(oppdatertOppgave),
        onError: error => visTekniskFeilModal(error),
    });

    return (
        <Button
            type={'button'}
            variant={'tertiary'}
            size={'small'}
            onClick={() => tilbakestillFordelingPåOppgave({ oppgaveId: oppgave.id })}
            loading={isPending}
        >
            Tilbakestill
        </Button>
    );
}
