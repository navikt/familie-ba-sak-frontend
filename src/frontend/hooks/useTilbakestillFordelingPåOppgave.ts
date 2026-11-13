import { tilbakestillFordelingPåOppgave } from '@api/tilbakestillFordelingPåOppgave';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IOppgave } from '@typer/oppgave';

interface Parameters {
    oppgaveId: string;
}

type Options = Omit<UseMutationOptions<IOppgave, DefaultError, Parameters>, 'mutationFn'>;

export function useTilbakestillFordelingPåOppgave(options?: Options) {
    return useMutation({
        mutationFn: ({ oppgaveId }: Parameters) => tilbakestillFordelingPåOppgave({ oppgaveId }),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
