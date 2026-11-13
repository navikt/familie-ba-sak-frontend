import { hentBehandling } from '@api/hentBehandling';
import { oppdaterValutakursPåBehandling } from '@api/oppdaterValutakursPåBehandling';
import { MetaKey } from '@hooks/meta/metaKey';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useQuery } from '@tanstack/react-query';
import { BehandlerRolle, type IBehandling } from '@typer/behandling';
import { obfuskerBehandling } from '@utils/obfuskerData';

export const HentBehandlingQueryKeyFactory = {
    behandling: (behandlingId: number | undefined) => ['behandling', behandlingId],
};

export function useHentBehandling(behandlingId: number | undefined) {
    const saksbehandler = useSaksbehandler();
    const skalObfuskereData = useSkalObfuskereData();
    return useQuery({
        queryKey: HentBehandlingQueryKeyFactory.behandling(behandlingId),
        queryFn: async () => {
            if (behandlingId === undefined) {
                throw new Error('Kan ikke hente behandling uten behandlingId.');
            }
            let behandling: IBehandling;
            if (saksbehandler.rolle === BehandlerRolle.BESLUTTER) {
                behandling = await oppdaterValutakursPåBehandling({ behandlingId });
            } else {
                behandling = await hentBehandling({ behandlingId });
            }
            if (skalObfuskereData) {
                obfuskerBehandling(behandling);
            }
            return behandling;
        },
        enabled: behandlingId !== undefined,
        // Behandlingen oppdateres eksplisitt via settÅpenBehandling. Automatisk refetch kan nullstille skjemaer
        // som er under redigering, og for beslutter trigger hver henting en PUT mot oppdatert-valutakurs.
        // Det må løses før man skrur på denne funksjonaliteten.
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
