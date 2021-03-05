import React from 'react';

import { FamilieReactSelect } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../../context/BehandlingContext';

interface IProps {
    visFeilmeldinger: boolean;
}

interface IOptionType {
    value: string;
    label: string;
}

const AvslagBegrunnelseMultiselect: React.FC<IProps> = ({ visFeilmeldinger }) => {
    const { erLesevisning } = useBehandling();

    const lagoptions = (): IOptionType[] => {
        return [];
    };
    return (
        <FamilieReactSelect
            label={'Begrunnelse(r) til vedtaksbrev'}
            creatable={true}
            placeholder={'Velg begrunnelse(r)'}
            erLesevisning={erLesevisning()}
            isMulti={true}
            onChange={valgteOptions => {
                console.log(valgteOptions);
                console.log(visFeilmeldinger);
            }}
            options={lagoptions()}
        />
    );
};
export default AvslagBegrunnelseMultiselect;
