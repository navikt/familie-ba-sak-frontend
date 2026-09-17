import { sendManueltBrev } from '@api/sendManueltBrev';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { IBehandling } from '@typer/behandling';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useSendManueltBrev } from './useSendManueltBrev';

vi.mock('@api/sendManueltBrev');

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

describe('useSendManueltBrev', () => {
    test('kaller sendManueltBrev med behandlingId og payload', async () => {
        vi.mocked(sendManueltBrev).mockResolvedValue(behandling);

        const { result } = renderHook(() => useSendManueltBrev(123456), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(sendManueltBrev).toHaveBeenCalledWith(123456, payload);
    });

    test('kaller onSuccess-callback ved vellykket sending', async () => {
        vi.mocked(sendManueltBrev).mockResolvedValue(behandling);
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useSendManueltBrev(123456, { onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(behandling, payload, undefined, expect.any(Object)));
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(sendManueltBrev).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSendManueltBrev(123456), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
