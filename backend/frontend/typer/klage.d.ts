import type { IsoDatoString } from '../utils/dato';
export interface IKlagebehandling {
    id: string;
    fagsakId: string;
    status: KlageStatus;
    opprettet: IsoDatoString;
    mottattDato: IsoDatoString;
    resultat?: KlageResultat;
    årsak?: KlageÅrsak;
    vedtaksdato?: IsoDatoString;
    klageinstansResultat: KlageinstansResultat[];
}
export declare enum KlageÅrsak {
    FEIL_I_LOVANDVENDELSE = "FEIL_I_LOVANDVENDELSE",
    FEIL_REGELVERKSFORSTÅELSE = "FEIL_REGELVERKSFORST\u00C5ELSE",
    FEIL_ELLER_ENDRET_FAKTA = "FEIL_ELLER_ENDRET_FAKTA",
    FEIL_PROSESSUELL = "FEIL_PROSESSUELL",
    IKKE_UTREDET_NOK = "IKKE_UTREDET_NOK",
    KØET_BEHANDLING = "K\u00D8ET_BEHANDLING",
    ANNET = "ANNET"
}
export declare enum KlageResultat {
    MEDHOLD = "MEDHOLD",
    IKKE_MEDHOLD = "IKKE_MEDHOLD",
    IKKE_MEDHOLD_FORMKRAV_AVVIST = "IKKE_MEDHOLD_FORMKRAV_AVVIST",
    IKKE_SATT = "IKKE_SATT",
    HENLAGT = "HENLAGT"
}
export declare enum KlageinstansUtfall {
    TRUKKET = "TRUKKET",
    RETUR = "RETUR",
    OPPHEVET = "OPPHEVET",
    MEDHOLD = "MEDHOLD",
    DELVIS_MEDHOLD = "DELVIS_MEDHOLD",
    STADFESTELSE = "STADFESTELSE",
    UGUNST = "UGUNST",
    AVVIST = "AVVIST",
    INNSTILLING_STADFESTELSE = "INNSTILLING_STADFESTELSE",
    INNSTILLING_AVVIST = "INNSTILLING_AVVIST"
}
export declare enum KlageinstansEventType {
    KLAGEBEHANDLING_AVSLUTTET = "KLAGEBEHANDLING_AVSLUTTET",
    ANKEBEHANDLING_OPPRETTET = "ANKEBEHANDLING_OPPRETTET",
    ANKEBEHANDLING_AVSLUTTET = "ANKEBEHANDLING_AVSLUTTET",
    BEHANDLING_FEILREGISTRERT = "BEHANDLING_FEILREGISTRERT",
    ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET = "ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET"
}
export interface KlageinstansResultat {
    type: KlageinstansEventType;
    utfall?: KlageinstansUtfall;
    mottattEllerAvsluttetTidspunkt: IsoDatoString;
    journalpostReferanser: string[];
    årsakFeilregistrert?: string;
}
export declare enum KlageStatus {
    OPPRETTET = "OPPRETTET",
    UTREDES = "UTREDES",
    VENTER = "VENTER",
    FERDIGSTILT = "FERDIGSTILT"
}
export declare enum Klagebehandlingstype {
    KLAGE = "KLAGE"
}
export declare const klageinstansUtfallTilTekst: Record<KlageinstansUtfall, string>;
export declare function harAnkeEksistertPåKlagebehandling(behandling: IKlagebehandling): boolean;
export declare function erKlageFeilregistrertAvKA(behandling: IKlagebehandling): boolean;
export declare function utledKlagebehandlingResultattekst(behandling: IKlagebehandling): string;
