import React from 'react';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { FeltState } from '@navikt/familie-skjema';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { IVilkårResultat } from '../../../../typer/vilkår';

interface IProps {
    redigerbartVilkår: FeltState<IVilkårResultat>;
    settRedigerbartVilkår: (redigerbartVilkår: FeltState<IVilkårResultat>) => void;
    settVisFeilmeldingerForEttVilkår: (visFeilmeldinger: boolean) => void;
}

const MedlemskapCheckbox: React.FC<IProps> = ({
    redigerbartVilkår,
    settRedigerbartVilkår,
    settVisFeilmeldingerForEttVilkår,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    return (
        <FamilieCheckbox
            erLesevisning={lesevisning}
            label={'Vurdert medlemskap'}
            checked={redigerbartVilkår.verdi.erMedlemskapVurdert}
            onChange={() => {
                settRedigerbartVilkår({
                    ...redigerbartVilkår,
                    verdi: {
                        ...redigerbartVilkår.verdi,
                        erMedlemskapVurdert: !redigerbartVilkår.verdi.erMedlemskapVurdert,
                    },
                });
                settVisFeilmeldingerForEttVilkår(false);
            }}
        />
    );
};

export default MedlemskapCheckbox;
