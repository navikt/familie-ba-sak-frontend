import { slettRefusjonEøs } from '@api/slettRefusjonEøs';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestRefusjonEøs } from '@typer/refusjon-eøs';

interface Parameters {
    behandlingId: number;
    refusjonEøsId: number;
}

type Options = Omit<UseMutationOptions<IRestRefusjonEøs[], DefaultError, Parameters>, 'mutationKey' | 'mutationFn'> & {
    refusjonEøsId: number;
};

export function useSlettRefusjonEøs(options: Options) {
    const { refusjonEøsId, ...rest } = options;
    return useMutation({
        mutationKey: mutationKeys.slettRefusjonEøs(refusjonEøsId),
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, refusjonEøsId } = parameters;
            return slettRefusjonEøs(behandlingId, refusjonEøsId);
        },
        ...rest,
    });
}
