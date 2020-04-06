import { IPeriodeResultat, IVilkårResultat, VilkårType } from '../../typer/vilkår';
import {
    overlapperMinstEttSted,
    diff,
    kanErstatte,
    kanSplitte,
    nyMoment,
    nyPeriode,
    kanFlytteFom,
    kanFlytteTom,
    etterfølgende,
    slåSammen,
    periodeToString,
    ikkeEtterfølgendeOgHullPåOver1Måned,
} from '../../typer/periode';
import { datoformat } from '../../utils/formatter';
import { randomUUID } from '../../utils/commons';

const vilkårsvurderingFeilmelding = 'Feil i rekonstruksjon av vilkårsvurdering for part';

export const vilkårHarSammeTypeOgOverlapperMinstEttSted = (
    nyttVilkårResultat: IVilkårResultat,
    annenVilkårResultat: IVilkårResultat
) => {
    return (
        annenVilkårResultat.vilkårType === nyttVilkårResultat.vilkårType &&
        overlapperMinstEttSted(nyttVilkårResultat.periode, annenVilkårResultat.periode)
    );
};

const sorterVilkårsvurderingForPerson = (
    vilkårResultater: IVilkårResultat[]
): IVilkårResultat[] => {
    return vilkårResultater.sort(
        (a, b) => a.vilkårType.localeCompare(b.vilkårType) || diff(a.periode, b.periode)
    );
};

/**
 * Lager plass for nytt vilkår på gjeldende vilkårsvurdering og legger til nytt vilkår
 *
 * @param vilkårsvurderingForPerson vilkårsvurderingen som foreligger
 * @param nyttVilkårResultat vilkåret som legges til
 */
