import type { PropsWithChildren } from 'react';
import React from 'react';

import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { useBehandlingIdParam } from './useBehandlingIdParam';

function Router(entry: string) {
    return ({ children }: PropsWithChildren) => {
        return (
            <MemoryRouter initialEntries={[entry]}>
                <Routes>
                    <Route path={'/fagsak/:fagsakId'} element={children} />
                    <Route path={'/behandling/:behandlingId'} element={children} />
                    <Route path={'/url'} element={children} />
                </Routes>
            </MemoryRouter>
        );
    };
}

describe('useBehandlingIdParam', () => {
    it('skal returnere behandlingId for gyldig URL sti', () => {
        const behandlingId = 1234;
        const { result } = renderHook(() => useBehandlingIdParam(), {
            wrapper: Router(`/behandling/${behandlingId}`),
        });
        expect(result.current).toEqual(behandlingId);
    });

    it('skal returnere undefined of behandlingId er undefined', () => {
        const behandlingId = undefined;
        const { result } = renderHook(() => useBehandlingIdParam(), {
            wrapper: Router(`/behandling/${behandlingId}`),
        });
        expect(result.current).toEqual(undefined);
    });

    it('skal returnere undefined for en behandlingId som ikke er et tall', () => {
        const behandlingId = '123a';
        const { result } = renderHook(() => useBehandlingIdParam(), {
            wrapper: Router(`/behandling/${behandlingId}`),
        });
        expect(result.current).toEqual(undefined);
    });

    it('skal returnere undefined for URL sti uten behandlingId', () => {
        const fagsakId = '1234';
        const { result } = renderHook(() => useBehandlingIdParam(), {
            wrapper: Router(`/fagsak/${fagsakId}`),
        });
        expect(result.current).toEqual(undefined);
    });

    it('skal returnere undefined for URL sti uten noen parameter', () => {
        const { result } = renderHook(() => useBehandlingIdParam(), {
            wrapper: Router(`/url`),
        });
        expect(result.current).toEqual(undefined);
    });
});
