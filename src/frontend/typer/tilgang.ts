import { Adressebeskyttelsegradering, adressebeskyttelsestyper } from './person';

// Speiler Avvisningskode i tilgangsmaskin-klient (familie-felles). Beskriver hvorfor Tilgangsmaskinen avviste oppslaget.
export enum Avvisningskode {
    AVVIST_STRENGT_FORTROLIG_ADRESSE = 'AVVIST_STRENGT_FORTROLIG_ADRESSE',
    AVVIST_STRENGT_FORTROLIG_UTLAND = 'AVVIST_STRENGT_FORTROLIG_UTLAND',
    AVVIST_AVDØD = 'AVVIST_AVDØD',
    AVVIST_VERGEMÅL = 'AVVIST_VERGEMÅL',
    AVVIST_PERSON_UTLAND = 'AVVIST_PERSON_UTLAND',
    AVVIST_SKJERMING = 'AVVIST_SKJERMING',
    AVVIST_FORTROLIG_ADRESSE = 'AVVIST_FORTROLIG_ADRESSE',
    AVVIST_UKJENT_BOSTED = 'AVVIST_UKJENT_BOSTED',
    AVVIST_GEOGRAFISK = 'AVVIST_GEOGRAFISK',
    AVVIST_HABILITET = 'AVVIST_HABILITET',
    UKJENT = 'UKJENT',
}

// Avvisninger på grunn av adressebeskyttelse er ikke med her; de beskrives med diskresjonskoden i stedet.
const begrunnelsePerAvvisningskode: Partial<Record<Avvisningskode, string>> = {
    AVVIST_HABILITET: 'Du kan ikke gjøre oppslag på deg selv eller dine nærstående',
    AVVIST_SKJERMING: 'Du har ikke tilgang til Nav-ansatte og deres nærmeste familie',
    AVVIST_GEOGRAFISK: 'Du har ikke tilgang til personens geografiske område',
    AVVIST_AVDØD: 'Du har ikke tilgang til personer som har vært døde i mer enn 12 måneder',
    AVVIST_VERGEMÅL: 'Du har ikke tilgang til personer du er verge for',
    AVVIST_PERSON_UTLAND: 'Du har ikke tilgang til personer bosatt i utlandet',
    AVVIST_UKJENT_BOSTED: 'Du har ikke tilgang til personer uten kjent adresse',
};

export function lagManglerTilgangBegrunnelse(
    avvisningskode: Avvisningskode | undefined,
    adressebeskyttelseGradering: Adressebeskyttelsegradering | undefined
): string {
    const begrunnelse = avvisningskode && begrunnelsePerAvvisningskode[avvisningskode];
    if (begrunnelse) {
        return begrunnelse;
    }
    if (adressebeskyttelseGradering && adressebeskyttelseGradering !== Adressebeskyttelsegradering.UGRADERT) {
        return `Personen har diskresjonskode ${adressebeskyttelsestyper[adressebeskyttelseGradering]}`;
    }
    return 'Du har ikke tilgang til personen';
}
