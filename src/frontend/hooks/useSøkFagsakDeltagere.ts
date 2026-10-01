import { søkFagsakDeltagere } from '@api/søkFagsakDeltagere';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IFagsakDeltager } from '@typer/fagsakdeltager';
import { obfuskerFagsakDeltager } from '@utils/obfuskerData';

interface Parameters {
    personIdent: string;
}

type Options = Omit<UseMutationOptions<IFagsakDeltager[], DefaultError, Parameters>, 'mutationFn'>;

export function useSøkFagsakDeltagere(options?: Options) {
    const skalObfuskereData = useSkalObfuskereData();
    return useMutation({
        mutationFn: async ({ personIdent }: Parameters) => {
            const fagsakDeltagere = await søkFagsakDeltagere(personIdent);
            return skalObfuskereData ? fagsakDeltagere.map(obfuskerFagsakDeltager) : fagsakDeltagere;
        },
        ...options,
    });
}
