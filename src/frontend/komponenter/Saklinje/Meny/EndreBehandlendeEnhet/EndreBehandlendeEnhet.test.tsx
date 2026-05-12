import type { PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { EndreBehandlendeEnhet } from './EndreBehandlendeEnhet';
import { render } from '../../../../testutils/testrender';

function Wrapper({ children }: PropsWithChildren) {
    return (
        <ActionMenu open={true}>
            <ActionMenu.Content>{children}</ActionMenu.Content>
        </ActionMenu>
    );
}

describe('EndreBehandlendeEnhet', () => {
    test('skal rendre komponent', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<EndreBehandlendeEnhet åpneModal={åpneModal} />, { wrapper: Wrapper });
        expect(screen.getByRole('menuitem', { name: 'Endre behandlende enhet' })).toBeInTheDocument();
    });

    test('skal kunne åpne modal', async () => {
        const åpneModal = vi.fn();
        const { screen, user } = render(<EndreBehandlendeEnhet åpneModal={åpneModal} />, { wrapper: Wrapper });
        const knapp = screen.getByRole('menuitem', { name: 'Endre behandlende enhet' });
        await user.click(knapp);
        expect(åpneModal).toHaveBeenCalledOnce();
    });
});
