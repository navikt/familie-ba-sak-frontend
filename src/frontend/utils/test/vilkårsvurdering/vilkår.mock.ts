import { Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';

import type { VedtakBegrunnelse } from '../../../typer/vedtak';
import type {
    IRestAnnenVurdering,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
    UtdypendeVilkårsvurdering,
} from '../../../typer/vilkår';
import { Regelverk, Resultat, VilkårType } from '../../../typer/vilkår';
import type { IPeriode } from '../../kalender';
import { erIkkeGenereltVilkår } from '../../vilkår';

interface IMockVilkårResultat {
    behandlingId?: number;
    id?: number;
    resultat?: Resultat;
    vilkårType?: VilkårType;
    periode?: IPeriode;
    begrunnelse?: string;
    endretAv?: string;
    erVurdert?: boolean;
    erAutomatiskVurdert?: boolean;
    utdypendeVilkårsvurderinger?: UtdypendeVilkårsvurdering[];
    endretTidspunkt?: string;
}

export const mockFeltstate = <T>(verdi: T): FeltState<T> => ({
    feilmelding: '',
    valider: (feltState, _) => feltState,
    valideringsstatus: Valideringsstatus.OK,
    verdi,
});

export const mockVilkårResultater = ({
    id = 1,
    resultat = Resultat.OPPFYLT,
    behandlingId = 1,
    vilkårType = VilkårType.LOVLIG_OPPHOLD,
    periode = { fom: '2000-01-01' },
    begrunnelse = '',
    endretAv = 'VL',
    erVurdert = false,
    erAutomatiskVurdert = false,
    utdypendeVilkårsvurderinger,
    endretTidspunkt = '2020-03-19T09:08:56.8',
}: IMockVilkårResultat = {}): IVilkårResultat => ({
    id,
    vilkårType,
    resultat: mockFeltstate(resultat),
    periode: mockFeltstate<IPeriode>(periode),
    begrunnelse: mockFeltstate(begrunnelse),
    endretAv,
    erVurdert,
    erAutomatiskVurdert,
    endretTidspunkt,
    behandlingId,
    avslagBegrunnelser: mockFeltstate<VedtakBegrunnelse[]>([]),
    vurderesEtter: Regelverk.NASJONALE_REGLER,
    utdypendeVilkårsvurderinger: mockFeltstate(utdypendeVilkårsvurderinger ?? []),
});

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

export const mockRestVilkårResultat = ({
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
