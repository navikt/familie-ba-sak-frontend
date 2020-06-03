import {
    IPersonResultat,
    IRestPersonResultat,
    IRestVilkårResultat,
    IVilkårResultat,
    Resultat,
    VilkårType,
    lagTomtFeltMedVilkår,
} from '../../typer/vilkår';
import {
    diff,
    etterfølgende,
    ikkeEtterfølgendeOgHullPåOver1Måned,
    kanErstatte,
    kanFlytteFom,
    kanFlytteTom,
    kanSplitte,
    nyMoment,
    nyPeriode,
    overlapperMinstEttSted,
    periodeToString,
    slåSammen,
} from '../../typer/periode';
import { datoformat } from '../../utils/formatter';
import { randomUUID } from '../../utils/commons';
import { IPerson } from '../../typer/person';
import { IFelt, Valideringsstatus } from '../../typer/felt';
import {
    lagInitiellFelt,
    erUtfylt,
    erPeriodeGyldig,
    erResultatGyldig,
    ikkeValider,
} from '../../utils/validators';
import { validerVilkår, kjørValidering } from './validering';
import { hentPeriode, hentResultat, hentBegrunnelse } from './utils';

const vilkårsvurderingFeilmelding = 'Feil i rekonstruksjon av vilkårsvurdering for part';

export const vilkårHarSammeTypeOgOverlapperMinstEttSted = (
    nyttVilkårResultat: IFelt<IVilkårResultat>,
    annenVilkårResultat: IFelt<IVilkårResultat>
): boolean => {
    return (
        annenVilkårResultat.verdi.vilkårType === nyttVilkårResultat.verdi.vilkårType &&
        overlapperMinstEttSted(hentPeriode(nyttVilkårResultat), hentPeriode(annenVilkårResultat))
    );
};

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
 * Lager plass for nytt vilkår på gjeldende vilkårsvurdering og legger til nytt vilkår
 *
 * @param vilkårsvurderingForPerson vilkårsvurderingen som foreligger
 * @param nyttVilkårResultat vilkåret som legges til
 */
export const leggTilNyttVilkårIGjeldendeVilkårsvurdering = (
    vilkårsvurderingForPerson: IFelt<IVilkårResultat>[],
    nyttVilkårResultat: IFelt<IVilkårResultat>
): IFelt<IVilkårResultat>[] => {
    return sorterVilkårsvurderingForPerson([
        ...vilkårsvurderingForPerson.reduce(
            (
                nyeVilkårResultater: IFelt<IVilkårResultat>[],
                annenVilkårResultat: IFelt<IVilkårResultat>
            ) => {
                if (nyttVilkårResultat.verdi.id === annenVilkårResultat.verdi.id) {
                    return nyeVilkårResultater;
                }

                if (
                    vilkårHarSammeTypeOgOverlapperMinstEttSted(
                        nyttVilkårResultat,
                        annenVilkårResultat
                    )
                ) {
                    if (
                        kanErstatte(
                            hentPeriode(nyttVilkårResultat),
                            hentPeriode(annenVilkårResultat)
                        )
                    ) {
                        return nyeVilkårResultater;
                    } else if (
                        kanSplitte(
                            hentPeriode(nyttVilkårResultat),
                            hentPeriode(annenVilkårResultat)
                        )
                    ) {
                        const nyFom = nyMoment(hentPeriode(nyttVilkårResultat).tom)
                            .add(1, 'day')
                            .format(datoformat.ISO_DAG);
                        const nyTom = nyMoment(hentPeriode(nyttVilkårResultat).fom)
                            .subtract(1, 'day')
                            .format(datoformat.ISO_DAG);

                        nyeVilkårResultater = [
                            ...nyeVilkårResultater,
                            {
                                ...annenVilkårResultat,
                                verdi: {
                                    ...annenVilkårResultat.verdi,
                                    periode: lagInitiellFelt(
                                        nyPeriode(hentPeriode(annenVilkårResultat).fom, nyTom),
                                        erPeriodeGyldig
                                    ),
                                    id: randomUUID(),
                                },
                            },
                            {
                                ...annenVilkårResultat,
                                verdi: {
                                    ...annenVilkårResultat.verdi,
                                    periode: lagInitiellFelt(
                                        nyPeriode(nyFom, hentPeriode(annenVilkårResultat).tom),
                                        erPeriodeGyldig
                                    ),
                                    id: randomUUID(),
                                },
                            },
                        ];
                    } else if (
                        kanFlytteFom(
                            hentPeriode(nyttVilkårResultat),
                            hentPeriode(annenVilkårResultat)
                        )
                    ) {
                        const nyFom = nyMoment(hentPeriode(nyttVilkårResultat).tom)
                            .add(1, 'day')
                            .format(datoformat.ISO_DAG);

                        nyeVilkårResultater = [
                            ...nyeVilkårResultater,
                            {
                                ...annenVilkårResultat,
                                verdi: {
                                    ...annenVilkårResultat.verdi,
                                    periode: lagInitiellFelt(
                                        nyPeriode(nyFom, hentPeriode(annenVilkårResultat).tom),
                                        erPeriodeGyldig
                                    ),
                                    id: randomUUID(),
                                },
                            },
                        ];
                    } else if (
                        kanFlytteTom(
                            hentPeriode(nyttVilkårResultat),
                            hentPeriode(annenVilkårResultat)
                        )
                    ) {
                        const nyTom = nyMoment(hentPeriode(nyttVilkårResultat).fom)
                            .subtract(1, 'day')
                            .format(datoformat.ISO_DAG);

                        nyeVilkårResultater = [
                            ...nyeVilkårResultater,
                            {
                                ...annenVilkårResultat,
                                verdi: {
                                    ...annenVilkårResultat.verdi,
                                    periode: lagInitiellFelt(
                                        nyPeriode(hentPeriode(annenVilkårResultat).fom, nyTom),
                                        erPeriodeGyldig
                                    ),
                                    id: randomUUID(),
                                },
                            },
                        ];
                    } else {
                        throw new Error(
                            `${vilkårsvurderingFeilmelding}. Perioden som skal inn overlapper ikke.`
                        );
                    }
                } else {
                    return [...nyeVilkårResultater, annenVilkårResultat];
                }

                return nyeVilkårResultater;
            },
            []
        ),
        nyttVilkårResultat,
    ]);
};

