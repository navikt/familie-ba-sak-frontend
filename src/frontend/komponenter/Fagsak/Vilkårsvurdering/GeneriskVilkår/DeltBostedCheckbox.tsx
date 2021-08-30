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

const DeltBostedCheckbox: React.FC<IProps> = ({
    redigerbartVilkår,
    settRedigerbartVilkår,
    settVisFeilmeldingerForEttVilkår,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    return (
        <FamilieCheckbox
            erLesevisning={lesevisning}
            label={'Delt bosted'}
            checked={redigerbartVilkår.verdi.erDeltBosted}
            onChange={() => {
                settRedigerbartVilkår({
                    ...redigerbartVilkår,
                    verdi: {
                        ...redigerbartVilkår.verdi,
                        erDeltBosted: !redigerbartVilkår.verdi.erDeltBosted,
                    },
                });
                settVisFeilmeldingerForEttVilkår(false);
            }}
        />
    );
};

export default DeltBostedCheckbox;
