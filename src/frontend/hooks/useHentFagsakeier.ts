import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentFagsakeier } from '../api/hentFagsakeier';
import { useAppContext } from '../context/AppContext';
import type { IMinimalFagsak } from '../typer/fagsak';
import { ForelderBarnRelasjonRolle, type IGrunnlagPerson, type IPersonInfo } from '../typer/person';

function sammenlignFødselsdato<T extends { fødselsdato?: string; person?: IGrunnlagPerson }>(
    a: T,
    b: T
) {
    if (a.person && b.person) return b.person.fødselsdato.localeCompare(a.person.fødselsdato);
    if (a.fødselsdato && b.fødselsdato) return b.fødselsdato.localeCompare(a.fødselsdato);
    return 0;
}

function obfuskertPersonInfo(personInfo: IPersonInfo): IPersonInfo {
    const obfuskertNavn = 'Søker Søkersen';

    const obfuskertAdresse = {
        adresse: 'Adresseveien 1',
        postnummer: '0001',
    };

    const obfuskerteRelasjoner = personInfo.forelderBarnRelasjon
        ?.toSorted(sammenlignFødselsdato)
        .map((relasjon, index) => ({
            ...relasjon,
            navn:
                relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                    ? `[${index + 1}] Barn Barnesen`
                    : obfuskertNavn,
        }));

    return {
        ...personInfo,
        navn: obfuskertNavn,
        bostedsadresse: obfuskertAdresse,
        forelderBarnRelasjon: obfuskerteRelasjoner,
    };
}

export const FAGSAKEIER_QUERY_KEY_PREFIX = 'fagsakeier';

export function useHentFagsakeier(minimalFagsak: IMinimalFagsak | undefined) {
    const { request } = useHttp();
    const { skalObfuskereData } = useAppContext();
    return useQuery({
        queryKey: [FAGSAKEIER_QUERY_KEY_PREFIX, minimalFagsak?.fagsakeier],
        queryFn: async () => {
            if (minimalFagsak?.fagsakeier === undefined) {
                return Promise.reject(new Error('Kan ikke hente person uten ident.'));
            }
            const person = await hentFagsakeier(request, minimalFagsak.fagsakeier);
            return Promise.resolve(person);
        },
        select: person => {
            if (skalObfuskereData) {
                return obfuskertPersonInfo(person);
            }
            return person;
        },
        enabled: minimalFagsak?.fagsakeier !== undefined,
    });
}
