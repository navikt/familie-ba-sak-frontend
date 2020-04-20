import { IPeriode } from './periode';
import { IPerson, PersonType } from './person';
import { IFelt } from './felt';
export declare enum Resultat {
    NEI = "NEI",
    JA = "JA",
    KANSKJE = "KANSKJE"
}
export declare const resultatTilUi: (resultat: Resultat) => "Oppfylt" | "Ikke oppfylt" | "Ikke vurdert" | "Ukjent resultat";
export declare enum VilkårType {
    UNDER_18_ÅR = "UNDER_18_\u00C5R",
    BOR_MED_SØKER = "BOR_MED_S\u00D8KER",
    GIFT_PARTNERSKAP = "GIFT_PARTNERSKAP",
    BOSATT_I_RIKET = "BOSATT_I_RIKET",
    LOVLIG_OPPHOLD = "LOVLIG_OPPHOLD"
}
export declare const lagTomtFeltMedVilkår: (vilkårType: VilkårType) => IVilkårResultat;
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
declare type IVilkårsconfig = {
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
export declare const vilkårConfig: IVilkårsconfig;
export {};
