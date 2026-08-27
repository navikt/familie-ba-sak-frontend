import { DokumentÅrsak } from './dokumentÅrsakTyper';

export enum BarnIBrevÅrsak {
    BARN_SØKT_FOR,
    BARN_BOSATT_MED_SØKER,
    DELT_BOSTED,
}

export const barnIBrevÅrsakTilTittel: Record<BarnIBrevÅrsak, string> = {
    [BarnIBrevÅrsak.BARN_SØKT_FOR]: 'Hvilke barn er søkt for?',
    [BarnIBrevÅrsak.BARN_BOSATT_MED_SØKER]: 'Hvilke barn er bosatt med søker?',
    [BarnIBrevÅrsak.DELT_BOSTED]: 'Hvilke barn har delt bosted?',
};

export const finnBarnIBrevÅrsak = (årsak: DokumentÅrsak | ''): BarnIBrevÅrsak | undefined => {
    switch (årsak) {
        case DokumentÅrsak.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
        case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER:
        case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER:
        case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL:
        case DokumentÅrsak.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER:
            return BarnIBrevÅrsak.BARN_SØKT_FOR;
        case DokumentÅrsak.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV:
            return BarnIBrevÅrsak.BARN_BOSATT_MED_SØKER;
        case DokumentÅrsak.DELT_BOSTED:
            return BarnIBrevÅrsak.DELT_BOSTED;
        default:
            return undefined;
    }
};
