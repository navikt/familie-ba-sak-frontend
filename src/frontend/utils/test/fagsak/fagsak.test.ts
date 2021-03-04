import { IFagsak } from '../../../typer/fagsak';
import { IVilkårResultat, Resultat, VilkårType } from '../../../typer/vilkår';
import { alleVillkårOppfylt, hentSisteBehandlingPåFagsak } from '../../fagsak';
import { mockBehandling } from '../behandling/behandling.mock';
import { mockFeltstate, mockVilkårResultater } from '../vilkårsvurdering/vilkår.mock';
import { mockFagsak } from './fagsak.mock';

describe('utils/fagsak', () => {
    describe('hentSisteBehandlingPåFagsak', () => {
        const fagsak1: IFagsak = mockFagsak({
            behandlinger: [
                mockBehandling({ behandlingId: 1, opprettetTidspunkt: '2020-10-19T02:01:00.0' }),
                mockBehandling({ behandlingId: 2, opprettetTidspunkt: '2020-11-19T03:00:00.0' }),
            ],
        });

        const fagsak2: IFagsak = mockFagsak({
            behandlinger: [
                mockBehandling({ behandlingId: 1, opprettetTidspunkt: '2020-03-19T02:01:00.0' }),
                mockBehandling({ behandlingId: 2, opprettetTidspunkt: '2020-03-19T03:00:00.0' }),
                mockBehandling({ behandlingId: 3, opprettetTidspunkt: '2020-03-19T01:00:00.0' }),
            ],
        });

        test('Skal returnere behandling med siste opprettetdato', () => {
            expect(hentSisteBehandlingPåFagsak(fagsak1)?.behandlingId).toEqual(2);
        });

        test('Skal returnere dato på format MM.YY', () => {
            expect(hentSisteBehandlingPåFagsak(fagsak2)?.behandlingId).toEqual(2);
        });
    });

    describe('alleVilkårOppfylt', () => {
        const vilkårRestultater1 = [
            VilkårType.LOVLIG_OPPHOLD,
            VilkårType.BOSATT_I_RIKET,
            VilkårType.GIFT_PARTNERSKAP,
            VilkårType.UNDER_18_ÅR,
            VilkårType.BOR_MED_SØKER,
        ].map(vilkårType =>
            mockVilkårResultater({
                resultat: Resultat.OPPFYLT,
                vilkårType,
            })
        );

        const ikkeOppfyltResultat = mockFeltstate(Resultat.IKKE_OPPFYLT);
        const vilkårResultater2: IVilkårResultat[] = [
            { ...vilkårRestultater1[0], resultat: ikkeOppfyltResultat },
            ...vilkårRestultater1.slice(1),
        ];

        test('Skal returnere true', () => {
            expect(
                alleVillkårOppfylt(
                    vilkårRestultater1.map(vilkårRestultat => mockFeltstate(vilkårRestultat))
                )
            ).toEqual(true);
        });

        test('Skal returnere false', () => {
            expect(
                alleVillkårOppfylt(
                    vilkårResultater2.map(vilkårRestultat => mockFeltstate(vilkårRestultat))
                )
            ).toEqual(false);
        });
    });
});
