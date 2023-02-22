import {
    type IKlagebehandling,
    KlageStatus,
    KlageResultat,
    KlageÅrsak,
    KlageinstansEventType,
    KlageinstansUtfall,
} from '../typer/klage';

export const lagMockKlagebehandling = (fagsakId: string): IKlagebehandling => ({
    id: 'mock-klagebehandling',
    fagsakId: fagsakId,
    status: KlageStatus.FERDIGSTILT,
    opprettet: '2023-02-01T00:00:00.000',
    mottattDato: '2023-02-01T01:00:00.000',
    resultat: KlageResultat.IKKE_MEDHOLD,
    årsak: KlageÅrsak.ANNET,
    vedtaksdato: '2023-02-02T00:00:00.000',
    klageinstansResultat: [
        {
            type: KlageinstansEventType.KLAGEBEHANDLING_AVSLUTTET,
            utfall: KlageinstansUtfall.AVVIST,
            mottattEllerAvsluttetTidspunkt: '2023-02-03T00:00:00.000',
            journalpostReferanser: [],
        },
        {
            type: KlageinstansEventType.ANKEBEHANDLING_AVSLUTTET,
            utfall: KlageinstansUtfall.MEDHOLD,
            mottattEllerAvsluttetTidspunkt: '2023-02-04T00:00:00.000',
            journalpostReferanser: [],
        },
    ],
});
