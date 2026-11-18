import { hentGjeldendeUtbetalingsperioder } from '@api/hentGjeldendeUtbetalingsperioder';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useQuery } from '@tanstack/react-query';
import { obfuskerUtbetalingsperioder } from '@utils/obfuskerData';

export function useHentGjeldendeUtbetalingsperioder(fagsakId: number) {
    const skalObfuskereData = useSkalObfuskereData();
    return useQuery({
        queryKey: queryKeys.gjeldendeUtbetalingsperioder(fagsakId),
        queryFn: () => hentGjeldendeUtbetalingsperioder(fagsakId),
        select: utbetalingsperioder =>
            skalObfuskereData ? obfuskerUtbetalingsperioder(utbetalingsperioder) : utbetalingsperioder,
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
