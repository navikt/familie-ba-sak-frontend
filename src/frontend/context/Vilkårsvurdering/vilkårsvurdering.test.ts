import {
    IPersonResultat,
    VilkårType,
    Resultat,
    IVilkårResultat,
    vilkårConfig,
    IVilkårConfig,
    lagTomtFeltMedVilkår,
} from '../../typer/vilkår';
import {
    hentVilkårsvurderingMedEkstraVilkår,
    leggTilNyttVilkårIGjeldendeVilkårsvurdering,
    slåSammenVilkårForPerson,
    lagNyVilkårsvurderingMedNyttVilkår,
} from './vilkårsvurdering';
import { randomUUID } from '../../utils/commons';
import { kjønnType } from '@navikt/familie-typer';
import { PersonType, IPerson } from '../../typer/person';
import {
    nyPeriode,
    kanErstatte,
    kanSplitte,
    kanFlytteFom,
    kanFlytteTom,
    IPeriode,
    diff,
} from '../../typer/periode';
import { IFelt } from '../../typer/felt';
import {
    lagInitiellFelt,
    erUtfylt,
    erResultatGyldig,
    erPeriodeGyldig,
} from '../../utils/validators';
import { validerVilkår } from './validering';
import { hentPeriode, hentResultat, hentBegrunnelse } from './utils';

const hentVilkårsvurderingForPerson = (
    personIdent: string,
    vilkårsvurdering: IPersonResultat[]
): IPersonResultat | undefined => {
    return vilkårsvurdering.find(
        (personResultat: IPersonResultat) => personResultat.personIdent === personIdent
    );
};

const mockPerson = (fnr: string): IPerson => ({
    familierelasjoner: [],
    fødselsdato: '',
    kjønn: 'MANN' as kjønnType,
    navn: 'Mockersen',
    personIdent: fnr,
    type: PersonType.SØKER,
});

const mockVilkår = (
    vilkårType: VilkårType,
    resultat: Resultat,
    periode: IPeriode,
    begrunnelse: string = 'mock'
): IFelt<IVilkårResultat> =>
    validerVilkår(
        lagInitiellFelt(
            {
                begrunnelse: lagInitiellFelt(begrunnelse, erUtfylt),
                id: randomUUID(),
                resultat: lagInitiellFelt(resultat, erResultatGyldig),
                vilkårType,
                periode: lagInitiellFelt(periode, erPeriodeGyldig),
            },
            validerVilkår
        )
    );

const mockHentVilkårForPersoner = (personer?: IPerson[]): IPersonResultat[] => {
    if (!personer) {
        return [];
    }

    return personer.map((person: IPerson) => ({
        personIdent: person.personIdent,
        person,
        vilkårResultater: [
            ...Object.values(vilkårConfig)
                .filter((vc: IVilkårConfig) => vc.parterDetteGjelderFor.includes(person.type))
                .map(
                    (vc: IVilkårConfig): IFelt<IVilkårResultat> =>
                        lagInitiellFelt(lagTomtFeltMedVilkår(vc.key as VilkårType), validerVilkår)
                ),
        ].sort((a, b) => diff(a.verdi.periode.verdi, b.verdi.periode.verdi)),
    }));
};

