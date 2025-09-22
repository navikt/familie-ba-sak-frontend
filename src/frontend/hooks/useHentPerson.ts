import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentPerson } from '../api/hentPerson';
import { useAppContext } from '../context/AppContext';
import { ForelderBarnRelasjonRolle, type IPersonInfo } from '../typer/person';

function obfuskertPersonInfo(personInfo: IPersonInfo): IPersonInfo {
    const obfuskertNavn = 'Søker Søkersen';

    const obfuskertAdresse = {
        adresse: 'Adresseveien 1',
        postnummer: '0001',
    };

    const obfuskerteRelasjoner = personInfo.forelderBarnRelasjon
        ?.toSorted((a, b) => b.fødselsdato.localeCompare(a.fødselsdato))
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

export const HentPersonQueryKeyFactory = {
    person: (ident: string | undefined) => ['person', ident],
};

type Parameters = Omit<
    UseQueryOptions<IPersonInfo, DefaultError, IPersonInfo>,
    'queryKey' | 'queryFn' | 'select' | 'enabled'
> & {
    ident: string | undefined;
};

export function useHentPerson({ ident, ...rest }: Parameters) {
    const { request } = useHttp();
    const { skalObfuskereData } = useAppContext();
    return useQuery({
        queryKey: HentPersonQueryKeyFactory.person(ident),
        queryFn: async () => {
            if (ident === undefined) {
                return Promise.reject(new Error('Kan ikke hente person uten ident.'));
            }
            const person = await hentPerson(request, ident);
            return Promise.resolve(person);
        },
        select: person => {
            const nyPerson = skalObfuskereData ? obfuskertPersonInfo(person) : person;
            // TODO: Fjern sorteringen av objektet når "Bruker" objektet ikke lenger brukes i useEffect dependency
            //  array. Nå må vi gjøre det slik for å unngå at useEffect hookene kjører for ofte og f.eks.
            //  tilbakestiller enkelte skjemaer. Dette sørger for at "Bruker" objektet er mer stabilt.
            return {
                ...nyPerson,
                forelderBarnRelasjon: nyPerson.forelderBarnRelasjon.toSorted(),
                forelderBarnRelasjonMaskert: nyPerson.forelderBarnRelasjonMaskert.toSorted(),
            };
        },
        enabled: ident !== undefined,
        ...rest,
    });
}
