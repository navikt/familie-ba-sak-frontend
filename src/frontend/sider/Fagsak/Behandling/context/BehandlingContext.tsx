import { useFagsak } from '@hooks/useFagsak';
import { HentFagsakQueryKeyFactory } from '@hooks/useHentFagsak';
import { HentHistorikkinnslagQueryKeyFactory } from '@hooks/useHentHistorikkinnslag';
import { HentPersonerMedUgyldigEtterbetalingsperiodeQueryKeyFactory } from '@hooks/useHentPersonerMedUgyldigEtterbetalingsperiode';
import { useNavigerAutomatiskTilSideForBehandlingssteg } from '@hooks/useNavigerAutomatiskTilSideForBehandlingssteg';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useTrackTidsbrukPåSide } from '@hooks/useTrackTidsbrukPåSide';
import { useQueryClient } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import { obfuskerBehandling } from '@utils/obfuskerData';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

interface Props extends PropsWithChildren {
    behandling: IBehandling;
    settBehandling?: (behandling: IBehandling) => void;
}

interface BehandlingContextValue {
    behandling: IBehandling;
    settÅpenBehandling: (behandling: IBehandling) => void;
}

const BehandlingContext = createContext<BehandlingContextValue | undefined>(undefined);

export function BehandlingProvider({ behandling, settBehandling = () => {}, children }: Props) {
    const fagsak = useFagsak();
    const skalObfuskereData = useSkalObfuskereData();
    const queryClient = useQueryClient();

    useNavigerAutomatiskTilSideForBehandlingssteg({ behandling });

    useTrackTidsbrukPåSide(fagsak, behandling);

    const settÅpenBehandling = (behandling: IBehandling) => {
        queryClient.invalidateQueries({
            queryKey: HentHistorikkinnslagQueryKeyFactory.historikkinnslag(behandling.behandlingId),
        });
        queryClient.invalidateQueries({
            queryKey:
                HentPersonerMedUgyldigEtterbetalingsperiodeQueryKeyFactory.personerMedUgyldigEtterbetalingsperiode(
                    behandling.behandlingId
                ),
        });
        queryClient.invalidateQueries({
            queryKey: HentFagsakQueryKeyFactory.fagsak(fagsak.id),
        });

        if (skalObfuskereData) {
            obfuskerBehandling(behandling);
        }
        settBehandling(behandling);
    };

    return (
        <BehandlingContext.Provider value={{ behandling, settÅpenBehandling }}>{children}</BehandlingContext.Provider>
    );
}

export function useBehandlingContext() {
    const context = useContext(BehandlingContext);
    if (context === undefined) {
        throw new Error('useBehandlingContext må brukes innenfor en BehandlingProvider.');
    }
    return context;
}
