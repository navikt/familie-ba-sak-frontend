import { søkFagsakDeltagere } from '@api/søkFagsakDeltagere';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useSøkFagsakDeltagere } from '@hooks/useSøkFagsakDeltagere';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { FagsakDeltagerRolle, type IFagsakDeltager } from '@typer/fagsakdeltager';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/søkFagsakDeltagere');
vi.mock('@hooks/useSkalObfuskereData');

afterEach(() => {
    vi.clearAllMocks();
});

const personIdent = '12345678910';

const søker: IFagsakDeltager = {
    navn: 'Søker Søkersen',
    ident: personIdent,
    rolle: FagsakDeltagerRolle.Forelder,
    harTilgang: true,
    erEgenAnsatt: false,
    fagsakId: 1,
};

const barn: IFagsakDeltager = {
    navn: 'Barn Barnesen',
    ident: '01012012345',
    rolle: FagsakDeltagerRolle.Barn,
    harTilgang: true,
    erEgenAnsatt: false,
    fagsakId: 1,
};

describe('useSøkFagsakDeltagere', () => {
    test('skal kalle søkFagsakDeltagere med riktig personIdent', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([søker]);

        const { result } = renderHook(() => useSøkFagsakDeltagere(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ personIdent });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(søkFagsakDeltagere).toHaveBeenCalledTimes(1);
        expect(søkFagsakDeltagere).toHaveBeenCalledWith(personIdent);
    });

    test('skal returnere fagsakdeltagerne uendret når data ikke skal obfuskeres', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([søker, barn]);

        const { result } = renderHook(() => useSøkFagsakDeltagere(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ personIdent });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual([søker, barn]);
    });

    test('skal erstatte navn med rolle når data skal obfuskeres', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(true);
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([søker, barn]);

        const { result } = renderHook(() => useSøkFagsakDeltagere(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ personIdent });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual([
            { ...søker, navn: 'Forelder' },
            { ...barn, navn: 'Barn' },
        ]);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);
        vi.mocked(søkFagsakDeltagere).mockResolvedValue([søker]);

        const { result } = renderHook(() => useSøkFagsakDeltagere({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ personIdent });

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith([søker], { personIdent }, undefined, expect.any(Object))
        );
    });

    test('skal håndtere feil fra api-kallet', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(true);
        vi.mocked(søkFagsakDeltagere).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useSøkFagsakDeltagere(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ personIdent });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
        expect(result.current.data).toBeUndefined();
    });
});
