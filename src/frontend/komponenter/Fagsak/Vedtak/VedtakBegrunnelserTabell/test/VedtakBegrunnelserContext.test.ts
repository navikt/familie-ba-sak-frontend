import { BehandlingResultat, BehandlingStatus } from '../../../../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
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
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../../utils/vedtakUtils';

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
            const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                vedtaksperioder,
                BehandlingResultat.AVSLÅTT_ENDRET_OG_OPPHØRT,
                BehandlingStatus.UTREDES
            );
            expect(perioder.length).toBe(3);
            expect(perioder[0].type).toBe(Vedtaksperiodetype.UTBETALING);
            expect(perioder[1].type).toBe(Vedtaksperiodetype.AVSLAG);
            expect(perioder[2].type).toBe(Vedtaksperiodetype.OPPHØR);
        });

        describe('Test lesevisning', () => {
            test(`Test at ubegrunnede perioder ikke returneres ved avsluttet behandling`, () => {
                const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
                    mockOpphørsperiode({ fom: opphørFom }),
                    mockUtbetalingsperiode({ fom: fom, tom: tom, begrunnelser: [] }),
                ];
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    vedtaksperioder,
                    BehandlingResultat.INNVILGET_OG_OPPHØRT,
                    BehandlingStatus.AVSLUTTET
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
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    [
                        mockUtbetalingsperiode({
                            fom: serializeIso8601String(enMndFremITidFom),
                            tom: serializeIso8601String(enMndFremITidTom),
                        }),
                    ],
                    BehandlingResultat.INNVILGET,
                    BehandlingStatus.UTREDES
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
                            fom: serializeIso8601String(toMndFremITidFom),
                            tom: serializeIso8601String(toMndFremITidTom),
                        }),
                    ],
                    BehandlingResultat.INNVILGET,
                    BehandlingStatus.UTREDES
                );
                expect(perioder.length).toBe(0);
            });
            test(`Test at opphør kun gir én periode`, () => {
                const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
                    mockOpphørsperiode({ fom: opphørFom }),
                    mockUtbetalingsperiode({ fom: fom, tom: tom }),
                    mockAvslagsperiode({ fom: fom, tom: tom }),
                ];
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    vedtaksperioder,
                    BehandlingResultat.OPPHØRT,
                    BehandlingStatus.UTREDES
                );
                expect(perioder.length).toBe(1);
                expect(perioder[0].type).toBe(Vedtaksperiodetype.OPPHØR);
            });
        });
    });
});
