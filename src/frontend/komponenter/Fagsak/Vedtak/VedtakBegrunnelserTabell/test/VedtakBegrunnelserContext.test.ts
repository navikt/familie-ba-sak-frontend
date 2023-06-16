import { BehandlingStatus } from '../../../../../typer/behandling';
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
    mockOpphørsperiode,
    mockUtbetalingsperiode,
} from '../../../../../utils/test/vedtak/vedtaksperiode.mock';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../../utils/vedtakUtils';

describe('VedtakBegrunnelserContext', () => {
    describe('Test filtrerOgSorterPerioderMedBegrunnelseBehov', () => {
        const fom = '2020-01-01';
        const tom = '2020-02-28';
        const opphørFom = '2020-03-01';

        describe('Test lesevisning', () => {
            test(`Test at ubegrunnede perioder ikke returneres ved avsluttet behandling`, () => {
                const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
                    mockOpphørsperiode({ fom: opphørFom }),
                    mockUtbetalingsperiode({ fom: fom, tom: tom, begrunnelser: [] }),
                ];
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    vedtaksperioder,
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
                    BehandlingStatus.UTREDES
                );
                expect(perioder.length).toBe(0);
            });
        });
    });
});
