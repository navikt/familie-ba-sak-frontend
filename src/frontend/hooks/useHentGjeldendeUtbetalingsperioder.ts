import { hentGjeldendeUtbetalingsperioder } from '@api/hentGjeldendeUtbetalingsperioder';
import { MetaKey } from '@hooks/meta/metaKey';
import { HentFagsakQueryKeyFactory } from '@hooks/useHentFagsak';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useQuery } from '@tanstack/react-query';
import { obfuskerUtbetalingsperioder } from '@utils/obfuskerData';

// Ligger under fagsak-nøkkelen slik at periodene hentes på nytt når fagsaken invalideres.
export const HentGjeldendeUtbetalingsperioderQueryKeyFactory = {
    gjeldendeUtbetalingsperioder: (fagsakId: number) => [
        ...HentFagsakQueryKeyFactory.fagsak(fagsakId),
        'gjeldende-utbetalingsperioder',
    ],
};

export function useHentGjeldendeUtbetalingsperioder(fagsakId: number) {
    const skalObfuskereData = useSkalObfuskereData();
    return useQuery({
        queryKey: HentGjeldendeUtbetalingsperioderQueryKeyFactory.gjeldendeUtbetalingsperioder(fagsakId),
        queryFn: () => hentGjeldendeUtbetalingsperioder(fagsakId),
        select: utbetalingsperioder =>
            skalObfuskereData ? obfuskerUtbetalingsperioder(utbetalingsperioder) : utbetalingsperioder,
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
