import { GroupType, ISelectOption } from '@navikt/familie-form-elements';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

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
import { VedtaksbegrunnelseTekster, VilkårType } from '../../../../../typer/vilkår';
import { IPeriode } from '../../../../../utils/kalender';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
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
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

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

    const leggTilBegrunnelserTilhørendeVedtakBegrunnelseType = (
        vilkårBegrunnelser: VedtaksbegrunnelseTekster
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
        vedtaksbegrunnelseTekster.status === RessursStatus.SUKSESS
            ? Object.keys(vedtaksbegrunnelseTekster.data)
                  .filter(begrunnelsetypeErTilknyttetVedtaksperiode)
                  .map(
                      leggTilBegrunnelserTilhørendeVedtakBegrunnelseType(
                          vedtaksbegrunnelseTekster.data
                      )
                  )
            : [];

    return { grupperteBegrunnelser, vedtaksbegrunnelseTekster };
};

export const mapBegrunnelserTilSelectOptions = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
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
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
) => {
    return vilkårBegrunnelser.status === RessursStatus.SUKSESS
        ? vilkårBegrunnelser.data[vedtakBegrunnelseType].find(
              (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                  restVedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelseSpesifikasjon
          )?.navn ?? ''
        : '';
};
