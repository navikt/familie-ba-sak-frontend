import * as React from 'react';

import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { hentVilkårForPersoner, IPeriodeResultat, IVilkårResultat } from '../typer/vilkår';
import constate from 'constate';
import moment, { Moment } from 'moment';
import uuid from 'uuid';
import { randomUUID } from '../utils/commons';

interface IProps {
    fagsak: IFagsak;
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ fagsak }: IProps) => {
    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);
    const [periodeResultater, settPeriodeResultater] = React.useState<IPeriodeResultat[]>(
        hentVilkårForPersoner(aktivBehandling?.personer)
    );
    console.log(periodeResultater);

    const settVilkårForPeriodeResultat = (
        personIdent: string,
        vilkårResultat: IVilkårResultat
    ): void => {
        const kopiAvPeriodeResultater = [...periodeResultater];

        const gjeldendePeriodeResultat = periodeResultater.find(
            (periodeResultat: IPeriodeResultat) => periodeResultat.personIdent === personIdent
        );

        console.log(gjeldendePeriodeResultat?.vilkårResultater);

        const vilkårMedSammeTypeOgOverlappendePerioderUtenVilkåretSelv = gjeldendePeriodeResultat?.vilkårResultater
            .filter((filterVilkårResultat: IVilkårResultat) => {
                const nyFom = moment(vilkårResultat.periodeFom);
                const nyTom = moment(vilkårResultat.periodeTom);

                const gammelFom = moment(filterVilkårResultat.periodeFom);
                const gammelTom = moment(filterVilkårResultat.periodeTom);

                return (
                    filterVilkårResultat.vilkårType === vilkårResultat.vilkårType &&
                    filterVilkårResultat.id !== vilkårResultat.id &&
                    filterVilkåretOverlapperPåMinstEnMåte(nyFom, nyTom, gammelFom, gammelTom)
                );
            })
            .sort((a, b) => moment(a.periodeFom).diff(moment(b.periodeFom)));

        console.log(vilkårMedSammeTypeOgOverlappendePerioderUtenVilkåretSelv);

        let vilkårResultaterForVilkårType: IVilkårResultat[] = [];
        if (
            vilkårMedSammeTypeOgOverlappendePerioderUtenVilkåretSelv &&
            vilkårMedSammeTypeOgOverlappendePerioderUtenVilkåretSelv.length > 0
        ) {
            const c = vilkårMedSammeTypeOgOverlappendePerioderUtenVilkåretSelv?.reduce(
                (nyeVilkårResultater: IVilkårResultat[], reduceVilkårResultat: IVilkårResultat) => {
                    const nyFom = moment(vilkårResultat.periodeFom);
                    const nyTom = moment(vilkårResultat.periodeTom);

                    const gammelFom = moment(reduceVilkårResultat.periodeFom);
                    const gammelTom = moment(reduceVilkårResultat.periodeTom);

                    if (nyPeriodeSplitterGammelPeriode(nyFom, nyTom, gammelFom, gammelTom)) {
                        return [
                            ...nyeVilkårResultater,
                            {
                                ...reduceVilkårResultat,
                                periodeTom: vilkårResultat.periodeFom,
                            },
                            {
                                ...reduceVilkårResultat,
                                periodeFom: vilkårResultat.periodeTom,
                            },
                        ];
                    } else if (nyPeriodeOverlapperFom(nyFom, nyTom, gammelFom, gammelTom)) {
                        return [
                            ...nyeVilkårResultater,
                            {
                                ...reduceVilkårResultat,
                                periodeFom: vilkårResultat.periodeTom,
                            },
                        ];
                    } else if (nyPeriodeOverlapperTom(nyFom, nyTom, gammelFom, gammelTom)) {
                        return [
                            ...nyeVilkårResultater,
                            {
                                ...reduceVilkårResultat,
                                periodeTom: vilkårResultat.periodeFom,
                            },
                        ];
                    } else {
                        return [...nyeVilkårResultater, reduceVilkårResultat];
                    }
                },
                []
            );

            vilkårResultaterForVilkårType = [...c, vilkårResultat].sort((a, b) =>
                moment(a.periodeFom).diff(moment(b.periodeFom))
            );
        } else {
            console.log('test', gjeldendePeriodeResultat?.vilkårResultater);
            vilkårResultaterForVilkårType =
                gjeldendePeriodeResultat?.vilkårResultater.map(
                    (mapVilkårResultat: IVilkårResultat) => {
                        if (vilkårResultat.id === mapVilkårResultat.id) {
                            return vilkårResultat;
                        } else {
                            return mapVilkårResultat;
                        }
                    }
                ) ?? [];
        }

        console.log('vilkårResultaterForVilkårType', vilkårResultaterForVilkårType);

        let sammenslåttPerioder: IVilkårResultat[] = [];
        for (let i = 0; i < vilkårResultaterForVilkårType.length; i++) {
            const fletteVilkår: IVilkårResultat = vilkårResultaterForVilkårType[i];
            const nesteVilkår: IVilkårResultat | undefined = vilkårResultaterForVilkårType[i + 1];

            if (!nesteVilkår) {
                sammenslåttPerioder = [...sammenslåttPerioder, fletteVilkår];
            } else {
                if (fletteVilkår.periodeTom !== nesteVilkår.periodeFom) {
                    // Periodene er ikke sammenhengende så vil legger til et aksjonspunkt som må vurderes
                    sammenslåttPerioder = [
                        ...sammenslåttPerioder,
                        {
                            vilkårType: vilkårResultat.vilkårType,
                            begrunnelse: '',
                            id: randomUUID(),
                            periodeFom: fletteVilkår.periodeFom,
                            periodeTom: nesteVilkår.periodeTom,
                        },
                    ];
                } else if (fletteVilkår.resultat === nesteVilkår.resultat) {
                    // Periodene har samme resultat så vi slår de sammen
                    sammenslåttPerioder = [
                        ...sammenslåttPerioder,
                        {
                            ...fletteVilkår,
                            periodeFom: fletteVilkår.periodeFom,
                            periodeTom: nesteVilkår.periodeTom,
                        },
                    ];
                    i++;
                } else {
                    // Periodene har forskjellig resultat så vi legger til det nye vilkåret
                    sammenslåttPerioder = [...sammenslåttPerioder, fletteVilkår];
                }
            }
        }
        console.log('sammenslåttPerioder', sammenslåttPerioder);

        settPeriodeResultater(
            periodeResultater.map((periodeResultat: IPeriodeResultat) => {
                if (periodeResultat.personIdent === personIdent) {
                    return {
                        ...periodeResultat,
                        vilkårResultater: sammenslåttPerioder,
                    };
                } else {
                    return periodeResultat;
                }
            })
        );
    };

    return { periodeResultater, settPeriodeResultater, settVilkårForPeriodeResultat };
});

