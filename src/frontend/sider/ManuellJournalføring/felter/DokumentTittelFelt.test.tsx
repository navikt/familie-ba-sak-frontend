import type { IDokumentInfo } from '@navikt/familie-typer';
import { DokumentTittelFelt } from '@sider/ManuellJournalføring/felter/DokumentTittelFelt';
import { screen, within } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import { lagDokumentInfo } from '@testutils/testdata/dokumentInfoTestdata';
import { render } from '@testutils/testrender';
import { DokumentTittel } from '@typer/manuell-journalføring';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useManuellJournalføringContext } from '../ManuellJournalføringContext';

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

describe('DokumentTittelFelt', () => {
    test('skal beholde logiske vedlegg når dokumenttittelen endres', async () => {
        // Arrange
        const logiskeVedlegg = [{ logiskVedleggId: '11', tittel: DokumentTittel.FØDSELSATTEST }];
        const dokument = lagDokumentInfo({ tittel: '', logiskeVedlegg });
        mockManuellJournalføringContext([dokument]);

        const { user } = render(<DokumentTittelFelt dokumentFraSkjema={dokument} visFeilmeldinger={false} />);

        // Act
        await velgAlternativ(user, 'Dokumenttittel', DokumentTittel.UTTALELSE);

        // Assert
        expect(validerOgSettFelt).toHaveBeenLastCalledWith([
            expect.objectContaining({ tittel: DokumentTittel.UTTALELSE, logiskeVedlegg }),
        ]);
    });
});
