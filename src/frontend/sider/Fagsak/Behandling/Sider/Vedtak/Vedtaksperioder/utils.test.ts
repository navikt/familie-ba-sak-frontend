import { lagVedtaksperiodeMedBegrunnelser } from '@testutils/testdata/vedtaksperiodeTestdata';
import { BehandlingStatus } from '@typer/behandling';
import { VedtakBegrunnelseType } from '@typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { dagensDato, dateTilIsoDatoString } from '@utils/dato';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';

import { filtrerOgSorterPerioderMedBegrunnelseBehov } from './utils';

describe('filtrerOgSorterPerioderMedBegrunnelseBehov', () => {
    const begrunnelser = [
        {
            standardbegrunnelse: 'Test',
            vedtakBegrunnelseType: VedtakBegrunnelseType.INNVILGET,
            støtterFritekst: false,
        },
    ];

    test(`Test at ubegrunnede perioder ikke returneres ved avsluttet behandling`, () => {
        const vedtaksperioder: IVedtaksperiodeMedBegrunnelser[] = [
            lagVedtaksperiodeMedBegrunnelser({
                type: Vedtaksperiodetype.OPPHØR,
                fom: '2020-03-01',
                tom: '',
                begrunnelser,
            }),
            lagVedtaksperiodeMedBegrunnelser({ fom: '2020-01-01', tom: '2020-02-28', begrunnelser: [] }),
        ];
        const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(vedtaksperioder, BehandlingStatus.AVSLUTTET);
        expect(perioder.length).toBe(1);
        expect(perioder[0].type).toEqual(Vedtaksperiodetype.OPPHØR);
    });

    test(`Test at perioder med fom-dato før 2 mnd frem i tid returneres`, () => {
        const enMndFremITidFom = addMonths(startOfMonth(dagensDato), 1);
        const enMndFremITidTom = addMonths(endOfMonth(dagensDato), 1);
        const perioder = filtrerOgSorterPerioderMedBegrunnelseBehov(
            [
                lagVedtaksperiodeMedBegrunnelser({
                    fom: dateTilIsoDatoString(enMndFremITidFom),
                    tom: dateTilIsoDatoString(enMndFremITidTom),
                    begrunnelser,
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
                lagVedtaksperiodeMedBegrunnelser({
                    fom: dateTilIsoDatoString(toMndFremITidFom),
                    tom: dateTilIsoDatoString(toMndFremITidTom),
                    begrunnelser,
                }),
            ],
            BehandlingStatus.UTREDES
        );
        expect(perioder.length).toBe(0);
    });
});
