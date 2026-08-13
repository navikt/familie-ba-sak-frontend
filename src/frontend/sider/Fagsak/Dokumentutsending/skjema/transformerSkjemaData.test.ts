import { lagBrevmottaker } from '@testutils/testdata/brevmottakerTestdata';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { Målform } from '@typer/søknad';
import { setDefaultOptions } from 'date-fns';
import { nb } from 'date-fns/locale';
import { beforeAll, describe, expect, test } from 'vitest';

import { Informasjonsbrev, opplysningsdokumenter } from '../../Behandling/Høyremeny/Brev/typer';
import { DokumentÅrsakInstitusjon, DokumentÅrsakPerson } from '../dokumentÅrsakTyper';
import { hentDeltBostedMultiselectVerdierForBarn, transformerSkjemaData } from './transformerSkjemaData';
import type { DokumentutsendingFormValues } from './useDokumentutsendingSkjema';

beforeAll(() => {
    setDefaultOptions({ locale: nb });
});

const manuelleBrevmottakerePåFagsak = [lagBrevmottaker()];

const merketBarn: IBarnMedOpplysninger = {
    ident: '01011012345',
    navn: 'Barnesen',
    fødselsdato: '2010-01-01',
    merket: true,
    manueltRegistrert: false,
    erFolkeregistrert: true,
};

const ikkeMerketBarn: IBarnMedOpplysninger = {
    ...merketBarn,
    ident: '01011012346',
    merket: false,
};

const standardSkjemaverdier: DokumentutsendingFormValues = {
    årsak: '',
    målform: Målform.NB,
    fritekster: [],
    fritekstAvsnitt: '',
    dokumenter: [],
    valgteBarn: [],
    avtalerOmDeltBostedPerBarn: {},
};

