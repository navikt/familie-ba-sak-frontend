import constate from 'constate';
import * as React from 'react';
import { IFelt, Valideringsstatus } from '../../typer/felt';
import { PersonType } from '../../typer/person';
import {
    IPersonResultat,
    IVilkårResultat,
    lagTomtFeltMedVilkår,
    VilkårType,
    IRestPersonResultat,
} from '../../typer/vilkår';
import { lagInitiellFelt } from '../../utils/validators';
import { kjørValidering, validerVilkår } from './validering';
import {
    hentVilkårsvurderingMedEkstraVilkår,
    lagNyVilkårsvurderingMedNyttVilkår,
    mapFraRestVilkårsvurderingTilUi,
    slåSammenVilkårForPerson,
} from './vilkårsvurdering';
import { IBehandling } from '../../typer/behandling';

interface IProps {
    åpenBehandling: IBehandling;
}

const [VilkårsvurderingProvider, useVilkårsvurdering] = constate(({ åpenBehandling }: IProps) => {
    const [vilkårsvurdering, settVilkårsvurdering] = React.useState<IPersonResultat[]>(
        åpenBehandling
            ? mapFraRestVilkårsvurderingTilUi(
                  åpenBehandling.personResultater,
                  åpenBehandling.personer
              ).sort((personResultat: IPersonResultat) =>
                  personResultat.person.type === PersonType.SØKER ? -1 : 1
              )
            : []
    );

    const settVilkårsvurderingFraApi = (personResultater: IRestPersonResultat[]) => {
        settVilkårsvurdering(
            åpenBehandling
                ? mapFraRestVilkårsvurderingTilUi(
                      personResultater,
                      åpenBehandling.personer
                  ).sort((personResultat: IPersonResultat) =>
                      personResultat.person.type === PersonType.SØKER ? -1 : 1
                  )
                : []
        );
    };

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
                                if (vilkårResultat.verdi.id !== parseInt(id, 10)) {
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
        settVilkårsvurderingFraApi,
        vilkårsvurdering,
    };
});

export { VilkårsvurderingProvider, useVilkårsvurdering };
