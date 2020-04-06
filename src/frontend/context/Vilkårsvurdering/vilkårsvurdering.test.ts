import {
    IPeriodeResultat,
    hentVilkårForPersoner,
    VilkårType,
    Resultat,
    IVilkårResultat,
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
} from '../../typer/periode';

const hentVilkårsvurderingForPerson = (
    personIdent: string,
    vilkårsvurdering: IPeriodeResultat[]
): IPeriodeResultat | undefined => {
    return vilkårsvurdering.find(
        (periodeResultat: IPeriodeResultat) => periodeResultat.personIdent === personIdent
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
    begrunnelse: string = ''
): IVilkårResultat => ({
    begrunnelse,
    id: randomUUID(),
    resultat,
    vilkårType,
    periode,
});

describe('Skal teste vilkårsvurdering', () => {
    test('Skal lage periode resultat og legge til 1 vilkår', () => {
        const fnr = randomUUID();

        let vilkårsvurdering: IPeriodeResultat[] = hentVilkårForPersoner([mockPerson(fnr)]);

        expect(vilkårsvurdering.length).toBe(1);
        expect(hentVilkårsvurderingForPerson(fnr, vilkårsvurdering)?.vilkårResultater.length).toBe(
            Object.values(VilkårType).length
        );

        vilkårsvurdering = hentVilkårsvurderingMedEkstraVilkår(
            vilkårsvurdering,
            fnr,
            VilkårType.BOSATT_I_RIKET
        );

        expect(hentVilkårsvurderingForPerson(fnr, vilkårsvurdering)?.vilkårResultater.length).toBe(
            Object.values(VilkårType).length + 1
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
        expect(nyVilkårsvurdering[0].periode).toStrictEqual(nyPeriode('2020-01-01', '2020-04-30'));
        expect(nyVilkårsvurdering[0].resultat).toBe(Resultat.JA);
        expect(nyVilkårsvurdering[1].periode).toStrictEqual(nyPeriode('2020-05-01', undefined));
        expect(nyVilkårsvurdering[1].resultat).toBe(Resultat.NEI);
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
        expect(nyVilkårsvurdering[0].periode).toStrictEqual(nyPeriode('2020-01-01', '2020-04-30'));
        expect(nyVilkårsvurdering[0].resultat).toBe(Resultat.JA);
        expect(nyVilkårsvurdering[1].periode).toStrictEqual(nyPeriode('2020-05-01', undefined));
        expect(nyVilkårsvurdering[1].resultat).toBe(Resultat.JA);
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

        const nyVilkårsvurdering = slåSammenVilkårForPerson(
            vilkårForPerson,
            VilkårType.BOSATT_I_RIKET
        );
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

        const nyVilkårsvurdering = slåSammenVilkårForPerson(
            vilkårForPerson,
            VilkårType.BOSATT_I_RIKET
        );
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

        const nyVilkårsvurdering = slåSammenVilkårForPerson(
            vilkårForPerson,
            VilkårType.BOSATT_I_RIKET
        );
        expect(nyVilkårsvurdering.length).toBe(4);
        expect(nyVilkårsvurdering[1].periode).toStrictEqual(nyPeriode('2020-06-16', '2020-08-09'));
        expect(nyVilkårsvurdering[1].resultat).toBe(undefined);
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

        const nyVilkårsvurdering = slåSammenVilkårForPerson(
            vilkårForPerson,
            VilkårType.BOSATT_I_RIKET
        );
        const sammenslåttBegrunnelse = `Systemet har slått sammen perioder!\n01.01.2020 - 31.03.2020:\nFørste begrunnelse\n\n01.04.2020 - 15.06.2020:\nAndre begrunnelsen\n\n16.06.2020 - 01.01.2021:\nTredje begrunnelsen`;

        expect(nyVilkårsvurdering.length).toBe(1);
        expect(nyVilkårsvurdering[0].periode).toStrictEqual(nyPeriode('2020-01-01', '2021-01-01'));
        expect(nyVilkårsvurdering[0].resultat).toBe(Resultat.JA);
        expect(nyVilkårsvurdering[0].begrunnelse).toStrictEqual(sammenslåttBegrunnelse);
    });

    test('Skal oppdatere 1 vilkår', () => {
        const fnr = randomUUID();

        const vilkårsSomSkalEndres: IVilkårResultat = {
            begrunnelse: 'begrunnelse',
            id: randomUUID(),
            periode: nyPeriode('2020-01-01', '2020-03-31'),
            resultat: Resultat.JA,
            vilkårType: VilkårType.BOSATT_I_RIKET,
        };

        const vilkårsvurdering: IPeriodeResultat[] = [
            {
                personIdent: fnr,
                vilkårResultater: [
                    vilkårsSomSkalEndres,
                    mockVilkår(VilkårType.LOVLIG_OPPHOLD, Resultat.JA, nyPeriode('2020-01-01')),
                ],
                person: mockPerson(fnr),
            },
        ];

        const nyVilkårsvurdering: IPeriodeResultat[] = lagNyVilkårsvurderingMedNyttVilkår(
            vilkårsvurdering,
            fnr,
            {
                ...vilkårsSomSkalEndres,
                begrunnelse: 'Ny begrunnelse',
            }
        );

        expect(nyVilkårsvurdering.length).toBe(1);
        expect(nyVilkårsvurdering[0].vilkårResultater.length).toBe(2);
        expect(nyVilkårsvurdering[0].vilkårResultater[0].periode).toStrictEqual(
            nyPeriode('2020-01-01', '2020-03-31')
        );
        expect(nyVilkårsvurdering[0].vilkårResultater[0].begrunnelse).toBe('Ny begrunnelse');
    });
});
