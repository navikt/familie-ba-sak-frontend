import { IPeriode } from '../../../../../typer/periode';
import { IRestUtbetalingBegrunnelse } from '../../../../../typer/vedtak';
import { IRestPersonResultat, Resultat, VilkårType } from '../../../../../typer/vilkår';
import useUtbetalingBegrunnelse from '../useUtbetalingBegrunnelse';

describe('useUtbetalingBegrunnelse', () => {
    const id = 1;
    const personResultater: IRestPersonResultat[] = [
        {
            personIdent: '1234567891',
            vilkårResultater: [
                {
                    begrunnelse: '',
                    behandlingId: 123,
                    endretAv: '',
                    endretTidspunkt: '',
                    erVurdert: true,
                    id: 2,
                    periodeFom: '2020-11-14',
                    periodeTom: undefined,
                    resultat: Resultat.OPPFYLT,
                    vilkårType: VilkårType.LOVLIG_OPPHOLD,
                },
            ],
        },
    ];

    const periode: IPeriode = {
        fom: '2020-12-01',
        tom: '2021-12-01',
    };

    const utbetalingBegrunnelse: IRestUtbetalingBegrunnelse = {
        id: 1,
        fom: '2020-12-01',
        tom: '2021-12-01',
    };

    test('Skal rendre hook og returnere initial state', () => {
        const { mutableVedtakBegrunnelseType, mutableVedtakBegrunnelse } = useUtbetalingBegrunnelse(
            id,
            personResultater,
            periode,
            utbetalingBegrunnelse
        );

        expect(mutableVedtakBegrunnelseType).toBe(undefined);
        expect(mutableVedtakBegrunnelse).toBe(undefined);
    });
});
