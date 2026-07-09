import { sendInformasjonsbrev } from '@api/sendInformasjonsbrev';
import { Informasjonsbrev } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useSendInformasjonsbrev } from './useSendInformasjonsbrev';

vi.mock('@api/sendInformasjonsbrev');

afterEach(() => {
    vi.clearAllMocks();
});

const payload = {
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: Målform.NB,
    brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
    manuelleBrevmottakere: [],
};

describe('useSendInformasjonsbrev', () => {
    test('kaller sendInformasjonsbrev med fagsakId og payload', async () => {
        vi.mocked(sendInformasjonsbrev).mockResolvedValue(undefined);

        const { result } = renderHook(() => useSendInformasjonsbrev(123456), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(sendInformasjonsbrev).toHaveBeenCalledWith(123456, payload);
    });

    test('kaller onSuccess-callback ved vellykket sending', async () => {
        vi.mocked(sendInformasjonsbrev).mockResolvedValue(undefined);
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useSendInformasjonsbrev(123456, { onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(undefined, payload, undefined, expect.any(Object)));
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(sendInformasjonsbrev).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSendInformasjonsbrev(123456), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
