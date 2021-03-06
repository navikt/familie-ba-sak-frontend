import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';

import { VedtakBegrunnelse } from '../../../typer/vedtak';
import {
    IRestAnnenVurdering,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
    Resultat,
    VilkårType,
} from '../../../typer/vilkår';
import { IPeriode } from '../../kalender';

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
    erSkjønnsmessigVurdert?: boolean;
    erMedlemskapVurdert?: boolean;
    erDeltBosted?: boolean;
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
    erSkjønnsmessigVurdert = false,
    erMedlemskapVurdert = false,
    erDeltBosted = false,
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
    erSkjønnsmessigVurdert,
    erMedlemskapVurdert,
    erDeltBosted,
    endretTidspunkt,
    behandlingId,
    avslagBegrunnelser: mockFeltstate<VedtakBegrunnelse[]>([]),
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
}

export const mockRestVilkårResultat = ({
    id = 1,
    resultat = Resultat.OPPFYLT,
    behandlingId = 1,
    vilkårType = VilkårType.LOVLIG_OPPHOLD,
    periodeFom = '2000-01-01',
    periodeTom = undefined,
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
    erSkjønnsmessigVurdert: false,
    erMedlemskapVurdert: false,
    erDeltBosted: false,
    endretTidspunkt: '2020-03-19T09:08:56.8',
    behandlingId,
    avslagBegrunnelser: [],
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
