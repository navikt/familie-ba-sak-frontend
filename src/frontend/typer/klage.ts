import { behandlingsresultater } from './behandling';
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

export enum KlageÅrsak {
    FEIL_I_LOVANDVENDELSE = 'FEIL_I_LOVANDVENDELSE',
    FEIL_REGELVERKSFORSTÅELSE = 'FEIL_REGELVERKSFORSTÅELSE',
    FEIL_ELLER_ENDRET_FAKTA = 'FEIL_ELLER_ENDRET_FAKTA',
    FEIL_PROSESSUELL = 'FEIL_PROSESSUELL',
    IKKE_UTREDET_NOK = 'IKKE_UTREDET_NOK',
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

export enum KlageinstansUtfall {
    TRUKKET = 'TRUKKET',
    RETUR = 'RETUR',
    OPPHEVET = 'OPPHEVET',
    MEDHOLD = 'MEDHOLD',
    DELVIS_MEDHOLD = 'DELVIS_MEDHOLD',
    STADFESTELSE = 'STADFESTELSE',
    UGUNST = 'UGUNST',
    AVVIST = 'AVVIST',
    INNSTILLING_STADFESTELSE = 'INNSTILLING_STADFESTELSE',
    INNSTILLING_AVVIST = 'INNSTILLING_AVVIST',
}

export enum KlageinstansEventType {
    KLAGEBEHANDLING_AVSLUTTET = 'KLAGEBEHANDLING_AVSLUTTET',
    ANKEBEHANDLING_OPPRETTET = 'ANKEBEHANDLING_OPPRETTET',
    ANKEBEHANDLING_AVSLUTTET = 'ANKEBEHANDLING_AVSLUTTET',
    BEHANDLING_FEILREGISTRERT = 'BEHANDLING_FEILREGISTRERT',
    ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET = 'ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET',
}

export interface KlageinstansResultat {
    type: KlageinstansEventType;
    utfall?: KlageinstansUtfall;
    mottattEllerAvsluttetTidspunkt: IsoDatoString;
    journalpostReferanser: string[];
    årsakFeilregistrert?: string;
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

export const klageinstansUtfallTilTekst: Record<KlageinstansUtfall, string> = {
    TRUKKET: 'Trukket KA',
    RETUR: 'Retur KA',
    OPPHEVET: 'Opphevet KA',
    MEDHOLD: 'Medhold KA',
    DELVIS_MEDHOLD: 'Delvis medhold KA',
    STADFESTELSE: 'Stadfestelse KA',
    UGUNST: 'Ugunst (Ugyldig) KA',
    AVVIST: 'Avvist KA',
    INNSTILLING_STADFESTELSE: 'Innstilling om stadfestelse til trygderetten fra KA',
    INNSTILLING_AVVIST: 'Innstilling om avist til trygderetten fra KA',
};

export function harAnkeEksistertPåKlagebehandling(behandling: IKlagebehandling) {
    return behandling.klageinstansResultat.some(
        resultat =>
            resultat.type === KlageinstansEventType.ANKEBEHANDLING_OPPRETTET ||
            resultat.type === KlageinstansEventType.ANKEBEHANDLING_AVSLUTTET ||
            resultat.type === KlageinstansEventType.ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET
    );
}

export function erKlageFeilregistrertAvKA(behandling: IKlagebehandling) {
    return behandling.klageinstansResultat.some(
        resultat => resultat.type == KlageinstansEventType.BEHANDLING_FEILREGISTRERT
    );
}

function finnAvsluttetKlagebehandlingUtfall(behandling: IKlagebehandling): KlageinstansUtfall | undefined {
    return behandling.klageinstansResultat.find(
        resultat => resultat.utfall && resultat.type === KlageinstansEventType.KLAGEBEHANDLING_AVSLUTTET
    )?.utfall;
}

export function utledKlagebehandlingResultattekst(behandling: IKlagebehandling) {
    const klageBehandlingAvsluttetUtfall = finnAvsluttetKlagebehandlingUtfall(behandling);
    if (klageBehandlingAvsluttetUtfall) {
        return klageinstansUtfallTilTekst[klageBehandlingAvsluttetUtfall];
    }
    if (erKlageFeilregistrertAvKA(behandling)) {
        return 'Feilregistrert (KA)';
    }
    if (behandling.resultat) {
        return behandlingsresultater[behandling.resultat];
    }
    return 'Ikke satt';
}
