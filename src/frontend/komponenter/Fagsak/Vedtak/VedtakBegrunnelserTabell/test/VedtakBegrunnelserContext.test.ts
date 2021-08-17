import { BehandlingResultat } from '../../../../../typer/behandling';
import {
    IVedtaksperiodeMedBegrunnelser,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import {
    førsteDagIInneværendeMåned,
    KalenderEnhet,
    leggTil,
    serializeIso8601String,
    sisteDagIInneværendeMåned,
} from '../../../../../utils/kalender';
import {
    mockAvslagsperiode,
    mockOpphørsperiode,
    mockUtbetalingsperiode,
} from '../../../../../utils/test/vedtak/vedtaksperiode.mock';
import { filtrerOgSorterPerioderMedBegrunnelseBehov2 } from '../../../../../utils/vedtakUtils';

describe('VedtakBegrunnelserContext', () => {
    describe('Test filtrerOgSorterPerioderMedBegrunnelseBehov', () => {
        const fom = '2020-01-01';
        const tom = '2020-02-28';
        const opphørFom = '2020-03-01';

        test(`Test at returnerte perioder er sortert på fom-dato.`, () => {
            const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
                mockOpphørsperiode({ fom: opphørFom }),
                mockUtbetalingsperiode({ fom: fom, tom: tom }),
                mockAvslagsperiode({ fom: fom, tom: tom }),
            ];
            const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov2(
                vedtaksperioder,
                false,
                BehandlingResultat.AVSLÅTT_ENDRET_OG_OPPHØRT
            );
            expect(perioder.length).toBe(3);
            expect(perioder[0].type).toBe(Vedtaksperiodetype.UTBETALING);
            expect(perioder[1].type).toBe(Vedtaksperiodetype.AVSLAG);
            expect(perioder[2].type).toBe(Vedtaksperiodetype.OPPHØR);
        });

        describe('Test lesevisning', () => {
            const erLesevisning = true;
            test(`Test at ubegrunnede perioder ikke returneres ved lesevisning`, () => {
                const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
                    mockOpphørsperiode({ fom: opphørFom }),
                    mockUtbetalingsperiode({ fom: fom, tom: tom, begrunnelser: [] }),
                ];
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov2(
                    vedtaksperioder,
                    erLesevisning,
                    BehandlingResultat.INNVILGET_OG_OPPHØRT
                );
                expect(perioder.length).toBe(1);
                expect(perioder[0].type).toEqual(Vedtaksperiodetype.OPPHØR);
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
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov2(
                    [
                        mockUtbetalingsperiode({
                            fom: serializeIso8601String(enMndFremITidFom),
                            tom: serializeIso8601String(enMndFremITidTom),
                        }),
                    ],
                    false,
                    BehandlingResultat.INNVILGET
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

                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov2(
                    [
                        mockUtbetalingsperiode({
                            fom: serializeIso8601String(toMndFremITidFom),
                            tom: serializeIso8601String(toMndFremITidTom),
                        }),
                    ],
                    false,
                    BehandlingResultat.INNVILGET
                );
                expect(perioder.length).toBe(0);
            });
            test(`Test at opphør kun gir én periode`, () => {
                const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
                    mockOpphørsperiode({ fom: opphørFom }),
                    mockUtbetalingsperiode({ fom: fom, tom: tom }),
                    mockAvslagsperiode({ fom: fom, tom: tom }),
                ];
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov2(
                    vedtaksperioder,
                    false,
                    BehandlingResultat.OPPHØRT
                );
                expect(perioder.length).toBe(1);
                expect(perioder[0].type).toBe(Vedtaksperiodetype.OPPHØR);
            });
        });
    });
});
