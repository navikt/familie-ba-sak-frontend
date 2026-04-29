import type { PropsWithChildren } from 'react';

import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect } from 'vitest';

import { TilbakekrevingsbehandlingOpprettetModal } from './TilbakekrevingsbehandlingOpprettetModal';
import { FagsakProvider } from '../../../../sider/Fagsak/FagsakContext';
import { lagFagsak } from '../../../../testutils/testdata/fagsakTestdata';
import { render } from '../../../../testutils/testrender';
import type { IMinimalFagsak } from '../../../../typer/fagsak';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
}

function Wrapper({ fagsak = lagFagsak(), children }: WrapperProps) {
    return (
        <MemoryRouter>
            <Routes>
                <Route path={'/'} element={<FagsakProvider fagsak={fagsak}>{children}</FagsakProvider>} />
                <Route path={'/oppgaver'} element={<h1>Oppgaver</h1>} />
                <Route path={`/fagsak/${fagsak.id}/saksoversikt`} element={<h1>Saksoversikt</h1>} />
            </Routes>
        </MemoryRouter>
    );
}

describe('TilbakekrevingsbehandlingOpprettetModal', () => {
    test('skal rendre modalen som forventet', () => {
        const lukkModal = vi.fn();

        const { screen } = render(<TilbakekrevingsbehandlingOpprettetModal lukkModal={lukkModal} />, {
            wrapper: Wrapper,
        });

        expect(screen.getByRole('dialog', { name: 'Tilbakekrevingsbehandling opprettes' })).toBeInTheDocument();
        expect(
            screen.getByText(
                'Tilbakekrevingsbehandling opprettes, men det kan ta litt tid (ca 30 sekunder) før den blir tilgjengelig i saksoversikten og oppgavebenken.'
            )
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gå til oppgavebenken' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gå til saksoversikten' })).toBeInTheDocument();
    });

    test('skal kunne navigere til oppgavebenken', async () => {
        const lukkModal = vi.fn();

        const { screen, user } = render(<TilbakekrevingsbehandlingOpprettetModal lukkModal={lukkModal} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Gå til oppgavebenken' }));

        expect(screen.getByRole('heading', { name: 'Oppgaver' })).toBeInTheDocument();
    });

    test('skal kunne navigere til saksoversikten', async () => {
        const lukkModal = vi.fn();

        const { screen, user } = render(<TilbakekrevingsbehandlingOpprettetModal lukkModal={lukkModal} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Gå til saksoversikten' }));

        expect(screen.getByRole('heading', { name: 'Saksoversikt' })).toBeInTheDocument();
    });

    test('skal kunne lukke modalen', async () => {
        const lukkModal = vi.fn();

        const { screen, user } = render(<TilbakekrevingsbehandlingOpprettetModal lukkModal={lukkModal} />, {
            wrapper: Wrapper,
        });

        await user.click(screen.getByRole('button', { name: 'Lukk' }));

        expect(lukkModal).toHaveBeenCalledOnce();
    });
});
