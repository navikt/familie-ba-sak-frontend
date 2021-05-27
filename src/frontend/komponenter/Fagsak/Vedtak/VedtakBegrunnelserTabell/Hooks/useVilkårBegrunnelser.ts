import React, { useEffect } from 'react';

import { GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { Ressurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { IBehandling } from '../../../../../typer/behandling';
import {
    VedtakBegrunnelseType,
    vedtakBegrunnelseTyper,
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
} from '../../../../../typer/vedtak';
import {
    IVedtaksperiodeMedBegrunnelser,
    IRestVedtaksbegrunnelse,
    Vedtaksperiodetype,
} from '../../../../../typer/vedtaksperiode';
import { Vilkårsbegrunnelser, VilkårType } from '../../../../../typer/vilkår';
import { IPeriode } from '../../../../../utils/kalender';
import { hentUtgjørendeVilkårImpl } from './useVedtakBegrunnelseMultiselect';

export const useVilkårBegrunnelser = ({
    vedtaksperiodeMedBegrunnelser,
    periode,
    åpenBehandling,
}: {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    periode: IPeriode;
    åpenBehandling: IBehandling;
}) => {
    const { request } = useHttp();

    const [vilkårBegrunnelser, settVilkårbegrunnelser] = React.useState<
        Ressurs<Vilkårsbegrunnelser>
    >(byggTomRessurs());

    useEffect(() => {
        hentVilkårBegrunnelseTekster();
    }, []);

    const vedtaksperiodeTilVedtakBegrunnelseTyper = () => {
        switch (vedtaksperiodeMedBegrunnelser.type) {
            case Vedtaksperiodetype.UTBETALING:
                return [VedtakBegrunnelseType.INNVILGELSE, VedtakBegrunnelseType.REDUKSJON];
            case Vedtaksperiodetype.FORTSATT_INNVILGET:
                return [VedtakBegrunnelseType.FORTSATT_INNVILGET];
            case Vedtaksperiodetype.OPPHØR:
                return [VedtakBegrunnelseType.OPPHØR];
            default:
                return [];
        }
    };

    const vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype = vedtaksperiodeTilVedtakBegrunnelseTyper();

    const hentUtgjørendeVilkår = (begrunnelseType: VedtakBegrunnelseType): VilkårType[] =>
        hentUtgjørendeVilkårImpl(begrunnelseType, åpenBehandling.personResultater, periode);

    const hentVilkårBegrunnelseTekster = () => {
        request<void, Vilkårsbegrunnelser>({
            method: 'GET',
            url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
            påvirkerSystemLaster: true,
        }).then((vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>) => {
            settVilkårbegrunnelser(vilkårBegrunnelser);
        });
    };

    const leggTilBegrunnelserTilhørendeVedtakBegrunnelseType = (
        vilkårBegrunnelser: Vilkårsbegrunnelser
    ) => {
        return (vedtakBegrunnelseType: string): GroupType<ISelectOption> => {
            const utgjørendeVilkårForPeriodeOgResultat: VilkårType[] = hentUtgjørendeVilkår(
                vedtakBegrunnelseType as VedtakBegrunnelseType
            );
            return {
                label: vedtakBegrunnelseTyper[vedtakBegrunnelseType as VedtakBegrunnelseType],
                options: vilkårBegrunnelser[vedtakBegrunnelseType as VedtakBegrunnelseType]
                    .filter(
                        erVilkårIVedtakBegrunnelseUtgjørendeForPeriodeOgResultat(
                            utgjørendeVilkårForPeriodeOgResultat
                        )
                    )
                    .map(restVedtakBegrunnelseTilknyttetVilkår => ({
                        label: restVedtakBegrunnelseTilknyttetVilkår.navn,
                        value: restVedtakBegrunnelseTilknyttetVilkår.id,
                    })),
            };
        };
    };

    const begrunnelsetypeErTilknyttetVedtaksperiode = (vedtakBegrunnelseType: string) =>
        vedtakBegrunnelseTyperKnyttetTilVedtaksperiodetype.includes(
            vedtakBegrunnelseType as VedtakBegrunnelseType
        );

    const erVilkårIVedtakBegrunnelseUtgjørendeForPeriodeOgResultat = (
        utgjørendeVilkårForPeriodeOgResultat: VilkårType[]
    ) => (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
        restVedtakBegrunnelseTilknyttetVilkår.vilkår
            ? utgjørendeVilkårForPeriodeOgResultat.includes(
                  restVedtakBegrunnelseTilknyttetVilkår.vilkår
              )
            : false;

    const grupperteBegrunnelser =
        vilkårBegrunnelser.status === RessursStatus.SUKSESS
            ? Object.keys(vilkårBegrunnelser.data)
                  .filter(begrunnelsetypeErTilknyttetVedtaksperiode)
                  .map(leggTilBegrunnelserTilhørendeVedtakBegrunnelseType(vilkårBegrunnelser.data))
            : [];

    return { grupperteBegrunnelser, vilkårBegrunnelser };
};

export const mapBegrunnelserTilSelectOptions = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>
): ISelectOption[] => {
    return vedtaksperiodeMedBegrunnelser.begrunnelser
        .filter(
            (begrunnelse: IRestVedtaksbegrunnelse) =>
                begrunnelse.vedtakBegrunnelseSpesifikasjon !==
                    VedtakBegrunnelse.REDUKSJON_FRITEKST &&
                begrunnelse.vedtakBegrunnelseSpesifikasjon !== VedtakBegrunnelse.AVSLAG_FRITEKST &&
                begrunnelse.vedtakBegrunnelseSpesifikasjon !== VedtakBegrunnelse.OPPHØR_FRITEKST &&
                begrunnelse.vedtakBegrunnelseSpesifikasjon !==
                    VedtakBegrunnelse.FORTSATT_INNVILGET_FRITEKST
        )
        .map((begrunnelse: IRestVedtaksbegrunnelse) => ({
            value: begrunnelse.vedtakBegrunnelseSpesifikasjon.toString(),
            label: hentLabelForOption(
                begrunnelse.vedtakBegrunnelseType,
                begrunnelse.vedtakBegrunnelseSpesifikasjon,
                vilkårBegrunnelser
            ),
        }));
};

const hentLabelForOption = (
    vedtakBegrunnelseType: VedtakBegrunnelseType,
    vedtakBegrunnelseSpesifikasjon: VedtakBegrunnelse,
    vilkårBegrunnelser: Ressurs<Vilkårsbegrunnelser>
) => {
    return vilkårBegrunnelser.status === RessursStatus.SUKSESS
        ? vilkårBegrunnelser.data[vedtakBegrunnelseType].find(
              (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                  restVedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelseSpesifikasjon
          )?.navn ?? ''
        : '';
};
