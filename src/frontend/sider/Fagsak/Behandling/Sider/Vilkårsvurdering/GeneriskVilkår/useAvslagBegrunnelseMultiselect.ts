import { useEffect, useState } from 'react';

import { byggTomRessurs, RessursStatus, type Ressurs } from '@navikt/familie-typer';

import { useBegrunnelseApi } from '../../../../../../api/useBegrunnelseApi';
import type { IRestVedtakBegrunnelseTilknyttetVilkår } from '../../../../../../typer/vedtak';
import { VedtakBegrunnelseType } from '../../../../../../typer/vedtak';
import type { AlleBegrunnelser, VilkårType } from '../../../../../../typer/vilkår';
import { Regelverk } from '../../../../../../typer/vilkår';

const useAvslagBegrunnelseMultiselect = (
    vilkårType: VilkårType,
    regelverk: Regelverk | null,
    gjelderInstitusjon: boolean
) => {
    const { hentAlleBegrunnelser } = useBegrunnelseApi();

    const [alleBegrunnelserRessurs, settAlleBegrunnelserRessurs] =
        useState<Ressurs<AlleBegrunnelser>>(byggTomRessurs());

    useEffect(() => {
        hentAlleBegrunnelser().then((data: Ressurs<AlleBegrunnelser>) => {
            settAlleBegrunnelserRessurs(data);
        });
    }, []);

    const finnAvslagsbegrunnelserForGjeldendeVilkår = () => {
        if (alleBegrunnelserRessurs.status !== RessursStatus.SUKSESS) {
            return [];
        }

        let begrunnelsestypeGyldigForBehandling;

        if (regelverk === Regelverk.EØS_FORORDNINGEN) {
            begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.EØS_AVSLAG;
        } else if (gjelderInstitusjon) {
            begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.INSTITUSJON_AVSLAG;
        } else {
            begrunnelsestypeGyldigForBehandling = VedtakBegrunnelseType.AVSLAG;
        }

        const avslagBegrunnelseTeksterForGjeldendeVilkår = alleBegrunnelserRessurs.data[
            begrunnelsestypeGyldigForBehandling
        ].filter(
            (begrunnelse: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                begrunnelse.vilkår === vilkårType
        );

        return avslagBegrunnelseTeksterForGjeldendeVilkår;
    };

    return {
        avslagsbegrunnelserForGjeldendeVilkår: finnAvslagsbegrunnelserForGjeldendeVilkår(),
        begrunnelserStatus: alleBegrunnelserRessurs.status,
    };
};

export default useAvslagBegrunnelseMultiselect;
