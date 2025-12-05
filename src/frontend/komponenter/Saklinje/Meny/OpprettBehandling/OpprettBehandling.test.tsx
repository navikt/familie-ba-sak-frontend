import React, { type PropsWithChildren } from 'react';

import { expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { OpprettBehandling } from './OpprettBehandling';
import { render } from '../../../../testutils/testrender';

function Wrapper({ children }: PropsWithChildren) {
    return (
        <ActionMenu open={true}>
            <ActionMenu.Content>{children}</ActionMenu.Content>
        </ActionMenu>
    );
}

describe('OpprettBehandling', () => {
    test('skal rendre komponent som forventet', () => {
        const åpneModal = vi.fn();

        const { screen } = render(<OpprettBehandling åpneModal={åpneModal} />, { wrapper: Wrapper });

        expect(screen.getByRole('menuitem', { name: 'Opprett behandling' })).toBeInTheDocument();
    });

    test('skal kunne klikke på opprett behandling', async () => {
        const åpneModal = vi.fn();

        const { screen, user } = render(<OpprettBehandling åpneModal={åpneModal} />, { wrapper: Wrapper });

        const knapp = screen.getByRole('menuitem', { name: 'Opprett behandling' });
        await user.click(knapp);

        expect(åpneModal).toHaveBeenCalledOnce();
    });
});
