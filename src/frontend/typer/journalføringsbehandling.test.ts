import { BehandlingStatus, Behandlingstype } from './behandling';
import { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import {
    opprettJournalføringsbehandlingFraBarnetrygdbehandling,
    opprettJournalføringsbehandlingFraKlagebehandling,
} from './journalføringsbehandling';
import { KlageStatus } from './klage';
import { KlageTestdata } from '../testdata/klageTestdata';

describe('Journalføringsbehandling', () => {
    describe('OpprettJournalføringsbehandlingFraKlagebehandling', () => {
        test('skal opprette journalføringsbehandling fra klagebehandling', () => {
            // Arrange
            const klagebehandling = KlageTestdata.lagKlagebehandling({
                id: '1',
                opprettet: '2025-03-06',
                status: KlageStatus.UTREDES,
            });

            // Act
            const journalføringsbehandling =
                opprettJournalføringsbehandlingFraKlagebehandling(klagebehandling);

            // Expect
            expect(journalføringsbehandling.id).toBe(klagebehandling.id);
            expect(journalføringsbehandling.opprettetTidspunkt).toBe(klagebehandling.opprettet);
            expect(journalføringsbehandling.type).toBe(Behandlingstype.KLAGE);
            expect(journalføringsbehandling.status).toBe(klagebehandling.status);
        });
    });

    describe('OpprettJournalføringsbehandlingFraBarnetrygdbehandling', () => {
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
            expect(journalføringsbehandling.id).toBe(barnetrygdbehandling.behandlingId + '');
            expect(journalføringsbehandling.opprettetTidspunkt).toBe(
                barnetrygdbehandling.opprettetTidspunkt
            );
            expect(journalføringsbehandling.type).toBe(barnetrygdbehandling.type);
            expect(journalføringsbehandling.status).toBe(barnetrygdbehandling.status);
        });

        test('skal opprette journalføringsbehandling fra barnetrygdbehandling hvor behandlingsiden er en string', () => {
            // Arrange
            const barnetrygdbehandling = {
                aktiv: true,
                behandlingId: '123',
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
            expect(journalføringsbehandling.id).toBe(barnetrygdbehandling.behandlingId);
            expect(journalføringsbehandling.opprettetTidspunkt).toBe(
                barnetrygdbehandling.opprettetTidspunkt
            );
            expect(journalføringsbehandling.type).toBe(barnetrygdbehandling.type);
            expect(journalføringsbehandling.status).toBe(barnetrygdbehandling.status);
        });
    });
});
