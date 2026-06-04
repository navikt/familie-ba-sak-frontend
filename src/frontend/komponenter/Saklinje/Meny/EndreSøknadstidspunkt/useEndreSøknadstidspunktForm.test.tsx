import type { PropsWithChildren } from 'react';

import type { IRegistrertSøknadstidspunktPåPersonDto } from '@api/hentRegistrertSøknadstidspunktPåPerson';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import type { IBehandling } from '@typer/behandling';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';
import { dateTilIsoDatoString } from '@utils/dato';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { kjønnType } from '@navikt/familie-typer';

import { useEndreSøknadstidspunktForm } from './useEndreSøknadstidspunktForm';

const søker = {
    type: PersonType.SØKER,
    personIdent: '12345678910',
    fødselsdato: '1990-01-01',
    navn: 'Mor',
    kjønn: kjønnType.KVINNE,
    målform: Målform.NB,
    harFalskIdentitet: false,
};
const barnMedPersistertVerdi = {
    type: PersonType.BARN,
    personIdent: '10987654321',
    fødselsdato: '2023-12-31',
    navn: 'Barn 1',
    kjønn: kjønnType.MANN,
    målform: Målform.NB,
    harFalskIdentitet: false,
};
const barnUtenPersistertVerdi = {
    type: PersonType.BARN,
    personIdent: '11111111111',
    fødselsdato: '2024-12-31',
    navn: 'Barn 2',
    kjønn: kjønnType.KVINNE,
    målform: Målform.NB,
    harFalskIdentitet: false,
};

let mockBehandling: IBehandling;

const { mockMutateAsync, mockSettÅpenBehandling } = vi.hoisted(() => ({
    mockMutateAsync: vi.fn(),
    mockSettÅpenBehandling: vi.fn(),
}));

vi.mock('@sider/Fagsak/Behandling/context/BehandlingContext', () => ({
    useBehandlingContext: () => ({
        behandling: mockBehandling,
        settÅpenBehandling: mockSettÅpenBehandling,
    }),
}));

vi.mock('@hooks/useEndreSøknadstidspunkt', () => ({
    useEndreSøknadstidspunkt: (options?: {
        onSuccess?: (behandling: unknown) => void | Promise<void>;
        onError?: (error: Error) => void | Promise<void>;
    }) => ({
        mutateAsync: async (variabler: unknown) => {
            try {
                const behandling = await mockMutateAsync(variabler);
                await options?.onSuccess?.(behandling);
                return behandling;
            } catch (error) {
                await options?.onError?.(error as Error);
                throw error;
            }
        },
    }),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

const renderForm = (søknadstidspunkter: IRegistrertSøknadstidspunktPåPersonDto[]) => {
    const lukkModal = vi.fn();
    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useEndreSøknadstidspunktForm({ lukkModal, søknadstidspunkter }), { wrapper });
    return { result, lukkModal, invalidateQueriesSpy };
};

describe('useEndreSøknadstidspunktForm', () => {
    test('viser ett felt per registrert søknadstidspunkt, forhåndsutfylt og med navn fra behandlingen', () => {
        mockBehandling = lagBehandling({
            personer: [søker, barnMedPersistertVerdi, barnUtenPersistertVerdi],
            søknadMottattDato: '2025-01-15',
        });

        const { result } = renderForm([
            { personIdent: barnMedPersistertVerdi.personIdent, søknadstidspunkt: '2024-03-10' },
        ]);

        const personer = result.current.form.getValues('personer');

        expect(personer).toHaveLength(1);
        expect(personer[0].personIdent).toBe(barnMedPersistertVerdi.personIdent);
        expect(personer[0].navn).toBe('Barn 1');
        expect(dateTilIsoDatoString(personer[0].søknadstidspunkt ?? undefined)).toBe('2024-03-10');
    });

    test('viser ingen felter når det ikke finnes registrerte søknadstidspunkt', () => {
        mockBehandling = lagBehandling({
            personer: [søker, barnUtenPersistertVerdi],
        });

        const { result } = renderForm([]);

        const personer = result.current.form.getValues('personer');

        expect(personer).toHaveLength(0);
    });

    test('onSubmit sender kun barn med dato (ISO-format), oppdaterer behandling og lukker modal', async () => {
        mockBehandling = lagBehandling({ personer: [søker, barnMedPersistertVerdi, barnUtenPersistertVerdi] });
        mockMutateAsync.mockResolvedValue(lagBehandling());

        const { result, lukkModal, invalidateQueriesSpy } = renderForm([]);

        await act(async () => {
            await result.current.onSubmit({
                personer: [
                    {
                        personIdent: barnMedPersistertVerdi.personIdent,
                        navn: 'Barn 1',
                        fødselsdato: '2023-12-31',
                        søknadstidspunkt: new Date(2025, 3, 15),
                    },
                    {
                        personIdent: barnUtenPersistertVerdi.personIdent,
                        navn: 'Barn 2',
                        fødselsdato: '2024-12-31',
                        søknadstidspunkt: null,
                    },
                ],
            });
        });

        expect(mockMutateAsync).toHaveBeenCalledWith({
            behandlingId: mockBehandling.behandlingId,
            søknadstidspunktPerPerson: [
                { personIdent: barnMedPersistertVerdi.personIdent, søknadstidspunkt: '2025-04-15' },
            ],
        });
        expect(mockSettÅpenBehandling).toHaveBeenCalledTimes(1);
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
            queryKey: ['registrert-soknadstidspunkt-paa-person', mockBehandling.behandlingId],
        });
        expect(lukkModal).toHaveBeenCalledTimes(1);
    });

    test('onSubmit setter root-feil og lukker ikke modal når mutasjonen feiler', async () => {
        mockBehandling = lagBehandling({ personer: [søker, barnMedPersistertVerdi] });
        mockMutateAsync.mockRejectedValue(new Error('Teknisk feil fra backend'));

        const { result, lukkModal } = renderForm([]);

        await act(async () => {
            await result.current
                .onSubmit({
                    personer: [
                        {
                            personIdent: barnMedPersistertVerdi.personIdent,
                            navn: 'Barn 1',
                            fødselsdato: '2023-12-31',
                            søknadstidspunkt: new Date(2025, 3, 15),
                        },
                    ],
                })
                ?.catch(() => undefined);
        });

        expect(mockMutateAsync).toHaveBeenCalledTimes(1);
        expect(mockSettÅpenBehandling).not.toHaveBeenCalled();
        expect(lukkModal).not.toHaveBeenCalled();
    });

    test('onSubmit uten noen datoer setter root-feil og kaller ikke mutate', async () => {
        mockBehandling = lagBehandling({ personer: [søker, barnUtenPersistertVerdi] });

        const { result, lukkModal } = renderForm([]);

        await act(async () => {
            await result.current.onSubmit({
                personer: [
                    {
                        personIdent: barnUtenPersistertVerdi.personIdent,
                        navn: 'Barn 2',
                        fødselsdato: '2024-12-31',
                        søknadstidspunkt: null,
                    },
                ],
            });
        });

        expect(mockMutateAsync).not.toHaveBeenCalled();
        expect(lukkModal).not.toHaveBeenCalled();
    });
});
