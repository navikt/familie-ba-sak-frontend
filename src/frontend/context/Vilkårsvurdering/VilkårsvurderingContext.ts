import constate from 'constate';
import * as React from 'react';

import { IFagsak } from '../../typer/fagsak';
import {
    IPersonResultat,
    IVilkårResultat,
    VilkårType,
    lagTomtFeltMedVilkår,
} from '../../typer/vilkår';
import {
    lagNyVilkårsvurderingMedNyttVilkår,
    hentVilkårsvurderingMedEkstraVilkår,
    mapFraRestVilkårsvurderingTilUi,
    slåSammenVilkårForPerson,
} from './vilkårsvurdering';
import { hentAktivBehandlingPåFagsak } from '../../utils/fagsak';
import { kjørValidering, validerVilkår } from './validering';
import { Valideringsstatus, IFelt } from '../../typer/felt';
import { IBehandling } from '../../typer/behandling';
import { PersonType } from '../../typer/person';
import { lagInitiellFelt } from '../../utils/validators';

interface IProps {
    fagsak: IFagsak;
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ fagsak }: IProps) => {
    const aktivBehandling: IBehandling | undefined = hentAktivBehandlingPåFagsak(fagsak);

    const [vilkårsvurdering, settVilkårsvurdering] = React.useState<IPersonResultat[]>(
        aktivBehandling
            ? mapFraRestVilkårsvurderingTilUi(
                  aktivBehandling.personResultater,
                  aktivBehandling.personer
              ).sort((personResultat: IPersonResultat) =>
                  personResultat.person.type === PersonType.SØKER ? -1 : 1
              )
            : []
    );

    const settVilkårForPeriodeResultat = (
        personIdent: string,
        vilkårResultat: IFelt<IVilkårResultat>
    ): void => {
        settVilkårsvurdering(
            kjørValidering(
                lagNyVilkårsvurderingMedNyttVilkår(vilkårsvurdering, personIdent, vilkårResultat)
            )
        );
    };

    const leggTilVilkår = (personIdent: string, vilkårType: VilkårType): void => {
        settVilkårsvurdering(
            kjørValidering(
                hentVilkårsvurderingMedEkstraVilkår(vilkårsvurdering, personIdent, vilkårType)
            )
        );
    };

    const fjernEllerNullstillPeriodeForVilkår = (id: string) => {
        settVilkårsvurdering(
            vilkårsvurdering.map((personResultat: IPersonResultat) => {
                return {
                    ...personResultat,
                    vilkårResultater: slåSammenVilkårForPerson(
                        personResultat.vilkårResultater.reduce(
                            (
                                acc: IFelt<IVilkårResultat>[],
                                vilkårResultat: IFelt<IVilkårResultat>
                            ) => {
                                if (vilkårResultat.verdi.id !== id) {
                                    acc = [...acc, vilkårResultat];
                                } else {
                                    if (
                                        personResultat.vilkårResultater.filter(
                                            (filterVilkårResultat: IFelt<IVilkårResultat>) =>
                                                filterVilkårResultat.verdi.vilkårType ===
                                                vilkårResultat.verdi.vilkårType
                                        ).length === 1
                                    ) {
                                        acc = [
                                            ...acc,
                                            lagInitiellFelt(
                                                lagTomtFeltMedVilkår(
                                                    vilkårResultat.verdi.vilkårType
                                                ),
                                                validerVilkår
                                            ),
                                        ];
                                    }
                                }
                                return acc;
                            },
                            []
                        )
                    ),
                };
            })
        );
    };

    const erVilkårsvurderingenGyldig = (): boolean => {
        return (
            vilkårsvurdering.filter((personResultat: IPersonResultat) => {
                return (
                    personResultat.vilkårResultater.filter(
                        (vilkårResultat: IFelt<IVilkårResultat>) =>
                            vilkårResultat.valideringsstatus !== Valideringsstatus.OK
                    ).length > 0
                );
            }).length === 0
        );
    };

    const hentVilkårMedFeil = (): IVilkårResultat[] => {
        return vilkårsvurdering.reduce(
            (accVilkårMedFeil: IVilkårResultat[], personResultat: IPersonResultat) => {
                return [
                    ...accVilkårMedFeil,
                    ...personResultat.vilkårResultater
                        .filter(
                            (vilkårResultat: IFelt<IVilkårResultat>) =>
                                vilkårResultat.valideringsstatus === Valideringsstatus.FEIL
                        )
                        .map((vilkårResultat: IFelt<IVilkårResultat>) => vilkårResultat.verdi),
                ];
            },
            []
        );
    };

    return {
        erVilkårsvurderingenGyldig,
        fjernEllerNullstillPeriodeForVilkår,
        hentVilkårMedFeil,
        leggTilVilkår,
        settVilkårForPeriodeResultat,
        settVilkårsvurdering,
        vilkårsvurdering,
    };
});

export { VilkårsvurderingProvider, useVilkårsvurdering };
