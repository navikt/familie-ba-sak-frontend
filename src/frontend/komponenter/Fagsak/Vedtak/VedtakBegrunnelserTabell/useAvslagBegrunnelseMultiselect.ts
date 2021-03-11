import React from 'react';

import { ISelectOption } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IPeriode } from '../../../../typer/periode';
import {
    IRestVedtakBegrunnelse,
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelseType,
} from '../../../../typer/vedtak';
import { VilkårType } from '../../../../typer/vilkår';

const useAvslagBegrunnelseMultiselect = (vilkårType: VilkårType, periode: IPeriode) => {
    const { vedtakBegrunnelser, vilkårBegrunnelser } = useVedtakBegrunnelser();

    const avslagBegrunnelseTeksterForGjeldendeVilkår =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? vilkårBegrunnelser.data.AVSLAG.filter(
                  (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                      begrunnelse.vilkår === vilkårType
              )
            : [];

    const tilhørerVilkår = (fastsattBegrunnelse: IRestVedtakBegrunnelse): boolean => {
        return (
            !!fastsattBegrunnelse.begrunnelse &&
            avslagBegrunnelseTeksterForGjeldendeVilkår
                .map((begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) => begrunnelse.id)
                .includes(fastsattBegrunnelse.begrunnelse)
        );
    };

    const fastsatteBegrunnelserForGjeldende = vedtakBegrunnelser.filter(
        (fastsattBegrunnelse: IRestVedtakBegrunnelse) => {
            return (
                tilhørerVilkår(fastsattBegrunnelse) &&
                fastsattBegrunnelse.begrunnelseType === VedtakBegrunnelseType.AVSLAG &&
                fastsattBegrunnelse.fom === periode.fom &&
                fastsattBegrunnelse.tom === periode.tom
            );
        }
    );
    const [valgteOptionsForPeriode, settValgteOptionsForPeriode] = React.useState<ISelectOption[]>(
        fastsatteBegrunnelserForGjeldende.map((valgtBegrunnelse: IRestVedtakBegrunnelse) => ({
            value: valgtBegrunnelse.begrunnelse?.toString() ?? '',
            label:
                avslagBegrunnelseTeksterForGjeldendeVilkår.find(
                    (
                        restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår
                    ) => restVedtakBegrunnelseTilknyttetVilkår.id === valgtBegrunnelse.begrunnelse
                )?.navn ?? '',
        }))
    );

    return {
        valgteOptionsForPeriode,
        settValgteOptionsForPeriode,
        avslagBegrunnelseTeksterForGjeldendeVilkår,
        fastsatteBegrunnelserForGjeldende,
    };
};

export default useAvslagBegrunnelseMultiselect;
