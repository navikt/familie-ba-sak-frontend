import * as ToastContext from '@context/ToastContext';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { render } from '@testutils/testrender';
import { HttpResponse, http } from 'msw';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { BrevmottakerDetaljerBehandling } from './BrevmottakerDetaljerBehandling';

vi.mock('@hooks/useErLesevisning');
vi.mock('@sider/Fagsak/Behandling/context/BehandlingContext');

const SLETT_BREVMOTTAKER_URL = '/familie-ba-sak/api/brevmottaker/:behandlingId/:brevmottakerId';
const brevmottaker = lagBrevmottakerBehandling({ id: 7 });
const behandling = lagBehandling({ behandlingId: 42, brevmottakere: [brevmottaker] });
const oppdatertBehandling = lagBehandling({ ...behandling, brevmottakere: [] });
const settÅpenBehandling = vi.fn();
const settToast = vi.fn();

describe('BrevmottakerDetaljerBehandling', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useErLesevisning).mockReturnValue(false);
        vi.mocked(useBehandlingContext).mockReturnValue({ behandling, settÅpenBehandling });
        vi.spyOn(ToastContext, 'useToastContext').mockReturnValue({
            settToast,
            settToasts: vi.fn(),
            toasts: {},
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('skal vise brevmottakeren uten fjern-knapp i lesevisning', () => {
        vi.mocked(useErLesevisning).mockReturnValue(true);

        const { screen } = render(<BrevmottakerDetaljerBehandling brevmottaker={brevmottaker} />);

        expect(screen.getByRole('heading', { name: 'Fullmektig' })).toBeInTheDocument();
        expect(screen.getByText(brevmottaker.navn)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Fjern fullmektig' })).not.toBeInTheDocument();
    });

    test('skal slette riktig brevmottaker, oppdatere behandlingen og vise en suksessmelding', async () => {
        const slettForespørsel = vi.fn();
        server.use(
            http.delete(SLETT_BREVMOTTAKER_URL, ({ params }) => {
                slettForespørsel(params);
                return HttpResponse.json(byggSuksessRessurs(oppdatertBehandling));
            })
        );

        const { screen, user } = render(<BrevmottakerDetaljerBehandling brevmottaker={brevmottaker} />);

        await user.click(screen.getByRole('button', { name: 'Fjern fullmektig' }));

        await waitFor(() => {
            expect(settÅpenBehandling).toHaveBeenCalledWith(byggSuksessRessurs(oppdatertBehandling));
            expect(settToast).toHaveBeenCalledWith(ToastTyper.BREVMOTTAKER_FJERNET, {
                alertType: AlertType.SUCCESS,
                tekst: 'Brevmottaker fjernet',
            });
        });
        expect(slettForespørsel).toHaveBeenCalledExactlyOnceWith({
            behandlingId: '42',
            brevmottakerId: '7',
        });
    });

    test('skal deaktivere fjern-knappen mens brevmottakeren slettes', async () => {
        let fullførForespørsel: () => void = () => {};
        const forespørselFullført = new Promise<void>(resolve => {
            fullførForespørsel = resolve;
        });
        server.use(
            http.delete(SLETT_BREVMOTTAKER_URL, async () => {
                await forespørselFullført;
                return HttpResponse.json(byggSuksessRessurs(oppdatertBehandling));
            })
        );

        const { screen, user } = render(<BrevmottakerDetaljerBehandling brevmottaker={brevmottaker} />);
        const fjernKnapp = screen.getByRole('button', { name: 'Fjern fullmektig' });

        try {
            await user.click(fjernKnapp);

            await waitFor(() => expect(fjernKnapp).toBeDisabled());
            expect(settÅpenBehandling).not.toHaveBeenCalled();
            expect(settToast).not.toHaveBeenCalled();
        } finally {
            fullførForespørsel();
        }

        await waitFor(() => expect(fjernKnapp).toBeEnabled());
        expect(settÅpenBehandling).toHaveBeenCalledWith(byggSuksessRessurs(oppdatertBehandling));
    });

    test('skal vise feil uten å oppdatere behandlingen eller vise en suksessmelding når sletting feiler', async () => {
        server.use(
            http.delete(SLETT_BREVMOTTAKER_URL, () =>
                HttpResponse.json({
                    status: 'FUNKSJONELL_FEIL',
                    melding: 'Kunne ikke slette brevmottaker',
                    frontendFeilmelding: 'Brevmottakeren kunne ikke fjernes.',
                })
            )
        );

        const { screen, user } = render(<BrevmottakerDetaljerBehandling brevmottaker={brevmottaker} />);

        await user.click(screen.getByRole('button', { name: 'Fjern fullmektig' }));

        expect(await screen.findByText('Brevmottakeren kunne ikke fjernes.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fjern fullmektig' })).toBeEnabled();
        expect(settÅpenBehandling).not.toHaveBeenCalled();
        expect(settToast).not.toHaveBeenCalled();
    });
});