const førNyPeriode = (nyVilkårResultat: IVilkårResultat, tom: string): IVilkårResultat => ({
    ...nyVilkårResultat,
    periodeTom: tom,
});

const etterNyPeriode = (nyVilkårResultat: IVilkårResultat, fom: string): IVilkårResultat => ({
    ...nyVilkårResultat,
    periodeFom: fom,
});

const filterVilkåretOverlapperPåMinstEnMåte = (
    nyFom: Moment,
    nyTom: Moment,
    gammelFom: Moment,
    gammelTom: Moment
) => {
    return nyFom.isBetween(gammelFom, gammelTom) || nyTom.isBetween(gammelFom, gammelTom);
};

const nyPeriodeErstatterGammelPeriode = (
    nyFom: Moment,
    nyTom: Moment,
    gammelFom: Moment,
    gammelTom: Moment
) => {
    const val = nyFom.isBefore(gammelFom) && nyTom.isAfter(gammelTom);
    console.log('nyPeriodeErstatterGammelPeriode', val);
    return val;
};

const nyPeriodeSplitterGammelPeriode = (
    nyFom: Moment,
    nyTom: Moment,
    gammelFom: Moment,
    gammelTom: Moment
) => {
    const val = nyFom.isBetween(gammelFom, gammelTom) && nyTom.isBetween(gammelFom, gammelTom);
    console.log('nyPeriodeSplitterGammelPeriode', val);
    return val;
};

const nyPeriodeOverlapperFom = (
    nyFom: Moment,
    nyTom: Moment,
    gammelFom: Moment,
    gammelTom: Moment
) => {
    const val = nyFom.isBefore(gammelFom) && nyTom.isBetween(gammelFom, gammelTom);
    console.log('nyPeriodeOverlapperFom', val);
    return val;
};

const nyPeriodeOverlapperTom = (
    nyFom: Moment,
    nyTom: Moment,
    gammelFom: Moment,
    gammelTom: Moment
) => {
    const val = nyFom.isBetween(gammelFom, gammelTom) && nyTom.isAfter(gammelTom);
    console.log('nyPeriodeOverlapperTom', val);
    return val;
};

export { VilkårsvurderingProvider, useVilkårsvurdering };
