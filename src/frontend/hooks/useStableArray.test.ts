import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useStableArray } from './useStableArray';

describe('useStableArray', () => {
    test('skal gi samme referanse når en ny liste har likt innhold', () => {
        const førsteListe = ['NO', 'SE'];
        const { result, rerender } = renderHook(({ array }) => useStableArray(array), {
            initialProps: { array: førsteListe },
        });

        rerender({ array: ['NO', 'SE'] });

        expect(result.current).toBe(førsteListe);
    });

    test('skal gi den nye listen når innholdet endres', () => {
        const { result, rerender } = renderHook(({ array }) => useStableArray(array), {
            initialProps: { array: ['NO', 'SE'] },
        });

        const nyListe = ['NO'];
        rerender({ array: nyListe });

        expect(result.current).toBe(nyListe);
    });
});
