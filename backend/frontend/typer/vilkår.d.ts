import type { FeltState } from '@navikt/familie-skjema';
import type { BehandlingSteg, BehandlingStegStatus } from './behandling';
import type { IGrunnlagPerson } from './person';
import { PersonType } from './person';
import type { IRestVedtakBegrunnelseTilknyttetVilkår, VedtakBegrunnelse, VedtakBegrunnelseType } from './vedtak';
import type { IIsoDatoPeriode, IsoDatoString } from '../utils/dato';
export declare enum Resultat {
    IKKE_OPPFYLT = "IKKE_OPPFYLT",
    OPPFYLT = "OPPFYLT",
    IKKE_VURDERT = "IKKE_VURDERT"
}
export declare enum ResultatBegrunnelse {
    IKKE_AKTUELT = "IKKE_AKTUELT"
}
type ResultatUI = Resultat | ResultatBegrunnelse;
export declare const resultatVisningsnavn: Record<ResultatUI, string>;
export declare const resultater: Record<Resultat, string>;
export declare enum AnnenVurderingType {
    OPPLYSNINGSPLIKT = "OPPLYSNINGSPLIKT"
}
export declare enum VilkårType {
    UNDER_18_ÅR = "UNDER_18_\u00C5R",
    BOR_MED_SØKER = "BOR_MED_S\u00D8KER",
    GIFT_PARTNERSKAP = "GIFT_PARTNERSKAP",
    BOSATT_I_RIKET = "BOSATT_I_RIKET",
    LOVLIG_OPPHOLD = "LOVLIG_OPPHOLD",
    UTVIDET_BARNETRYGD = "UTVIDET_BARNETRYGD"
}
export declare enum Regelverk {
    NASJONALE_REGLER = "NASJONALE_REGLER",
    EØS_FORORDNINGEN = "E\u00D8S_FORORDNINGEN"
}
export interface IPersonResultat {
    personIdent: string;
    vilkårResultater: FeltState<IVilkårResultat>[];
    andreVurderinger: FeltState<IAnnenVurdering>[];
    person: IGrunnlagPerson;
}
export interface IAnnenVurdering {
    id: number;
    begrunnelse: FeltState<string>;
    behandlingId: number;
    endretAv: string;
    endretTidspunkt: string;
    erVurdert: boolean;
    resultat: FeltState<Resultat>;
    type: AnnenVurderingType;
}
export interface IVilkårResultat {
    begrunnelse: FeltState<string>;
    behandlingId: number;
    endretAv: string;
    endretTidspunkt: string;
    erAutomatiskVurdert: boolean;
    erVurdert: boolean;
    id: number;
    periode: FeltState<IIsoDatoPeriode>;
    resultat: FeltState<Resultat>;
    vilkårType: VilkårType;
    erEksplisittAvslagPåSøknad?: boolean;
    avslagBegrunnelser: FeltState<VedtakBegrunnelse[]>;
    vurderesEtter: Regelverk | null;
    utdypendeVilkårsvurderinger: FeltState<UtdypendeVilkårsvurdering[]>;
    resultatBegrunnelse: ResultatBegrunnelse | null;
    begrunnelseForManuellKontroll: string | null;
}
export interface IRestPersonResultat {
    personIdent: string;
    vilkårResultater: IRestVilkårResultat[];
    andreVurderinger: IRestAnnenVurdering[];
}
export interface IRestNyttVilkår {
    personIdent: string;
    vilkårType: string;
}
export interface IRestVilkårResultat {
    begrunnelse: string;
    behandlingId: number;
    endretAv: string;
    endretTidspunkt: string;
    erAutomatiskVurdert: boolean;
    erVurdert: boolean;
    id: number;
    periodeFom?: IsoDatoString;
    periodeTom?: IsoDatoString;
    resultat: Resultat;
    resultatBegrunnelse: ResultatBegrunnelse | null;
    erEksplisittAvslagPåSøknad?: boolean;
    avslagBegrunnelser: VedtakBegrunnelse[];
    vilkårType: VilkårType;
    vurderesEtter: Regelverk | null;
    utdypendeVilkårsvurderinger: UtdypendeVilkårsvurdering[];
    begrunnelseForManuellKontroll: string | null;
}
export interface IRestAnnenVurdering {
    id: number;
    begrunnelse: string;
    behandlingId: number;
    endretAv: string;
    endretTidspunkt: string;
    erVurdert: boolean;
    resultat: Resultat;
    type: AnnenVurderingType;
}
export interface IRestStegTilstand {
    behandlingSteg: BehandlingSteg;
    behandlingStegStatus: BehandlingStegStatus;
}
export type AlleBegrunnelser = {
    [key in VedtakBegrunnelseType]: IRestVedtakBegrunnelseTilknyttetVilkår[];
};
export interface IVilkårConfig {
    beskrivelse: string;
    key: string;
    spørsmål?: (part?: string) => string;
    tittel: string;
    parterDetteGjelderFor: PersonType[];
}
export declare const vilkårConfig: Record<VilkårType, IVilkårConfig>;
export declare const vilkårConfigInstitusjon: IVilkårConfig[];
export declare const vilkårConfigEnsligMindreårig: Record<VilkårType, IVilkårConfig>;
export interface IAnnenVurderingConfig {
    beskrivelse: string;
    key: string;
    tittel: string;
    parterDetteGjelderFor: PersonType[];
    spørsmål?: (part?: string) => string;
}
export declare const annenVurderingConfig: Record<AnnenVurderingType, IAnnenVurderingConfig>;
export declare enum UtdypendeVilkårsvurderingGenerell {
    VURDERING_ANNET_GRUNNLAG = "VURDERING_ANNET_GRUNNLAG",
    BOSATT_PÅ_SVALBARD = "BOSATT_P\u00C5_SVALBARD",
    BOSATT_I_FINNMARK_NORD_TROMS = "BOSATT_I_FINNMARK_NORD_TROMS"
}
export declare enum UtdypendeVilkårsvurderingNasjonal {
    VURDERT_MEDLEMSKAP = "VURDERT_MEDLEMSKAP"
}
export declare enum UtdypendeVilkårsvurderingDeltBosted {
    DELT_BOSTED = "DELT_BOSTED",
    DELT_BOSTED_SKAL_IKKE_DELES = "DELT_BOSTED_SKAL_IKKE_DELES"
}
export declare enum UtdypendeVilkårsvurderingEøsSøkerBosattIRiket {
    OMFATTET_AV_NORSK_LOVGIVNING = "OMFATTET_AV_NORSK_LOVGIVNING",
    OMFATTET_AV_NORSK_LOVGIVNING_UTLAND = "OMFATTET_AV_NORSK_LOVGIVNING_UTLAND",
    ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING = "ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING",
    SØKER_OMFATTET_AV_UTENLANDSK_LOVGIVNING_BOSATT_I_NORGE = "S\u00D8KER_OMFATTET_AV_UTENLANDSK_LOVGIVNING_BOSATT_I_NORGE"
}
export declare enum UtdypendeVilkårsvurderingEøsBarnBosattIRiket {
    BARN_BOR_I_NORGE = "BARN_BOR_I_NORGE",
    BARN_BOR_I_EØS = "BARN_BOR_I_E\u00D8S",
    BARN_BOR_I_STORBRITANNIA = "BARN_BOR_I_STORBRITANNIA"
}
export declare enum UtdypendeVilkårsvurderingEøsBarnBorMedSøker {
    BARN_BOR_I_NORGE_MED_SØKER = "BARN_BOR_I_NORGE_MED_S\u00D8KER",
    BARN_BOR_I_EØS_MED_SØKER = "BARN_BOR_I_E\u00D8S_MED_S\u00D8KER",
    BARN_BOR_I_EØS_MED_ANNEN_FORELDER = "BARN_BOR_I_E\u00D8S_MED_ANNEN_FORELDER",
    BARN_BOR_I_STORBRITANNIA_MED_SØKER = "BARN_BOR_I_STORBRITANNIA_MED_S\u00D8KER",
    BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER = "BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER",
    BARN_BOR_ALENE_I_ANNET_EØS_LAND = "BARN_BOR_ALENE_I_ANNET_E\u00D8S_LAND"
}
export type UtdypendeVilkårsvurdering = UtdypendeVilkårsvurderingGenerell | UtdypendeVilkårsvurderingNasjonal | UtdypendeVilkårsvurderingDeltBosted | UtdypendeVilkårsvurderingEøsSøkerBosattIRiket | UtdypendeVilkårsvurderingEøsBarnBosattIRiket | UtdypendeVilkårsvurderingEøsBarnBorMedSøker;
export {};
