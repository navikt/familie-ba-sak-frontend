import React, { CSSProperties, useEffect } from 'react';

import { ActionMeta, FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { FeltState } from '@navikt/familie-skjema';

import { useApp } from '../../../../context/AppContext';
import { PersonType } from '../../../../typer/person';
import { ToggleNavn } from '../../../../typer/toggles';
import { IVilkårResultat, UtdypendeVilkårsvurdering } from '../../../../typer/vilkår';
import {
    bestemMuligeUtdypendeVilkårsvurderinger,
    UtdypendeVilkRsvurderingAvhengigheter,
} from '../../../../utils/utdypendeVilkårsvurderinger';
import { erUtdypendeVilkårsvurderingerGyldig } from '../../../../utils/validators';

interface Props {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    visFeilmeldinger: boolean;
    erLesevisning: boolean;
    personType: PersonType;
}

const utdypendeVilkårsvurderingTekst: Record<UtdypendeVilkårsvurdering, string> = {
    [UtdypendeVilkårsvurdering.VURDERING_ANNET_GRUNNLAG]: 'Vurdering annet grunnlag',
    [UtdypendeVilkårsvurdering.VURDERT_MEDLEMSKAP]: 'Vurdert medlemskap',
    [UtdypendeVilkårsvurdering.DELT_BOSTED]: 'Delt bosted',
};

const mapUtdypendeVilkårsvurderingTilOption = (
    utdypendeVilkårsvurdering: UtdypendeVilkårsvurdering
): ISelectOption => ({
    value: utdypendeVilkårsvurdering,
    label: utdypendeVilkårsvurderingTekst[utdypendeVilkårsvurdering],
});
const mapOptionTilUtdypendeVilkårsvurdering = (option: ISelectOption): UtdypendeVilkårsvurdering =>
    option.value as UtdypendeVilkårsvurdering;

const tømUtdypendeVilkårsvurderinger = (vilkårResultat: IVilkårResultat): IVilkårResultat => ({
    ...vilkårResultat,
    utdypendeVilkårsvurderinger: {
        ...vilkårResultat.utdypendeVilkårsvurderinger,
        verdi: [],
    },
});

function mapOgLeggTilUtdypendeVilkårsvurdering(
    action: ActionMeta<ISelectOption>,
    vilkår: IVilkårResultat
): IVilkårResultat {
    const { option } = action;
    return option
        ? {
              ...vilkår,
              utdypendeVilkårsvurderinger: {
                  ...vilkår.utdypendeVilkårsvurderinger,
                  verdi: [
                      ...vilkår.utdypendeVilkårsvurderinger.verdi,
                      mapOptionTilUtdypendeVilkårsvurdering(option),
                  ],
              },
          }
        : vilkår;
}

export const UtdypendeVilkårsvurderingMultiselect: React.FC<Props> = ({
    redigerbartVilkår,
    validerOgSettRedigerbartVilkår,
    visFeilmeldinger,
    erLesevisning,
    personType,
}) => {
    const { toggles } = useApp();

    const utdypendeVilkårsvurderingAvhengigheter: UtdypendeVilkRsvurderingAvhengigheter = {
        personType,
        vilkårType: redigerbartVilkår.verdi.vilkårType,
        resultat: redigerbartVilkår.verdi.resultat.verdi,
        vurderesEtter: redigerbartVilkår.verdi.vurderesEtter,
        brukErDeltBosted: toggles[ToggleNavn.brukErDeltBosted],
        brukEøs: toggles[ToggleNavn.brukEøs],
    };

    const muligeUtdypendeVilkårsvurderinger = bestemMuligeUtdypendeVilkårsvurderinger(
        utdypendeVilkårsvurderingAvhengigheter
    );

    useEffect(() => {
        if (
            !erUtdypendeVilkårsvurderingerGyldig(
                redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi,
                utdypendeVilkårsvurderingAvhengigheter
            )
        ) {
            validerOgSettRedigerbartVilkår({
                ...redigerbartVilkår,
                verdi: tømUtdypendeVilkårsvurderinger(redigerbartVilkår.verdi),
            });
        }
    }, [redigerbartVilkår, utdypendeVilkårsvurderingAvhengigheter]);

    const håndterEndring = (action: ActionMeta<ISelectOption>) => {
        switch (action.action) {
            case 'select-option':
            case 'set-value':
                validerOgSettRedigerbartVilkår({
                    ...redigerbartVilkår,
                    verdi: mapOgLeggTilUtdypendeVilkårsvurdering(action, redigerbartVilkår.verdi),
                });
                break;
            case 'deselect-option':
            case 'remove-value':
            case 'pop-value': {
                validerOgSettRedigerbartVilkår({
                    ...redigerbartVilkår,
                    verdi: {
                        ...redigerbartVilkår.verdi,
                        utdypendeVilkårsvurderinger: {
                            ...redigerbartVilkår.verdi.utdypendeVilkårsvurderinger,
                            verdi: [
                                ...redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi,
                            ].filter(e => e !== action.removedValue?.value),
                        },
                    },
                });
                break;
            }
            case 'clear':
                validerOgSettRedigerbartVilkår({
                    ...redigerbartVilkår,
                    verdi: tømUtdypendeVilkårsvurderinger(redigerbartVilkår.verdi),
                });
                break;
            case 'create-option':
                break;
        }
    };

    if (muligeUtdypendeVilkårsvurderinger.length === 0) {
        return null;
    }

    return (
        <FamilieReactSelect
            id="UtdypendeVilkarsvurderingMultiselect"
            label="Utdypende vilkårsvurdering"
            value={redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi.map(
                mapUtdypendeVilkårsvurderingTilOption
            )}
            placeholder={'Velg utdypende vilkårsvurdering(er)'}
            feil={
                visFeilmeldinger
                    ? redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.feilmelding
                    : undefined
            }
            propSelectStyles={{
                menu: (provided: CSSProperties) => ({
                    ...provided,
                    zIndex: '3',
                }),
            }}
            creatable={false}
            erLesevisning={erLesevisning}
            isMulti
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                håndterEndring(action);
            }}
            options={muligeUtdypendeVilkårsvurderinger.map(mapUtdypendeVilkårsvurderingTilOption)}
        />
    );
};
