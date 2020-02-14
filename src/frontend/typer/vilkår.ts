import { PersonType, IPerson } from './person';

export enum UtfallType {
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    OPPFYLT = 'OPPFYLT',
}

export enum VilkårType {
    UNDER_18_ÅR_OG_BOR_MED_SØKER = 'UNDER_18_ÅR_OG_BOR_MED_SØKER',
    BOSATT_I_RIKET = 'BOSATT_I_RIKET',
    STØNADSPERIODE = 'STØNADSPERIODE',
}

type IVilkårsconfig = {
    [key in VilkårType]: IVilkårConfig;
};

export interface IVilkårConfig {
    beskrivelse: string;
    key: string;
    lovreferanse: string;
    parterDetteGjelderFor: PersonType[];
}

export const vilkårConfig: IVilkårsconfig = {
    UNDER_18_ÅR_OG_BOR_MED_SØKER: {
        beskrivelse: 'under 18 år, bor med søker',
        key: 'UNDER_18_ÅR_OG_BOR_MED_SØKER',
        lovreferanse: '§ 2',
        parterDetteGjelderFor: [PersonType.BARN],
    },
    BOSATT_I_RIKET: {
        beskrivelse: 'bosatt i riket',
        key: 'BOSATT_I_RIKET',
        lovreferanse: '§ 4',
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
    STØNADSPERIODE: {
        beskrivelse: 'stønadsperiode',
        key: 'STØNADSPERIODE',
        lovreferanse: '§ 11',
        parterDetteGjelderFor: [PersonType.BARN, PersonType.SØKER],
    },
};

export interface IVilkårResultat {
    personIdent: string;
    vilkårType: VilkårType;
    utfallType: UtfallType;
}

/**
 * Funksjon som basert på personene innvolvert i behandlingen henter ut vilkårene som må behandles
 * og lager en state struktur som vi videre kan bruke når saksbehandler vurderer vilkårene.
 *
 * @param personer liste av personer fra personopplysningsgrunnlaget på behandlingen
 */
export const hentVilkårForPersoner = (personer?: IPerson[]): IVilkårResultat[] => {
    if (!personer) {
        return [];
    }

    let listeMedVilkårForBehandling: IVilkårResultat[] = [];
    personer.map((person: IPerson) => {
        listeMedVilkårForBehandling = [
            ...listeMedVilkårForBehandling,
            ...Object.values(vilkårConfig)
                .filter((vc: IVilkårConfig) => vc.parterDetteGjelderFor.includes(person.type))
                .map(
                    (vc: IVilkårConfig): IVilkårResultat => ({
                        personIdent: person.personIdent,
                        vilkårType: vc.key as VilkårType,
                        utfallType: UtfallType.IKKE_OPPFYLT,
                    })
                ),
        ];
    });

    return listeMedVilkårForBehandling;
};
