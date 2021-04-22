import { YtelseType } from '../../../../../typer/beregning';
import { VedtakBegrunnelseType } from '../../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import { VilkårType } from '../../../../../typer/vilkår';
import {
    mockRestPersonResultat,
    mockRestVilkårResultat,
} from '../../../../../utils/test/vilkårsvurdering/vilkår.mock';
import { hentUtgjørendeVilkårImpl } from '../useVedtakBegrunnelseMultiselect';

describe('useVedtakBegrunnelseMultiselect', () => {
    describe('Test hentUtgjørendeVilkår', () => {
        // Barn 1 bor med søker april - mai
        // Barn 2 har lovlig opphold april - november
        //
        // Det vil si:
        // mai - juni: innvilget to barn pga BOR_MED_SØKER og LOVLIG_OPPHOLD
        // juli - nov: redusert pga BOR_MED_SØKER
        // des - : opphør pga LOVLIG_OPPHOLD

        const personResultater = [
            mockRestPersonResultat({
                vilkårResultater: [
                    mockRestVilkårResultat({
                        vilkårType: VilkårType.BOR_MED_SØKER,
                        periodeFom: '2010-04-15',
                        periodeTom: '2010-05-17',
                    }),
                ],
            }),
            mockRestPersonResultat({
                vilkårResultater: [
                    mockRestVilkårResultat({
                        vilkårType: VilkårType.LOVLIG_OPPHOLD,
                        periodeFom: '2010-04-15',
                        periodeTom: '2010-11-15',
                    }),
                ],
            }),
        ];

        const innvilgelseperiode: Vedtaksperiode = {
            periodeFom: '2010-05-01',
            periodeTom: '2010-06-30',
            vedtaksperiodetype: Vedtaksperiodetype.UTBETALING,
            utbetalingsperiodeDetaljer: [],
            ytelseTyper: [YtelseType.ORDINÆR_BARNETRYGD],
            antallBarn: 2,
            utbetaltPerMnd: 2108,
        };
        const reduksjonsperiode: Vedtaksperiode = {
            periodeFom: '2010-07-01',
            periodeTom: '2010-11-30',
            vedtaksperiodetype: Vedtaksperiodetype.UTBETALING,
            utbetalingsperiodeDetaljer: [],
            ytelseTyper: [YtelseType.ORDINÆR_BARNETRYGD],
            antallBarn: 1,
            utbetaltPerMnd: 1054,
        };
        const opphørsperiode: Vedtaksperiode = {
            periodeFom: '2010-12-01',
            periodeTom: '',
            vedtaksperiodetype: Vedtaksperiodetype.OPPHØR,
        };

        test(`Test at utgjørende vilkår hentes ved innvilget`, () => {
            const utgjørendeVilkår = hentUtgjørendeVilkårImpl(
                VedtakBegrunnelseType.INNVILGELSE,
                personResultater,
                innvilgelseperiode
            );
            expect(utgjørendeVilkår.length).toEqual(2);
            expect(utgjørendeVilkår).toContain(VilkårType.BOR_MED_SØKER);
            expect(utgjørendeVilkår).toContain(VilkårType.LOVLIG_OPPHOLD);
        });
        test(`Test at utgjørende vilkår hentes ved reduksjon`, () => {
            const utgjørendeVilkår = hentUtgjørendeVilkårImpl(
                VedtakBegrunnelseType.REDUKSJON,
                personResultater,
                reduksjonsperiode
            );
            expect(utgjørendeVilkår.length).toEqual(1);
            expect(utgjørendeVilkår).toContain(VilkårType.BOR_MED_SØKER);
        });
        test(`Test at utgjørende vilkår hentes ved opphør`, () => {
            const utgjørendeVilkår = hentUtgjørendeVilkårImpl(
                VedtakBegrunnelseType.OPPHØR,
                personResultater,
                opphørsperiode
            );
            expect(utgjørendeVilkår.length).toEqual(1);
            expect(utgjørendeVilkår).toContain(VilkårType.LOVLIG_OPPHOLD);
        });
    });
});
