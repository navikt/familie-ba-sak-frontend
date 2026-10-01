import { act, renderHook } from '@testing-library/react';
import { render } from '@testutils/testrender';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { EndringstidspunktDialogProvider, useEndringstidspunktDialogContext } from './EndringstidspunktDialogContext';

function wrapper({ children }: PropsWithChildren) {
    return <EndringstidspunktDialogProvider>{children}</EndringstidspunktDialogProvider>;
}

describe('EndringstidspunktDialogContext', () => {
    test('kaster feil utenfor provider', () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => renderHook(() => useEndringstidspunktDialogContext())).toThrow(
            'useEndringstidspunktDialogContext må brukes innenfor en EndringstidspunktDialogProvider.'
        );

        consoleError.mockRestore();
    });

    test('er lukket ved oppstart', () => {
        const { result } = renderHook(() => useEndringstidspunktDialogContext(), { wrapper });

        expect(result.current.erDialogÅpen).toBe(false);
    });

    test('er åpen ved oppstart når initialErÅpen er true', () => {
        const { result } = renderHook(() => useEndringstidspunktDialogContext(), {
            wrapper: ({ children }) => (
                <EndringstidspunktDialogProvider initialErÅpen={true}>{children}</EndringstidspunktDialogProvider>
            ),
        });

        expect(result.current.erDialogÅpen).toBe(true);
    });

    test('åpneDialog åpner dialogen', () => {
        const { result } = renderHook(() => useEndringstidspunktDialogContext(), { wrapper });

        act(() => result.current.åpneDialog());

        expect(result.current.erDialogÅpen).toBe(true);
    });

    test('lukkDialog lukker dialogen', () => {
        const { result } = renderHook(() => useEndringstidspunktDialogContext(), { wrapper });

        act(() => result.current.åpneDialog());
        act(() => result.current.lukkDialog());

        expect(result.current.erDialogÅpen).toBe(false);
    });

    test('children kan være en vanlig React-node', () => {
        const { screen } = render(
            <EndringstidspunktDialogProvider>
                <span>Innhold</span>
            </EndringstidspunktDialogProvider>
        );

        expect(screen.getByText('Innhold')).toBeInTheDocument();
    });

    test('children kan være en render-prop med tilgang til konteksten', async () => {
        const { screen, user } = render(
            <EndringstidspunktDialogProvider>
                {({ erDialogÅpen, åpneDialog }) => (
                    <>
                        <span>{erDialogÅpen ? 'Åpen' : 'Lukket'}</span>
                        <button type={'button'} onClick={åpneDialog}>
                            Åpne
                        </button>
                    </>
                )}
            </EndringstidspunktDialogProvider>
        );

        expect(screen.getByText('Lukket')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Åpne' }));
        expect(screen.getByText('Åpen')).toBeInTheDocument();
    });
});
