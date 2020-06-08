import { IFelt, Valideringsstatus } from '../../typer/felt';
import { diff, nyPeriode } from '../../typer/periode';
import { IPerson } from '../../typer/person';
import {
    IPersonResultat,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
    lagTomtFeltMedVilkår,
    VilkårType,
} from '../../typer/vilkår';
import {
    erPeriodeGyldig,
    erResultatGyldig,
    ikkeValider,
    lagInitiellFelt,
} from '../../utils/validators';
import { kjørValidering, validerVilkår } from './validering';

export const sorterVilkårsvurderingForPerson = (
    vilkårResultater: IFelt<IVilkårResultat>[]
): IFelt<IVilkårResultat>[] => {
    return vilkårResultater.sort(
        (a, b) =>
            a.verdi.vilkårType.localeCompare(b.verdi.vilkårType) ||
            diff(a.verdi.periode.verdi, b.verdi.periode.verdi)
    );
};

export const hentVilkårsvurderingMedEkstraVilkår = (
    vilkårsvurdering: IPersonResultat[],
    personIdent: string,
    vilkårType: VilkårType
): IPersonResultat[] => {
    return vilkårsvurdering.map((personResultat: IPersonResultat) => {
        if (personResultat.personIdent === personIdent) {
            return {
                ...personResultat,
                vilkårResultater: [
                    ...personResultat.vilkårResultater,
                    lagInitiellFelt(lagTomtFeltMedVilkår(vilkårType), validerVilkår),
                ],
            };
        } else {
            return personResultat;
        }
    });
};

/**
 * Funksjon som mapper vilkår for person.
 *
 * @param personResultater perioder fra api
 * @param personer personer på behandlingen
 */
export const mapFraRestVilkårsvurderingTilUi = (
    personResultater: IRestPersonResultat[],
    personer: IPerson[]
): IPersonResultat[] => {
    return kjørValidering(
        personResultater.map((personResultat: IRestPersonResultat) => {
            const person: IPerson | undefined = personer.find(
                (person: IPerson) => person.personIdent === personResultat.personIdent
            );

            if (person === undefined) {
                throw new Error('Finner ikke person ved validering av vilkårsvurdering');
            } else {
                return {
                    person,
                    personIdent: personResultat.personIdent,
                    vilkårResultater: sorterVilkårsvurderingForPerson(
                        personResultat.vilkårResultater.map((vilkårResultat: IRestVilkårResultat) =>
                            lagInitiellFelt(
                                {
                                    begrunnelse: {
                                        feilmelding: '',
                                        valideringsFunksjon: ikkeValider,
                                        valideringsstatus: Valideringsstatus.OK,
                                        verdi: vilkårResultat.begrunnelse,
                                    },
                                    id: vilkårResultat.id,
                                    periode: lagInitiellFelt(
                                        nyPeriode(
                                            vilkårResultat.periodeFom,
                                            vilkårResultat.periodeTom
                                        ),
                                        erPeriodeGyldig
                                    ),
                                    resultat: lagInitiellFelt(
                                        vilkårResultat.resultat,
                                        erResultatGyldig
                                    ),
                                    vilkårType: vilkårResultat.vilkårType,
                                },
                                validerVilkår
                            )
                        )
                    ),
                };
            }
        })
    );
};
