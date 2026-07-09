import { type IRestVilkårResultat, Resultat, VilkårType } from '@typer/vilkår';

export function lagVilkårResultat(vilkårResultat: Partial<IRestVilkårResultat>): IRestVilkårResultat {
    return {
        begrunnelse: 'begrunnelse',
        behandlingId: 1,
        endretAv: '',
        endretTidspunkt: '',
        erAutomatiskVurdert: false,
        erVurdert: false,
        id: 1,
        periodeFom: undefined,
        periodeTom: undefined,
        resultat: Resultat.IKKE_VURDERT,
        resultatBegrunnelse: null,
        erEksplisittAvslagPåSøknad: undefined,
        avslagBegrunnelser: [],
        vilkårType: VilkårType.BOR_MED_SØKER,
        vurderesEtter: null,
        utdypendeVilkårsvurderinger: [],
        begrunnelseForManuellKontroll: null,
        erOpprinneligPreutfyltIBehandling: null,
        ...vilkårResultat,
    };
}
