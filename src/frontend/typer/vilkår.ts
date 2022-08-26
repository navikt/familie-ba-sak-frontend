import type { FeltState } from '@navikt/familie-skjema';

import type { FamilieIsoDate, IPeriode } from '../utils/kalender';
import type { BehandlingSteg, BehandlingStegStatus } from './behandling';
import type { IGrunnlagPerson } from './person';
import { PersonType } from './person';
import type {
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
    VedtakBegrunnelseType,
} from './vedtak';

export enum Resultat {
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    OPPFYLT = 'OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
}

export const uiResultat: Record<Resultat, string> = {
    OPPFYLT: 'Oppfylt',
    IKKE_OPPFYLT: 'Ikke oppfylt',
    IKKE_VURDERT: 'Ikke vurdert',
};

export const resultater: Record<Resultat, string> = {
    OPPFYLT: 'Ja',
    IKKE_OPPFYLT: 'Nei',
    IKKE_VURDERT: 'Kanskje',
};

export enum AnnenVurderingType {
    OPPLYSNINGSPLIKT = 'OPPLYSNINGSPLIKT',
}

export enum VilkårType {
    UNDER_18_ÅR = 'UNDER_18_ÅR',
    BOR_MED_SØKER = 'BOR_MED_SØKER',
    GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
    BOSATT_I_RIKET = 'BOSATT_I_RIKET',
    LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
    UTVIDET_BARNETRYGD = 'UTVIDET_BARNETRYGD',
}

export enum Regelverk {
    NASJONALE_REGLER = 'NASJONALE_REGLER',
    EØS_FORORDNINGEN = 'EØS_FORORDNINGEN',
}

// Vilkårsvurdering typer for ui
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
    periode: FeltState<IPeriode>;
    resultat: FeltState<Resultat>;
    vilkårType: VilkårType;
    erEksplisittAvslagPåSøknad?: boolean;
    avslagBegrunnelser: FeltState<VedtakBegrunnelse[]>;
    vurderesEtter: Regelverk | null;
    utdypendeVilkårsvurderinger: FeltState<UtdypendeVilkårsvurdering[]>;
}

// Vilkårsvurdering typer for api
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
    periodeFom?: FamilieIsoDate;
    periodeTom?: FamilieIsoDate;
    resultat: Resultat;
    erEksplisittAvslagPåSøknad?: boolean;
    avslagBegrunnelser: VedtakBegrunnelse[];
    vilkårType: VilkårType;
    vurderesEtter: Regelverk | null;
    utdypendeVilkårsvurderinger: UtdypendeVilkårsvurdering[];
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

export type VedtaksbegrunnelseTekster = {
    [key in VedtakBegrunnelseType]: IRestVedtakBegrunnelseTilknyttetVilkår[];
};

export interface IVilkårConfig {
    beskrivelse: string;
    key: string;
    spørsmål?: (part?: string) => string;
    tittel: string;
    parterDetteGjelderFor: PersonType[];
}

