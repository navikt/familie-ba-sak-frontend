import { hentGjeldendeUtbetalingsperioder } from '@api/hentGjeldendeUtbetalingsperioder';
import { MetaKey } from '@hooks/meta/metaKey';
import { HentFagsakQueryKeyFactory } from '@hooks/useHentFagsak';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useQuery } from '@tanstack/react-query';
import { PersonType } from '@typer/person';
import type { Utbetalingsperiode } from '@typer/vedtaksperiode';

function obfuskerUtbetalingsperioder(utbetalingsperioder: Utbetalingsperiode[]): Utbetalingsperiode[] {
    return utbetalingsperioder.map(utbetalingsperiode => {
        let indeks = 1;
        return {
            ...utbetalingsperiode,
            utbetalingsperiodeDetaljer: [...utbetalingsperiode.utbetalingsperiodeDetaljer]
                .sort((a, b) => b.person.fødselsdato.localeCompare(a.person.fødselsdato))
                .map(detalj => ({
                    ...detalj,
                    person: {
                        ...detalj.person,
                        navn:
                            detalj.person.type === PersonType.SØKER ? 'Søker Søkersen' : `[${indeks++}] Barn Barnesen`,
                    },
                })),
        };
    });
}

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
