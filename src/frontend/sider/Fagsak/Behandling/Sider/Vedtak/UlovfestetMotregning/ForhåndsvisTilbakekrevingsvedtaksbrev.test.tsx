import { hentEllerOpprettTilbakekrevingsvedtaksbrev } from '@api/hentEllerOpprettTilbakekrevingsvedtaksbrev';
import { useBehandling } from '@hooks/useBehandling';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagSaksbehandler } from '@testutils/testdata/saksbehandlerTestdata';
import { render } from '@testutils/testrender';
import { BehandlerRolle, BehandlingSteg } from '@typer/behandling';
import type { PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { ForhåndsvisTilbakekrevingsvedtaksbrev } from './ForhåndsvisTilbakekrevingsvedtaksbrev';

vi.mock('@hooks/useBehandling');
vi.mock('@hooks/useSaksbehandler');
vi.mock('@api/hentEllerOpprettTilbakekrevingsvedtaksbrev');

const bytes = 'JVBERi0xLjQK'; // base64-encodet "%PDF-1.4"
const objectUrl = 'blob:http://localhost/abc-123';

function Wrapper({ children }: PropsWithChildren) {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

beforeEach(() => {
    // jsdom implementerer ikke createObjectURL, så den må stubbes
    window.URL.createObjectURL = vi.fn().mockReturnValue(objectUrl);
    vi.mocked(useBehandling).mockReturnValue(
        lagBehandling({ behandlingId: 123, steg: BehandlingSteg.SEND_TIL_BESLUTTER })
    );
    vi.mocked(useSaksbehandler).mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.SAKSBEHANDLER }));
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('ForhåndsvisTilbakekrevingsvedtaksbrev', () => {
    test('viser knapp for å forhåndsvise tilbakekrevingsvedtaksbrev', () => {
        const { screen } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        expect(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' })).toBeVisible();
    });

    test('viser laster-tekst mens pdf hentes, og deretter pdf i en iframe', async () => {
        let resolvePromise: (bytes: string) => void = () => {};

        vi.mocked(hentEllerOpprettTilbakekrevingsvedtaksbrev).mockReturnValue(
            new Promise<string>(resolve => {
                resolvePromise = resolve;
            })
        );

        const { screen, user } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' }));

        expect(await screen.findByText('Forhåndsvis tilbakekrevingsvedtaksbrev')).toBeVisible();
        expect(screen.getByRole('heading', { name: 'Laster Tilbakekrevingsvedtaksbrev...' })).toBeVisible();

        resolvePromise(bytes);

        const iframe = await screen.findByTitle('Tilbakekrevingsvedtaksbrev');
        expect(iframe).toHaveAttribute('src', objectUrl);
        expect(screen.queryByRole('heading', { name: 'Laster Tilbakekrevingsvedtaksbrev...' })).not.toBeInTheDocument();
    });

    test('viser feilmelding dersom henting av pdf feiler', async () => {
        vi.mocked(hentEllerOpprettTilbakekrevingsvedtaksbrev).mockRejectedValue(new Error('Noe gikk galt'));

        const { screen, user } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' }));

        expect(await screen.findByText('Noe gikk galt')).toBeVisible();
        expect(screen.queryByTitle('Tilbakekrevingsvedtaksbrev')).not.toBeInTheDocument();
    });

    test('kaller apiet med POST for saksbehandler og behandlingen er før beslutte vedtak-steget', async () => {
        vi.mocked(useBehandling).mockReturnValue(
            lagBehandling({ behandlingId: 123, steg: BehandlingSteg.SEND_TIL_BESLUTTER })
        );
        vi.mocked(useSaksbehandler).mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.SAKSBEHANDLER }));
        vi.mocked(hentEllerOpprettTilbakekrevingsvedtaksbrev).mockResolvedValue(bytes);

        const { screen, user } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' }));

        await screen.findByTitle('Tilbakekrevingsvedtaksbrev');
        expect(hentEllerOpprettTilbakekrevingsvedtaksbrev).toHaveBeenCalledWith('POST', { behandlingId: 123 });
    });

    test('kaller apiet med GET for veileder og behandlingen er før beslutte vedtak-steget', async () => {
        vi.mocked(useBehandling).mockReturnValue(
            lagBehandling({ behandlingId: 123, steg: BehandlingSteg.SEND_TIL_BESLUTTER })
        );
        vi.mocked(useSaksbehandler).mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.VEILEDER }));
        vi.mocked(hentEllerOpprettTilbakekrevingsvedtaksbrev).mockResolvedValue(bytes);

        const { screen, user } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' }));

        await screen.findByTitle('Tilbakekrevingsvedtaksbrev');
        expect(hentEllerOpprettTilbakekrevingsvedtaksbrev).toHaveBeenCalledWith('GET', { behandlingId: 123 });
    });

    test('kaller apiet med POST for beslutter og behandlingen er på beslutte vedtak-steget', async () => {
        vi.mocked(useBehandling).mockReturnValue(
            lagBehandling({ behandlingId: 123, steg: BehandlingSteg.BESLUTTE_VEDTAK })
        );
        vi.mocked(useSaksbehandler).mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.BESLUTTER }));
        vi.mocked(hentEllerOpprettTilbakekrevingsvedtaksbrev).mockResolvedValue(bytes);

        const { screen, user } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' }));

        await screen.findByTitle('Tilbakekrevingsvedtaksbrev');
        expect(hentEllerOpprettTilbakekrevingsvedtaksbrev).toHaveBeenCalledWith('POST', { behandlingId: 123 });
    });

    test('kaller apiet med GET for beslutter, men behandlingen er forbi beslutte vedtak-steget', async () => {
        vi.mocked(useBehandling).mockReturnValue(
            lagBehandling({ behandlingId: 123, steg: BehandlingSteg.IVERKSETT_MOT_OPPDRAG })
        );
        vi.mocked(useSaksbehandler).mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.BESLUTTER }));
        vi.mocked(hentEllerOpprettTilbakekrevingsvedtaksbrev).mockResolvedValue(bytes);

        const { screen, user } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' }));

        await screen.findByTitle('Tilbakekrevingsvedtaksbrev');
        expect(hentEllerOpprettTilbakekrevingsvedtaksbrev).toHaveBeenCalledWith('GET', { behandlingId: 123 });
    });

    test('kaller apiet med GET for saksbehandler og behandlingen er på beslutte vedtak-steget', async () => {
        vi.mocked(useBehandling).mockReturnValue(
            lagBehandling({ behandlingId: 123, steg: BehandlingSteg.BESLUTTE_VEDTAK })
        );
        vi.mocked(useSaksbehandler).mockReturnValue(lagSaksbehandler({ rolle: BehandlerRolle.SAKSBEHANDLER }));
        vi.mocked(hentEllerOpprettTilbakekrevingsvedtaksbrev).mockResolvedValue(bytes);

        const { screen, user } = render(<ForhåndsvisTilbakekrevingsvedtaksbrev />, { wrapper: Wrapper });

        await user.click(screen.getByRole('button', { name: 'Vis tilbakekrevingsvedtaksbrev' }));

        await screen.findByTitle('Tilbakekrevingsvedtaksbrev');
        expect(hentEllerOpprettTilbakekrevingsvedtaksbrev).toHaveBeenCalledWith('GET', { behandlingId: 123 });
    });
});
