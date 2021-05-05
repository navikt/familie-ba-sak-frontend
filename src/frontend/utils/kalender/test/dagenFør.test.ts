import { dagenFør, kalenderDato } from '../kalender';

describe('Skal teste dagen før logikk', () => {
    test('Dagen før midt i en måned', () => {
        const dagMånedÅr = kalenderDato('2020-02-10');

        expect(dagenFør(dagMånedÅr).dag).toBe(9);
    });

    test('Dagen før i starten av mars i et år uten skuddår', () => {
        const dagMånedÅr = kalenderDato('2021-03-01');

        expect(dagenFør(dagMånedÅr).dag).toBe(28);
    });

    test('Dagen før i starten av mars i et år med skuddår', () => {
        const dagMånedÅr = kalenderDato('2020-03-01');

        expect(dagenFør(dagMånedÅr).dag).toBe(29);
    });

    test('Dagen før i starten av en måned midt i året', () => {
        const dagMånedÅr = kalenderDato('2020-06-01');

        expect(dagenFør(dagMånedÅr).dag).toBe(31);
    });

    test('Dagen før i starten av januar', () => {
        const dagMånedÅr = kalenderDato('2020-01-01');

        expect(dagenFør(dagMånedÅr).år).toBe(2019);
        expect(dagenFør(dagMånedÅr).måned).toBe(11);
        expect(dagenFør(dagMånedÅr).dag).toBe(31);
    });
});
