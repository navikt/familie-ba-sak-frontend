import React, { type PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { EndreBehandlendeEnhetNy } from './EndreBehandlendeEnhetNy';
import { render } from '../../../../../testutils/testrender';

function Wrapper({ children }: PropsWithChildren) {
    return (
        <ActionMenu open={true}>
            <ActionMenu.Content>{children}</ActionMenu.Content>
        </ActionMenu>
    );
}

describe('EndreBehandlendeEnhetNy', () => {
    test('skal rendre komponent', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<EndreBehandlendeEnhetNy åpneModal={åpneModal} />, { wrapper: Wrapper });
        expect(screen.getByRole('menuitem', { name: 'Endre behandlende enhet' })).toBeInTheDocument();
    });

    test('skal kunne åpne modal', async () => {
        const åpneModal = vi.fn();
        const { screen, user } = render(<EndreBehandlendeEnhetNy åpneModal={åpneModal} />, { wrapper: Wrapper });
        const knapp = screen.getByRole('menuitem', { name: 'Endre behandlende enhet' });
        await user.click(knapp);
        expect(åpneModal).toHaveBeenCalledOnce();
    });
});
