import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentPerson } from '../api/hentPerson';
import { useAppContext } from '../context/AppContext';
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

export const PERSON_QUERY_KEY_PREFIX = 'person';

export function useHentPerson(ident: string | undefined) {
    const { request } = useHttp();
    const { skalObfuskereData } = useAppContext();
    return useQuery({
        queryKey: [PERSON_QUERY_KEY_PREFIX, ident],
        queryFn: async () => {
            if (ident === undefined) {
                return Promise.reject(new Error('Kan ikke hente person uten ident.'));
            }
            const person = await hentPerson(request, ident);
            return Promise.resolve(person);
        },
        select: person => {
            if (skalObfuskereData) {
                return obfuskertPersonInfo(person);
            }
            return person;
        },
        enabled: ident !== undefined,
    });
}
