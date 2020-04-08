import { randomUUID } from '../utils/commons';
import { IPeriode, nyPeriode } from './periode';
import { IPerson, PersonType } from './person';
import { IFelt, nyttFelt } from './felt';
import { erUtfylt, erPeriodeGyldig, erResultatGyldig } from '../utils/validators';

export enum Resultat {
    NEI = 'NEI',
    JA = 'JA',
    KANSKJE = 'KANSKJE',
}

export enum VilkårType {
    UNDER_18_ÅR = 'UNDER_18_ÅR',
    BOR_MED_SØKER = 'BOR_MED_SØKER',
    GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
    BOSATT_I_RIKET = 'BOSATT_I_RIKET',
    LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
}

export const lagTomtFeltMedVilkår = (vilkårType: VilkårType): IVilkårResultat => ({
    begrunnelse: nyttFelt('', erUtfylt),
    id: randomUUID(),
    periode: nyttFelt(nyPeriode(), erPeriodeGyldig),
    resultat: nyttFelt(Resultat.KANSKJE, erResultatGyldig),
    vilkårType,
});

// Vilkårsvurdering typer for ui
export interface IPersonResultat {
    personIdent: string;
    vilkårResultater: IFelt<IVilkårResultat>[];
    person: IPerson;
}

export interface IVilkårResultat {
    begrunnelse: IFelt<string>;
    id: string;
    periode: IFelt<IPeriode>;
    resultat: IFelt<Resultat>;
    vilkårType: VilkårType;
}

// Vilkårsvurdering typer for api
export interface IRestPersonResultat {
    personIdent: string;
    vilkårResultater: IRestVilkårResultat[];
}

export interface IRestVilkårResultat {
    vilkårType: VilkårType;
    begrunnelse: string;
    resultat: Resultat;
    periodeFom?: string;
    periodeTom?: string;
}

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
        lovreferanse: '§ 2-2',
        tittel: 'Bor med søker',
        spørsmål: () => `Bor barnet med søker?`,
        parterDetteGjelderFor: [PersonType.BARN],
    },
    GIFT_PARTNERSKAP: {
        beskrivelse: 'ugift og ikke partnerskap',
        key: 'GIFT_PARTNERSKAP',
        lovreferanse: '§ 2-4',
        tittel: 'Ugift og ikke partnerskap',
        spørsmål: () => 'Er barnet ugift og har ikke partnerskap',
        parterDetteGjelderFor: [PersonType.BARN],
    },
    BOSATT_I_RIKET: {
        beskrivelse: 'bosatt i riket',
        key: 'BOSATT_I_RIKET',
        lovreferanse: '§ 4-1',
        tittel: 'Bosatt i riket',
        spørsmål: (part?: string) => `Er ${part} bosatt i riket?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    LOVLIG_OPPHOLD: {
        beskrivelse: 'lovlig opphold',
        key: 'LOVLIG_OPPHOLD',
        lovreferanse: '§ 4-2',
        tittel: 'Lovlig opphold',
        spørsmål: (part?: string) => `Har ${part} lovlig opphold?`,
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
};
