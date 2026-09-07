import { describe, expect, test } from 'vitest';

import {
    genererIdBasertPåAndreFritekstKulepunkter,
    type IFritekstFelt,
    lagInitiellFritekst,
    validerFritekstKulepunkt,
} from './fritekstfelter';

describe('genererIdBasertPåAndreFritekstKulepunkter', () => {
    test('returnerer 1 når det ikke finnes kulepunkter fra før', () => {
        expect(genererIdBasertPåAndreFritekstKulepunkter([])).toBe(1);
    });

    test('returnerer høyeste id pluss 1', () => {
        const kulepunkter: IFritekstFelt[] = [
            { id: 2, tekst: 'a' },
            { id: 5, tekst: 'b' },
            { id: 3, tekst: 'c' },
        ];
        expect(genererIdBasertPåAndreFritekstKulepunkter(kulepunkter)).toBe(6);
    });
});

describe('lagInitiellFritekst', () => {
    test('lager fritekstfelt med tekst, id og valideringsmelding', () => {
        expect(lagInitiellFritekst('hei', 3, 'obligatorisk')).toEqual({
            tekst: 'hei',
            id: 3,
            valideringsmelding: 'obligatorisk',
        });
    });

    test('valideringsmelding er undefined når den ikke er oppgitt', () => {
        expect(lagInitiellFritekst('', 1)).toEqual({
            tekst: '',
            id: 1,
            valideringsmelding: undefined,
        });
    });
});

describe('validerFritekstKulepunkt', () => {
    const makslengde = 220;

    test('returnerer undefined for gyldig tekst', () => {
        expect(validerFritekstKulepunkt({ id: 1, tekst: 'Gyldig tekst' }, makslengde)).toBeUndefined();
    });

    test('returnerer feilmelding når teksten er for lang', () => {
        const forLangTekst = 'a'.repeat(makslengde + 1);
        expect(validerFritekstKulepunkt({ id: 1, tekst: forLangTekst }, makslengde)).toBe(
            `Du har nådd maks antall tegn: ${makslengde}.`
        );
    });

    test('returnerer standard feilmelding når teksten er tom', () => {
        expect(validerFritekstKulepunkt({ id: 1, tekst: '   ' }, makslengde)).toBe(
            'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.'
        );
    });

    test('returnerer egendefinert valideringsmelding når teksten er tom', () => {
        expect(
            validerFritekstKulepunkt(
                { id: 1, tekst: '', valideringsmelding: 'Dette feltet er obligatorisk' },
                makslengde
            )
        ).toBe('Dette feltet er obligatorisk');
    });
});
