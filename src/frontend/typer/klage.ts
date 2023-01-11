import type { ISODateString } from 'nav-datovelger/lib/types';

export interface IKlagebehandling {
    id: string;
    fagsakId: string;
    status: KlageStatus;
    opprettet: ISODateString;
    mottattDato: ISODateString;
    resultat?: KlageResultat;
    årsak?: KlageÅrsak;
    vedtaksdato?: ISODateString;
    klageinstansResultat: KlageinstansResultat[];
}

export enum KlageÅrsak {
    FEIL_I_LOVANDVENDELSE = 'FEIL_I_LOVANDVENDELSE',
    FEIL_REGELVERKSFORSTÅELSE = 'FEIL_REGELVERKSFORSTÅELSE',
    FEIL_ELLER_ENDRET_FAKTA = 'FEIL_ELLER_ENDRET_FAKTA',
    FEIL_PROSESSUELL = 'FEIL_PROSESSUELL',
    KØET_BEHANDLING = 'KØET_BEHANDLING',
    ANNET = 'ANNET',
}

export enum KlageResultat {
    MEDHOLD = 'MEDHOLD',
    IKKE_MEDHOLD = 'IKKE_MEDHOLD',
    IKKE_MEDHOLD_FORMKRAV_AVVIST = 'IKKE_MEDHOLD_FORMKRAV_AVVIST',
    IKKE_SATT = 'IKKE_SATT',
    HENLAGT = 'HENLAGT',
}

enum KlageinstansUtfall {
    TRUKKET = 'TRUKKET',
    RETUR = 'RETUR',
    OPPHEVET = 'OPPHEVET',
    MEDHOLD = 'MEDHOLD',
    DELVIS_MEDHOLD = 'DELVIS_MEDHOLD',
    STADFESTELSE = 'STADFESTELSE',
    UGUNST = 'UGUNST',
    AVVIST = 'AVVIST',
}

enum BehandlingEventType {
    KLAGEBEHANDLING_AVSLUTTET = 'KLAGEBEHANDLING_AVSLUTTET',
    ANKEBEHANDLING_OPPRETTET = 'ANKEBEHANDLING_OPPRETTET',
    ANKEBEHANDLING_AVSLUTTET = 'ANKEBEHANDLING_AVSLUTTET',
}

interface KlageinstansResultat {
    type: BehandlingEventType;
    utfall?: KlageinstansUtfall;
    mottattEllerAvsluttetTidspunkt: ISODateString;
    journalpostReferanser: string[];
}

export enum KlageStatus {
    OPPRETTET = 'OPPRETTET',
    UTREDES = 'UTREDES',
    VENTER = 'VENTER',
    FERDIGSTILT = 'FERDIGSTILT',
}

export enum Klagebehandlingstype {
    KLAGE = 'KLAGE',
}