describe('transformerSkjemaData', () => {
    test('kaster feil når årsak ikke er valgt', () => {
        expect(() =>
            transformerSkjemaData({
                skjemaverdier: standardSkjemaverdier,
                manuelleBrevmottakerePåFagsak,
            })
        ).toThrowError('Årsak er ikke valgt og vi kan ikke sende inn skjema');
    });

    test('DELT_BOSTED: inkluderer kun merkede barn og deres avtaledatoer', () => {
        const request = transformerSkjemaData({
            skjemaverdier: {
                ...standardSkjemaverdier,
                årsak: DokumentÅrsakPerson.DELT_BOSTED,
                valgteBarn: [merketBarn, ikkeMerketBarn],
                avtalerOmDeltBostedPerBarn: { [merketBarn.ident]: [{ dato: '2020-06-01' }] },
            },
            manuelleBrevmottakerePåFagsak,
        });

        expect(request.brevmal).toBe(Informasjonsbrev.INFORMASJONSBREV_DELT_BOSTED);
        expect(request.barnIBrev).toEqual([merketBarn.ident]);
        expect(request.multiselectVerdier).toEqual(['Barn født 01.01.2010. Avtalen gjelder fra 1. juni 2020.']);
        expect(request.manuelleBrevmottakere).toBe(manuelleBrevmottakerePåFagsak);
    });

    test('KAN_SØKE: multiselectVerdier inneholder dokumenttekster før fritekster', () => {
        const førsteDokument = opplysningsdokumenter[0];

        const request = transformerSkjemaData({
            skjemaverdier: {
                ...standardSkjemaverdier,
                årsak: DokumentÅrsakPerson.KAN_SØKE,
                dokumenter: [førsteDokument.label],
                fritekster: [{ tekst: 'En fritekst' }],
            },
            manuelleBrevmottakerePåFagsak,
        });

        expect(request.brevmal).toBe(Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE);
        expect(request.multiselectVerdier).toEqual([førsteDokument.brevtekst?.[Målform.NB], 'En fritekst']);
        expect(request.barnIBrev).toEqual([]);
    });

    test('KAN_SØKE: kaster feil dersom valgt dokument mangler brevtekst', () => {
        expect(() =>
            transformerSkjemaData({
                skjemaverdier: {
                    ...standardSkjemaverdier,
                    årsak: DokumentÅrsakPerson.KAN_SØKE,
                    dokumenter: ['Et dokument som ikke finnes'],
                },
                manuelleBrevmottakerePåFagsak,
            })
        ).toThrowError();
    });

    test.each([
        [
            DokumentÅrsakPerson.TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_MED_SELVSTENDIG_RETT_VI_HAR_FÅTT_F016_KAN_SØKE_OM_BARNETRYGD,
        ],
        [
            DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_GJORT_VEDTAK_TIL_ANNEN_FORELDER,
        ],
        [
            DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HAR_FÅTT_EN_SØKNAD_FRA_ANNEN_FORELDER,
        ],
        [
            DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_VARSEL_OM_ÅRLIG_KONTROLL,
        ],
        [
            DokumentÅrsakPerson.TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
            Informasjonsbrev.INFORMASJONSBREV_TIL_FORELDER_OMFATTET_NORSK_LOVGIVNING_HENTER_IKKE_REGISTEROPPLYSNINGER,
        ],
        [
            DokumentÅrsakPerson.KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
            Informasjonsbrev.INFORMASJONSBREV_KAN_HA_RETT_TIL_PENGESTØTTE_FRA_NAV,
        ],
    ])('barn-i-brev-årsak %s gir riktig brevmal og kun merkede barn', (årsak, forventetBrevmal) => {
        const request = transformerSkjemaData({
            skjemaverdier: {
                ...standardSkjemaverdier,
                årsak,
                valgteBarn: [merketBarn, ikkeMerketBarn],
            },
            manuelleBrevmottakerePåFagsak,
        });

        expect(request.brevmal).toBe(forventetBrevmal);
        expect(request.barnIBrev).toEqual([merketBarn.ident]);
        expect(request.multiselectVerdier).toEqual(['Barn født 01.01.2010.']);
    });

    test.each([
        [
            DokumentÅrsakPerson.INNHENTE_OPPLYSNINGER_KLAGE,
            Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE,
        ],
        [
            DokumentÅrsakInstitusjon.INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON,
            Informasjonsbrev.INFORMASJONSBREV_INNHENTE_OPPLYSNINGER_KLAGE_INSTITUSJON,
        ],
    ])('%s inkluderer fritekstAvsnitt og riktig brevmal', (årsak, forventetBrevmal) => {
        const request = transformerSkjemaData({
            skjemaverdier: {
                ...standardSkjemaverdier,
                årsak,
                fritekstAvsnitt: 'Et avsnitt med fritekst',
            },
            manuelleBrevmottakerePåFagsak,
        });

        expect(request.brevmal).toBe(forventetBrevmal);
        expect(request.fritekstAvsnitt).toBe('Et avsnitt med fritekst');
        expect(request.multiselectVerdier).toEqual([]);
        expect(request.barnIBrev).toEqual([]);
    });

    test.each([
        [DokumentÅrsakPerson.FØDSEL_MINDREÅRIG, Informasjonsbrev.INFORMASJONSBREV_FØDSEL_MINDREÅRIG],
        [DokumentÅrsakPerson.FØDSEL_VERGEMÅL, Informasjonsbrev.INFORMASJONSBREV_FØDSEL_VERGEMÅL],
        [DokumentÅrsakPerson.FØDSEL_GENERELL, Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL],
        [DokumentÅrsakPerson.KAN_SØKE_EØS, Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE_EØS],
    ])('enkeltbrev-årsak %s gir riktig brevmal og tomme lister', (årsak, forventetBrevmal) => {
        const request = transformerSkjemaData({
            skjemaverdier: { ...standardSkjemaverdier, årsak },
            manuelleBrevmottakerePåFagsak,
        });

        expect(request.brevmal).toBe(forventetBrevmal);
        expect(request.multiselectVerdier).toEqual([]);
        expect(request.barnIBrev).toEqual([]);
    });

    test('faller tilbake til bokmål når målform ikke er valgt', () => {
        const request = transformerSkjemaData({
            skjemaverdier: {
                ...standardSkjemaverdier,
                årsak: DokumentÅrsakPerson.FØDSEL_GENERELL,
                målform: undefined,
            },
            manuelleBrevmottakerePåFagsak,
        });

        expect(request.mottakerMålform).toBe(Målform.NB);
    });

    describe('hentDeltBostedMultiselectVerdierForBarn', () => {
        test('formaterer en tekstlinje per avtaledato for barnet', () => {
            const verdier = hentDeltBostedMultiselectVerdierForBarn(merketBarn, {
                [merketBarn.ident]: [{ dato: '2020-06-01' }, { dato: '2021-01-15' }],
            });

            expect(verdier).toEqual([
                'Barn født 01.01.2010. Avtalen gjelder fra 1. juni 2020.',
                'Barn født 01.01.2010. Avtalen gjelder fra 15. januar 2021.',
            ]);
        });

        test('returnerer tom liste når barnet ikke har noen avtaler', () => {
            const verdier = hentDeltBostedMultiselectVerdierForBarn(merketBarn, {});

            expect(verdier).toEqual([]);
        });
    });
});
