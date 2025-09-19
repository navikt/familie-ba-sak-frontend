import type { IRestAnnenVurdering, IRestPersonResultat, IRestVilkårResultat } from '../../../typer/vilkår';
import { Regelverk, Resultat, VilkårType } from '../../../typer/vilkår';
import { erIkkeGenereltVilkår } from '../../vilkår';

interface IMockRestPersonResultat {
    personIdent?: string;
    vilkårResultater?: IRestVilkårResultat[];
    andreVurderinger?: IRestAnnenVurdering[];
}

interface IRestResultaterMock {
    behandlingId?: number;
    id?: number;
    resultat?: Resultat;
    vilkårType?: VilkårType;
    periodeFom?: string;
    periodeTom?: string;
    vurderesEtter?: Regelverk;
}

const mockRestVilkårResultat = ({
    id = 1,
    resultat = Resultat.OPPFYLT,
    behandlingId = 1,
    vilkårType = VilkårType.LOVLIG_OPPHOLD,
    periodeFom = '2000-01-01',
    periodeTom = undefined,
    vurderesEtter = Regelverk.NASJONALE_REGLER,
}: IRestResultaterMock = {}): IRestVilkårResultat => ({
    id,
    vilkårType,
    resultat,
    periodeFom,
    periodeTom,
    begrunnelse: '',
    endretAv: 'VL',
    erVurdert: false,
    erAutomatiskVurdert: false,
    endretTidspunkt: '2020-03-19T09:08:56.8',
    behandlingId,
    avslagBegrunnelser: [],
    vurderesEtter: erIkkeGenereltVilkår(vilkårType) ? vurderesEtter : null,
    utdypendeVilkårsvurderinger: [],
    resultatBegrunnelse: null,
    begrunnelseForManuellKontroll: null,
});

export const mockRestPersonResultat = ({
    personIdent = '12345678930',
    vilkårResultater = [
        VilkårType.LOVLIG_OPPHOLD,
        VilkårType.BOSATT_I_RIKET,
        VilkårType.GIFT_PARTNERSKAP,
        VilkårType.UNDER_18_ÅR,
        VilkårType.BOR_MED_SØKER,
    ].map((vilkårType, index) =>
        mockRestVilkårResultat({
            id: index,
            vilkårType: VilkårType[vilkårType],
        })
    ),
    andreVurderinger = [],
}: IMockRestPersonResultat = {}): IRestPersonResultat => ({
    personIdent,
    vilkårResultater,
    andreVurderinger,
});