export const vilkårConfig: Record<VilkårType, IVilkårConfig> = {
    BOSATT_I_RIKET: {
        beskrivelse: 'bosatt i riket',
        key: 'BOSATT_I_RIKET',
        tittel: 'Bosatt i riket',
        spørsmål: (part?: string) => `Er ${part} bosatt i riket?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    LOVLIG_OPPHOLD: {
        beskrivelse: 'lovlig opphold',
        key: 'LOVLIG_OPPHOLD',
        tittel: 'Lovlig opphold',
        spørsmål: (part?: string) => `Har ${part} lovlig opphold?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    UTVIDET_BARNETRYGD: {
        beskrivelse: 'utvidet barnetrygd',
        key: 'UTVIDET_BARNETRYGD',
        tittel: 'Utvidet barnetrygd',
        spørsmål: () => 'Foreligger det rett på utvidet barnetrygd?',
        parterDetteGjelderFor: [PersonType.SØKER],
    },
    BOR_MED_SØKER: {
        beskrivelse: 'bor med søker',
        key: 'BOR_MED_SØKER',
        tittel: 'Bor med søker',
        spørsmål: () => `Bor barnet med søker?`,
        parterDetteGjelderFor: [PersonType.BARN],
    },
    UNDER_18_ÅR: {
        beskrivelse: 'under 18 år',
        key: 'UNDER_18_ÅR',
        tittel: 'Under 18 år',
        spørsmål: () => `Er barnet under 18 år?`,
        parterDetteGjelderFor: [PersonType.BARN],
    },
    GIFT_PARTNERSKAP: {
        beskrivelse: 'inngått ekteskap eller partnerskap',
        key: 'GIFT_PARTNERSKAP',
        tittel: 'Inngått ekteskap eller partnerskap',
        spørsmål: () => 'Har barnet inngått ekteskap eller partnerskap?',
        parterDetteGjelderFor: [PersonType.BARN],
    },
};

export interface IAnnenVurderingConfig {
    beskrivelse: string;
    key: string;
    tittel: string;
    parterDetteGjelderFor: PersonType[];
    spørsmål?: (part?: string) => string;
}

export const annenVurderingConfig: Record<AnnenVurderingType, IAnnenVurderingConfig> = {
    OPPLYSNINGSPLIKT: {
        beskrivelse: 'Opplysningsplikt',
        key: 'OPPLYSNINGSPLIKT',
        tittel: 'Opplysningsplikt',
        parterDetteGjelderFor: [PersonType.SØKER],
        spørsmål: () => 'Er opplysningsplikten oppfylt?',
    },
};

export enum UtdypendeVilkårsvurderingGenerell {
    VURDERING_ANNET_GRUNNLAG = 'VURDERING_ANNET_GRUNNLAG',
}

export enum UtdypendeVilkårsvurderingNasjonal {
    VURDERT_MEDLEMSKAP = 'VURDERT_MEDLEMSKAP',
}

export enum UtdypendeVilkårsvurderingDeltBosted {
    DELT_BOSTED = 'DELT_BOSTED',
    DELT_BOSTED_SKAL_IKKE_DELES = 'DELT_BOSTED_SKAL_IKKE_DELES',
}

export enum UtdypendeVilkårsvurderingEøsSøkerBosattIRiket {
    OMFATTET_AV_NORSK_LOVGIVNING = 'OMFATTET_AV_NORSK_LOVGIVNING',
    OMFATTET_AV_NORSK_LOVGIVNING_UTLAND = 'OMFATTET_AV_NORSK_LOVGIVNING_UTLAND',
}

export enum UtdypendeVilkårsvurderingEøsBarnBosattIRiket {
    BARN_BOR_I_NORGE = 'BARN_BOR_I_NORGE',
    BARN_BOR_I_EØS = 'BARN_BOR_I_EØS',
    BARN_BOR_I_STORBRITANNIA = 'BARN_BOR_I_STORBRITANNIA',
}

export enum UtdypendeVilkårsvurderingEøsBarnBorMedSøker {
    BARN_BOR_I_NORGE_MED_SØKER = 'BARN_BOR_I_NORGE_MED_SØKER',
    BARN_BOR_I_EØS_MED_SØKER = 'BARN_BOR_I_EØS_MED_SØKER',
    BARN_BOR_I_EØS_MED_ANNEN_FORELDER = 'BARN_BOR_I_EØS_MED_ANNEN_FORELDER',
    BARN_BOR_I_STORBRITANNIA_MED_SØKER = 'BARN_BOR_I_STORBRITANNIA_MED_SØKER',
    BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER = 'BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER',
    BARN_BOR_ALENE_I_ANNET_EØS_LAND = 'BARN_BOR_ALENE_I_ANNET_EØS_LAND',
}

export type UtdypendeVilkårsvurdering =
    | UtdypendeVilkårsvurderingGenerell
    | UtdypendeVilkårsvurderingNasjonal
    | UtdypendeVilkårsvurderingDeltBosted
    | UtdypendeVilkårsvurderingEøsSøkerBosattIRiket
    | UtdypendeVilkårsvurderingEøsBarnBosattIRiket
    | UtdypendeVilkårsvurderingEøsBarnBorMedSøker;
