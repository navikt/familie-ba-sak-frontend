import { FeltState, Valideringsstatus } from '@navikt/familie-skjema';

import { IGrunnlagPerson, PersonTypeVisningsRangering } from '../../typer/person';
import {
    IPersonResultat,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
    Resultat,
} from '../../typer/vilkår';
import familieDayjs, { familieDayjsDiff } from '../../utils/familieDayjs';
import { datoformat } from '../../utils/formatter';
import { periodeDiff, nyPeriode } from '../../utils/kalender';
import {
    erAvslagBegrunnelserGyldig,
    erPeriodeGyldig,
    erResultatGyldig,
    ikkeValider,
    lagInitiellFelt,
} from '../../utils/validators';
import { kjørValidering, validerAnnenVurdering, validerVilkår } from './validering';

export const sorterVilkårsvurderingForPerson = (
    vilkårResultater: FeltState<IVilkårResultat>[]
): FeltState<IVilkårResultat>[] => {
    return vilkårResultater.sort(
        (a, b) =>
            a.verdi.vilkårType.localeCompare(b.verdi.vilkårType) ||
            periodeDiff(a.verdi.periode.verdi, b.verdi.periode.verdi)
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
                                    endretAv: vilkårResultat.endretAv,
                                    erVurdert: vilkårResultat.erVurdert,
                                    erAutomatiskVurdert: vilkårResultat.erAutomatiskVurdert,
                                    erEksplisittAvslagPåSøknad:
                                        vilkårResultat.erEksplisittAvslagPåSøknad,
                                    avslagBegrunnelser: lagInitiellFelt(
                                        vilkårResultat.avslagBegrunnelser,
                                        erAvslagBegrunnelserGyldig
                                    ),
                                    endretTidspunkt: vilkårResultat.endretTidspunkt,
                                    behandlingId: vilkårResultat.behandlingId,
                                },
                                validerVilkår
                            )
                        )
                    ),
                    andreVurderinger: personResultat.andreVurderinger.map(annenVurdering =>
                        lagInitiellFelt(
                            {
                                begrunnelse: {
                                    feilmelding: '',
                                    valider: ikkeValider,
                                    valideringsstatus: Valideringsstatus.OK,
                                    verdi: annenVurdering.begrunnelse,
                                },
                                id: annenVurdering.id,
                                resultat: lagInitiellFelt(
                                    annenVurdering.resultat,
                                    erResultatGyldig
                                ),
                                endretAv: annenVurdering.endretAv,
                                erVurdert: annenVurdering.resultat !== Resultat.IKKE_VURDERT,
                                endretTidspunkt: annenVurdering.endretTidspunkt,
                                behandlingId: annenVurdering.behandlingId,
                                type: annenVurdering.type,
                            },
                            validerAnnenVurdering
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

            return familieDayjsDiff(
                familieDayjs(b.person.fødselsdato, datoformat.ISO_DAG),
                familieDayjs(a.person.fødselsdato, datoformat.ISO_DAG)
            );
        });
};
