import type { PropsWithChildren } from 'react';

import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { useFagsakIdParam } from './useFagsakIdParam';

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

describe('useFagsakIdParam', () => {
    it('skal returnere fagsakId for gyldig URL sti', () => {
        const fagsakId = 1234;
        const { result } = renderHook(() => useFagsakIdParam(), {
            wrapper: Router(`/fagsak/${fagsakId}`),
        });
        expect(result.current).toEqual(fagsakId);
    });

    it('skal returnere undefined of fagsakId er undefined', () => {
        const fagsakId = undefined;
        const { result } = renderHook(() => useFagsakIdParam(), {
            wrapper: Router(`/fagsak/${fagsakId}`),
        });
        expect(result.current).toEqual(undefined);
    });

    it('skal returnere undefined for en fagsakid som ikke er et tall', () => {
        const fagsakId = '123a';
        const { result } = renderHook(() => useFagsakIdParam(), {
            wrapper: Router(`/fagsak/${fagsakId}`),
        });
        expect(result.current).toEqual(undefined);
    });

    it('skal returnere undefined for URL sti uten fagsakid', () => {
        const behandlingId = '1234';
        const { result } = renderHook(() => useFagsakIdParam(), {
            wrapper: Router(`/behandling/${behandlingId}`),
        });
        expect(result.current).toEqual(undefined);
    });

    it('skal returnere undefined for URL sti uten noen parameter', () => {
        const { result } = renderHook(() => useFagsakIdParam(), {
            wrapper: Router(`/url`),
        });
        expect(result.current).toEqual(undefined);
    });
});
