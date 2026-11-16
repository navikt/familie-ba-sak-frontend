import { FagsakProvider } from '@sider/Fagsak/FagsakContext';
import { renderHook } from '@testing-library/react';
import { lagVisningBehandling } from '@testutils/testdata/behandlingTestdata';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { TestProviders } from '@testutils/testrender';
import type { IMinimalFagsak } from '@typer/fagsak';
import type { PropsWithChildren } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { describe, expect, test } from 'vitest';

import { useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak } from './useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak';

const startsti = '/fagsak/1/2/vilkaarsvurdering';

interface WrapperProps extends PropsWithChildren {
    fagsak: IMinimalFagsak;
}

function Wrapper({ fagsak, children }: WrapperProps) {
    return (
        <TestProviders initialEntries={[{ pathname: startsti }]}>
            <FagsakProvider fagsak={fagsak}>{children}</FagsakProvider>
        </TestProviders>
    );
}

function renderUseNavigerTilFagsak(fagsak: IMinimalFagsak, behandlingIdParam: number | undefined) {
    return renderHook(
        ({ behandlingIdParam }: { behandlingIdParam: number | undefined }) => {
            useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak({ behandlingIdParam });
            return { location: useLocation(), navigationType: useNavigationType() };
        },
        {
            initialProps: { behandlingIdParam },
            wrapper: ({ children }) => <Wrapper fagsak={fagsak}>{children}</Wrapper>,
        }
    );
}

describe('useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak', () => {
    test('skal ikke navigere når behandlingen tilhører fagsaken', () => {
        const fagsak = lagFagsak({ id: 1, behandlinger: [lagVisningBehandling({ behandlingId: 2 })] });

        const { result } = renderUseNavigerTilFagsak(fagsak, 2);

        expect(result.current.location.pathname).toBe(startsti);
    });

    test('skal navigere til fagsaken og erstatte historikken når behandlingen ikke tilhører fagsaken', () => {
        const fagsak = lagFagsak({ id: 1, behandlinger: [lagVisningBehandling({ behandlingId: 2 })] });

        const { result } = renderUseNavigerTilFagsak(fagsak, 3);

        expect(result.current.location.pathname).toBe('/fagsak/1');
        expect(result.current.navigationType).toBe('REPLACE');
    });

    test('skal ikke navigere når behandlingIdParam er undefined', () => {
        const fagsak = lagFagsak({ id: 1, behandlinger: [lagVisningBehandling({ behandlingId: 2 })] });

        const { result } = renderUseNavigerTilFagsak(fagsak, undefined);

        expect(result.current.location.pathname).toBe(startsti);
    });

    test('skal navigere når behandlingIdParam endres til en behandling som ikke tilhører fagsaken', () => {
        const fagsak = lagFagsak({ id: 1, behandlinger: [lagVisningBehandling({ behandlingId: 2 })] });

        const { result, rerender } = renderUseNavigerTilFagsak(fagsak, 2);
        expect(result.current.location.pathname).toBe(startsti);

        rerender({ behandlingIdParam: 3 });

        expect(result.current.location.pathname).toBe('/fagsak/1');
    });
});
