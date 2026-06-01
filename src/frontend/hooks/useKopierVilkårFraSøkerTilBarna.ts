import { kopierVilkårFraSøkerTilBarna } from '@api/kopierVilkårFraSøkerTilBarna';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useKopierVilkårFraSøkerTilBarna(options?: Options) {
    return useMutation<IBehandling, Error, Parameters>({
        mutationFn: ({ behandlingId }: Parameters): Promise<IBehandling> => kopierVilkårFraSøkerTilBarna(behandlingId),
        ...options,
    });
}
