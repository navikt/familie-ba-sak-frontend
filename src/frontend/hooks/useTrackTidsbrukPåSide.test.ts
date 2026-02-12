import { describe, expect, test } from 'vitest';

import { maskerId } from './useTrackTidsbrukPåSide';

describe('maskerId', () => {
    test('samme ID skal gi samme resultat', () => {
        const id = 1234567890;

        const maskertId1 = maskerId(id);
        const maskertId2 = maskerId(id);

        expect(maskertId1).toBe(maskertId2);
    });

    test('forskjellig ID skal gi forskjellig resultat', () => {
        const id1 = 1234567890;
        const id2 = 9876543210;

        const maskertId1 = maskerId(id1);
        const maskertId2 = maskerId(id2);

        expect(maskertId1).not.toBe(maskertId2);
    });
});
