import { hentBrevmottakere } from '@api/hentBrevmottakere';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useQuery } from '@tanstack/react-query';
import { type BrevmottakerBehandling, brevmottakertypeVisningsnavn } from '@typer/brevmottaker';

function obfuskerBrevmottakere(brevmottakere: BrevmottakerBehandling[]): BrevmottakerBehandling[] {
    return brevmottakere.map(brevmottaker => ({
        ...brevmottaker,
        navn: brevmottakertypeVisningsnavn[brevmottaker.type],
        adresselinje1: 'Mottakerveien 1',
        adresselinje2: undefined,
    }));
}

export function useHentBrevmottakere(behandlingId: number) {
    const skalObfuskereData = useSkalObfuskereData();
    return useQuery({
        queryKey: queryKeys.brevmottakere(behandlingId),
        queryFn: () => hentBrevmottakere(behandlingId),
        select: brevmottakere => (skalObfuskereData ? obfuskerBrevmottakere(brevmottakere) : brevmottakere),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
