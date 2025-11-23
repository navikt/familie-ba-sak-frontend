import type { ReactNode } from 'react';
import React, { useEffect } from 'react';

import { UNSAFE_Combobox } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import { useAppContext } from '../../../../../../context/AppContext';
import type { OptionType } from '../../../../../../typer/common';
import type { PersonType } from '../../../../../../typer/person';
import { ToggleNavn } from '../../../../../../typer/toggles';
import {
    type IVilkårResultat,
    Regelverk,
    type UtdypendeVilkårsvurdering,
    UtdypendeVilkårsvurderingDeltBosted,
    UtdypendeVilkårsvurderingEøsBarnBorMedSøker,
    UtdypendeVilkårsvurderingEøsBarnBosattIRiket,
    UtdypendeVilkårsvurderingEøsSøkerBosattIRiket,
    UtdypendeVilkårsvurderingGenerell,
    UtdypendeVilkårsvurderingNasjonal,
} from '../../../../../../typer/vilkår';
import type { UtdypendeVilkårsvurderingAvhengigheter } from '../../../../../../utils/utdypendeVilkårsvurderinger';
import {
    bestemMuligeUtdypendeVilkårsvurderinger,
    fjernUmuligeAlternativerFraRedigerbartVilkår,
} from '../../../../../../utils/utdypendeVilkårsvurderinger';

interface Props {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    validerOgSettRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    erLesevisning: boolean;
    personType: PersonType;
    feilhåndtering: ReactNode;
}

const utdypendeVilkårsvurderingTekst: Record<UtdypendeVilkårsvurdering, string> = {
    [UtdypendeVilkårsvurderingGenerell.VURDERING_ANNET_GRUNNLAG]: 'Vurdering annet grunnlag',
    [UtdypendeVilkårsvurderingGenerell.BOSATT_PÅ_SVALBARD]: 'Bosatt på Svalbard',
    [UtdypendeVilkårsvurderingGenerell.BOSATT_I_FINNMARK_NORD_TROMS]: 'Bosatt i Finnmark/Nord-Troms',
    [UtdypendeVilkårsvurderingNasjonal.VURDERT_MEDLEMSKAP]: 'Vurdert medlemskap',
    [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED]: 'Delt bosted: skal deles',
    [UtdypendeVilkårsvurderingDeltBosted.DELT_BOSTED_SKAL_IKKE_DELES]: 'Delt bosted: skal ikke deles',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING]: 'Søker omfattet av norsk lovgivning',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.OMFATTET_AV_NORSK_LOVGIVNING_UTLAND]:
        'Søker omfattet av norsk lovgivning Utland',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.ANNEN_FORELDER_OMFATTET_AV_NORSK_LOVGIVNING]:
        'Annen forelder omfattet av norsk lovgivning',
    [UtdypendeVilkårsvurderingEøsSøkerBosattIRiket.SØKER_OMFATTET_AV_UTENLANDSK_LOVGIVNING_BOSATT_I_NORGE]:
        'Søker omfattet av utenlandsk lovgivning – bosatt i Norge',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_NORGE]: 'Barn bor i Norge',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_EØS]: 'Barn bor i EØS-land',
    [UtdypendeVilkårsvurderingEøsBarnBosattIRiket.BARN_BOR_I_STORBRITANNIA]: 'Barn bor i Storbritannia',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_NORGE_MED_SØKER]: 'Barn bor i Norge med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_SØKER]: 'Barn bor i EØS-land med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_EØS_MED_ANNEN_FORELDER]:
        'Barn bor i EØS-land med annen forelder (EFTA)',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_SØKER]:
        'Barn bor i Storbritannia med søker',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_I_STORBRITANNIA_MED_ANNEN_FORELDER]:
        'Barn bor i Storbritannia med annen forelder (EFTA)',
    [UtdypendeVilkårsvurderingEøsBarnBorMedSøker.BARN_BOR_ALENE_I_ANNET_EØS_LAND]: 'Barn bor alene i annet EØS-land',
};

