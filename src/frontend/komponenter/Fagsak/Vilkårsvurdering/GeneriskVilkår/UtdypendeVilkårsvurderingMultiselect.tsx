import React, { Dispatch, SetStateAction, useState } from 'react';

import { ActionMeta, FamilieReactSelect, ISelectOption } from '@navikt/familie-form-elements';
import { FeltState } from '@navikt/familie-skjema';

import { useApp } from '../../../../context/AppContext';
import { IVilkårResultat } from '../../../../typer/vilkår';

interface Props {
    vilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    settVisFeilmeldingerForEttVilkår: Dispatch<SetStateAction<boolean>>;
    erLesevisning: boolean;
}

enum UtdypendeVilkårsvurderingOption {
    erSkjønnsmessigVurdert = 'erSkjønnsmessigVurdert',
    erMedlemskapVurdert = 'erMedlemskapVurdert',
    erDeltBosted = 'erDeltBosted',
}

const erSkjønnsmessigVurdertOption = {
    label: 'Vurdering annet grunnlag',
    value: UtdypendeVilkårsvurderingOption.erSkjønnsmessigVurdert,
};
const erMedlemskapVurdertOption = {
    label: 'Vurdert medlemskap',
    value: UtdypendeVilkårsvurderingOption.erMedlemskapVurdert,
};

const erDeltBostedOption = {
    label: 'Delt bosted',
    value: UtdypendeVilkårsvurderingOption.erDeltBosted,
};

const utdypendeVilkårsvurderingOptions: ISelectOption[] = [
    erSkjønnsmessigVurdertOption,
    erMedlemskapVurdertOption,
    erDeltBostedOption,
];

const vilkårResultatTilSelectOptions = (vilkårResultat: IVilkårResultat): ISelectOption[] => {
    return [
        ...(vilkårResultat.erSkjønnsmessigVurdert ? [erSkjønnsmessigVurdertOption] : []),
        ...(vilkårResultat.erMedlemskapVurdert ? [erMedlemskapVurdertOption] : []),
        ...(vilkårResultat.erDeltBosted ? [erDeltBostedOption] : []),
    ];
};

const tømUtdypendeVilkårsvurderinger = (vilkårResultat: IVilkårResultat): IVilkårResultat => ({
    ...vilkårResultat,
    erSkjønnsmessigVurdert: false,
    erMedlemskapVurdert: false,
    erDeltBosted: false,
});

function oppdaterUtdypendeVilkårsvurdering(
    action: ActionMeta<ISelectOption>,
    vilkår: IVilkårResultat,
    nyVerdi: boolean
) {
    const { option } = action;
    return {
        ...vilkår,
        [option?.value as string]: nyVerdi,
    };
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
                    verdi: oppdaterUtdypendeVilkårsvurdering(action, vilkår.verdi, true),
                });
                break;
            case 'deselect-option':
                settRedigerbartVilkår({
                    ...vilkår,
                    verdi: oppdaterUtdypendeVilkårsvurdering(action, vilkår.verdi, false),
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
