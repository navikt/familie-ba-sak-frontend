import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useBehandling } from './useBehandling';
import { useErLesevisning } from './useErLesevisning';
import { useFagsak } from './useFagsak';
import { useSaksbehandler } from './useSaksbehandler';
import { lagBehandling } from '../testutils/testdata/behandlingTestdata';
import { lagFagsak } from '../testutils/testdata/fagsakTestdata';
import { lagSaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';
import { BehandlingStatus, BehandlingSteg, BehandlingÅrsak } from '../typer/behandling';
import { harTilgangTilEnhet } from '../typer/enhet';
import { FagsakStatus } from '../typer/fagsak';
import { MIDLERTIDIG_BEHANDLENDE_ENHET_ID } from '../utils/behandling';

vi.mock('./useBehandling');
vi.mock('./useSaksbehandler');
vi.mock('./useFagsak');
vi.mock('../typer/enhet');

const mockUseBehandling = vi.mocked(useBehandling);
const mockUseSaksbehandler = vi.mocked(useSaksbehandler);
const mockHarTilgangTilEnhet = vi.mocked(harTilgangTilEnhet);
const mockUseFagsak = vi.mocked(useFagsak);

beforeEach(() => {
    vi.resetAllMocks();
    mockUseBehandling.mockReturnValue(lagBehandling());
    mockUseSaksbehandler.mockReturnValue(lagSaksbehandler());
    mockHarTilgangTilEnhet.mockReturnValue(true);
    mockUseFagsak.mockReturnValue(lagFagsak());
});

describe('useErLesevisning', () => {
    it('returnerer true når behandlingen er avsluttet', () => {
        mockUseBehandling.mockReturnValue(lagBehandling({ status: BehandlingStatus.AVSLUTTET }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });

    it('returnerer true når behandlingen er på vent', () => {
        mockUseBehandling.mockReturnValue(lagBehandling({ status: BehandlingStatus.SATT_PÅ_VENT }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });

    it('returnerer true når behandlingen er satt på maskinell vent', () => {
        mockUseBehandling.mockReturnValue(lagBehandling({ status: BehandlingStatus.SATT_PÅ_MASKINELL_VENT }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });

    it('returnerer true når behandling er på midlertidig enhet', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                arbeidsfordelingPåBehandling: {
                    behandlendeEnhetNavn: 'midlertidig enhet',
                    behandlendeEnhetId: MIDLERTIDIG_BEHANDLENDE_ENHET_ID,
                    manueltOverstyrt: false,
                },
            })
        );

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });

    it('returnerer false når behandling er på midlertidig enhet men skalIgnorereOmEnhetErMidlertidig er true', () => {
        mockUseBehandling.mockReturnValue(
            lagBehandling({
                arbeidsfordelingPåBehandling: {
                    behandlendeEnhetNavn: 'midlertidig enhet',
                    behandlendeEnhetId: MIDLERTIDIG_BEHANDLENDE_ENHET_ID,
                    manueltOverstyrt: false,
                },
            })
        );

        const { result } = renderHook(() => useErLesevisning({ skalIgnorereOmEnhetErMidlertidig: true }));

        expect(result.current).toBe(false);
    });

    it('returnerer true når saksbehandler mangler skrivetilgang', () => {
        mockUseSaksbehandler.mockReturnValue(lagSaksbehandler({ harSkrivetilgang: false }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });

    it('returnerer true når saksbehandler mangler tilgang til enhet', () => {
        mockHarTilgangTilEnhet.mockReturnValue(false);

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });

    it('returnerer false når saksbehandler mangler enhetstilgang men er superbruker', () => {
        mockHarTilgangTilEnhet.mockReturnValue(false);
        mockUseSaksbehandler.mockReturnValue(lagSaksbehandler({ harSuperbrukertilgang: true }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(false);
    });

    it('returnerer false når saksbehandler mangler enhetstilgang men årsak er KORREKSJON_VEDTAKSBREV', () => {
        mockHarTilgangTilEnhet.mockReturnValue(false);
        mockUseBehandling.mockReturnValue(lagBehandling({ årsak: BehandlingÅrsak.KORREKSJON_VEDTAKSBREV }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(false);
    });

    it('hopper over enhetstilgangssjekk når sjekkTilgangTilEnhet er false', () => {
        mockHarTilgangTilEnhet.mockReturnValue(false);

        const { result } = renderHook(() => useErLesevisning({ sjekkTilgangTilEnhet: false }));

        expect(result.current).toBe(false);
    });

    it('returnerer true når behandlingen er etter BESLUTTE_VEDTAK', () => {
        mockUseBehandling.mockReturnValue(lagBehandling({ steg: BehandlingSteg.BEHANDLING_AVSLUTTET }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });

    it('returnerer false når behandlingen er før BESLUTTE_VEDTAK og alle andre vilkår er oppfylt', () => {
        mockUseBehandling.mockReturnValue(lagBehandling({ steg: BehandlingSteg.REGISTRERE_SØKNAD }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(false);
    });

    it('bruker standardverdier når ingen parametere sendes inn', () => {
        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(false);
    });

    it('returnerer true når fagsaken er låst', () => {
        mockUseFagsak.mockReturnValue(lagFagsak({ status: FagsakStatus.LÅST }));

        const { result } = renderHook(() => useErLesevisning());

        expect(result.current).toBe(true);
    });
});
