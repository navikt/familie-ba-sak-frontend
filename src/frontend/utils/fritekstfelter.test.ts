import { describe, expect, test } from 'vitest';

import { validerFritekstKulepunkt } from './fritekstfelter';

describe('validerFritekstKulepunkt', () => {
    const makslengde = 220;

    test('returnerer undefined for gyldig tekst', () => {
        expect(validerFritekstKulepunkt({ tekst: 'Gyldig tekst' }, makslengde)).toBeUndefined();
    });

    test('returnerer feilmelding når teksten er for lang', () => {
        const forLangTekst = 'a'.repeat(makslengde + 1);
        expect(validerFritekstKulepunkt({ tekst: forLangTekst }, makslengde)).toBe(
            `Du har nådd maks antall tegn: ${makslengde}.`
        );
    });

    test('returnerer standard feilmelding når teksten er tom', () => {
        expect(validerFritekstKulepunkt({ tekst: '   ' }, makslengde)).toBe(
            'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.'
        );
    });

    test('returnerer egendefinert valideringsmelding når teksten er tom', () => {
        expect(
            validerFritekstKulepunkt({ tekst: '', valideringsmelding: 'Dette feltet er obligatorisk' }, makslengde)
        ).toBe('Dette feltet er obligatorisk');
    });
});
