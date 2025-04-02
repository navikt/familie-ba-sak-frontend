import { differenceInMilliseconds } from 'date-fns';

import { Valideringsstatus } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';

import { kjørValidering, validerAnnenVurdering, validerVilkår } from './validering';
import type { IGrunnlagPerson } from '../../../../../typer/person';
import { PersonTypeVisningsRangering } from '../../../../../typer/person';
import type {
    IPersonResultat,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
} from '../../../../../typer/vilkår';
import { Resultat } from '../../../../../typer/vilkår';
import type { IIsoDatoPeriode } from '../../../../../utils/dato';
import {
    isoStringTilDate,
    isoStringTilDateMedFallback,
    nyIsoDatoPeriode,
    tidenesEnde,
} from '../../../../../utils/dato';
import {
    erAvslagBegrunnelserGyldig,
    erBegrunnelseGyldig,
    erPeriodeGyldig,
    erResultatGyldig,
    erUtdypendeVilkårsvurderingerGyldig,
    ikkeValider,
    lagInitiellFelt,
} from '../../../../../utils/validators';

const periodeDiff = (periodeA: IIsoDatoPeriode, periodeB: IIsoDatoPeriode) => {
    if (!periodeA.fom && !periodeA.tom) {
        return 1;
    }
    return differenceInMilliseconds(
        isoStringTilDateMedFallback({ isoString: periodeA.fom, fallbackDate: tidenesEnde }),
        isoStringTilDateMedFallback({ isoString: periodeB.fom, fallbackDate: tidenesEnde })
    );
};

const sorterVilkårsvurderingForPerson = (
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
): IPersonResultat[] => {
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
                                    begrunnelse: lagInitiellFelt(
                                        vilkårResultat.begrunnelse,
                                        erBegrunnelseGyldig
                                    ),
                                    id: vilkårResultat.id,
                                    periode: lagInitiellFelt(
                                        nyIsoDatoPeriode(
                                            vilkårResultat.periodeFom,
                                            vilkårResultat.periodeTom
                                        ),
                                        erPeriodeGyldig
                                    ),
                                    resultat: lagInitiellFelt(
                                        vilkårResultat.resultat,
                                        erResultatGyldig
                                    ),
                                    resultatBegrunnelse: vilkårResultat.resultatBegrunnelse,
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
                                    vurderesEtter: vilkårResultat.vurderesEtter,
                                    utdypendeVilkårsvurderinger: lagInitiellFelt(
                                        vilkårResultat.utdypendeVilkårsvurderinger,
                                        erUtdypendeVilkårsvurderingerGyldig
                                    ),
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

            return differenceInMilliseconds(
                isoStringTilDate(b.person.fødselsdato),
                isoStringTilDate(a.person.fødselsdato)
            );
        });
};
