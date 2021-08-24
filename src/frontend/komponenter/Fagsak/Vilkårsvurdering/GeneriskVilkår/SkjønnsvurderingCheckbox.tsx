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

const SkjønnsvurderingCheckbox: React.FC<IProps> = ({
    redigerbartVilkår,
    settRedigerbartVilkår,
    settVisFeilmeldingerForEttVilkår,
}) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    return (
        <FamilieCheckbox
            erLesevisning={lesevisning}
            label={'Vurdering annet grunnlag'}
            checked={redigerbartVilkår.verdi.erSkjønnsmessigVurdert}
            onChange={() => {
                settRedigerbartVilkår({
                    ...redigerbartVilkår,
                    verdi: {
                        ...redigerbartVilkår.verdi,
                        erSkjønnsmessigVurdert: !redigerbartVilkår.verdi.erSkjønnsmessigVurdert,
                    },
                });
                settVisFeilmeldingerForEttVilkår(false);
            }}
        />
    );
};

export default SkjønnsvurderingCheckbox;
