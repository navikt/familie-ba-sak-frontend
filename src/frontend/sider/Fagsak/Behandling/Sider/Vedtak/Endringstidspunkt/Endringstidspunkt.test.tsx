import { ActionMenu } from '@navikt/ds-react';
import { render } from '@testutils/testrender';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';

import { Endringstidspunkt } from './Endringstidspunkt';
import { EndringstidspunktDialogProvider } from './EndringstidspunktDialogContext';

function Wrapper({ children }: PropsWithChildren) {
    return (
        <EndringstidspunktDialogProvider>
            {({ erDialogÅpen }) => (
                <>
                    <ActionMenu open={true}>
                        <ActionMenu.Content>{children}</ActionMenu.Content>
                    </ActionMenu>
                    <span>{erDialogÅpen ? 'Dialog er åpen' : 'Dialog er lukket'}</span>
                </>
            )}
        </EndringstidspunktDialogProvider>
    );
}

describe('Endringstidspunkt', () => {
    test('rendre komponenten', () => {
        const { screen } = render(<Endringstidspunkt />, { wrapper: Wrapper });

        expect(screen.getByRole('menuitem', { name: 'Oppdater endringstidspunkt' })).toBeInTheDocument();
        expect(screen.getByText('Dialog er lukket')).toBeInTheDocument();
    });

    test('åpner dialogen når man klikker på menyvalget', async () => {
        const { screen, user } = render(<Endringstidspunkt />, { wrapper: Wrapper });

        await user.click(screen.getByRole('menuitem', { name: 'Oppdater endringstidspunkt' }));

        expect(screen.getByText('Dialog er åpen')).toBeInTheDocument();
    });
});
