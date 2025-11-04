import {
    type IKlagebehandling,
    KlageinstansEventType,
    type KlageinstansResultat,
    KlageinstansUtfall,
    KlageResultat,
    KlageStatus,
    KlageÅrsak,
} from '../../typer/klage';

export function lagAnkeKlageinstansEventTyper(): KlageinstansEventType[] {
    return Object.keys(KlageinstansEventType)
        .filter(
            type =>
                type === KlageinstansEventType.ANKEBEHANDLING_OPPRETTET ||
                type === KlageinstansEventType.ANKEBEHANDLING_AVSLUTTET ||
                type === KlageinstansEventType.ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET
        )
        .map(type => KlageinstansEventType[type as keyof typeof KlageinstansEventType]);
}

export function lagIkkeAnkeKlageinstansEventTyper(): KlageinstansEventType[] {
    return Object.keys(KlageinstansEventType)
        .filter(
            type =>
                type !== KlageinstansEventType.ANKEBEHANDLING_OPPRETTET &&
                type !== KlageinstansEventType.ANKEBEHANDLING_AVSLUTTET &&
                type !== KlageinstansEventType.ANKE_I_TRYGDERETTENBEHANDLING_OPPRETTET
        )
        .map(type => KlageinstansEventType[type as keyof typeof KlageinstansEventType]);
}

export function lagFeilregistrertKlageinstansEventTyper(): KlageinstansEventType[] {
    return Object.keys(KlageinstansEventType)
        .filter(type => type === KlageinstansEventType.BEHANDLING_FEILREGISTRERT)
        .map(type => KlageinstansEventType[type as keyof typeof KlageinstansEventType]);
}

export function lagIkkeFeilregistrertKlageinstansEventTyper(): KlageinstansEventType[] {
    return Object.keys(KlageinstansEventType)
        .filter(type => type !== KlageinstansEventType.BEHANDLING_FEILREGISTRERT)
        .map(type => KlageinstansEventType[type as keyof typeof KlageinstansEventType]);
}

export function lagAlleKlageinstansUtfall(): KlageinstansUtfall[] {
    return Object.keys(KlageinstansUtfall).map(utfall => KlageinstansUtfall[utfall as keyof typeof KlageinstansUtfall]);
}

export function lagAlleKlageResultat(): KlageResultat[] {
    return Object.keys(KlageResultat).map(resultat => KlageResultat[resultat as keyof typeof KlageResultat]);
}

export function lagKlageinstansResultat(klageinstansResultat: Partial<KlageinstansResultat>): KlageinstansResultat {
    return {
        type: KlageinstansEventType.KLAGEBEHANDLING_AVSLUTTET,
        utfall: KlageinstansUtfall.STADFESTELSE,
        mottattEllerAvsluttetTidspunkt: '2025-01-16',
        journalpostReferanser: ['123-456-789'],
        årsakFeilregistrert: 'En eller annen årsak...',
        ...klageinstansResultat,
    };
}

export function lagKlagebehandling(klagebehandling: Partial<IKlagebehandling>): IKlagebehandling {
    return {
        id: '123',
        fagsakId: '321',
        status: KlageStatus.FERDIGSTILT,
        opprettet: '2025-01-15',
        mottattDato: '2025-01-15',
        resultat: KlageResultat.MEDHOLD,
        årsak: KlageÅrsak.ANNET,
        vedtaksdato: '2025-01-16',
        klageinstansResultat: [],
        ...klagebehandling,
    };
}

export * as KlageTestdata from './klageTestdata';
