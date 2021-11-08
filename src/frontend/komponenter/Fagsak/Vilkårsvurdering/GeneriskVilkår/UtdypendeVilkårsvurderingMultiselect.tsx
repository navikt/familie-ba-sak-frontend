import React, { Dispatch, SetStateAction } from 'react';

import { FeltState } from '@navikt/familie-skjema';

import { useApp } from '../../../../context/AppContext';
import { IVilkårResultat } from '../../../../typer/vilkår';
import {FamilieReactSelect} from "@navikt/familie-form-elements";

interface Props {
    vilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    settVisFeilmeldingerForEttVilkår: Dispatch<SetStateAction<boolean>>;
}

export const UtdypendeVilkårsvurderingMultiselect: React.FC<Props> = ({
    vilkår,
    settRedigerbartVilkår,
    settVisFeilmeldingerForEttVilkår,
}) => {
    const { toggles } = useApp();
    return (
        <div>
            Multiselect kommer...
            <div>asdf</div>
            <FamilieReactSelect label={}
        </div>
    );
};