export const leggTilNyttVilkårIGjeldendeVilkårsvurdering = (
    vilkårsvurderingForPerson: IVilkårResultat[],
    nyttVilkårResultat: IVilkårResultat
): IVilkårResultat[] => {
    return sorterVilkårsvurderingForPerson([
        ...vilkårsvurderingForPerson?.reduce(
            (nyeVilkårResultater: IVilkårResultat[], annenVilkårResultat: IVilkårResultat) => {
                if (nyttVilkårResultat.id === annenVilkårResultat.id) {
                    return nyeVilkårResultater;
                }

                if (
                    vilkårHarSammeTypeOgOverlapperMinstEttSted(
                        nyttVilkårResultat,
                        annenVilkårResultat
                    )
                ) {
                    if (kanErstatte(nyttVilkårResultat.periode, annenVilkårResultat.periode)) {
                        return nyeVilkårResultater;
                    } else if (
                        kanSplitte(nyttVilkårResultat.periode, annenVilkårResultat.periode)
                    ) {
                        const nyFom = nyMoment(nyttVilkårResultat.periode.tom)
                            .add(1, 'day')
                            .format(datoformat.ISO_DAG);
                        const nyTom = nyMoment(nyttVilkårResultat.periode.fom)
                            .subtract(1, 'day')
                            .format(datoformat.ISO_DAG);

                        return [
                            ...nyeVilkårResultater,
                            {
                                ...annenVilkårResultat,
                                id: randomUUID(),
                                periode: nyPeriode(annenVilkårResultat.periode.fom, nyTom),
                            },
                            {
                                ...annenVilkårResultat,
                                id: randomUUID(),
                                periode: nyPeriode(nyFom, annenVilkårResultat.periode.tom),
                            },
                        ];
                    } else if (
                        kanFlytteFom(nyttVilkårResultat.periode, annenVilkårResultat.periode)
                    ) {
                        const nyFom = nyMoment(nyttVilkårResultat.periode.tom)
                            .add(1, 'day')
                            .format(datoformat.ISO_DAG);

                        return [
                            ...nyeVilkårResultater,
                            {
                                ...annenVilkårResultat,
                                id: randomUUID(),
                                periode: nyPeriode(nyFom, annenVilkårResultat.periode.tom),
                            },
                        ];
                    } else if (
                        kanFlytteTom(nyttVilkårResultat.periode, annenVilkårResultat.periode)
                    ) {
                        const nyTom = nyMoment(nyttVilkårResultat.periode.fom)
                            .subtract(1, 'day')
                            .format(datoformat.ISO_DAG);

                        return [
                            ...nyeVilkårResultater,
                            {
                                ...annenVilkårResultat,
                                id: randomUUID(),
                                periode: nyPeriode(annenVilkårResultat.periode.fom, nyTom),
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
            },
            []
        ),
        nyttVilkårResultat,
    ]);
};

const leggTilHvisIkkeFinnes = (
    vilkårForPerson: IVilkårResultat[],
    vilkårResultat: IVilkårResultat
): IVilkårResultat[] => {
    if (
        vilkårForPerson.find((vilkår: IVilkårResultat) => vilkår.id === vilkårResultat.id) ===
        undefined
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
    vilkårsvurderingForPerson: IVilkårResultat[],
    ikkeSlåSammenBegrunnelser?: boolean
): IVilkårResultat[] => {
    let sammenslåttPerioder: IVilkårResultat[] = [];
    let systemetHarVurdertSammenhengendePerioder = false;

    for (let i = 0; i < vilkårsvurderingForPerson.length; i++) {
        let fletteVilkår: IVilkårResultat = vilkårsvurderingForPerson[i];
        const nesteVilkår: IVilkårResultat | undefined = vilkårsvurderingForPerson[i + 1];

        // Hvis systemet nettopp har slått sammen 2 perioder setter vi forrige periode til fletteperioden
        if (systemetHarVurdertSammenhengendePerioder) {
            fletteVilkår = sammenslåttPerioder[sammenslåttPerioder.length - 1];
        }

        if (
            nesteVilkår &&
            fletteVilkår.vilkårType === nesteVilkår.vilkårType &&
            fletteVilkår.resultat === nesteVilkår.resultat
        ) {
            // Dersom systemet nettopp har slått sammen en periode popper vi denne slik at den ikke kommer med dobbelt.
            if (systemetHarVurdertSammenhengendePerioder) {
                sammenslåttPerioder.pop();
            }

            if (etterfølgende(fletteVilkår.periode, nesteVilkår.periode)) {
                // Periodene er etterfølgende og vi slår dem sammen. Tar med begge begrunnelsene.
                const sammenslåttVilkår = {
                    ...fletteVilkår,
                    id: randomUUID(),
                    periode: slåSammen(fletteVilkår.periode, nesteVilkår.periode),
                    begrunnelse: ikkeSlåSammenBegrunnelser
                        ? fletteVilkår.begrunnelse
                        : `${
                              !systemetHarVurdertSammenhengendePerioder
                                  ? `Systemet har slått sammen perioder!\n${periodeToString(
                                        fletteVilkår.periode
                                    )}:\n${fletteVilkår.begrunnelse}`
                                  : fletteVilkår.begrunnelse
                          }\n\n${periodeToString(nesteVilkår.periode)}:\n${
                              nesteVilkår.begrunnelse
                          }`,
                };

                sammenslåttPerioder.push(sammenslåttVilkår);
                systemetHarVurdertSammenhengendePerioder = true;
            } else if (
                ikkeEtterfølgendeOgHullPåOver1Måned(fletteVilkår.periode, nesteVilkår.periode)
            ) {
                // Periodene er ikke sammenhengende så vil legger til et aksjonspunkt som må vurderes
                const nyFom = nyMoment(fletteVilkår.periode.tom)
                    .add(1, 'day')
                    .format(datoformat.ISO_DAG);
                const nyTom = nyMoment(nesteVilkår.periode.fom)
                    .subtract(1, 'day')
                    .format(datoformat.ISO_DAG);

                sammenslåttPerioder = [
                    ...sammenslåttPerioder,
                    fletteVilkår,
                    {
                        vilkårType: fletteVilkår.vilkårType,
                        begrunnelse: '',
                        id: randomUUID(),
                        periode: nyPeriode(nyFom, nyTom),
                    },
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
    vilkårsvurdering: IPeriodeResultat[],
    personIdent: string,
    nyttVilkårResultat: IVilkårResultat
): IPeriodeResultat[] => {
    const vilkårsvurderingForPerson = vilkårsvurdering.find(
        (periodeResultat: IPeriodeResultat) => periodeResultat.personIdent === personIdent
    );

    if (!vilkårsvurderingForPerson) {
        throw new Error(`${vilkårsvurderingFeilmelding}. Finner ikke vilkår for part.`);
    }

    const sortertVilkårsvurderingForPerson: IVilkårResultat[] = sorterVilkårsvurderingForPerson(
        vilkårsvurderingForPerson.vilkårResultater
    );

    const nyVilkårsvurderingForPerson: IVilkårResultat[] = leggTilNyttVilkårIGjeldendeVilkårsvurdering(
        sortertVilkårsvurderingForPerson,
        nyttVilkårResultat
    );

    const sammenslåttVilkårsvurderingForPerson: IVilkårResultat[] = slåSammenVilkårForPerson(
        nyVilkårsvurderingForPerson,
        nyttVilkårResultat.vilkårType
    );

    return vilkårsvurdering.map((periodeResultat: IPeriodeResultat) => {
        if (periodeResultat.personIdent === personIdent) {
            return {
                ...periodeResultat,
                vilkårResultater: sammenslåttVilkårsvurderingForPerson,
            };
        } else {
            return periodeResultat;
        }
    });
};

export const hentVilkårsvurderingMedEkstraVilkår = (
    vilkårsvurdering: IPeriodeResultat[],
    personIdent: string,
    vilkårType: VilkårType
) => {
    return vilkårsvurdering.map((periodeResultat: IPeriodeResultat) => {
        if (periodeResultat.personIdent === personIdent) {
            return {
                ...periodeResultat,
                vilkårResultater: [
                    ...periodeResultat.vilkårResultater,
                    {
                        id: randomUUID(),
                        vilkårType,
                        periode: nyPeriode(),
                        begrunnelse: '',
                    },
                ],
            };
        } else {
            return periodeResultat;
        }
    });
};
