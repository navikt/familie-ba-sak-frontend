import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { render, TestProviders } from '@testutils/testrender';
import { BehandlingSteg, BehandlingÅrsak } from '@typer/behandling';
import type { PropsWithChildren } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { UgyldigSideAdvarsel } from './UgyldigSideAdvarsel';

const { useFagsakMock, useBehandlingMock } = vi.hoisted(() => ({
    useFagsakMock: vi.fn(),
    useBehandlingMock: vi.fn(),
}));

vi.mock('@hooks/useFagsak', () => ({ useFagsak: useFagsakMock }));
vi.mock('@hooks/useBehandling', () => ({ useBehandling: useBehandlingMock }));

const advarselstittel = 'Du befinner deg på en side som ikke er tilgjengelig for behandlingen.';

function lagWrapper(href: string) {
    return ({ children }: PropsWithChildren) => (
        <TestProviders initialEntries={[{ pathname: `/fagsak/10/20/${href}` }]}>{children}</TestProviders>
    );
}

beforeEach(() => {
    vi.clearAllMocks();
    useFagsakMock.mockReturnValue(lagFagsak({ id: 10 }));
});

describe('UgyldigSideAdvarsel', () => {
    test('skal ikke vise advarsel når saksbehandler er på en gyldig side for behandlingen', () => {
        useBehandlingMock.mockReturnValue(
            lagBehandling({
                behandlingId: 20,
                årsak: BehandlingÅrsak.SØKNAD,
                steg: BehandlingSteg.VURDER_TILBAKEKREVING,
            })
        );

        const { screen } = render(<UgyldigSideAdvarsel />, { wrapper: lagWrapper('vilkaarsvurdering') });

        expect(screen.queryByText(advarselstittel)).not.toBeInTheDocument();
    });

    test('skal ikke vise advarsel når saksbehandler er på roten av behandlingen, siden det navigeres automatisk videre', () => {
        useBehandlingMock.mockReturnValue(
            lagBehandling({
                behandlingId: 20,
                årsak: BehandlingÅrsak.SØKNAD,
                steg: BehandlingSteg.VILKÅRSVURDERING,
            })
        );

        const { screen } = render(<UgyldigSideAdvarsel />, { wrapper: lagWrapper('') });

        expect(screen.queryByText(advarselstittel)).not.toBeInTheDocument();
    });

    test('skal vise advarsel med lenke til steget behandlingen står på når siden er etter behandlingens steg', () => {
        useBehandlingMock.mockReturnValue(
            lagBehandling({
                behandlingId: 20,
                årsak: BehandlingÅrsak.SØKNAD,
                steg: BehandlingSteg.VILKÅRSVURDERING,
            })
        );

        const { screen } = render(<UgyldigSideAdvarsel />, { wrapper: lagWrapper('vedtak') });

        expect(screen.getByText(advarselstittel)).toBeInTheDocument();
        expect(screen.getByText(/Gjeldende side for behandlingen er «Vilkårsvurdering»/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gå til vilkårsvurdering' })).toHaveAttribute(
            'href',
            '/fagsak/10/20/vilkaarsvurdering'
        );
    });

    test('skal vise advarsel med lenke til steget behandlingen står på når siden er skjult for behandlingen', () => {
        useBehandlingMock.mockReturnValue(
            lagBehandling({
                behandlingId: 20,
                årsak: BehandlingÅrsak.NYE_OPPLYSNINGER,
                steg: BehandlingSteg.BEHANDLINGSRESULTAT,
            })
        );

        const { screen } = render(<UgyldigSideAdvarsel />, { wrapper: lagWrapper('registrer-soknad') });

        expect(screen.getByText(advarselstittel)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Gå til behandlingsresultat' })).toHaveAttribute(
            'href',
            '/fagsak/10/20/tilkjent-ytelse'
        );
    });

    test('skal vise advarsel uten lenke når behandlingens steg ikke har en egen side', () => {
        useBehandlingMock.mockReturnValue(
            lagBehandling({ behandlingId: 20, steg: BehandlingSteg.REGISTRERE_PERSONGRUNNLAG })
        );

        const { screen } = render(<UgyldigSideAdvarsel />, { wrapper: lagWrapper('vilkaarsvurdering') });

        expect(screen.getByText(advarselstittel)).toBeInTheDocument();
        expect(screen.queryByText(/Gjeldende side for behandlingen er/)).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
