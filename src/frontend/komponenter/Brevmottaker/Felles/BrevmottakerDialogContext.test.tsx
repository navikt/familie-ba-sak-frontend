import { act, render, renderHook, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';
import { BrevmottakerDialogProvider, useBrevmottakerDialogContext } from './BrevmottakerDialogContext';

function lagWrapper(initialErÅpen?: boolean) {
    return ({ children }: PropsWithChildren) => (
        <BrevmottakerDialogProvider initialErÅpen={initialErÅpen}>{children}</BrevmottakerDialogProvider>
    );
}

describe('BrevmottakerDialogContext', () => {
    test('skal kaste feil når useBrevmottakerDialogContext brukes utenfor BrevmottakerDialogProvider', () => {
        expect(() => renderHook(() => useBrevmottakerDialogContext())).toThrowError(
            'useBrevmottakerDialogContext må brukes innenfor en BrevmottakerDialogProvider.'
        );
    });

    test('skal være lukket som standard', () => {
        const { result } = renderHook(() => useBrevmottakerDialogContext(), { wrapper: lagWrapper() });

        expect(result.current.erDialogÅpen).toBe(false);
    });

    test('skal være åpen når initialErÅpen er true', () => {
        const { result } = renderHook(() => useBrevmottakerDialogContext(), { wrapper: lagWrapper(true) });

        expect(result.current.erDialogÅpen).toBe(true);
    });

    test('skal åpne og lukke dialogen', () => {
        const { result } = renderHook(() => useBrevmottakerDialogContext(), { wrapper: lagWrapper() });

        act(() => result.current.åpneDialog());
        expect(result.current.erDialogÅpen).toBe(true);

        act(() => result.current.lukkDialog());
        expect(result.current.erDialogÅpen).toBe(false);
    });

    test('skal gi konteksten til children når children er en funksjon', () => {
        render(
            <BrevmottakerDialogProvider initialErÅpen={true}>
                {({ erDialogÅpen }) => <p>{erDialogÅpen ? 'Dialogen er åpen' : 'Dialogen er lukket'}</p>}
            </BrevmottakerDialogProvider>
        );

        expect(screen.getByText('Dialogen er åpen')).toBeInTheDocument();
    });

    test('skal rendre children direkte når children ikke er en funksjon', () => {
        render(
            <BrevmottakerDialogProvider>
                <p>Innhold</p>
            </BrevmottakerDialogProvider>
        );

        expect(screen.getByText('Innhold')).toBeInTheDocument();
    });
});
