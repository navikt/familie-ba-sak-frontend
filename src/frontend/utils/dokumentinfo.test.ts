import { lagDokumentInfo } from '@testutils/testdata/dokumentInfoTestdata';
import { describe, expect, test } from 'vitest';

import { lagJournalpostDokumenterForJournalføring } from './dokumentinfo';

describe('lagJournalpostDokumenterForJournalføring', () => {
    test('skal sende valgte titler som logiske vedlegg og beholde dokumenttittelen uendret', () => {
        // Arrange
        const logiskeVedlegg = [
            { logiskVedleggId: '0', tittel: 'Vigselsattest' },
            { logiskVedleggId: '0', tittel: 'Pass/ID-papirer' },
        ];
        const dokument = lagDokumentInfo({ dokumentInfoId: '123', tittel: 'Klage', logiskeVedlegg });

        // Act
        const [journalpostDokument] = lagJournalpostDokumenterForJournalføring([dokument]);

        // Assert
        expect(journalpostDokument).toEqual({
            dokumentTittel: 'Klage',
            dokumentInfoId: '123',
            logiskeVedlegg,
        });
    });

    test('skal ikke slå sammen titlene på logiske vedlegg med dokumenttittelen når det er mange vedlegg', () => {
        // Arrange
        const logiskeVedlegg = Array.from({ length: 50 }, (_, index) => ({
            logiskVedleggId: '0',
            tittel: `Brev fra skatt om registrering av sivilstatus nummer ${index + 1}`,
        }));
        const dokument = lagDokumentInfo({ tittel: 'Klage', logiskeVedlegg });

        // Act
        const [journalpostDokument] = lagJournalpostDokumenterForJournalføring([dokument]);

        // Assert
        expect(journalpostDokument.dokumentTittel).toBe('Klage');
        expect(journalpostDokument.logiskeVedlegg).toHaveLength(50);
        expect(journalpostDokument.logiskeVedlegg).toEqual(logiskeVedlegg);
    });

    test('skal sende tom liste når alle logiske vedlegg er fjernet', () => {
        // Arrange
        const dokument = lagDokumentInfo({ logiskeVedlegg: [] });

        // Act
        const [journalpostDokument] = lagJournalpostDokumenterForJournalføring([dokument]);

        // Assert
        expect(journalpostDokument.logiskeVedlegg).toEqual([]);
    });

    test('skal mappe hvert dokument med sine egne logiske vedlegg', () => {
        // Arrange
        const dokumenter = [
            lagDokumentInfo({
                dokumentInfoId: '1',
                tittel: 'Søknad om barnetrygd ordinær',
                logiskeVedlegg: [{ logiskVedleggId: '11', tittel: 'Fødselsattest' }],
            }),
            lagDokumentInfo({
                dokumentInfoId: '2',
                tittel: 'Ekstra vedlegg',
                logiskeVedlegg: [{ logiskVedleggId: '0', tittel: 'Uttalelse' }],
            }),
        ];

        // Act
        const journalpostDokumenter = lagJournalpostDokumenterForJournalføring(dokumenter);

        // Assert
        expect(journalpostDokumenter).toEqual([
            {
                dokumentTittel: 'Søknad om barnetrygd ordinær',
                dokumentInfoId: '1',
                logiskeVedlegg: [{ logiskVedleggId: '11', tittel: 'Fødselsattest' }],
            },
            {
                dokumentTittel: 'Ekstra vedlegg',
                dokumentInfoId: '2',
                logiskeVedlegg: [{ logiskVedleggId: '0', tittel: 'Uttalelse' }],
            },
        ]);
    });

    test('skal bruke 0 som dokumentInfoId når dokumentet mangler dokumentInfoId', () => {
        // Arrange
        const dokument = lagDokumentInfo({ dokumentInfoId: undefined });

        // Act
        const [journalpostDokument] = lagJournalpostDokumenterForJournalføring([dokument]);

        // Assert
        expect(journalpostDokument.dokumentInfoId).toBe('0');
    });

    test('skal ikke sende eksisterende logiske vedlegg', () => {
        // Arrange
        const dokument = lagDokumentInfo({ logiskeVedlegg: [{ logiskVedleggId: '0', tittel: 'Uttalelse' }] });

        // Act
        const [journalpostDokument] = lagJournalpostDokumenterForJournalføring([dokument]);

        // Assert
        expect(journalpostDokument).not.toHaveProperty('eksisterendeLogiskeVedlegg');
    });

    test('skal returnere tom liste når det ikke er noen dokumenter', () => {
        // Act
        const journalpostDokumenter = lagJournalpostDokumenterForJournalføring([]);

        // Assert
        expect(journalpostDokumenter).toEqual([]);
    });
});
