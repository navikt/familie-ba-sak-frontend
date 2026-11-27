import { hentPerson } from '@api/hentPerson';
import { useHentPerson } from '@hooks/useHentPerson';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { renderHook, waitFor } from '@testing-library/react';
import { lagForelderBarnRelasjon, lagPerson } from '@testutils/testdata/personTestdata';
import { TestProviders } from '@testutils/testrender';
import { ForelderBarnRelasjonRolle } from '@typer/person';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/hentPerson');
vi.mock('@hooks/useSkalObfuskereData', () => ({
    useSkalObfuskereData: vi.fn(),
}));

afterEach(() => {
    vi.clearAllMocks();
});

const person = lagPerson({
    navn: 'Ola Nordmann',
    bostedsadresse: { adresse: 'Ekte gate 5', postnummer: '1234' },
    forelderBarnRelasjon: [
        lagForelderBarnRelasjon({ navn: 'Eldste Barn', fødselsdato: '2018-01-01' }),
        lagForelderBarnRelasjon({ navn: 'Yngste Barn', fødselsdato: '2022-01-01' }),
        lagForelderBarnRelasjon({
            navn: 'Kari Nordmann',
            fødselsdato: '1990-01-01',
            relasjonRolle: ForelderBarnRelasjonRolle.MOR,
        }),
    ],
});

describe('useHentPerson', () => {
    test('skal hente person med ident', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);
        vi.mocked(hentPerson).mockResolvedValue(person);

        // Act
        const { result } = renderHook(() => useHentPerson({ ident: '12345678903' }), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentPerson).toHaveBeenCalledWith({ ident: '12345678903' });
        expect(result.current.data).toEqual(person);
    });

    test('skal ikke hente person når ident er undefined', () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);

        // Act
        const { result } = renderHook(() => useHentPerson({ ident: undefined }), {
            wrapper: TestProviders,
        });

        // Assert
        expect(result.current.fetchStatus).toBe('idle');
        expect(hentPerson).not.toHaveBeenCalled();
    });

    test('skal obfuskere persondata når data skal obfuskeres', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(true);
        vi.mocked(hentPerson).mockResolvedValue(person);

        // Act
        const { result } = renderHook(() => useHentPerson({ ident: '12345678903' }), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.navn).toBe('Søker Søkersen');
        expect(result.current.data?.bostedsadresse).toEqual({ adresse: 'Adresseveien 1', postnummer: '0001' });
        expect(result.current.data?.forelderBarnRelasjon.map(relasjon => relasjon.navn)).toEqual([
            '[1] Barn Barnesen',
            '[2] Barn Barnesen',
            'Søker Søkersen',
        ]);
    });

    test('skal sette isError dersom hentPerson feiler', async () => {
        // Arrange
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);
        vi.mocked(hentPerson).mockRejectedValue(new Error('Noe gikk galt'));

        // Act
        const { result } = renderHook(() => useHentPerson({ ident: '12345678903' }), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
