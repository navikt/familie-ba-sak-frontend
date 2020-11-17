import { IPeriode } from './periode';
import { IGrunnlagPerson, PersonType } from './person';
import { IRestVedtakBegrunnelse, VedtakBegrunnelseType } from './vedtak';
import { FeltState } from '../familie-skjema/typer';
import { BehandlingSteg, BehandlingStegStatus } from './behandling';

export enum Resultat {
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    OPPFYLT = 'OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
}

export enum RestResultat {
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    OPPFYLT = 'OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    NEI = 'NEI',
    JA = 'JA',
    KANSKJE = 'KANSKJE',
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

export const migrerResultatTilUi = (resultat: RestResultat): Resultat => {
    switch (resultat) {
        case RestResultat.OPPFYLT:
            return Resultat.OPPFYLT;
        case RestResultat.JA:
            return Resultat.OPPFYLT;
        case RestResultat.IKKE_OPPFYLT:
            return Resultat.IKKE_OPPFYLT;
        case RestResultat.NEI:
            return Resultat.IKKE_OPPFYLT;
        case RestResultat.KANSKJE:
            return Resultat.IKKE_VURDERT;
        case RestResultat.IKKE_VURDERT:
            return Resultat.IKKE_VURDERT;
    }
};

export const migrerResultatTilApi = (resultat: Resultat): RestResultat => {
    switch (resultat) {
        case Resultat.OPPFYLT:
            return RestResultat.OPPFYLT;
        case Resultat.IKKE_OPPFYLT:
            return RestResultat.IKKE_OPPFYLT;
        case Resultat.IKKE_VURDERT:
            return RestResultat.IKKE_VURDERT;
    }
};

export enum VilkårType {
    UNDER_18_ÅR = 'UNDER_18_ÅR',
    BOR_MED_SØKER = 'BOR_MED_SØKER',
    GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
    BOSATT_I_RIKET = 'BOSATT_I_RIKET',
    LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
}

// Vilkårsvurdering typer for ui
export interface IPersonResultat {
    personIdent: string;
    vilkårResultater: FeltState<IVilkårResultat>[];
    person: IGrunnlagPerson;
}

export interface IVilkårResultat {
    begrunnelse: FeltState<string>;
    behandlingId: number;
    endretAv: string;
    endretTidspunkt: string;
    erVurdert: boolean;
    id: number;
    periode: FeltState<IPeriode>;
    resultat: FeltState<Resultat>;
    vilkårType: VilkårType;
}

// Vilkårsvurdering typer for api
export interface IRestPersonResultat {
    personIdent: string;
    vilkårResultater: IRestVilkårResultat[];
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
    erVurdert?: boolean;
    id: number;
    periodeFom?: string;
    periodeTom?: string;
    resultat: RestResultat;
    vilkårType: VilkårType;
}

export interface IRestStegTilstand {
    behandlingSteg: BehandlingSteg;
    behandlingStegStatus: BehandlingStegStatus;
}

export type Vilkårsbegrunnelser = {
    [key in VedtakBegrunnelseType]: IRestVedtakBegrunnelse[];
};

type IVilkårsconfig = {
    [key in VilkårType]: IVilkårConfig;
};

export interface IVilkårConfig {
    beskrivelse: string;
    key: string;
    lovreferanse: string;
    spørsmål?: (part?: string) => string;
    tittel: string;
    parterDetteGjelderFor: PersonType[];
}

export const vilkårConfig: IVilkårsconfig = {
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
};
