import type { ReactNode } from 'react';
import React, { useEffect } from 'react';

import styled from 'styled-components';

import type {
    ActionMeta,
    CSSObjectWithLabel,
    MultiValue,
    SingleValue,
} from '@navikt/familie-form-elements';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';

import type { OptionType } from '../../../../typer/common';
import type { PersonType } from '../../../../typer/person';
import type { IVilkårResultat, UtdypendeVilkårsvurdering } from '../../../../typer/vilkår';
import {
    Regelverk,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker,
    UtdypendeVilkårsvurderingEøsBarnBosattIRiket,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
} from '../../../../typer/vilkår';
import type { UtdypendeVilkårsvurderingAvhengigheter } from '../../../../utils/utdypendeVilkårsvurderinger';
import {
    bestemMuligeUtdypendeVilkårsvurderinger,
    fjernUmuligeAlternativerFraRedigerbartVilkår,
} from '../../../../utils/utdypendeVilkårsvurderinger';

interface Props {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    erLesevisning: boolean;
    personType: PersonType;
    feilhåndtering: ReactNode;
}

const utdypendeVilkårsvurderingTekst: Record<UtdypendeVilkårsvurdering, string> = {
    [UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG]: 'Vurdering annet grunnlag',
    [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP]: 'Vurdert medlemskap',
    [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED]: 'Delt bosted: skal deles',
    [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES]:
        'Delt bosted: skal ikke deles',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING]:
        'Søker omfattet av norsk lovgivning',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND]:
        'Søker omfattet av norsk lovgivning Utland',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING]:
        'Annen forelder omfattet av norsk lovgivning',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_NORGE]: 'Barn bor i Norge',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_EØS]: 'Barn bor i EØS-land',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_STORBRITANNIA]:
        'Barn bor i Storbritannia',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_NORGE_MED_SØKER]:
        'Barn bor i Norge med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER]:
        'Barn bor i EØS-land med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_ANNEN_FORELDER]:
        'Barn bor i EØS-land med annen forelder (EFTA)',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_SØKER]:
        'Barn bor i Storbritannia med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER]:
        'Barn bor i Storbritannia med annen forelder (EFTA)',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_ALENE_I_ANNET_EØS_LAND]:
        'Barn bor alene i annet EØS-land',
};

const StyledFamilieReactSelect = styled(FamilieReactSelect)`
    margin-top: 0.75rem;
`;

const mapUtdypendeVilkårsvurderingTilOption = (
    utdypendeVilkårsvurdering: UtdypendeVilkårsvurdering
): OptionType => ({
    value: utdypendeVilkårsvurdering,
    label: utdypendeVilkårsvurderingTekst[utdypendeVilkårsvurdering],
});
const mapOptionTilUtdypendeVilkårsvurdering = (option: OptionType): UtdypendeVilkårsvurdering =>
    option.value as UtdypendeVilkårsvurdering;

const tømUtdypendeVilkårsvurderinger = (vilkårResultat: IVilkårResultat): IVilkårResultat => ({
    ...vilkårResultat,
    utdypendeVilkårsvurderinger: {
        ...vilkårResultat.utdypendeVilkårsvurderinger,
        verdi: [],
    },
});

function mapOgLeggTilUtdypendeVilkårsvurdering(
    action: ActionMeta<OptionType>,
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
    erLesevisning,
    personType,
    feilhåndtering,
}) => {
    const utdypendeVilkårsvurderingAvhengigheter: UtdypendeVilkårsvurderingAvhengigheter = {
        personType,
        vilkårType: redigerbartVilkår.verdi.vilkårType,
        resultat: redigerbartVilkår.verdi.resultat.verdi,
        vurderesEtter: redigerbartVilkår.verdi.vurderesEtter,
    };

    const muligeUtdypendeVilkårsvurderinger = bestemMuligeUtdypendeVilkårsvurderinger(
        utdypendeVilkårsvurderingAvhengigheter
    );

    useEffect(() => {
        fjernUmuligeAlternativerFraRedigerbartVilkår(
            validerOgSettRedigerbartVilkår,
            redigerbartVilkår,
            muligeUtdypendeVilkårsvurderinger
        );
    }, [redigerbartVilkår, utdypendeVilkårsvurderingAvhengigheter]);

    const håndterEndring = (action: ActionMeta<OptionType>) => {
        switch (action.action) {
            case 'select-option':
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
        <StyledFamilieReactSelect
            id="UtdypendeVilkarsvurderingMultiselect"
            label={
                redigerbartVilkår.verdi.vurderesEtter === Regelverk.NASJONALE_REGLER
                    ? 'Utdypende vilkårsvurdering (valgfri)'
                    : 'Utdypende vilkårsvurdering'
            }
            value={redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi.map(
                mapUtdypendeVilkårsvurderingTilOption
            )}
            propSelectStyles={{
                menu: (provided: CSSObjectWithLabel) => ({
                    ...provided,
                    zIndex: 3,
                }),
            }}
            creatable={false}
            erLesevisning={erLesevisning}
            isMulti
            onChange={(
                _: MultiValue<OptionType> | SingleValue<OptionType>,
                action: ActionMeta<OptionType>
            ) => {
                håndterEndring(action);
            }}
            options={muligeUtdypendeVilkårsvurderinger.map(mapUtdypendeVilkårsvurderingTilOption)}
            feil={feilhåndtering}
        />
    );
};
