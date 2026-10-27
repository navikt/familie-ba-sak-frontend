import { ApiFeil } from '@api/client/apiClient';
import { registrerDødsfall } from '@api/registrerDødsfallDato';
import { useRegistrerDødsfallDato } from '@hooks/useRegistrerDødsfallDato';
import { renderHook, waitFor } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/registrerDødsfallDato');

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const parameters = {
    dødsfallDato: '2026-01-15',
    begrunnelse: 'Begrunnelse',
    personIdent: '12345678910',
    behandlingId: behandling.behandlingId,
};

describe('useRegistrerDødsfallDato', () => {
    test('skal kalle registrerDødsfall med payload og behandlingId', async () => {
        vi.mocked(registrerDødsfall).mockResolvedValueOnce(behandling);

        const { result } = renderHook(() => useRegistrerDødsfallDato(), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(registrerDødsfall).toHaveBeenCalledTimes(1);
        expect(registrerDødsfall).toHaveBeenCalledWith(
            {
                dødsfallDato: parameters.dødsfallDato,
                begrunnelse: parameters.begrunnelse,
                personIdent: parameters.personIdent,
            },
            parameters.behandlingId
        );
        expect(result.current.data).toEqual(behandling);
    });

    test('skal kalle onSuccess ved vellykket registrering', async () => {
        const onSuccess = vi.fn();
        vi.mocked(registrerDødsfall).mockResolvedValueOnce(behandling);

        const { result } = renderHook(() => useRegistrerDødsfallDato({ onSuccess }), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(behandling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom registreringen feiler', async () => {
        const feil = ApiFeil.fraFeilmelding('Noe gikk galt');
        vi.mocked(registrerDødsfall).mockRejectedValueOnce(feil);

        const { result } = renderHook(() => useRegistrerDødsfallDato(), { wrapper: TestProviders });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBe(feil);
    });
});
