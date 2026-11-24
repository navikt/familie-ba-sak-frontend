import { hentBehandling } from '@api/hentBehandling';
import { oppdaterValutakursPåBehandling } from '@api/oppdaterValutakursPåBehandling';
import { queryKeys } from '@hooks/keys/queryKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { useQuery } from '@tanstack/react-query';
import { BehandlerRolle, type IBehandling } from '@typer/behandling';
import { type IGrunnlagPerson, PersonType } from '@typer/person';
import { useCallback } from 'react';

function sammenlignFødselsdato<T extends { fødselsdato?: string; person?: IGrunnlagPerson }>(a: T, b: T) {
    if (a.person && b.person) {
        return b.person.fødselsdato.localeCompare(a.person.fødselsdato);
    }
    if (a.fødselsdato && b.fødselsdato) {
        return b.fødselsdato.localeCompare(a.fødselsdato);
    }
    return 0;
}

function obfuskerBehandling(behandling: IBehandling): IBehandling {
    let barnIndeks = 1;
    return {
        ...behandling,
        søknadsgrunnlag: behandling.søknadsgrunnlag && {
            ...behandling.søknadsgrunnlag,
            barnaMedOpplysninger: behandling.søknadsgrunnlag.barnaMedOpplysninger
                ?.toSorted(sammenlignFødselsdato)
                .map((barn, indeks) => ({
                    ...barn,
                    navn: `[${indeks + 1}] Barn Barnesen`,
                })),
        },
        personer: behandling.personer?.toSorted(sammenlignFødselsdato).map(person => ({
            ...person,
            navn: person.type === PersonType.BARN ? `[${barnIndeks++}] Barn Barnesen` : 'Søker Søkersen',
            registerhistorikk: person.registerhistorikk && {
                ...person.registerhistorikk,
                bostedsadresse: person.registerhistorikk.bostedsadresse.map((adresse, index) => ({
                    ...adresse,
                    verdi: `Bostedsadresse ${index + 1}`,
                })),
                oppholdsadresse: person.registerhistorikk.oppholdsadresse.map((adresse, index) => ({
                    ...adresse,
                    verdi: `Oppholdsadresse ${index + 1}`,
                })),
                deltBosted: person.registerhistorikk.deltBosted.map((adresse, index) => ({
                    ...adresse,
                    verdi: `Deltbostedsadresse ${index + 1}`,
                })),
                dødsboadresse: person.registerhistorikk.dødsboadresse.map((adresse, index) => ({
                    ...adresse,
                    verdi: `Dødsbosadresse ${index + 1}`,
                })),
            },
        })),
        utbetalingsperioder: behandling.utbetalingsperioder.map(utbetalingsperiode => {
            let indeks = 1;
            return {
                ...utbetalingsperiode,
                utbetalingsperiodeDetaljer: utbetalingsperiode.utbetalingsperiodeDetaljer
                    ?.toSorted(sammenlignFødselsdato)
                    .map(detalj => ({
                        ...detalj,
                        person: {
                            ...detalj.person,
                            navn:
                                detalj.person.type === PersonType.BARN
                                    ? `[${indeks++}] Barn Barnesen`
                                    : 'Søker Søkersen',
                        },
                    })),
            };
        }),
        brevmottakere: behandling.brevmottakere?.map(brevmottaker => ({
            ...brevmottaker,
            navn:
                brevmottaker.type.charAt(0).toUpperCase() +
                brevmottaker.type.slice(1).toLowerCase().replaceAll('_', ' '),
            adresselinje1: 'Mottakerveien 1',
            adresselinje2: undefined,
        })),
    };
}

export function useHentBehandling(behandlingId: number | undefined) {
    const saksbehandler = useSaksbehandler();
    const skalObfuskereData = useSkalObfuskereData();

    const obfuskerHvisAktivert = useCallback(
        (behandling: IBehandling) => (skalObfuskereData ? obfuskerBehandling(behandling) : behandling),
        [skalObfuskereData]
    );

    return useQuery({
        queryKey: queryKeys.behandling(behandlingId),
        queryFn: async () => {
            if (behandlingId === undefined) {
                throw new Error('Kan ikke hente behandling uten behandlingId.');
            }
            if (saksbehandler.rolle === BehandlerRolle.BESLUTTER) {
                return oppdaterValutakursPåBehandling({ behandlingId });
            }
            return hentBehandling({ behandlingId });
        },
        select: obfuskerHvisAktivert,
        enabled: behandlingId !== undefined,
        // Behandlingen skal ikke vises fra cache når man åpner den på nytt, siden steget kan ha endret seg. Ellers rendres
        // sidene og automatisk navigering til riktig steg skjer ut fra en utdatert behandling. Forms vil også rendre med
        // cached behandling, som er et problem hvis de ikke bruker "values" (eller noe tilsvarende) fra RHF.
        // Dette må sees mer på før vi eventuelt fjerner gcTime herfra.
        gcTime: 0,
        // Behandlingen oppdateres eksplisitt via setQueryData. Automatisk refetch kan nullstille skjemaer
        // som er under redigering. Det kan også oppdatere steget på behandlingen hvis behandlingen har blitt oppdatert
        // i en annen fane, av en annen saksbehandler, eller at serveren har oppdatert den selv, som kan føre til at
        // saksbehandler befinner seg på et tidligere steg enn det behandlingen er på, eller et senere (ulovlig) steg.
        // Dette må sees mer på før vi eventuelt skrur på refetches.
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
    });
}
