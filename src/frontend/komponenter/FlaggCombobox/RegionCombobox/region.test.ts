import { describe, expect, test } from 'vitest';
import { ALLE_LAND_REGIONKODER, EØS_LAND_REGIONKODER, REGIONKODE_TIL_LABEL } from './region';

describe('region', () => {
    test('skal ha nordiske land først og resten sortert etter norsk navn', () => {
        expect(EØS_LAND_REGIONKODER.slice(0, 5)).toEqual(['DK', 'FI', 'IS', 'NO', 'SE']);
        expect(EØS_LAND_REGIONKODER.slice(5, 7)).toEqual(['BE', 'BG']);
        expect(EØS_LAND_REGIONKODER.at(-1)).toBe('AT');
    });

    test('skal ha flyktning, statsløs og ukjent sist i listen over alle land', () => {
        expect(ALLE_LAND_REGIONKODER.slice(-4)).toEqual(['AT', 'XU', 'XR', 'XS']);
    });

    test('skal ikke ha samme land flere ganger i listen over alle land', () => {
        const navn = ALLE_LAND_REGIONKODER.map(regionkode => REGIONKODE_TIL_LABEL[regionkode]);

        expect(new Set(navn).size).toBe(navn.length);
    });
});
