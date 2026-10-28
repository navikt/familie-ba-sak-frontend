import { ApiFeil } from '@api/client/apiClient';
import { settAktivBrukerIModiaContext } from '@api/settAktivBrukerIModiaContext';
import { useToastContext } from '@context/ToastContext';
import { useSettAktivBrukerIModiaContext } from '@hooks/useSettAktivBrukerIModiaContext';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/settAktivBrukerIModiaContext');

afterEach(() => {
    vi.clearAllMocks();
});

const personIdent = '12345678910';

function renderHookMedToasts() {
    return renderHook(
        () => ({
            mutation: useSettAktivBrukerIModiaContext(),
            toasts: useToastContext().toasts,
        }),
        { wrapper: TestProviders }
    );
}

describe('useSettAktivBrukerIModiaContext', () => {
    test('skal kalle settAktivBrukerIModiaContext med personIdent', async () => {
        vi.mocked(settAktivBrukerIModiaContext).mockResolvedValueOnce(undefined);

        const { result } = renderHookMedToasts();

        result.current.mutation.mutate(personIdent);

        await waitFor(() => expect(result.current.mutation.isSuccess).toBe(true));
        expect(settAktivBrukerIModiaContext).toHaveBeenCalledTimes(1);
        expect(settAktivBrukerIModiaContext).toHaveBeenCalledWith(personIdent);
        expect(result.current.toasts).toEqual({});
    });

    test('skal vise advarsel-toast dersom kallet feiler', async () => {
        const feil = ApiFeil.fraFeilmelding('Noe gikk galt');
        vi.mocked(settAktivBrukerIModiaContext).mockRejectedValueOnce(feil);

        const { result } = renderHookMedToasts();

        result.current.mutation.mutate(personIdent);

        await waitFor(() => expect(result.current.mutation.isError).toBe(true));
        expect(result.current.mutation.error).toBe(feil);
        expect(result.current.toasts[ToastTyper.KLARTE_IKKE_OPPDATERE_MODIA_KONTEKST]).toEqual({
            alertType: AlertType.WARNING,
            tekst: 'Klarte ikke å oppdatere bruker i Modia.',
        });
    });
});
