import { IFelt, Valideringsstatus } from '../../typer/felt';
import { diff, nyPeriode } from '../../typer/periode';
import { IPerson, PersonType } from '../../typer/person';
import {
    IPersonResultat,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
} from '../../typer/vilkår';
import {
    erPeriodeGyldig,
    erResultatGyldig,
    ikkeValider,
    lagInitiellFelt,
} from '../../utils/validators';
import { kjørValidering, validerVilkår } from './validering';
import { datoformat } from '../../utils/formatter';
import moment from 'moment';

export const sorterVilkårsvurderingForPerson = (
    vilkårResultater: IFelt<IVilkårResultat>[]
): IFelt<IVilkårResultat>[] => {
    return vilkårResultater.sort(
        (a, b) =>
            a.verdi.vilkårType.localeCompare(b.verdi.vilkårType) ||
            diff(a.verdi.periode.verdi, b.verdi.periode.verdi)
    );
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
    ).sort((a: IPersonResultat, b: IPersonResultat) =>
        moment(a.person.fødselsdato, datoformat.ISO_DAG).diff(
            moment(b.person.fødselsdato, datoformat.ISO_DAG),
            'day'
        )
    );
};
