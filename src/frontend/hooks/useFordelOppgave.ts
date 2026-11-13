import { fordelOppgave } from '@api/fordelOppgave';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

interface Parameters {
    oppgaveId: string;
    saksbehandler: string;
}

type Options = Omit<UseMutationOptions<string, DefaultError, Parameters>, 'mutationFn'>;

export function useFordelOppgave(options?: Options) {
    return useMutation({
        mutationFn: ({ oppgaveId, saksbehandler }: Parameters) => fordelOppgave({ oppgaveId }, { saksbehandler }),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
