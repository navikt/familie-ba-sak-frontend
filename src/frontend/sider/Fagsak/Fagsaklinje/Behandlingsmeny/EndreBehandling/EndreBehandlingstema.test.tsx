import React, { type PropsWithChildren } from 'react';

import { describe, expect } from 'vitest';

import { ActionMenu } from '@navikt/ds-react';

import { EndreBehandlingstema } from './EndreBehandlingstema';
import { lagFagsak } from '../../../../../testutils/testdata/fagsakTestdata';
import { render } from '../../../../../testutils/testrender';
import { FagsakType, type IMinimalFagsak } from '../../../../../typer/fagsak';
import { FagsakProvider } from '../../../FagsakContext';

interface WrapperProps extends PropsWithChildren {
    fagsak?: IMinimalFagsak;
}

function Wrapper({ fagsak = lagFagsak({ fagsakType: FagsakType.NORMAL }), children }: WrapperProps) {
    return (
        <FagsakProvider fagsak={fagsak}>
            <ActionMenu open={true}>
                <ActionMenu.Content>{children}</ActionMenu.Content>
            </ActionMenu>
        </FagsakProvider>
    );
}

describe('EndreBehandlingstema', () => {
    test('skal rendre komponent', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<EndreBehandlingstema åpneModal={åpneModal} />, { wrapper: Wrapper });
        expect(screen.getByRole('menuitem', { name: 'Endre behandlingstema' })).toBeInTheDocument();
    });

    test('skal ikke rendre komponent for fagsaktype institusjon', () => {
        const åpneModal = vi.fn();
        const { screen } = render(<EndreBehandlingstema åpneModal={åpneModal} />, {
            wrapper: props => <Wrapper {...props} fagsak={lagFagsak({ fagsakType: FagsakType.INSTITUSJON })} />,
        });
        expect(screen.queryByRole('menuitem', { name: 'Endre behandlingstema' })).not.toBeInTheDocument();
    });

    test('skal kunne åpne modal', async () => {
        const åpneModal = vi.fn();
        const { screen, user } = render(<EndreBehandlingstema åpneModal={åpneModal} />, { wrapper: Wrapper });
        const knapp = screen.getByRole('menuitem', { name: 'Endre behandlingstema' });
        await user.click(knapp);
        expect(åpneModal).toHaveBeenCalledOnce();
    });
});
