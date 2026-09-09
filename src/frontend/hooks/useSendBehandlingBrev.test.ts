import { sendBehandlingBrev } from '@api/sendBehandlingBrev';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useSendBehandlingBrev } from './useSendBehandlingBrev';

vi.mock('@api/sendBehandlingBrev');

afterEach(() => {
    vi.clearAllMocks();
});

const payload = {
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: Målform.NB,
    brevmal: Brevmal.INNHENTE_OPPLYSNINGER,
};

const behandling = { behandlingId: 123456 } as IBehandling;

describe('useSendBehandlingBrev', () => {
    test('kaller sendBehandlingBrev med behandlingId og payload', async () => {
        vi.mocked(sendBehandlingBrev).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSendBehandlingBrev(123456), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(sendBehandlingBrev).toHaveBeenCalledWith(123456, payload);
    });

    test('kaller onSuccess-callback ved vellykket sending', async () => {
        vi.mocked(sendBehandlingBrev).mockResolvedValue(behandling);
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useSendBehandlingBrev(123456, { onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(behandling, payload, undefined, expect.any(Object)));
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(sendBehandlingBrev).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSendBehandlingBrev(123456), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
