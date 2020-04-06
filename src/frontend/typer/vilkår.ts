import { randomUUID } from '../utils/commons';
import { diff, IPeriode, nyPeriode } from './periode';
import { IPerson, PersonType } from './person';

export enum Resultat {
    NEI = 'NEI',
    JA = 'JA',
}

export enum VilkårType {
    UNDER_18_ÅR = 'UNDER_18_ÅR',
    BOR_MED_SØKER = 'BOR_MED_SØKER',
    GIFT_PARTNERSKAP = 'GIFT_PARTNERSKAP',
    BOSATT_I_RIKET = 'BOSATT_I_RIKET',
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
    periode: IPeriode;
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
        beskrivelse: 'gift eller partnerskap',
        key: 'GIFT_PARTNERSKAP',
        lovreferanse: '§ 2-4',
        tittel: 'Er gift eller har partnerskap',
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
            ...Object.values(vilkårConfig)
                .filter((vc: IVilkårConfig) => vc.parterDetteGjelderFor.includes(person.type))
                .map(
                    (vc: IVilkårConfig): IVilkårResultat => ({
                        id: randomUUID(),
                        vilkårType: vc.key as VilkårType,
                        periode: nyPeriode('2020-04-01', '2020-04-30'),
                        begrunnelse: '',
                    })
                ),
        ].sort((a, b) => diff(a.periode, b.periode)),
    }));
};