describe('Skal teste vilkårsvurdering', () => {
    test('Skal lage periode resultat og legge til 1 vilkår', () => {
        const fnr = randomUUID();

        let vilkårsvurdering: IPersonResultat[] = mockHentVilkårForPersoner([mockPerson(fnr)]);

        expect(vilkårsvurdering.length).toBe(1);
        expect(hentVilkårsvurderingForPerson(fnr, vilkårsvurdering)?.vilkårResultater.length).toBe(
            Object.values(vilkårConfig).filter((vc: IVilkårConfig) =>
                vc.parterDetteGjelderFor.includes(PersonType.SØKER)
            ).length
        );

        vilkårsvurdering = hentVilkårsvurderingMedEkstraVilkår(
            vilkårsvurdering,
            fnr,
            VilkårType.BOSATT_I_RIKET
        );

        expect(hentVilkårsvurderingForPerson(fnr, vilkårsvurdering)?.vilkårResultater.length).toBe(
            Object.values(vilkårConfig).filter((vc: IVilkårConfig) =>
                vc.parterDetteGjelderFor.includes(PersonType.SØKER)
            ).length + 1
        );
    });

    test('Skal teste kanErstatte', () => {
        expect(kanErstatte(nyPeriode('2019-01-01'), nyPeriode('2020-01-01'))).toBe(true);

        expect(kanErstatte(nyPeriode('2020-05-01'), nyPeriode('2020-01-01'))).toBe(false);

        expect(
            kanErstatte(
                nyPeriode('2019-01-01', '2020-05-01'),
                nyPeriode('2020-01-01', '2020-05-01')
            )
        ).toBe(true);

        expect(
            kanErstatte(
                nyPeriode('2020-01-01', '2020-05-01'),
                nyPeriode('2018-01-01', '2020-05-01')
            )
        ).toBe(false);
    });

    test('Skal teste kanSplitte', () => {
        expect(
            kanSplitte(nyPeriode('2019-01-01', '2020-01-01'), nyPeriode('2018-01-01', '2020-05-01'))
        ).toBe(true);

        expect(kanSplitte(nyPeriode('2019-01-01'), nyPeriode('2020-01-01'))).toBe(false);

        expect(
            kanSplitte(nyPeriode('2019-01-01', '2020-01-01'), nyPeriode('2019-05-01', '2020-05-01'))
        ).toBe(false);

        expect(
            kanSplitte(nyPeriode('2019-01-01', '2020-01-01'), nyPeriode('2019-01-01', '2020-01-01'))
        ).toBe(false);
    });

    test('Skal teste kanFlyttFom', () => {
        expect(
            kanFlytteFom(
                nyPeriode('2018-01-01', '2019-05-01'),
                nyPeriode('2019-01-01', '2020-01-01')
            )
        ).toBe(true);

        expect(kanFlytteFom(nyPeriode(undefined, '2020-05-01'), nyPeriode('2020-01-01'))).toBe(
            true
        );

        expect(
            kanFlytteFom(nyPeriode(undefined, '2019-05-01'), nyPeriode('2019-01-01', '2020-01-01'))
        ).toBe(true);

        expect(
            kanFlytteFom(
                nyPeriode('2019-01-01', '2019-05-01'),
                nyPeriode('2019-01-01', '2020-01-01')
            )
        ).toBe(true);

        expect(
            kanFlytteFom(
                nyPeriode('2019-05-01', '2020-05-01'),
                nyPeriode('2019-01-01', '2020-01-01')
            )
        ).toBe(false);
    });

    test('Skal teste kanFlyttTom', () => {
        expect(
            kanFlytteTom(
                nyPeriode('2019-05-01', '2020-05-01'),
                nyPeriode('2019-01-01', '2020-01-01')
            )
        ).toBe(true);

        expect(
            kanFlytteTom(nyPeriode('2019-05-01', undefined), nyPeriode('2019-01-01', '2020-01-01'))
        ).toBe(true);

        expect(
            kanFlytteTom(
                nyPeriode('2019-01-01', '2020-01-01'),
                nyPeriode('2018-01-01', '2020-01-01')
            )
        ).toBe(true);

        expect(
            kanFlytteTom(
                nyPeriode('2018-01-01', '2020-01-01'),
                nyPeriode('2019-01-01', '2020-01-01')
            )
        ).toBe(false);
    });

    test('Skal legge til nytt vilkår med ulikt resultat som lager to perioder (uten sammenslåing)', () => {
        const vilkårForPerson = [
            mockVilkår(VilkårType.BOSATT_I_RIKET, Resultat.JA, nyPeriode('2020-01-01')),
        ];

        const nyVilkårsvurdering = leggTilNyttVilkårIGjeldendeVilkårsvurdering(
            vilkårForPerson,
            mockVilkår(VilkårType.BOSATT_I_RIKET, Resultat.NEI, nyPeriode('2020-05-01'))
        );
        expect(nyVilkårsvurdering.length).toBe(2);
        expect(hentPeriode(nyVilkårsvurdering[0])).toStrictEqual(
            nyPeriode('2020-01-01', '2020-04-30')
        );
        expect(hentResultat(nyVilkårsvurdering[0])).toBe(Resultat.JA);
        expect(hentPeriode(nyVilkårsvurdering[1])).toStrictEqual(
            nyPeriode('2020-05-01', undefined)
        );
        expect(hentResultat(nyVilkårsvurdering[1])).toBe(Resultat.NEI);
    });

    test('Skal legge til nytt vilkår med likt resultat som lager to perioder (uten sammenslåing)', () => {
        const vilkårForPerson = [
            mockVilkår(VilkårType.BOSATT_I_RIKET, Resultat.JA, nyPeriode('2020-01-01')),
        ];

        const nyVilkårsvurdering = leggTilNyttVilkårIGjeldendeVilkårsvurdering(
            vilkårForPerson,
            mockVilkår(VilkårType.BOSATT_I_RIKET, Resultat.JA, nyPeriode('2020-05-01'))
        );
        expect(nyVilkårsvurdering.length).toBe(2);
        expect(hentPeriode(nyVilkårsvurdering[0])).toStrictEqual(
            nyPeriode('2020-01-01', '2020-04-30')
        );
        expect(hentResultat(nyVilkårsvurdering[0])).toBe(Resultat.JA);
        expect(hentPeriode(nyVilkårsvurdering[1])).toStrictEqual(
            nyPeriode('2020-05-01', undefined)
        );
        expect(hentResultat(nyVilkårsvurdering[1])).toBe(Resultat.JA);
    });

    test('Skal ikke slå sammen to ulike vilkår', () => {
        const vilkårForPerson = [
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-03-31')
            ),
            mockVilkår(
                VilkårType.LOVLIG_OPPHOLD,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-06-15')
            ),
        ];

        const nyVilkårsvurdering = slåSammenVilkårForPerson(vilkårForPerson);
        expect(nyVilkårsvurdering.length).toBe(2);
    });

    test('Skal slå sammen tre perioder med samme resultat', () => {
        const vilkårForPerson = [
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-03-31')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-04-01', '2020-06-15')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-06-16', '2021-01-01')
            ),
            mockVilkår(
                VilkårType.LOVLIG_OPPHOLD,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-06-15')
            ),
        ];

        const nyVilkårsvurdering = slåSammenVilkårForPerson(vilkårForPerson);
        expect(nyVilkårsvurdering.length).toBe(2);
    });

    test('Skal slå sammen første 2 perioder og fylle hull med nytt aksjonspunkt etter det', () => {
        const vilkårForPerson = [
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-03-31')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-04-01', '2020-06-15')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-08-10', '2021-01-01')
            ),
            mockVilkår(
                VilkårType.LOVLIG_OPPHOLD,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-06-15')
            ),
        ];

        const nyVilkårsvurdering = slåSammenVilkårForPerson(vilkårForPerson);
        expect(nyVilkårsvurdering.length).toBe(4);
        expect(hentPeriode(nyVilkårsvurdering[1])).toStrictEqual(
            nyPeriode('2020-06-16', '2020-08-09')
        );
        expect(hentResultat(nyVilkårsvurdering[1])).toBe(Resultat.KANSKJE);
    });

    test('Skal slå sammen første 2 perioder og ikke fylle hull med nytt aksjonspunkt etter det fordi hullet ikke er over 1 måned', () => {
        const vilkårForPerson = [
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-03-31')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-04-01', '2020-05-30')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-06-10', '2021-01-01')
            ),
            mockVilkår(
                VilkårType.LOVLIG_OPPHOLD,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-06-15')
            ),
        ];

        const nyVilkårsvurdering = slåSammenVilkårForPerson(vilkårForPerson);
        expect(nyVilkårsvurdering.length).toBe(3);
        expect(hentPeriode(nyVilkårsvurdering[0])).toStrictEqual(
            nyPeriode('2020-01-01', '2020-05-30')
        );
    });

    test('Skal teste special cases for logikk rundt opprettelse av nye aksjonspunkter', () => {
        const vilkårForPersonUtenHull = [
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-04-01')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-05-01', '2021-01-01')
            ),
        ];

        const nyVilkårsvurderingUtenHull = slåSammenVilkårForPerson(vilkårForPersonUtenHull);
        expect(nyVilkårsvurderingUtenHull.length).toBe(2);

        const vilkårForPersonMedHull = [
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2019-01-01', '2019-01-31')
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2019-03-01', '2020-01-01')
            ),
        ];

        const nyVilkårsvurderingMedHull = slåSammenVilkårForPerson(vilkårForPersonMedHull);
        expect(nyVilkårsvurderingMedHull.length).toBe(3);
    });

    test('Skal teste at begrunnelsen fra periodene som ligger inntil hverandre kommer med i sammenslått begrunnelse', () => {
        const vilkårForPerson = [
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-01-01', '2020-03-31'),
                'Første begrunnelse'
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-04-01', '2020-06-15'),
                'Andre begrunnelsen'
            ),
            mockVilkår(
                VilkårType.BOSATT_I_RIKET,
                Resultat.JA,
                nyPeriode('2020-06-16', '2021-01-01'),
                'Tredje begrunnelsen'
            ),
        ];

        const nyVilkårsvurdering = slåSammenVilkårForPerson(vilkårForPerson);
        const sammenslåttBegrunnelse = `Systemet har slått sammen perioder!\n01.01.2020 - 31.03.2020:\nFørste begrunnelse\n\n01.04.2020 - 15.06.2020:\nAndre begrunnelsen\n\n16.06.2020 - 01.01.2021:\nTredje begrunnelsen`;

        expect(nyVilkårsvurdering.length).toBe(1);
        expect(hentPeriode(nyVilkårsvurdering[0])).toStrictEqual(
            nyPeriode('2020-01-01', '2021-01-01')
        );
        expect(hentResultat(nyVilkårsvurdering[0])).toBe(Resultat.JA);
        expect(hentBegrunnelse(nyVilkårsvurdering[0])).toStrictEqual(sammenslåttBegrunnelse);
    });

    test('Skal oppdatere 1 vilkår', () => {
        const fnr = randomUUID();

        const vilkårsSomSkalEndres: IFelt<IVilkårResultat> = lagInitiellFelt(
            {
                begrunnelse: lagInitiellFelt('begrunnelse', erUtfylt),
                id: randomUUID(),
                periode: lagInitiellFelt(nyPeriode('2020-01-01', '2020-03-31'), erPeriodeGyldig),
                resultat: lagInitiellFelt(Resultat.JA, erResultatGyldig),
                vilkårType: VilkårType.BOSATT_I_RIKET,
            },
            validerVilkår
        );

        const vilkårsvurdering: IPersonResultat[] = [
            {
                personIdent: fnr,
                vilkårResultater: [
                    vilkårsSomSkalEndres,
                    mockVilkår(VilkårType.LOVLIG_OPPHOLD, Resultat.JA, nyPeriode('2020-01-01')),
                ],
                person: mockPerson(fnr),
            },
        ];

        const nyVilkårsvurdering: IPersonResultat[] = lagNyVilkårsvurderingMedNyttVilkår(
            vilkårsvurdering,
            fnr,
            {
                ...vilkårsSomSkalEndres,
                verdi: {
                    ...vilkårsSomSkalEndres.verdi,
                    begrunnelse: {
                        ...vilkårsSomSkalEndres.verdi.begrunnelse,
                        verdi: 'Ny begrunnelse',
                    },
                },
            }
        );

        expect(nyVilkårsvurdering.length).toBe(1);
        expect(nyVilkårsvurdering[0].vilkårResultater.length).toBe(2);
        expect(hentPeriode(nyVilkårsvurdering[0].vilkårResultater[0])).toStrictEqual(
            nyPeriode('2020-01-01', '2020-03-31')
        );
        expect(hentBegrunnelse(nyVilkårsvurdering[0].vilkårResultater[0])).toBe('Ny begrunnelse');
    });

    test('Skal erstatte 1 periode med samme periode', () => {
        const fnr = randomUUID();

        const vilkårsSomSkalEndres: IFelt<IVilkårResultat> = mockVilkår(
            VilkårType.LOVLIG_OPPHOLD,
            Resultat.NEI,
            nyPeriode('2019-01-01', '2019-12-31')
        );

        const vilkårsvurdering: IPersonResultat[] = [
            {
                personIdent: fnr,
                vilkårResultater: [
                    vilkårsSomSkalEndres,
                    mockVilkår(VilkårType.LOVLIG_OPPHOLD, Resultat.JA, nyPeriode('2020-01-01')),
                ],
                person: mockPerson(fnr),
            },
        ];

        const nyVilkårsvurdering: IPersonResultat[] = lagNyVilkårsvurderingMedNyttVilkår(
            vilkårsvurdering,
            fnr,
            {
                ...vilkårsSomSkalEndres,
                verdi: {
                    ...vilkårsSomSkalEndres.verdi,
                    periode: {
                        ...vilkårsSomSkalEndres.verdi.periode,
                        verdi: nyPeriode('2020-01-01'),
                    },
                    begrunnelse: {
                        ...vilkårsSomSkalEndres.verdi.begrunnelse,
                        verdi: 'Erstattet begrunnelse',
                    },
                },
            }
        );

        expect(nyVilkårsvurdering.length).toBe(1);
        expect(nyVilkårsvurdering[0].vilkårResultater.length).toBe(1);
        expect(hentPeriode(nyVilkårsvurdering[0].vilkårResultater[0])).toStrictEqual(
            nyPeriode('2020-01-01')
        );
        expect(hentBegrunnelse(nyVilkårsvurdering[0].vilkårResultater[0])).toBe(
            'Erstattet begrunnelse'
        );
    });
});
