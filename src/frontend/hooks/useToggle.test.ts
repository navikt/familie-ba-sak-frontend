import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useToggle } from './useToggle';

describe('useToggle', () => {
    test('skal ha false some initial state hvis annet ikke er spesifisert', () => {
        const { result } = renderHook(() => useToggle());

        const [on, toggle] = result.current;

        expect(on).toBe(false);
        expect(toggle).toBeDefined();
    });

    test('skal kune sette initial state til true', () => {
        const { result } = renderHook(() => useToggle(true));

        const [on, toggle] = result.current;

        expect(on).toBe(true);
        expect(toggle).toBeDefined();
    });

    test('skal kune toggle verdien', () => {
        const { result } = renderHook(() => useToggle());

        expect(result.current[0]).toBe(false);

        act(() => result.current[1]());

        expect(result.current[0]).toBe(true);
    });
});