const leggTilHvisIkkeFinnes = (
    vilkårForPerson: IFelt<IVilkårResultat>[],
    vilkårResultat: IFelt<IVilkårResultat>
): IFelt<IVilkårResultat>[] => {
    if (
        vilkårForPerson.find(
            (vilkår: IFelt<IVilkårResultat>) => vilkår.verdi.id === vilkårResultat.verdi.id
        ) === undefined
    ) {
        return [...vilkårForPerson, vilkårResultat];
    } else {
        return vilkårForPerson;
    }
};

/**
 * Slår sammen perioder med samme vilkår type og resultat.
 * For perioder som slås sammen legger systemet til alle begrunnelser
 * i det nye vilkåret og for hvilke perioder de gjaldt ved sammenslåing.
 *
 * Funksjonen lager også aksjonspunkter for hull i vilkårsvurdering.
 *
 * @param vilkårsvurderingForPerson vilkårsvurderingen som foreligger
 * @param vilkårTypeSomSkalSlåsSammen vilkåret som legges til
 */
export const slåSammenVilkårForPerson = (
    vilkårsvurderingForPerson: IFelt<IVilkårResultat>[],
    ikkeSlåSammenBegrunnelser?: boolean
): IFelt<IVilkårResultat>[] => {
    let sammenslåttPerioder: IFelt<IVilkårResultat>[] = [];
    let systemetHarVurdertSammenhengendePerioder = false;

    for (let i = 0; i < vilkårsvurderingForPerson.length; i++) {
        let fletteVilkår: IFelt<IVilkårResultat> = vilkårsvurderingForPerson[i];
        const nesteVilkår: IFelt<IVilkårResultat> | undefined = vilkårsvurderingForPerson[i + 1];

        // Hvis systemet nettopp har slått sammen 2 perioder setter vi forrige periode til fletteperioden
        if (systemetHarVurdertSammenhengendePerioder) {
            fletteVilkår = sammenslåttPerioder[sammenslåttPerioder.length - 1];
        }

        if (
            nesteVilkår &&
            fletteVilkår.verdi.vilkårType === nesteVilkår.verdi.vilkårType &&
            hentResultat(fletteVilkår) === hentResultat(nesteVilkår)
        ) {
            // Dersom systemet nettopp har slått sammen en periode popper vi denne slik at den ikke kommer med dobbelt.
            if (systemetHarVurdertSammenhengendePerioder) {
                sammenslåttPerioder.pop();
            }

            if (etterfølgende(hentPeriode(fletteVilkår), hentPeriode(nesteVilkår))) {
                // Periodene er etterfølgende og vi slår dem sammen. Tar med begge begrunnelsene.
                const sammenslåttVilkår: IFelt<IVilkårResultat> = {
                    ...fletteVilkår,
                    verdi: {
                        ...fletteVilkår.verdi,
                        id: randomUUID(),
                        periode: lagInitiellFelt(
                            slåSammen(hentPeriode(fletteVilkår), hentPeriode(nesteVilkår)),
                            erPeriodeGyldig
                        ),
                        begrunnelse: lagInitiellFelt(
                            ikkeSlåSammenBegrunnelser
                                ? hentBegrunnelse(fletteVilkår)
                                : `${
                                      !systemetHarVurdertSammenhengendePerioder
                                          ? `Systemet har slått sammen perioder!\n${periodeToString(
                                                hentPeriode(fletteVilkår)
                                            )}:\n${hentBegrunnelse(fletteVilkår)}`
                                          : hentBegrunnelse(fletteVilkår)
                                  }\n\n${periodeToString(
                                      hentPeriode(nesteVilkår)
                                  )}:\n${hentBegrunnelse(nesteVilkår)}`,
                            erUtfylt
                        ),
                    },
                };

                sammenslåttPerioder = [...sammenslåttPerioder, sammenslåttVilkår];
                systemetHarVurdertSammenhengendePerioder = true;
            } else if (
                ikkeEtterfølgendeOgHullPåOver1Måned(
                    hentPeriode(fletteVilkår),
                    hentPeriode(nesteVilkår)
                )
            ) {
                // Periodene er ikke sammenhengende så vi legger til et aksjonspunkt som må vurderes
                const nyFom = nyMoment(hentPeriode(fletteVilkår).tom)
                    .add(1, 'day')
                    .format(datoformat.ISO_DAG);
                const nyTom = nyMoment(hentPeriode(nesteVilkår).fom)
                    .subtract(1, 'day')
                    .format(datoformat.ISO_DAG);

                sammenslåttPerioder = [
                    ...sammenslåttPerioder,
                    fletteVilkår,
                    lagInitiellFelt(
                        {
                            vilkårType: fletteVilkår.verdi.vilkårType,
                            begrunnelse: lagInitiellFelt('', erUtfylt),
                            id: randomUUID(),
                            periode: lagInitiellFelt(nyPeriode(nyFom, nyTom), erPeriodeGyldig),
                            resultat: lagInitiellFelt(Resultat.KANSKJE, erResultatGyldig),
                        },
                        validerVilkår
                    ),
                ];

                systemetHarVurdertSammenhengendePerioder = false;
            } else {
                sammenslåttPerioder = leggTilHvisIkkeFinnes(sammenslåttPerioder, fletteVilkår);

                systemetHarVurdertSammenhengendePerioder = false;
            }
        } else {
            sammenslåttPerioder = leggTilHvisIkkeFinnes(sammenslåttPerioder, fletteVilkår);

            systemetHarVurdertSammenhengendePerioder = false;
        }
    }

    return sammenslåttPerioder;
};

