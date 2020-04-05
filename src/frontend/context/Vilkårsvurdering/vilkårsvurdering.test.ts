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
    periode: IPeriode
): IVilkårResultat => ({
    begrunnelse: '',
    id: randomUUID(),
    resultat,
    vilkårType,
    periode,
});

describe('Skal teste vilkårsvurdering', () => {
    test('Skal lage periode resultat og legge til 1 vilkår', () => {
        const fnr = randomUUID();

        let periodeResultater: IPeriodeResultat[] = hentVilkårForPersoner([mockPerson(fnr)]);

        expect(periodeResultater.length).toBe(1);
        expect(hentVilkårsvurderingForPerson(fnr, periodeResultater)?.vilkårResultater.length).toBe(
            Object.values(VilkårType).length
        );

        periodeResultater = hentVilkårsvurderingMedEkstraVilkår(
            periodeResultater,
            fnr,
            VilkårType.BOSATT_I_RIKET
        );

        expect(hentVilkårsvurderingForPerson(fnr, periodeResultater)?.vilkårResultater.length).toBe(
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

    test('Skal legge til nytt vilkår isolert', () => {
        const vilkårForPerson = [
            mockVilkår(VilkårType.BOSATT_I_RIKET, Resultat.JA, nyPeriode('2020-01-01')),
        ];

        const nyVilkårsvurdering: IVilkårResultat[] = leggTilNyttVilkårIGjeldendeVilkårsvurdering(
            vilkårForPerson,
            mockVilkår(VilkårType.BOSATT_I_RIKET, Resultat.NEI, nyPeriode('2020-05-01'))
        );

        const perioder = nyVilkårsvurdering.map((vilkår: IVilkårResultat) => vilkår.periode);
        expect(perioder).toStrictEqual([
            nyPeriode('2020-01-01', '2020-04-30'),
            nyPeriode('2020-05-01', undefined),
        ]);
    });
});
