import type { PersonType } from '@typer/person';
import type { VilkårType } from '@typer/vilkår';
import {
    filtrerUtUmuligeUtdypendeVilkårsvurderinger,
    type UtdypendeVilkårsvurderingAvhengigheter,
} from '@utils/utdypendeVilkårsvurderinger';
import { useFormContext } from 'react-hook-form';

import { tilResultat } from '../validering';
import { VilkårResultatFelt, type VilkårResultatFormValues } from './useVilkårResultatSkjema';

interface Props {
    personType: PersonType;
    vilkårType: VilkårType;
}

type Endring = Partial<Pick<UtdypendeVilkårsvurderingAvhengigheter, 'resultat' | 'vurderesEtter'>>;

export function useFjernUmuligeUtdypendeVilkårsvurderinger({ personType, vilkårType }: Props) {
    const { getValues, setValue } = useFormContext<VilkårResultatFormValues>();

    return (endring: Endring) => {
        const utdypendeVilkårsvurderinger = getValues(VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER);

        const muligeUtdypendeVilkårsvurderinger = filtrerUtUmuligeUtdypendeVilkårsvurderinger(
            utdypendeVilkårsvurderinger,
            {
                personType,
                vilkårType,
                resultat: tilResultat(getValues(VilkårResultatFelt.RESULTAT)),
                vurderesEtter: getValues(VilkårResultatFelt.VURDERES_ETTER),
                ...endring,
            }
        );

        if (muligeUtdypendeVilkårsvurderinger.length !== utdypendeVilkårsvurderinger.length) {
            setValue(VilkårResultatFelt.UTDYPENDE_VILKÅRSVURDERINGER, muligeUtdypendeVilkårsvurderinger, {
                shouldDirty: true,
            });
        }
    };
}
