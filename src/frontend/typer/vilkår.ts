import { FeltState } from '@navikt/familie-skjema';

import { FamilieIsoDate, IPeriode } from '../utils/kalender';
import { BehandlingSteg, BehandlingStegStatus } from './behandling';
import { IGrunnlagPerson, PersonType } from './person';
import {
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

export const regelverkOptions: [string, Regelverk][] = [
    ['Nasjonale regler', Regelverk.NASJONALE_REGLER],
    ['EØS-forordningen', Regelverk.EØS_FORORDNINGEN],
];

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
    erSkjønnsmessigVurdert: boolean;
    erMedlemskapVurdert: boolean;
    erDeltBosted: boolean;
    avslagBegrunnelser: FeltState<VedtakBegrunnelse[]>;
    vurderesEtter: Regelverk | null;
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
    erSkjønnsmessigVurdert: boolean;
    erMedlemskapVurdert: boolean;
    erDeltBosted: boolean;
    avslagBegrunnelser: VedtakBegrunnelse[];
    vilkårType: VilkårType;
    vurderesEtter: Regelverk | null;
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
    lovreferanse: string;
    spørsmål?: (part?: string) => string;
    tittel: string;
    parterDetteGjelderFor: PersonType[];
}

export const vilkårConfig: Record<VilkårType, IVilkårConfig> = {
    UNDER_18_ÅR: {
        beskrivelse: 'under 18 år',
        key: 'UNDER_18_ÅR',
        lovreferanse: '§ 2',
        tittel: 'Under 18 år',
        spørsmål: () => `Er barnet under 18 år?`,
        parterDetteGjelderFor: [PersonType.BARN],
    },
    BOR_MED_SØKER: {
        beskrivelse: 'bor med søker',
        key: 'BOR_MED_SØKER',
        lovreferanse: '§ 2, 2. LEDD',
        tittel: 'Bor med søker',
        spørsmål: () => `Bor barnet med søker?`,
        parterDetteGjelderFor: [PersonType.BARN],
    },
    GIFT_PARTNERSKAP: {
        beskrivelse: 'ugift og ikke partnerskap',
        key: 'GIFT_PARTNERSKAP',
        lovreferanse: '§ 2, 4. LEDD',
        tittel: 'Ugift og ikke partnerskap',
        spørsmål: () => 'Har barnet inngått ekteskap eller partnerskap?',
        parterDetteGjelderFor: [PersonType.BARN],
    },
    BOSATT_I_RIKET: {
        beskrivelse: 'bosatt i riket',
        key: 'BOSATT_I_RIKET',
        lovreferanse: '§ 4, 1. LEDD',
        tittel: 'Bosatt i riket',
        spørsmål: (part?: string) => `Er ${part} bosatt i riket?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    LOVLIG_OPPHOLD: {
        beskrivelse: 'lovlig opphold',
        key: 'LOVLIG_OPPHOLD',
        lovreferanse: '§ 4, 2. LEDD',
        tittel: 'Lovlig opphold',
        spørsmål: (part?: string) => `Har ${part} lovlig opphold?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    UTVIDET_BARNETRYGD: {
        beskrivelse: 'utvidet barnetrygd',
        key: 'UTVIDET_BARNETRYGD',
        lovreferanse: '§ 9',
        tittel: 'Utvidet barnetrygd',
        spørsmål: () => 'Foreligger det rett på utvidet barnetrygd?',
        parterDetteGjelderFor: [PersonType.SØKER],
    },
};

export interface IAnnenVurderingConfig {
    beskrivelse: string;
    key: string;
    tittel: string;
    lovreferanse: string;
    parterDetteGjelderFor: PersonType[];
    spørsmål?: (part?: string) => string;
}

export const annenVurderingConfig: Record<AnnenVurderingType, IAnnenVurderingConfig> = {
    OPPLYSNINGSPLIKT: {
        beskrivelse: 'Opplysningsplikt',
        key: 'OPPLYSNINGSPLIKT',
        tittel: 'Opplysningsplikt',
        lovreferanse: '§§ 17 OG 18',
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER, PersonType.ANNENPART],
        spørsmål: () => 'Er opplysningsplikten oppfylt?',
    },
};
