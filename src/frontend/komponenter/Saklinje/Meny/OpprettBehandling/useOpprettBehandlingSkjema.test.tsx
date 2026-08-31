import { opprettBehandling } from '@api/opprettBehandling';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { act, renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import { FagsakStatus, FagsakType } from '@typer/fagsak';
import type { PropsWithChildren } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { OpprettBehandlingFelt, useOpprettBehandlingSkjema } from './useOpprettBehandlingSkjema';

vi.mock('@api/opprettBehandling');

afterEach(() => {
    vi.clearAllMocks();
});

function lagWrapper(fagsakType: FagsakType) {
    return function Wrapper({ children }: PropsWithChildren) {
        return (
            <TestProviders>
                <FagsakProvider
                    fagsak={lagFagsak({
                        fagsakType,
                        status: FagsakStatus.OPPRETTET,
                        behandlinger: [],
                    })}
                >
                    {children}
                </FagsakProvider>
            </TestProviders>
        );
    };
}

describe('useOpprettBehandlingSkjema', () => {
    test('skal sende kategori og underkategori ved opprettelse av førstegangsbehandling på institusjonssak', async () => {
        // Arrange
        vi.mocked(opprettBehandling).mockResolvedValue(lagBehandling());

        const { result } = renderHook(
            () =>
                useOpprettBehandlingSkjema({
                    lukkModal: vi.fn(),
                    onTilbakekrevingsbehandlingOpprettet: vi.fn(),
                }),
            { wrapper: lagWrapper(FagsakType.INSTITUSJON) }
        );

        // Act
        await act(async () => {
            result.current.form.setValue(OpprettBehandlingFelt.BEHANDLINGSTYPE, Behandlingstype.FØRSTEGANGSBEHANDLING);
            result.current.form.setValue(OpprettBehandlingFelt.BEHANDLINGSÅRSAK, BehandlingÅrsak.SØKNAD);
            result.current.form.setValue(OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO, '2026-06-17');
            await result.current.form.handleSubmit(result.current.onSubmit)();
        });

        // Assert
        expect(opprettBehandling).toHaveBeenCalledWith(
            expect.objectContaining({
                behandlingType: Behandlingstype.FØRSTEGANGSBEHANDLING,
                behandlingÅrsak: BehandlingÅrsak.SØKNAD,
                kategori: BehandlingKategori.NASJONAL,
                underkategori: BehandlingUnderkategori.ORDINÆR,
                søknadMottattDato: '2026-06-17',
            })
        );
    });

    test('skal ikke sende kategori og underkategori når behandlingstema ikke er valgt på ordinær fagsak', async () => {
        // Arrange
        vi.mocked(opprettBehandling).mockResolvedValue(lagBehandling());

        const { result } = renderHook(
            () =>
                useOpprettBehandlingSkjema({
                    lukkModal: vi.fn(),
                    onTilbakekrevingsbehandlingOpprettet: vi.fn(),
                }),
            { wrapper: lagWrapper(FagsakType.NORMAL) }
        );

        // Act
        await act(async () => {
            result.current.form.setValue(OpprettBehandlingFelt.BEHANDLINGSTYPE, Behandlingstype.FØRSTEGANGSBEHANDLING);
            result.current.form.setValue(OpprettBehandlingFelt.BEHANDLINGSÅRSAK, BehandlingÅrsak.SØKNAD);
            result.current.form.setValue(OpprettBehandlingFelt.SØKNAD_MOTTATT_DATO, '2026-06-17');
            await result.current.form.handleSubmit(result.current.onSubmit)();
        });

        // Assert
        expect(opprettBehandling).toHaveBeenCalledWith(
            expect.objectContaining({
                kategori: null,
                underkategori: null,
            })
        );
    });
});
