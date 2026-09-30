import type { IDokumentInfo } from '@navikt/familie-typer';
import { screen, within } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import { lagDokumentInfo } from '@testutils/testdata/dokumentInfoTestdata';
import { render } from '@testutils/testrender';
import { DokumentTittel } from '@typer/manuell-journalføring';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useManuellJournalføringContext } from '../ManuellJournalføringContext';
import { EndreDokumentInfoPanel } from './EndreDokumentInfoPanel';

vi.mock('../ManuellJournalføringContext', () => ({
    useManuellJournalføringContext: vi.fn(),
}));

const validerOgSettFelt = vi.fn();

function mockManuellJournalføringContext(dokumenter: IDokumentInfo[]) {
    vi.mocked(useManuellJournalføringContext).mockReturnValue({
        skjema: { felter: { dokumenter: { verdi: dokumenter, validerOgSettFelt } } },
        erLesevisning: () => false,
    } as unknown as ReturnType<typeof useManuellJournalføringContext>);
}

async function velgAlternativ(user: UserEvent, comboboxNavn: string, alternativ: string) {
    const combobox = screen.getByRole('combobox', { name: comboboxNavn });
    await user.click(combobox);
    const alternativer = document.getElementById(combobox.getAttribute('aria-controls') ?? '');
    if (!alternativer) {
        throw new Error(`Fant ikke alternativene til ${comboboxNavn}`);
    }
    await user.click(await within(alternativer).findByRole('option', { name: alternativ }));
}

afterEach(() => {
    vi.resetAllMocks();
});

describe('EndreDokumentInfoPanel', () => {
    test('skal vise eksisterende logiske vedlegg som valgt innhold', () => {
        // Arrange
        const dokument = lagDokumentInfo({
            logiskeVedlegg: [
                { logiskVedleggId: '11', tittel: DokumentTittel.FØDSELSATTEST },
                { logiskVedleggId: '12', tittel: DokumentTittel.UTTALELSE },
            ],
        });
        mockManuellJournalføringContext([dokument]);

        // Act
        render(<EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={false} />);

        // Assert
        expect(screen.getByRole('button', { name: `${DokumentTittel.FØDSELSATTEST} slett` })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: `${DokumentTittel.UTTALELSE} slett` })).toBeInTheDocument();
    });

    test('skal legge til valgt innhold som logisk vedlegg uten å endre dokumenttittelen', async () => {
        // Arrange
        const dokument = lagDokumentInfo({
            logiskeVedlegg: [{ logiskVedleggId: '11', tittel: DokumentTittel.FØDSELSATTEST }],
        });
        const annetDokument = lagDokumentInfo({ dokumentInfoId: '2', tittel: 'Ekstra vedlegg' });
        mockManuellJournalføringContext([dokument, annetDokument]);

        const { user } = render(<EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={false} />);

        // Act
        await velgAlternativ(user, 'Annet innhold', DokumentTittel.UTTALELSE);

        // Assert
        expect(validerOgSettFelt).toHaveBeenCalledTimes(1);
        expect(validerOgSettFelt).toHaveBeenCalledWith([
            {
                ...dokument,
                tittel: 'Klage',
                logiskeVedlegg: [
                    { logiskVedleggId: '0', tittel: DokumentTittel.FØDSELSATTEST },
                    { logiskVedleggId: '0', tittel: DokumentTittel.UTTALELSE },
                ],
            },
            annetDokument,
        ]);
    });

    test('skal legge til fritekst som logisk vedlegg', async () => {
        // Arrange
        const dokument = lagDokumentInfo();
        mockManuellJournalføringContext([dokument]);

        const { user } = render(<EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={false} />);

        // Act
        await user.type(
            screen.getByRole('combobox', { name: 'Annet innhold' }),
            'Brev fra skatt om sivilstatus{Enter}'
        );

        // Assert
        expect(validerOgSettFelt).toHaveBeenCalledWith([
            {
                ...dokument,
                logiskeVedlegg: [{ logiskVedleggId: '0', tittel: 'Brev fra skatt om sivilstatus' }],
            },
        ]);
    });

    test('skal fjerne innhold fra logiske vedlegg', async () => {
        // Arrange
        const dokument = lagDokumentInfo({
            logiskeVedlegg: [
                { logiskVedleggId: '11', tittel: DokumentTittel.FØDSELSATTEST },
                { logiskVedleggId: '12', tittel: DokumentTittel.UTTALELSE },
            ],
        });
        mockManuellJournalføringContext([dokument]);

        const { user } = render(<EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={false} />);

        // Act
        await user.click(screen.getByRole('button', { name: `${DokumentTittel.FØDSELSATTEST} slett` }));

        // Assert
        expect(validerOgSettFelt).toHaveBeenCalledWith([
            {
                ...dokument,
                logiskeVedlegg: [{ logiskVedleggId: '0', tittel: DokumentTittel.UTTALELSE }],
            },
        ]);
    });

    test('skal sette tom liste med logiske vedlegg når siste innhold fjernes', async () => {
        // Arrange
        const dokument = lagDokumentInfo({
            logiskeVedlegg: [{ logiskVedleggId: '11', tittel: DokumentTittel.FØDSELSATTEST }],
        });
        mockManuellJournalføringContext([dokument]);

        const { user } = render(<EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={false} />);

        // Act
        await user.click(screen.getByRole('button', { name: `${DokumentTittel.FØDSELSATTEST} slett` }));

        // Assert
        expect(validerOgSettFelt).toHaveBeenCalledWith([{ ...dokument, logiskeVedlegg: [] }]);
    });

    test('skal beholde logiske vedlegg når dokumenttittelen endres', async () => {
        // Arrange
        const logiskeVedlegg = [{ logiskVedleggId: '11', tittel: DokumentTittel.FØDSELSATTEST }];
        const dokument = lagDokumentInfo({ tittel: '', logiskeVedlegg });
        mockManuellJournalføringContext([dokument]);

        const { user } = render(<EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={false} />);

        // Act
        await velgAlternativ(user, 'Dokumenttittel', DokumentTittel.UTTALELSE);

        // Assert
        expect(validerOgSettFelt).toHaveBeenLastCalledWith([
            expect.objectContaining({ tittel: DokumentTittel.UTTALELSE, logiskeVedlegg }),
        ]);
    });
});
