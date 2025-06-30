import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { useSettAktivBrukerIModiaContext } from './useSettAktivBrukerIModiaContext';
import { hentPerson } from '../api/hentPerson';
import { useAppContext } from '../context/AppContext';
import { ForelderBarnRelasjonRolle, type IGrunnlagPerson, type IPersonInfo } from '../typer/person';
import { ToggleNavn } from '../typer/toggles';

function sammenlignFødselsdato<T extends { fødselsdato?: string; person?: IGrunnlagPerson }>(
    a: T,
    b: T
) {
    if (a.person && b.person) return b.person.fødselsdato.localeCompare(a.person.fødselsdato);
    if (a.fødselsdato && b.fødselsdato) return b.fødselsdato.localeCompare(a.fødselsdato);
    return 0;
}

function obfuskerPersonInfo(personInfo: IPersonInfo): IPersonInfo {
    let indeks = 1;
    return {
        ...personInfo,
        navn: 'Søker Søkersen',
        bostedsadresse: {
            adresse: 'Adresseveien 1',
            postnummer: '0001',
        },
        forelderBarnRelasjon: personInfo.forelderBarnRelasjon
            ?.slice()
            .sort(sammenlignFødselsdato)
            .map(person => ({
                ...person,
                navn:
                    person.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                        ? `[${indeks++}] Barn Barnesen`
                        : 'Søker Søkersen',
            })),
    };
}

export const PERSON_QUERY_KEY_PREFIX = 'person';

export function useHentPerson(ident: string | undefined) {
    const { request } = useHttp();
    const { skalObfuskereData, toggles } = useAppContext();
    const { mutate: settAktivBrukerIModiaContext } = useSettAktivBrukerIModiaContext();
    return useQuery({
        queryKey: [PERSON_QUERY_KEY_PREFIX, ident],
        queryFn: async () => {
            if (ident === undefined) {
                return Promise.reject(new Error('Kan ikke hente person uten ident.'));
            }
            const person = await hentPerson(request, ident);
            if (toggles[ToggleNavn.oppdaterModiaKontekst]) {
                settAktivBrukerIModiaContext(person.personIdent);
            }
            return Promise.resolve(person);
        },
        select: person => {
            if (skalObfuskereData) {
                obfuskerPersonInfo(person);
            }
            return person;
        },
        enabled: ident !== undefined,
    });
}
