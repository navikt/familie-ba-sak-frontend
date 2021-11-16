import React, { Dispatch, SetStateAction, useState } from 'react';

import { ActionMeta, FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { FeltState } from '@navikt/familie-skjema';

import { useApp } from '../../../../context/AppContext';
import { IVilkårResultat, UtdypendeVilkårsvurdering } from '../../../../typer/vilkår';

interface Props {
    vilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    settVisFeilmeldingerForEttVilkår: Dispatch<SetStateAction<boolean>>;
    erLesevisning: boolean;
}

const erSkjønnsmessigVurdertOption = {
    label: 'Vurdering annet grunnlag',
    value: UtdypendeVilkårsvurdering.VURDERING_ANNET_GRUNNLAG,
};
const erMedlemskapVurdertOption = {
    label: 'Vurdert medlemskap',
    value: UtdypendeVilkårsvurdering.VURDERT_MEDLEMSKAP,
};

const erDeltBostedOption = {
    label: 'Delt bosted',
    value: UtdypendeVilkårsvurdering.DELT_BOSTED,
};

const utdypendeVilkårsvurderingOptions: ISelectOption[] = [
    erSkjønnsmessigVurdertOption,
    erMedlemskapVurdertOption,
    erDeltBostedOption,
];

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

const vilkårResultatTilSelectOptions = (vilkårResultat: IVilkårResultat): ISelectOption[] =>
    vilkårResultat.utdypendeVilkårsvurderinger.verdi.map(mapUtdypendeVilkårsvurderingTilOption);

const tømUtdypendeVilkårsvurderinger = (vilkårResultat: IVilkårResultat): IVilkårResultat => ({
    ...vilkårResultat,
    utdypendeVilkårsvurderinger: {
        ...vilkårResultat.utdypendeVilkårsvurderinger,
        verdi: [],
    },
});

function oppdaterUtdypendeVilkårsvurdering(
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
    vilkår,
    settRedigerbartVilkår,
    settVisFeilmeldingerForEttVilkår,
    erLesevisning,
}) => {
    const { toggles } = useApp();

    const håndterEndring = (action: ActionMeta<ISelectOption>) => {
        switch (action.action) {
            case 'select-option':
            case 'set-value':
                settRedigerbartVilkår({
                    ...vilkår,
                    verdi: oppdaterUtdypendeVilkårsvurdering(action, vilkår.verdi),
                });
                break;
            case 'deselect-option':
                settRedigerbartVilkår({
                    ...vilkår,
                    verdi: oppdaterUtdypendeVilkårsvurdering(action, vilkår.verdi),
                });
                break;
            case 'remove-value':
            case 'pop-value': {
                console.info(`popping: ${JSON.stringify(action)}`);
                settRedigerbartVilkår({
                    ...vilkår,
                    verdi: {
                        ...vilkår.verdi,
                        [action.removedValue?.value as string]: false,
                    },
                });
                break;
            }
            case 'clear':
                settRedigerbartVilkår({
                    ...vilkår,
                    verdi: tømUtdypendeVilkårsvurderinger(vilkår.verdi),
                });
                break;
            case 'create-option':
                break;
        }
    };

    return (
        <FamilieReactSelect
            id="UtdypendeVilkarsvurderingMultiselect"
            label="Utdypende vilkårsvurdering"
            value={vilkårResultatTilSelectOptions(vilkår.verdi)}
            placeholder={'Velg utdypende vilkårsvurdering(er)'}
            // feil={vilkår.feilmelding}
            creatable={false}
            erLesevisning={erLesevisning}
            isMulti
            onChange={(_, action: ActionMeta<ISelectOption>) => {
                håndterEndring(action);
            }}
            options={utdypendeVilkårsvurderingOptions}
        />
    );
};
