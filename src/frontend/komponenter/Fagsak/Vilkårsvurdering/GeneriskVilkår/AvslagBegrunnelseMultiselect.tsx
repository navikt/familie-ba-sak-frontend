import React from 'react';

import { FamilieReactSelect } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IRestVedtakBegrunnelseTilknyttetVilkår } from '../../../../typer/vedtak';
import { VilkårType } from '../../../../typer/vilkår';

interface IProps {
    visFeilmeldinger: boolean;
    vilkårType: VilkårType;
}

interface IOptionType {
    value: string;
    label: string;
}

const AvslagBegrunnelseMultiselect: React.FC<IProps> = ({ visFeilmeldinger, vilkårType }) => {
    const { erLesevisning } = useBehandling();
    const { vilkårBegrunnelser } = useVedtakBegrunnelser();

    const options: IOptionType[] =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? vilkårBegrunnelser.data.AVSLAG.filter(
                  (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                      begrunnelse.vilkår === vilkårType
              ).map((begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => ({
                  label: begrunnelse.navn,
                  value: begrunnelse.id,
              }))
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
