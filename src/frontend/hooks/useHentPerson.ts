import { useQuery } from '@tanstack/react-query';

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

interface Options {
    ident: string | undefined;
    onSuccess?: (person: IPersonInfo) => void;
}

export function useHentPerson({ ident, onSuccess }: Options) {
    const { request } = useHttp();
    const { skalObfuskereData } = useAppContext();
    return useQuery({
        queryKey: HentPersonQueryKeyFactory.person(ident),
        queryFn: async () => {
            if (ident === undefined) {
                return Promise.reject(new Error('Kan ikke hente person uten ident.'));
            }
            const person = await hentPerson(request, ident);
            onSuccess?.(person);
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
