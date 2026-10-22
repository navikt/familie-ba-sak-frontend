import { Brevmottakertype } from '@typer/brevmottaker';
import { describe, expect, test } from 'vitest';
import { utledPreutfyltNavn } from './utledPreutfyltNavn';

describe('utledPreutfyltNavn', () => {
    test('skal returnere brukers navn for bruker med utenlandsk adresse', () => {
        expect(utledPreutfyltNavn(Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, 'SE', 'Ola Nordmann')).toBe(
            'Ola Nordmann'
        );
    });

    test('skal returnere "v/dødsbo" for dødsbo når land ikke er valgt', () => {
        expect(utledPreutfyltNavn(Brevmottakertype.DØDSBO, null, 'Ola Nordmann')).toBe('Ola Nordmann v/dødsbo');
    });

    test('skal returnere "v/dødsbo" for dødsbo i Norge', () => {
        expect(utledPreutfyltNavn(Brevmottakertype.DØDSBO, 'NO', 'Ola Nordmann')).toBe('Ola Nordmann v/dødsbo');
    });

    test('skal returnere "Estate of" for dødsbo i utlandet', () => {
        expect(utledPreutfyltNavn(Brevmottakertype.DØDSBO, 'SE', 'Ola Nordmann')).toBe('Estate of Ola Nordmann');
    });
});