/**
 * Hovedfunksjon for å legge til nytt/endre på eksisterende vilkår.
 *
 * Funksjonen gjør følgende ting:
 * 1. Finner vilkårsvurdering for part.
 * 2. Sorterer vurderingen slik at man kan gå gjennom en sortert liste i neste steg.
 * 3. Legger til nytt vilkår som foregår på følgende måte:
 *      1. Gå gjennom hvert vilkår. Sjekk om vilkåret overlapper med nytt vilkår.
 *      2. Hvis vilkåret overlapper finner man ut på hvilken måte (erstatter, splitter etc).
 *         På vilkåret som overlapper endrer man fom/tom slik at nytt vilkår kan få plass.
 *      3. Når listen er gått gjennom legger vil til det nye vilkåret og sorterer listen.
 * 4. For å unngå hull og perioder som har samme resultat liggende etterhverandre slår man sammen perioder
 * og lager aksjonspunkter i hullene.
 *
 * @param vilkårsvurdering Gjeldende vilkårsvurdering for behandlingen
 * @param personIdent Personident for vilkårsvurderingen vi skal gjøre endringer på
 * @param nyttVilkårResultat vilkåret som legges til
 */
export const lagNyVilkårsvurderingMedNyttVilkår = (
    vilkårsvurdering: IPersonResultat[],
    personIdent: string,
    nyttVilkårResultat: IFelt<IVilkårResultat>
): IPersonResultat[] => {
    const vilkårsvurderingForPerson = vilkårsvurdering.find(
        (personResultat: IPersonResultat) => personResultat.personIdent === personIdent
    );

    if (!vilkårsvurderingForPerson) {
        throw new Error(`${vilkårsvurderingFeilmelding}. Finner ikke vilkår for part.`);
    }

    const sortertVilkårsvurderingForPerson: IFelt<
        IVilkårResultat
    >[] = sorterVilkårsvurderingForPerson(vilkårsvurderingForPerson.vilkårResultater);

    const nyVilkårsvurderingForPerson: IFelt<
        IVilkårResultat
    >[] = leggTilNyttVilkårIGjeldendeVilkårsvurdering(
        sortertVilkårsvurderingForPerson,
        nyttVilkårResultat
    );

    const sammenslåttVilkårsvurderingForPerson: IFelt<IVilkårResultat>[] = slåSammenVilkårForPerson(
        nyVilkårsvurderingForPerson
    );

    return vilkårsvurdering.map((personResultat: IPersonResultat) => {
        if (personResultat.personIdent === personIdent) {
            return {
                ...personResultat,
                vilkårResultater: sammenslåttVilkårsvurderingForPerson,
            };
        } else {
            return personResultat;
        }
    });
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
