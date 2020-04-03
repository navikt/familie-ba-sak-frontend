import * as React from 'react';

import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import {
    hentVilkårForPersoner,
    IPeriodeResultat,
    IVilkårResultat,
    VilkårType,
} from '../typer/vilkår';
import constate from 'constate';
import { randomUUID } from '../utils/commons';
import {
    nyPeriode,
    nyMoment,
    periodeToString,
    kanSplitte,
    kanFlytteFom,
    kanFlytteTom,
    etterfølgende,
    slåSammen,
    diff,
    overlapperMinstEttSted,
} from '../typer/periode';
import { datoformat } from '../utils/formatter';

interface IProps {
    fagsak: IFagsak;
}

const vilkårsvurderingFeilmelding = 'Feil i rekonstruksjon av vilkårsvurdering for part';

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ fagsak }: IProps) => {
    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);
    const [periodeResultater, settPeriodeResultater] = React.useState<IPeriodeResultat[]>(
        hentVilkårForPersoner(aktivBehandling?.personer)
    );

    const vilkårHarSammeTypeOgOverlapperMinstEttSted = (
        nyttVilkårResultat: IVilkårResultat,
        annenVilkårResultat: IVilkårResultat
    ) => {
        return (
            annenVilkårResultat.vilkårType === nyttVilkårResultat.vilkårType &&
            overlapperMinstEttSted(nyttVilkårResultat.periode, annenVilkårResultat.periode)
        );
    };

    const settVilkårForPeriodeResultat = (
        personIdent: string,
        vilkårResultat: IVilkårResultat
    ): void => {
        const vilkårsvurderingForPerson = periodeResultater.find(
            (periodeResultat: IPeriodeResultat) => periodeResultat.personIdent === personIdent
        );

        if (!vilkårsvurderingForPerson) {
            throw new Error(`${vilkårsvurderingFeilmelding}. Finner ikke vilkår for part.`);
        }

        const sortertVilkårForPerson: IVilkårResultat[] = vilkårsvurderingForPerson.vilkårResultater.sort(
            (a, b) => a.vilkårType.localeCompare(b.vilkårType) || diff(a.periode, b.periode)
        );

        // Lag plass for ny vurdering
        const nyPeriodeResultat: IVilkårResultat[] = [
            ...sortertVilkårForPerson?.reduce(
                (nyeVilkårResultater: IVilkårResultat[], annenVilkårResultat: IVilkårResultat) => {
                    if (vilkårResultat.id === annenVilkårResultat.id) {
                        return nyeVilkårResultater;
                    }

                    if (
                        vilkårHarSammeTypeOgOverlapperMinstEttSted(
                            vilkårResultat,
                            annenVilkårResultat
                        )
                    ) {
                        if (kanSplitte(vilkårResultat.periode, annenVilkårResultat.periode)) {
                            const nyFom = nyMoment(vilkårResultat.periode.tom)
                                .add(1, 'day')
                                .format(datoformat.ISO_DAG);
                            const nyTom = nyMoment(vilkårResultat.periode.fom)
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
                            kanFlytteFom(vilkårResultat.periode, annenVilkårResultat.periode)
                        ) {
                            const nyFom = nyMoment(vilkårResultat.periode.tom)
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
                            kanFlytteTom(vilkårResultat.periode, annenVilkårResultat.periode)
                        ) {
                            const nyTom = nyMoment(vilkårResultat.periode.fom)
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
            vilkårResultat,
        ].sort((a, b) => {
            return a.vilkårType.localeCompare(b.vilkårType) || diff(a.periode, b.periode);
        });

        // Slå sammen perioder med samme vilkår type og resultat. Lager aksjonspunkter for hull i vilkårsvurdering.
        let sammenslåttPerioder: IVilkårResultat[] = [];
        let systemetHarVurdertSammenhengendePerioder = false;
        for (let i = 0; i < nyPeriodeResultat.length; i++) {
            const fletteVilkår: IVilkårResultat = nyPeriodeResultat[i];
            const nesteVilkår: IVilkårResultat | undefined = nyPeriodeResultat[i + 1];

            if (!nesteVilkår) {
                sammenslåttPerioder = [...sammenslåttPerioder, fletteVilkår];
            } else if (
                fletteVilkår.vilkårType === nesteVilkår.vilkårType &&
                fletteVilkår.resultat === nesteVilkår.resultat
            ) {
                if (!etterfølgende(fletteVilkår.periode, nesteVilkår.periode)) {
                    systemetHarVurdertSammenhengendePerioder = false;

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
                            vilkårType: vilkårResultat.vilkårType,
                            begrunnelse: '',
                            id: randomUUID(),
                            periode: nyPeriode(nyFom, nyTom),
                        },
                    ];
                } else if (etterfølgende(fletteVilkår.periode, nesteVilkår.periode)) {
                    // Periodene er etterfølgende og vi slår dem sammen. Tar med begge begrunnelsene. Hopper over neste vilkår.
                    sammenslåttPerioder = [
                        ...sammenslåttPerioder,
                        {
                            ...fletteVilkår,
                            id: randomUUID(),
                            periode: slåSammen(fletteVilkår.periode, nesteVilkår.periode),
                            begrunnelse: `${
                                !systemetHarVurdertSammenhengendePerioder
                                    ? 'Systemet har slått sammen perioder! Under ser du begrunnelsen tilknyttet de ulike periode.\n'
                                    : ''
                            }${periodeToString(fletteVilkår.periode)}:\n${
                                fletteVilkår.begrunnelse
                            }\n${periodeToString(nesteVilkår.periode)}:\n${
                                nesteVilkår.begrunnelse
                            }`,
                        },
                    ];

                    i++;
                    systemetHarVurdertSammenhengendePerioder = true;
                }
            } else {
                systemetHarVurdertSammenhengendePerioder = false;
                sammenslåttPerioder = [...sammenslåttPerioder, fletteVilkår];
            }
        }

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

    const leggTilVilkår = (personIdent: string) => {
        settPeriodeResultater(
            periodeResultater.map((periodeResultat: IPeriodeResultat) => {
                if (periodeResultat.personIdent === personIdent) {
                    return {
                        ...periodeResultat,
                        vilkårResultater: [
                            ...periodeResultat.vilkårResultater,
                            {
                                id: randomUUID(),
                                vilkårType: VilkårType.BOSATT_I_RIKET,
                                periode: nyPeriode(),
                                begrunnelse: '',
                            },
                        ],
                    };
                } else {
                    return periodeResultat;
                }
            })
        );
    };

    return {
        leggTilVilkår,
        periodeResultater,
        settPeriodeResultater,
        settVilkårForPeriodeResultat,
    };
});

export { VilkårsvurderingProvider, useVilkårsvurdering };
