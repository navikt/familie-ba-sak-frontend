import { lagBrevmottaker } from '@testutils/testdata/brevmottakerTestdata';
import { describe, expect, test } from 'vitest';
import {
    Brevmottakertype,
    erBrevmottakertype,
    kanLeggeTilBrevmottaker,
    Modus,
    utledPreutfyltNavn,
    utledValgbareBrevmottakertyper,
} from './brevmottaker';

describe('erBrevmottakertype', () => {
    test.each(Object.values(Brevmottakertype))('skal returnere true for %s', type => {
        expect(erBrevmottakertype(type)).toBe(true);
    });

    test.each(['', 'UKJENT', 'fullmektig'])('skal returnere false for "%s"', verdi => {
        expect(erBrevmottakertype(verdi)).toBe(false);
    });
});

describe('kanLeggeTilBrevmottaker', () => {
    test('skal returnere true når det ikke finnes brevmottakere', () => {
        expect(kanLeggeTilBrevmottaker([])).toBe(true);
    });

    test.each([Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
        'skal returnere true når kun %s finnes fra før',
        eksisterendeType => {
            expect(kanLeggeTilBrevmottaker([lagBrevmottaker({ type: eksisterendeType })])).toBe(true);
        }
    );

    test('skal returnere false når dødsbo finnes fra før', () => {
        expect(kanLeggeTilBrevmottaker([lagBrevmottaker({ type: Brevmottakertype.DØDSBO })])).toBe(false);
    });

    test('skal returnere false når det finnes to brevmottakere', () => {
        expect(
            kanLeggeTilBrevmottaker([
                lagBrevmottaker({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE }),
                lagBrevmottaker({ type: Brevmottakertype.FULLMEKTIG }),
            ])
        ).toBe(false);
    });
});

describe('utledValgbareBrevmottakertyper', () => {
    describe.each([Modus.FAGSAK, Modus.BEHANDLING])('når modus er %s', modus => {
        test('skal returnere fullmektig og verge når bruker med utenlandsk adresse finnes fra før', () => {
            expect(
                utledValgbareBrevmottakertyper(
                    [lagBrevmottaker({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE })],
                    modus
                )
            ).toEqual([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE]);
        });

        test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
            'skal kun returnere bruker med utenlandsk adresse når %s finnes fra før',
            eksisterendeType => {
                expect(utledValgbareBrevmottakertyper([lagBrevmottaker({ type: eksisterendeType })], modus)).toEqual([
                    Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
                ]);
            }
        );

        test.each([Brevmottakertype.FULLMEKTIG, Brevmottakertype.VERGE])(
            'skal returnere tom liste når både bruker med utenlandsk adresse og %s finnes fra før',
            eksisterendeType => {
                expect(
                    utledValgbareBrevmottakertyper(
                        [
                            lagBrevmottaker({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE }),
                            lagBrevmottaker({ type: eksisterendeType }),
                        ],
                        modus
                    )
                ).toEqual([]);
            }
        );
    });

    test('skal returnere alle brevmottakertyper når det ikke finnes brevmottakere i behandling', () => {
        expect(utledValgbareBrevmottakertyper([], Modus.BEHANDLING)).toEqual([
            Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
            Brevmottakertype.FULLMEKTIG,
            Brevmottakertype.VERGE,
            Brevmottakertype.DØDSBO,
        ]);
    });

    test('skal returnere alle brevmottakertyper bortsett fra dødsbo i fagsak', () => {
        expect(utledValgbareBrevmottakertyper([], Modus.FAGSAK)).toEqual([
            Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE,
            Brevmottakertype.FULLMEKTIG,
            Brevmottakertype.VERGE,
        ]);
    });

    test('skal returnere tom liste når dødsbo finnes fra før', () => {
        expect(
            utledValgbareBrevmottakertyper([lagBrevmottaker({ type: Brevmottakertype.DØDSBO })], Modus.BEHANDLING)
        ).toEqual([]);
    });
});

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
