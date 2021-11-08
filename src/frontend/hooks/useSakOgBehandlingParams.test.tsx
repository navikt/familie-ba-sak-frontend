import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter as Router } from 'react-router-dom';

import useSakOgBehandlingParams from './useSakOgBehandlingParams';

const renderUseSakOgBehandlingParamsHookMedPath = (path: string) => {
    const {
        result: { current },
    } = renderHook(() => useSakOgBehandlingParams(), {
        wrapper: ({ children }) => {
            return <Router initialEntries={[{ pathname: path }]}>{children}</Router>;
        },
    });
    return current;
};

describe('useSakOgBehandlingParams', () => {
    it('gir fagsakId og behandlingsId med valid path', () => {
        const { fagsakId, behandlingId } =
            renderUseSakOgBehandlingParamsHookMedPath('/fagsak/1111/2222');
        expect(fagsakId).toEqual('1111');
        expect(behandlingId).toEqual('2222');
    });
    it('gir kun fagsakId', () => {
        const { fagsakId, behandlingId } = renderUseSakOgBehandlingParamsHookMedPath(
            '/fagsak/333333/noe-helt-andre-greier-bak-her/og-noe-mer'
        );
        expect(fagsakId).toEqual('333333');
        expect(behandlingId).toEqual(undefined);
    });
    it('gir kun fagsakId igjen', () => {
        const { fagsakId, behandlingId } =
            renderUseSakOgBehandlingParamsHookMedPath('/fagsak/545454');
        expect(fagsakId).toEqual('545454');
        expect(behandlingId).toEqual(undefined);
    });
    it('fagsakId og behandlingId undefined', () => {
        const { fagsakId, behandlingId } = renderUseSakOgBehandlingParamsHookMedPath(
            '/en/random/string/av/ting'
        );
        expect(fagsakId).toEqual(undefined);
        expect(behandlingId).toEqual(undefined);
    });
    it('fagsakId og behandlingId fortsatt undefined', () => {
        const { fagsakId, behandlingId } = renderUseSakOgBehandlingParamsHookMedPath('/fagsakId/');
        expect(fagsakId).toEqual(undefined);
        expect(behandlingId).toEqual(undefined);
    });
    it('fagsakId og behandlingId fortsatt undefined igjen', () => {
        const { fagsakId, behandlingId } =
            renderUseSakOgBehandlingParamsHookMedPath('/fagsakId/noe-greier');
        expect(fagsakId).toEqual(undefined);
        expect(behandlingId).toEqual(undefined);
    });
});
