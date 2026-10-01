import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useDialog } from './useDialog';

describe('useDialog', () => {
    test('skal være lukket ved oppstart hvis annet ikke er spesifisert', () => {
        const { result } = renderHook(() => useDialog());

        expect(result.current.åpen).toBe(false);
    });

    test('skal kunne sette initial state til åpen', () => {
        const { result } = renderHook(() => useDialog(true));

        expect(result.current.åpen).toBe(true);
    });

    test('åpne skal åpne dialogen', () => {
        const { result } = renderHook(() => useDialog());

        act(() => result.current.åpne());

        expect(result.current.åpen).toBe(true);
    });

    test('lukk skal lukke dialogen', () => {
        const { result } = renderHook(() => useDialog(true));

        act(() => result.current.lukk());

        expect(result.current.åpen).toBe(false);
    });
});
