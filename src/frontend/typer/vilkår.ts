import { IPerson } from './person';
import { randomUUID } from '../utils/commons';
import { nyPeriode, Periode, diff } from './periode';

export enum Resultat {
    NEI = 'NEI',
    JA = 'JA',
}

export enum VilkårType {
    //UNDER_18_ÅR_OG_BOR_MED_SØKER = 'UNDER_18_ÅR_OG_BOR_MED_SØKER',
    BOSATT_I_RIKET = 'BOSATT_I_RIKET',
    STØNADSPERIODE = 'STØNADSPERIODE',
    LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
}

// Vilkårsvurdering typer for ui
export interface IPeriodeResultat {
    personIdent: string;
    vilkårResultater: IVilkårResultat[];
    person: IPerson;
}

export interface IVilkårResultat {
    vilkårType: VilkårType;
    id: string;
    begrunnelse: string;
    periode: Periode;
    resultat?: Resultat;
}

// Vilkårsvurdering typer for api
export interface IRestPeriodeResultat {
    personIdent: string;
    periodeFom?: string;
    periodeTom?: string;
    vilkårResultater: IRestVilkårResultat[];
}

export interface IRestVilkårResultat {
    vilkårType: VilkårType;
    begrunnelse: string;
    resultat?: Resultat;
}

type IVilkårsconfig = {
    [key in VilkårType]: IVilkårConfig;
};

export interface IVilkårConfig {
    beskrivelse: string;
    key: string;
    lovreferanse: string;
    spørsmål?: (part: string) => string;
    tittel: string;
}

export const vilkårConfig: IVilkårsconfig = {
    /*UNDER_18_ÅR_OG_BOR_MED_SØKER: {
        beskrivelse: 'under 18 år, bor med søker',
        key: 'UNDER_18_ÅR_OG_BOR_MED_SØKER',
        lovreferanse: '§ 2',
        tittel: 'Under 18 år og bor med søker',
    },*/
    BOSATT_I_RIKET: {
        beskrivelse: 'bosatt i riket',
        key: 'BOSATT_I_RIKET',
        lovreferanse: '§ 4',
        spørsmål: (part: string) => `Er ${part} bosatt i riket?`,
        tittel: 'Bosatt i riket',
    },
    STØNADSPERIODE: {
        beskrivelse: 'stønadsperiode',
        key: 'STØNADSPERIODE',
        lovreferanse: '§ 11',
        tittel: 'Stønadsperiode',
    },
    LOVLIG_OPPHOLD: {
        beskrivelse: 'lovlig opphold',
        key: 'LOVLIG_OPPHOLD',
        lovreferanse: '§ 4-2',
        spørsmål: (part: string) => `Har ${part} lovlig opphold`,
        tittel: 'Lovlig opphold',
    },
};

/**
 * Funksjon som basert på personene innvolvert i behandlingen henter ut vilkårene som må behandles
 * og lager en state struktur som vi videre kan bruke når saksbehandler vurderer vilkårene.
 *
 * @param personer liste av personer fra personopplysningsgrunnlaget på behandlingen
 */
export const hentVilkårForPersoner = (personer?: IPerson[]): IPeriodeResultat[] => {
    if (!personer) {
        return [];
    }

    return personer.map((person: IPerson) => ({
        personIdent: person.personIdent,
        person,
        vilkårResultater: [
            ...Object.values(vilkårConfig).map(
                (vc: IVilkårConfig): IVilkårResultat => ({
                    id: randomUUID(),
                    vilkårType: vc.key as VilkårType,
                    periode: nyPeriode('2020-04-01', '2020-04-30'),
                    begrunnelse: '',
                    resultat: Resultat.NEI,
                })
            ),
        ].sort((a, b) => diff(a.periode, b.periode)),
    }));
};
