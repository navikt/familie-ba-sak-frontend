import { describe, expect, test } from 'vitest';

import { Adressebeskyttelsegradering } from './person';
import { Avvisningskode, lagManglerTilgangBegrunnelse } from './tilgang';

describe('lagManglerTilgangBegrunnelse', () => {
    test('skal forklare at man ikke kan gjøre oppslag på seg selv når avvisningen skyldes habilitet', () => {
        // Act
        const begrunnelse = lagManglerTilgangBegrunnelse(
            Avvisningskode.AVVIST_HABILITET,
            Adressebeskyttelsegradering.UGRADERT
        );

        // Assert
        expect(begrunnelse).toBe('Du kan ikke gjøre oppslag på deg selv eller dine nærstående');
    });

    test('skal forklare skjerming når avvisningen skyldes at personen er Nav-ansatt', () => {
        // Act
        const begrunnelse = lagManglerTilgangBegrunnelse(
            Avvisningskode.AVVIST_SKJERMING,
            Adressebeskyttelsegradering.UGRADERT
        );

        // Assert
        expect(begrunnelse).toBe('Du har ikke tilgang til Nav-ansatte og deres nærmeste familie');
    });

    test('skal vise diskresjonskoden når avvisningen skyldes adressebeskyttelse', () => {
        // Act
        const begrunnelse = lagManglerTilgangBegrunnelse(
            Avvisningskode.AVVIST_STRENGT_FORTROLIG_ADRESSE,
            Adressebeskyttelsegradering.STRENGT_FORTROLIG
        );

        // Assert
        expect(begrunnelse).toBe('Personen har diskresjonskode strengt fortrolig');
    });

    test('skal vise diskresjonskoden når avvisningskoden mangler og personen er adressebeskyttet', () => {
        // Act
        const begrunnelse = lagManglerTilgangBegrunnelse(undefined, Adressebeskyttelsegradering.FORTROLIG);

        // Assert
        expect(begrunnelse).toBe('Personen har diskresjonskode fortrolig');
    });

    test('skal gi en generell begrunnelse når avvisningskoden er ukjent og personen ikke er adressebeskyttet', () => {
        // Act
        const begrunnelse = lagManglerTilgangBegrunnelse(Avvisningskode.UKJENT, Adressebeskyttelsegradering.UGRADERT);

        // Assert
        expect(begrunnelse).toBe('Du har ikke tilgang til personen');
    });
});
