import { type DokumentÅrsak, DokumentÅrsakPerson } from './dokumentÅrsakTyper';

export enum BarnIBrevÅrsak {
    BARN_SØKT_FOR,
    BARN_BOSATT_MED_SØKER,
}

export const barnIBrevÅrsakTilTittel: Record<BarnIBrevÅrsak, string> = {
    [BarnIBrevÅrsak.BARN_SØKT_FOR]: 'Hvilke barn er søkt for?',
    [BarnIBrevÅrsak.BARN_BOSATT_MED_SØKER]: 'Hvilke barn er bosatt med søker?',
};

export const finnBarnIBrevÅrsak = (årsak: DokumentÅrsak | undefined): BarnIBrevÅrsak | undefined => {
    switch (årsak) {
        case DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD:
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER:
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER:
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL:
        case DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER:
            return BarnIBrevÅrsak.BARN_SØKT_FOR;
        case DokumentÅrsakPerson.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV:
            return BarnIBrevÅrsak.BARN_BOSATT_MED_SØKER;
        default:
            return undefined;
    }
};
