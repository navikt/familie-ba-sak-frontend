import { BehandlingStatus, Behandlingstype, behandlingÅrsak, BehandlingÅrsak } from './behandling';
import { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import {
    finnVisningstekstForJournalføringsbehandlingsårsak,
    opprettJournalføringsbehandlingFraBarnetrygdbehandling,
    opprettJournalføringsbehandlingFraKlagebehandling,
} from './journalføringsbehandling';
import { Klagebehandlingstype, KlageStatus, KlageÅrsak } from './klage';
import { KlageTestdata } from '../testutils/testdata/klageTestdata';

describe('Journalføringsbehandling', () => {
    describe('FinnVisningstekstForJournalføringsbehandlingsårsak', () => {
        const behandlingsÅrsakTyper = Object.keys(BehandlingÅrsak).map(
            type => BehandlingÅrsak[type as keyof typeof BehandlingÅrsak]
        );

        const klageÅrsakTyper = Object.keys(KlageÅrsak).map(type => KlageÅrsak[type as keyof typeof KlageÅrsak]);

        test('skal returnere en bindestrek når årsak er undefined', () => {
            // Act
            const visningstekst = finnVisningstekstForJournalføringsbehandlingsårsak(undefined);

            // Expect
            expect(visningstekst).toBe('-');
        });

        test.each(behandlingsÅrsakTyper)('skal returnere en visningstekst når for BehandlingÅrsak', årsak => {
            // Act
            const visningstekst = finnVisningstekstForJournalføringsbehandlingsårsak(årsak);

            // Expect
            expect(visningstekst).toBe(behandlingÅrsak[årsak]);
            expect(visningstekst).not.toBe('-');
        });

        test.each(klageÅrsakTyper)('skal returnere en visningstekst når for KlageÅrsak', årsak => {
            // Act
            const visningstekst = finnVisningstekstForJournalføringsbehandlingsårsak(årsak);

            // Expect
            expect(visningstekst).toBe(behandlingÅrsak[årsak]);
            expect(visningstekst).not.toBe('-');
        });
    });

    describe('OpprettJournalføringsbehandlingFraKlagebehandling', () => {
        test('skal opprette journalføringsbehandling fra klagebehandling', () => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({
                id: '1',
                opprettet: '2025-03-06',
                status: KlageStatus.UTREDES,
            });

            // Act
            const journalføringsbehandling = opprettJournalføringsbehandlingFraKlagebehandling(klagebehandling);

            // Expect
            expect(journalføringsbehandling.id).toBe(klagebehandling.id);
            expect(journalføringsbehandling.opprettetTidspunkt).toBe(klagebehandling.opprettet);
            expect(journalføringsbehandling.type).toBe(Klagebehandlingstype.KLAGE);
            expect(journalføringsbehandling.status).toBe(klagebehandling.status);
        });
    });

    describe('OpprettJournalføringsbehandlingFraBarnetrygdbehandling', () => {
        const behandlingstyper = Object.keys(Behandlingstype).map(
            type => Behandlingstype[type as keyof typeof Behandlingstype]
        );

        test('skal opprette journalføringsbehandling fra barnetrygdbehandling hvor behandlingsiden er et number', () => {
            // Arrange
            const barnetrygdbehandling = {
                aktiv: true,
                behandlingId: 123,
                opprettetTidspunkt: '2015-03-06',
                aktivertTidspunkt: '2015-03-06',
                status: BehandlingStatus.UTREDES,
                type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                kategori: BehandlingKategori.NASJONAL,
                underkategori: BehandlingUnderkategori.ORDINÆR,
            };

            // Act
            const journalføringsbehandling =
                opprettJournalføringsbehandlingFraBarnetrygdbehandling(barnetrygdbehandling);

            // Expect
            expect(journalføringsbehandling.id).toBe(barnetrygdbehandling.behandlingId.toString());
            expect(journalføringsbehandling.opprettetTidspunkt).toBe(barnetrygdbehandling.opprettetTidspunkt);
            expect(journalføringsbehandling.type).toBe(barnetrygdbehandling.type);
            expect(journalføringsbehandling.status).toBe(barnetrygdbehandling.status);
        });

        test('skal opprette journalføringsbehandling fra barnetrygdbehandling hvor behandlingsiden er en string', () => {
            // Arrange
            const barnetrygdbehandling = {
                aktiv: true,
                behandlingId: 123,
                opprettetTidspunkt: '2015-03-06',
                aktivertTidspunkt: '2015-03-06',
                status: BehandlingStatus.UTREDES,
                type: Behandlingstype.FØRSTEGANGSBEHANDLING,
                kategori: BehandlingKategori.NASJONAL,
                underkategori: BehandlingUnderkategori.ORDINÆR,
            };

            // Act
            const journalføringsbehandling =
                opprettJournalføringsbehandlingFraBarnetrygdbehandling(barnetrygdbehandling);

            // Expect
            expect(journalføringsbehandling.id).toBe(barnetrygdbehandling.behandlingId.toString());
            expect(journalføringsbehandling.opprettetTidspunkt).toBe(barnetrygdbehandling.opprettetTidspunkt);
            expect(journalføringsbehandling.type).toBe(barnetrygdbehandling.type);
            expect(journalføringsbehandling.status).toBe(barnetrygdbehandling.status);
        });

        test.each(behandlingstyper)(
            'skal opprette journalføringsbehandling fra barnetrygdbehandling for alle behandlingstyper',
            behandlingstype => {
                // Arrange
                const barnetrygdbehandling = {
                    aktiv: true,
                    behandlingId: 123,
                    opprettetTidspunkt: '2015-03-06',
                    aktivertTidspunkt: '2015-03-06',
                    status: BehandlingStatus.UTREDES,
                    type: behandlingstype,
                    kategori: BehandlingKategori.NASJONAL,
                    underkategori: BehandlingUnderkategori.ORDINÆR,
                };

                // Act
                const journalføringsbehandling =
                    opprettJournalføringsbehandlingFraBarnetrygdbehandling(barnetrygdbehandling);

                // Expect
                expect(journalføringsbehandling.id).toBe(barnetrygdbehandling.behandlingId.toString());
                expect(journalføringsbehandling.opprettetTidspunkt).toBe(barnetrygdbehandling.opprettetTidspunkt);
                expect(journalføringsbehandling.type).toBe(barnetrygdbehandling.type);
                expect(journalføringsbehandling.status).toBe(barnetrygdbehandling.status);
            }
        );
    });
});
