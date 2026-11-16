import { slettRefusjonEøs } from '@api/slettRefusjonEøs';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

export function lagMutationKey(refusjonEøsId: number) {
    return ['slett_refusjon_eøs', refusjonEøsId];
}

interface Parameters {
    behandlingId: number;
    refusjonEøsId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'> & {
    refusjonEøsId: number;
};

export function useSlettRefusjonEøs(options: Options) {
    const { refusjonEøsId, ...rest } = options;
    return useMutation({
        mutationKey: lagMutationKey(refusjonEøsId),
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, refusjonEøsId } = parameters;
            return slettRefusjonEøs(behandlingId, refusjonEøsId);
        },
        ...rest,
    });
}
