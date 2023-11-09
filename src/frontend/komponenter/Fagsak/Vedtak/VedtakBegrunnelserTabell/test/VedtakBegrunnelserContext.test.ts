/**
 * @jest-environment jsdom
 */

import { addMonths, endOfMonth, startOfMonth } from 'date-fns';

import { BehandlingStatus } from '../../../../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import { dagensDato, dateTilIsoString } from '../../../../../utils/dato';
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
                const enMndFremITidFom = addMonths(startOfMonth(dagensDato), 1);
                const enMndFremITidTom = addMonths(endOfMonth(dagensDato), 1);
                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    [
                        mockUtbetalingsperiode({
                            fom: dateTilIsoString(enMndFremITidFom),
                            tom: dateTilIsoString(enMndFremITidTom),
                        }),
                    ],
                    BehandlingStatus.UTREDES
                );
                expect(perioder.length).toBe(1);
            });
            test(`Test at perioder med fom-dato fra og med 2 mnd frem i tid ikke returneres`, () => {
                const toMndFremITidFom = addMonths(startOfMonth(dagensDato), 2);
                const toMndFremITidTom = addMonths(endOfMonth(dagensDato), 2);

                const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
                    [
                        mockUtbetalingsperiode({
                            fom: dateTilIsoString(toMndFremITidFom),
                            tom: dateTilIsoString(toMndFremITidTom),
                        }),
                    ],
                    BehandlingStatus.UTREDES
                );
                expect(perioder.length).toBe(0);
            });
        });
    });
});
