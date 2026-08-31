import { hentSimulering } from '@api/hentSimulering';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { ISimuleringDTO } from '@typer/simulering';
import { settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert } from '@utils/simulering';

type Options = Omit<UseQueryOptions<ISimuleringDTO, DefaultError, ISimuleringDTO>, 'queryKey' | 'queryFn' | 'select'>;

export const HentSimuleringQueryKeyFactory = {
    simulering: (behandlingId: number) => ['simulering', behandlingId],
};

export function useHentSimulering(behandlingId: number, options?: Options) {
    return useQuery({
        queryKey: HentSimuleringQueryKeyFactory.simulering(behandlingId),
        queryFn: () => hentSimulering(behandlingId),
        select: settPerioderTilIkkeUtbetaltOmForfallsdatoIkkePassert,
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        // Deaktiver cache slik at steget ikke viser en utdatert simulering etter endringer i behandlingen (kan
        // overskrives). Ved navigering direkte fra vedtak holdes spørringen i live av useSimuleringsvurdering,
        // og eksisterende data vises mens ny hentes.
        gcTime: 0,
        ...options,
    });
}
