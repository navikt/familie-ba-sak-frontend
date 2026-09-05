import { oppdaterAnnenVurdering } from '@api/oppdaterAnnenVurdering';
import { Table } from '@navikt/ds-react';
import { BehandlingProvider } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { HentOgSettBehandlingProvider } from '@sider/Fagsak/Behandling/context/HentOgSettBehandlingContext';
import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { waitFor } from '@testing-library/react';
import { lagAnnenVurdering } from '@testutils/testdata/annenVurderingTestdata';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { lagPersonResultat } from '@testutils/testdata/personResultatTestdata';
import { lagGrunnlagPerson } from '@testutils/testdata/personTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { BehandlingSteg } from '@typer/behandling';
import { annenVurderingConfig, Resultat } from '@typer/vilkår';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { AnnenVurderingTabellRad } from './AnnenVurderingTabellRad';

vi.mock('@api/oppdaterAnnenVurdering');

afterEach(() => {
    vi.clearAllMocks();
});

const søker = lagGrunnlagPerson();

const annenVurdering = lagAnnenVurdering({ id: 5 });

const behandling = lagBehandling({
    steg: BehandlingSteg.VILKÅRSVURDERING,
    personer: [søker],
    personResultater: [lagPersonResultat({ personIdent: søker.personIdent, andreVurderinger: [annenVurdering] })],
});

function Wrapper({ children }: { children: ReactNode }) {
    return (
        <TestProviders>
            <FagsakProvider fagsak={lagFagsak()}>
                <HentOgSettBehandlingProvider>
                    <BehandlingProvider behandling={behandling}>
                        <Table>
                            <Table.Body>{children}</Table.Body>
                        </Table>
                    </BehandlingProvider>
                </HentOgSettBehandlingProvider>
            </FagsakProvider>
        </TestProviders>
    );
}

function renderRad() {
    return render(
        <AnnenVurderingTabellRad
            person={søker}
            annenVurderingConfig={annenVurderingConfig.OPPLYSNINGSPLIKT}
            annenVurdering={annenVurdering}
            visFeilmeldinger={false}
        />,
        { wrapper: Wrapper }
    );
}

describe('AnnenVurderingTabellRad', () => {
    test('ikke vurdert annen vurdering åpnes med skjema og krever resultat ved lagring', async () => {
        // Arrange
        const { screen, user } = renderRad();

        // Act
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        expect(await screen.findByText('Resultat er ikke satt')).toBeInTheDocument();
        expect(oppdaterAnnenVurdering).not.toHaveBeenCalled();
    });

    test('lagrer annen vurdering med resultat og begrunnelse fra skjemaet', async () => {
        // Arrange
        const { screen, user } = renderRad();
        vi.mocked(oppdaterAnnenVurdering).mockResolvedValue(behandling);

        // Act
        await user.click(screen.getByRole('radio', { name: 'Ja' }));
        await user.type(screen.getByLabelText('Begrunnelse (valgfri)'), 'Opplysningsplikten er oppfylt');
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        await waitFor(() => expect(oppdaterAnnenVurdering).toHaveBeenCalledTimes(1));
        expect(oppdaterAnnenVurdering).toHaveBeenCalledWith(
            { behandlingId: behandling.behandlingId, annenVurderingId: annenVurdering.id },
            expect.objectContaining({
                id: annenVurdering.id,
                resultat: Resultat.OPPFYLT,
                begrunnelse: 'Opplysningsplikten er oppfylt',
            })
        );
    });

    test('avbryt nullstiller skjemaet og lukker raden', async () => {
        // Arrange
        const { screen, user } = renderRad();
        await user.click(screen.getByRole('radio', { name: 'Nei' }));

        // Act
        await user.click(screen.getByRole('button', { name: 'Avbryt' }));

        // Assert
        expect(screen.queryByRole('button', { name: 'Ferdig' })).not.toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Vis mer' }));
        expect(screen.getByRole('radio', { name: 'Nei' })).not.toBeChecked();
        expect(oppdaterAnnenVurdering).not.toHaveBeenCalled();
    });

    test('viser feilmelding fra server når lagring feiler', async () => {
        // Arrange
        const { screen, user } = renderRad();
        vi.mocked(oppdaterAnnenVurdering).mockRejectedValue(new Error('Noe gikk galt på serveren'));

        // Act
        await user.click(screen.getByRole('radio', { name: 'Nei' }));
        await user.click(screen.getByRole('button', { name: 'Ferdig' }));

        // Assert
        expect(await screen.findByText('Noe gikk galt på serveren')).toBeInTheDocument();
    });
});