const mapUtdypendeVilkårsvurderingTilOption = (utdypendeVilkårsvurdering: UtdypendeVilkårsvurdering): OptionType => ({
    value: utdypendeVilkårsvurdering,
    label: utdypendeVilkårsvurderingTekst[utdypendeVilkårsvurdering],
});
const mapOptionTilUtdypendeVilkårsvurdering = (option: OptionType): UtdypendeVilkårsvurdering =>
    option.value as UtdypendeVilkårsvurdering;

function mapOgLeggTilUtdypendeVilkårsvurdering(option: OptionType, vilkår: IVilkårResultat): IVilkårResultat {
    return option
        ? {
              ...vilkår,
              utdypendeVilkårsvurderinger: {
                  ...vilkår.utdypendeVilkårsvurderinger,
                  verdi: [...vilkår.utdypendeVilkårsvurderinger.verdi, mapOptionTilUtdypendeVilkårsvurdering(option)],
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
    const { toggles } = useAppContext();

    const utdypendeVilkårsvurderingAvhengigheter: UtdypendeVilkårsvurderingAvhengigheter = {
        personType,
        vilkårType: redigerbartVilkår.verdi.vilkårType,
        resultat: redigerbartVilkår.verdi.resultat.verdi,
        vurderesEtter: redigerbartVilkår.verdi.vurderesEtter,
    };

    const bosattFinnmarkNordtromsToggleErPå = toggles[ToggleNavn.bosattFinnmarkNordtroms];

    const muligeUtdypendeVilkårsvurderinger = bestemMuligeUtdypendeVilkårsvurderinger(
        utdypendeVilkårsvurderingAvhengigheter
    ).filter(
        utdypendeVilkårsvurdering =>
            bosattFinnmarkNordtromsToggleErPå ||
            utdypendeVilkårsvurdering !== UtdypendeVilkårsvurderingGenerell.BOSATT_I_FINNMARK_NORD_TROMS
    );

    const muligeComboboxValg = muligeUtdypendeVilkårsvurderinger.map(mapUtdypendeVilkårsvurderingTilOption);

    useEffect(() => {
        fjernUmuligeAlternativerFraRedigerbartVilkår(
            validerOgSettRedigerbartVilkår,
            redigerbartVilkår,
            muligeUtdypendeVilkårsvurderinger
        );
    }, [redigerbartVilkår, utdypendeVilkårsvurderingAvhengigheter]);

    const håndterEndring = (optionValue: string, isSelected: boolean) => {
        if (isSelected) {
            const nyttValg = muligeComboboxValg.find(valg => valg.value === optionValue);
            if (nyttValg) {
                validerOgSettRedigerbartVilkår({
                    ...redigerbartVilkår,
                    verdi: mapOgLeggTilUtdypendeVilkårsvurdering(nyttValg, redigerbartVilkår.verdi),
                });
            }
        } else {
            validerOgSettRedigerbartVilkår({
                ...redigerbartVilkår,
                verdi: {
                    ...redigerbartVilkår.verdi,
                    utdypendeVilkårsvurderinger: {
                        ...redigerbartVilkår.verdi.utdypendeVilkårsvurderinger,
                        verdi: [...redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi].filter(
                            e => e !== optionValue
                        ),
                    },
                },
            });
        }
    };

    if (muligeUtdypendeVilkårsvurderinger.length === 0) {
        return null;
    }

    return (
        <UNSAFE_Combobox
            label={
                redigerbartVilkår.verdi.vurderesEtter === Regelverk.NASJONALE_REGLER
                    ? 'Utdypende vilkårsvurdering (valgfri)'
                    : 'Utdypende vilkårsvurdering'
            }
            options={muligeComboboxValg}
            error={feilhåndtering}
            isMultiSelect
            readOnly={erLesevisning}
            selectedOptions={redigerbartVilkår.verdi.utdypendeVilkårsvurderinger.verdi.map(
                mapUtdypendeVilkårsvurderingTilOption
            )}
            onToggleSelected={håndterEndring}
        />
    );
};
