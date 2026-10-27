import { ApiFeil } from '@api/client/apiClient';
import { oppdaterRegisteropplysninger } from '@api/oppdaterRegisteropplysninger';
import { useOppdaterRegisteropplysninger } from '@hooks/useOppdaterRegisteropplysninger';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/oppdaterRegisteropplysninger');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();
const parameters = { behandlingId: behandling.behandlingId };

describe('useOppdaterRegisteropplysninger', () => {
    test('skal oppdatere registeropplysninger for behandlingen', async () => {
        vi.mocked(oppdaterRegisteropplysninger).mockResolvedValueOnce(behandling);

        const { result } = renderHook(() => useOppdaterRegisteropplysninger(), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(oppdaterRegisteropplysninger).toHaveBeenCalledTimes(1);
        expect(oppdaterRegisteropplysninger).toHaveBeenCalledWith(parameters.behandlingId);
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess ved vellykket oppdatering', async () => {
        const onSuccess = vi.fn();
        vi.mocked(oppdaterRegisteropplysninger).mockResolvedValueOnce(behandling);

        const { result } = renderHook(() => useOppdaterRegisteropplysninger({ onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError og kalle onError dersom oppdateringen feiler', async () => {
        const feil = ApiFeil.fraFeilmelding('Kunne ikke oppdatere registeropplysninger');
        const onError = vi.fn();
        vi.mocked(oppdaterRegisteropplysninger).mockRejectedValueOnce(feil);

        const { result } = renderHook(() => useOppdaterRegisteropplysninger({ onError }), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBe(feil);
        expect(onError).toHaveBeenCalledWith(feil, parameters, undefined, expect.any(Object));
    });
});
