import React from 'react';

import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IRestVedtakBegrunnelseTilknyttetVilkår } from '../../../../typer/vedtak';

interface IProps {
    visFeilmeldinger: boolean;
}

interface IOptionType {
    value: string;
    label: string;
}

const AvslagBegrunnelseMultiselect: React.FC<IProps> = ({ visFeilmeldinger }) => {
    const { erLesevisning } = useBehandling();
    const { vilkårBegrunnelser } = useVedtakBegrunnelser();

    const options: IOptionType[] =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? vilkårBegrunnelser.data.AVSLAG.map(
                  (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => ({
                      label: begrunnelse.navn,
                      value: begrunnelse.id,
                  })
              )
            : [];

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
            options={options}
        />
    );
};
export default AvslagBegrunnelseMultiselect;
