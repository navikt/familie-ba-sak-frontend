import { VedtakBegrunnelse, VedtakBegrunnelseType } from '../../../../../typer/vedtak';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import {
    førsteDagIInneværendeMåned,
    KalenderEnhet,
    leggTil,
    serializeIso8601String,
    sisteDagIInneværendeMåned,
} from '../../../../../utils/kalender';
import { mockVedtakbegrunnelse } from '../../../../../utils/test/vedtak/vedtakbegrunnelse.mock';
import {
    mockAvslagssperiode,
    mockOpphørsperiode,
    mockUtbetalingsperiode,
} from '../../../../../utils/test/vedtak/vedtaksperiode.mock';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../../utils/vedtakUtils';

describe('VedtakBegrunnelserContext', () => {
    describe('Test filtrerOgSorterPerioderMedBegrunnelseBehov', () => {
        const fom = '2020-01-01';
        const tom = '2020-02-28';
        const opphørFom = '2020-03-01';

        const vedtaksperioder = [
            mockOpphørsperiode({ periodeFom: opphørFom }),
            mockUtbetalingsperiode({ periodeFom: fom, periodeTom: tom }),
            mockAvslagssperiode({ periodeFom: fom, periodeTom: tom }),
        ];

        test(`Test at kun vedtaksperioder av typen OPPHØR og UTBETALING returneres`, () => {
            const periodeTyper = filtrerOgSorterPerioderMedBegrunnelseBehov(
                vedtaksperioder,
                [],
                false
            ).map(p => p.vedtaksperiodetype);
            expect(periodeTyper.length).toBe(2);
            expect(periodeTyper).toContain(Vedtaksperiodetype.OPPHØR);
            expect(periodeTyper).toContain(Vedtaksperiodetype.UTBETALING);
        });

        test(`Test at returnerte perioder er sortert på fom-dato.`, () => {
            const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(vedtaksperioder, [], false);
            expect(perioder.length).toBe(2);
            expect(perioder[0].vedtaksperiodetype).toBe(Vedtaksperiodetype.UTBETALING);
            expect(perioder[1].vedtaksperiodetype).toBe(Vedtaksperiodetype.OPPHØR);
        });

        describe('Test lesevisning', () => {
            const erLesevisning = true;
            test(`Test at ubegrunnede perioder ikke returneres ved lesevisning`, () => {
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    vedtaksperioder,
                    [
                        mockVedtakbegrunnelse({
                            begrunnelse: VedtakBegrunnelse.OPPHØR_BARN_FLYTTET_FRA_SØKER,
                            begrunnelseType: VedtakBegrunnelseType.OPPHØR,
                            fom: opphørFom,
                            tom: '',
                        }),
                    ],
                    erLesevisning
                );
                expect(perioder.length).toBe(1);
                expect(perioder[0].vedtaksperiodetype).toEqual(Vedtaksperiodetype.OPPHØR);
            });
            test(`Test at perioder med kun avslagsbegrunnelse ikke returneres ved lesevisning`, () => {
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    vedtaksperioder,
                    [
                        mockVedtakbegrunnelse({
                            begrunnelse: VedtakBegrunnelse.AVSLAG_MEDLEM_I_FOLKETRYGDEN,
                            begrunnelseType: VedtakBegrunnelseType.AVSLAG,
                            fom: fom,
                            tom: tom,
                        }),
                    ],
                    erLesevisning
                );
                expect(perioder.length).toBe(0);
            });
        });

        describe('Test filtrering av perioder frem i tid', () => {
            test(`Test at perioder med fom-dato før 2 mnd frem i tid returneres`, () => {
                const enMndFremITidFom = leggTil(
                    førsteDagIInneværendeMåned(),
                    1,
                    KalenderEnhet.MÅNED
                );
                const enMndFremITidTom = leggTil(
                    sisteDagIInneværendeMåned(),
                    1,
                    KalenderEnhet.MÅNED
                );
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    [
                        mockUtbetalingsperiode({
                            periodeFom: serializeIso8601String(enMndFremITidFom),
                            periodeTom: serializeIso8601String(enMndFremITidTom),
                        }),
                    ],
                    [],
                    false
                );
                expect(perioder.length).toBe(1);
            });
            test(`Test at perioder med fom-dato fra og med 2 mnd frem i tid ikke returneres`, () => {
                const toMndFremITidFom = leggTil(
                    førsteDagIInneværendeMåned(),
                    2,
                    KalenderEnhet.MÅNED
                );
                const toMndFremITidTom = leggTil(
                    sisteDagIInneværendeMåned(),
                    2,
                    KalenderEnhet.MÅNED
                );

                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    [
                        mockUtbetalingsperiode({
                            periodeFom: serializeIso8601String(toMndFremITidFom),
                            periodeTom: serializeIso8601String(toMndFremITidTom),
                        }),
                    ],
                    [],
                    false
                );
                expect(perioder.length).toBe(0);
            });
        });
    });
});
