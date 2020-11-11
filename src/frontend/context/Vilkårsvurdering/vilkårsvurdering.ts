import moment from 'moment';
import { FeltState, Valideringsstatus } from '../../familie-skjema/typer';
import { diff, nyPeriode } from '../../typer/periode';
import { IGrunnlagPerson, PersonTypeVisningsRangering } from '../../typer/person';
import {
    IPersonResultat,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
} from '../../typer/vilkår';
import { datoformat } from '../../utils/formatter';
import {
    erPeriodeGyldig,
    erResultatGyldig,
    ikkeValider,
    lagInitiellFelt,
} from '../../utils/validators';
import { kjørValidering, validerVilkår } from './validering';

export const sorterVilkårsvurderingForPerson = (
    vilkårResultater: FeltState<IVilkårResultat>[]
): FeltState<IVilkårResultat>[] => {
    return vilkårResultater.sort(
        (a, b) =>
            a.value.vilkårType.localeCompare(b.value.vilkårType) ||
            diff(a.value.periode.value, b.value.periode.value)
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
    personer: IGrunnlagPerson[]
): IPersonResultat[] => {
    return kjørValidering(mapFraRestPersonResultatTilPersonResultat(personResultater, personer));
};

export const mapFraRestPersonResultatTilPersonResultat = (
    personResultater: IRestPersonResultat[],
    personer: IGrunnlagPerson[]
) => {
    return personResultater
        .map((personResultat: IRestPersonResultat) => {
            const person: IGrunnlagPerson | undefined = personer.find(
                (person: IGrunnlagPerson) => person.personIdent === personResultat.personIdent
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
                                        valider: ikkeValider,
                                        valideringsstatus: Valideringsstatus.OK,
                                        value: vilkårResultat.begrunnelse,
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
                                    endretAv: vilkårResultat.endretAv,
                                    erVurdert: vilkårResultat.erVurdert ?? false,
                                    endretTidspunkt: vilkårResultat.endretTidspunkt,
                                    behandlingId: vilkårResultat.behandlingId,
                                },
                                validerVilkår
                            )
                        )
                    ),
                };
            }
        })
        .sort((a: IPersonResultat, b: IPersonResultat) => {
            if (
                PersonTypeVisningsRangering[a.person.type] >
                PersonTypeVisningsRangering[b.person.type]
            ) {
                return 1;
            }

            if (
                PersonTypeVisningsRangering[a.person.type] <
                PersonTypeVisningsRangering[b.person.type]
            ) {
                return -1;
            }

            return moment(b.person.fødselsdato, datoformat.ISO_DAG).diff(
                moment(a.person.fødselsdato, datoformat.ISO_DAG),
                'day'
            );
        });
};
