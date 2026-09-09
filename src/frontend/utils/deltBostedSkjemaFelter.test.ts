import { describe, expect, test } from 'vitest';

import type { IForelderBarnRelasjon, IPersonInfo } from '../typer/person';
import { Adressebeskyttelsegradering, ForelderBarnRelasjonRolle } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';
import {
    hentBarnMedOpplysningerFraBruker,
    hentDeltBostedMulitiselectVerdierForBarn,
    validerAvtalerOmDeltBostedPerBarn,
    validerBarnMedDeltBosted,
} from './deltBostedSkjemaFelter';

const lagRelasjon = (
    relasjonRolle: ForelderBarnRelasjonRolle,
    overstyr: Partial<IForelderBarnRelasjon> = {}
): IForelderBarnRelasjon => ({
    adressebeskyttelseGradering: Adressebeskyttelsegradering.UGRADERT,
    fødselsdato: '2015-05-17',
    navn: 'Mock Barn',
    personIdent: '12345678903',
    relasjonRolle,
    ...overstyr,
});

const lagBarn = (overstyr: Partial<IBarnMedOpplysninger> = {}): IBarnMedOpplysninger => ({
    ident: '12345678903',
    navn: 'Mock Barn',
    fødselsdato: '2015-05-17',
    merket: false,
    manueltRegistrert: false,
    erFolkeregistrert: true,
    ...overstyr,
});

describe('hentBarnMedOpplysningerFraBruker', () => {
    test('mapper kun relasjoner med rollen BARN til IBarnMedOpplysninger', () => {
        const bruker = {
            forelderBarnRelasjon: [
                lagRelasjon(ForelderBarnRelasjonRolle.BARN, {
                    personIdent: '111',
                    navn: 'Barn En',
                    fødselsdato: '2018-01-01',
                }),
                lagRelasjon(ForelderBarnRelasjonRolle.MOR, { personIdent: '222', navn: 'Mor' }),
                lagRelasjon(ForelderBarnRelasjonRolle.BARN, {
                    personIdent: '333',
                    navn: 'Barn To',
                    fødselsdato: '2020-02-02',
                }),
            ],
        } as IPersonInfo;

        expect(hentBarnMedOpplysningerFraBruker(bruker)).toEqual([
            {
                merket: false,
                ident: '111',
                navn: 'Barn En',
                fødselsdato: '2018-01-01',
                manueltRegistrert: false,
                erFolkeregistrert: true,
            },
            {
                merket: false,
                ident: '333',
                navn: 'Barn To',
                fødselsdato: '2020-02-02',
                manueltRegistrert: false,
                erFolkeregistrert: true,
            },
        ]);
    });

    test('returnerer tom liste når bruker ikke har barnerelasjoner', () => {
        const bruker = {
            forelderBarnRelasjon: [lagRelasjon(ForelderBarnRelasjonRolle.MOR)],
        } as IPersonInfo;

        expect(hentBarnMedOpplysningerFraBruker(bruker)).toEqual([]);
    });
});

describe('validerBarnMedDeltBosted', () => {
    test('returnerer undefined når minst ett barn er merket', () => {
        expect(validerBarnMedDeltBosted([lagBarn({ merket: false }), lagBarn({ merket: true })])).toBeUndefined();
    });

    test('returnerer feilmelding når ingen barn er merket', () => {
        expect(validerBarnMedDeltBosted([lagBarn({ merket: false })])).toBe('Du må velge barn');
    });
});

describe('validerAvtalerOmDeltBostedPerBarn', () => {
    test('returnerer undefined når alle merkede barn har gyldige avtaler', () => {
        const barn = [lagBarn({ ident: '111', merket: true })];
        const avtaler = { '111': ['2022-01-01'] };
        expect(validerAvtalerOmDeltBostedPerBarn(avtaler, barn)).toBeUndefined();
    });

    test('returnerer feilmelding når et merket barn mangler avtale', () => {
        const barn = [lagBarn({ ident: '111', merket: true })];
        const avtaler = { '111': [''] };
        expect(validerAvtalerOmDeltBostedPerBarn(avtaler, barn)).toBe(
            'Minst én av barna mangler avtale om delt bosted'
        );
    });

    test('returnerer feilmelding når avtaledatoen er ugyldig', () => {
        const barn = [lagBarn({ ident: '111', merket: true })];
        const avtaler = { '111': ['ikke-en-dato'] };
        expect(validerAvtalerOmDeltBostedPerBarn(avtaler, barn)).toBe(
            'Minst én av barna mangler avtale om delt bosted'
        );
    });

    test('ignorerer barn som ikke er merket', () => {
        const barn = [lagBarn({ ident: '111', merket: false })];
        const avtaler = { '111': [''] };
        expect(validerAvtalerOmDeltBostedPerBarn(avtaler, barn)).toBeUndefined();
    });
});

describe('hentDeltBostedMulitiselectVerdierForBarn', () => {
    test('returnerer tom liste når barnet ikke har avtaler', () => {
        expect(hentDeltBostedMulitiselectVerdierForBarn(lagBarn({ ident: '111' }), {})).toEqual([]);
    });

    test('lager én tekstverdi per avtale med fødselsdato og avtaledato', () => {
        const barn = lagBarn({ ident: '111', fødselsdato: '2015-05-17' });
        const avtaler = { '111': ['2022-01-01', '2023-03-03'] };

        const verdier = hentDeltBostedMulitiselectVerdierForBarn(barn, avtaler);

        expect(verdier).toHaveLength(2);
        verdier.forEach(verdi => {
            expect(verdi).toContain('Barn født 17.05.2015');
            expect(verdi).toContain('Avtalen gjelder fra');
        });
        expect(verdier[0]).toContain('2022');
        expect(verdier[1]).toContain('2023');
    });
});
