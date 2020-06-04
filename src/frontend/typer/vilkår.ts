import { IPeriode, nyPeriode } from './periode';
import { IPerson, PersonType } from './person';
import { IFelt, nyttFelt, Valideringsstatus } from './felt';
import { erPeriodeGyldig, erResultatGyldig, ikkeValider } from '../utils/validators';
import { INøkkelPar } from './common';

export enum Resultat {
    NEI = 'NEI',
    JA = 'JA',
    KANSKJE = 'KANSKJE',
}

export const resultatTilUi = (resultat: Resultat) => {
    switch (resultat) {
        case Resultat.JA:
            return 'Oppfylt';
        case Resultat.NEI:
            return 'Ikke oppfylt';
        case Resultat.KANSKJE:
            return 'Ikke vurdert';
        default:
            return 'Ukjent resultat';
    }
};

export const resultater: INøkkelPar = {
    JA: {
        id: 'JA',
        navn: 'Ja',
    },
    NEI: {
        id: 'NEI',
        navn: 'Nei',
    },
    KANSKJE: {
        id: 'Kanskje',
        navn: 'Kanskje',
    },
};

export enum VilkårType {
    UNDER_18_ÅR = 'UNDER_18_ÅR',
    BOR_MED_SØKER = 'BOR_MED_SØKER',
    GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
    BOSATT_I_RIKET = 'BOSATT_I_RIKET',
    LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
}

export const lagTomtFeltMedVilkår = (vilkårType: VilkårType): IVilkårResultat => ({
    begrunnelse: {
        feilmelding: '',
        valideringsFunksjon: ikkeValider,
        valideringsstatus: Valideringsstatus.OK,
        verdi: '',
    },
    id: 1,
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
    id: number;
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
    begrunnelse: string;
    id: number;
    periodeFom?: string;
    periodeTom?: string;
    resultat: Resultat;
    vilkårType: VilkårType;
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
        spørsmål: () => 'Er barnet ugift og har ikke partnerskap',
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
