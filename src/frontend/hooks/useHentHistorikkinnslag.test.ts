import { type HistorikkinnslagDto, hentHistorikkinnslag } from '@api/hentHistorikkinnslag';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { LoggType } from '@typer/logg';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentHistorikkinnslag } from './useHentHistorikkinnslag';

vi.mock('@api/hentHistorikkinnslag');
vi.mock('@hooks/useSkalObfuskereData', () => ({
    useSkalObfuskereData: vi.fn(),
}));

afterEach(() => {
    vi.clearAllMocks();
});

const historikkinnslag: HistorikkinnslagDto[] = [
    {
        id: 1,
        opprettetAv: 'Sak Saksbehandler',
        opprettetTidspunkt: '2026-01-01T12:00:00',
        behandlingId: 123,
        type: LoggType.BEHANDLING_OPPRETTET,
        tittel: 'Behandling opprettet',
        rolle: 'SAKSBEHANDLER',
        tekst: 'Historikktekst',
    },
    {
        id: 2,
        opprettetAv: 'Sak Saksbehandler',
        opprettetTidspunkt: '2026-01-02T12:00:00',
        behandlingId: 123,
        type: LoggType.BREVMOTTAKER_LAGT_TIL_ELLER_FJERNET,
        tittel: 'Brevmottaker endret',
        rolle: 'SAKSBEHANDLER',
        tekst: 'Personopplysninger',
    },
    {
        id: 3,
        opprettetAv: 'Sak Saksbehandler',
        opprettetTidspunkt: '2026-01-03T12:00:00',
        behandlingId: 123,
        type: LoggType.BARN_LAGT_TIL,
        tittel: 'Barn lagt til',
        rolle: 'SAKSBEHANDLER',
        tekst: 'Personopplysninger',
    },
];

describe('useHentHistorikkinnslag', () => {
    test('henter og formaterer historikkinnslag', async () => {
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);
        vi.mocked(hentHistorikkinnslag).mockResolvedValue(historikkinnslag);

        const { result } = renderHook(() => useHentHistorikkinnslag(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentHistorikkinnslag).toHaveBeenCalledWith(123);
        expect(result.current.data).toEqual([
            {
                id: '1',
                dato: '01.01.26 12:00',
                utførtAv: 'Sak Saksbehandler',
                rolle: 'SAKSBEHANDLER',
                tittel: 'Behandling opprettet',
                beskrivelse: 'Historikktekst',
            },
            {
                id: '2',
                dato: '02.01.26 12:00',
                utførtAv: 'Sak Saksbehandler',
                rolle: 'SAKSBEHANDLER',
                tittel: 'Brevmottaker endret',
                beskrivelse: 'Personopplysninger',
            },
            {
                id: '3',
                dato: '03.01.26 12:00',
                utførtAv: 'Sak Saksbehandler',
                rolle: 'SAKSBEHANDLER',
                tittel: 'Barn lagt til',
                beskrivelse: 'Personopplysninger',
            },
        ]);
    });

    test('obfuskerer tekst for brevmottaker og barn når obfuskering er aktivert', async () => {
        vi.mocked(useSkalObfuskereData).mockReturnValue(true);
        vi.mocked(hentHistorikkinnslag).mockResolvedValue(historikkinnslag);

        const { result } = renderHook(() => useHentHistorikkinnslag(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.map(innslag => innslag.beskrivelse)).toEqual(['Historikktekst', '', '']);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(useSkalObfuskereData).mockReturnValue(false);
        vi.mocked(hentHistorikkinnslag).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentHistorikkinnslag(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
