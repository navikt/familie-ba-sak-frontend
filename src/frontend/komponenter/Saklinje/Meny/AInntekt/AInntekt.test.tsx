import { ActionMenu } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { waitFor } from '@testing-library/react';
import { server } from '@testutils/mocks/node';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import type { IMinimalFagsak } from '@typer/fagsak';
import { delay, HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, type MockInstance, vi } from 'vitest';
import { AInntekt } from './AInntekt';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
}

function Wrapper({ fagsak = lagFagsak(), children }: WrapperProps) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={fagsak}>
                <ActionMenu open={true}>
                    <ActionMenu.Content>{children}</ActionMenu.Content>
                </ActionMenu>
            </FagsakProvider>
        </TestProviders>
    );
}

describe('AInntekt', () => {
    let windowOpenSpy: MockInstance;

    beforeEach(() => {
        windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => {
        windowOpenSpy.mockRestore();
    });

    test('skal rendre komponent', () => {
        const { screen } = render(<AInntekt />, { wrapper: Wrapper });

        expect(screen.getByRole('menuitem', { name: 'A-Inntekt' })).toBeInTheDocument();
    });

    test('skal vise loader når man trykker på a-inntekt', async () => {
        server.use(
            http.post('/familie-ba-sak/api/a-inntekt/hent-url', async () => {
                await delay('infinite');
                return HttpResponse.json(byggSuksessRessurs('url'));
            })
        );

        const { screen, user } = render(<AInntekt />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'A-Inntekt' });
        await user.click(knapp);

        const loader = await screen.findByLabelText('Venter…');
        expect(loader).toBeInTheDocument();

        expect(windowOpenSpy).not.toHaveBeenCalled();
    });

    test('skal kunne åpne a-inntekt', async () => {
        const fagsak = lagFagsak();
        const { screen, user } = render(<AInntekt />, {
            wrapper: ({ children }) => <Wrapper fagsak={fagsak}>{children}</Wrapper>,
        });

        const knapp = screen.getByRole('menuitem', { name: 'A-Inntekt' });
        await user.click(knapp);

        await waitFor(() => {
            expect(windowOpenSpy).toHaveBeenCalledExactlyOnceWith(`url/${fagsak.søkerFødselsnummer}`, '_blank');
        });
    });

    test('skal vise teknisk feil-modal hvis kallet mot a-inntekt feiler', async () => {
        server.use(
            http.post('/familie-ba-sak/api/a-inntekt/hent-url', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const { screen, user } = render(<AInntekt />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'A-Inntekt' });
        await user.click(knapp);

        expect(await screen.findByRole('dialog', { name: 'Teknisk feil' })).toBeInTheDocument();
        expect(
            screen.getByText(
                'Det oppstod en feil på serveren. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.'
            )
        ).toBeInTheDocument();

        expect(windowOpenSpy).not.toHaveBeenCalled();
    });
});
