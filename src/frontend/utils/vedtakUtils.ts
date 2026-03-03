import {
    BgAccentSoft,
    BgDangerSoft,
    BgNeutralSoft,
    BgSuccessSoft,
    BgWarningSoft,
    BorderDanger,
    BorderNeutral,
    BorderNeutralSubtle,
    BorderSuccess,
    BorderWarning,
} from '@navikt/ds-tokens/dist/tokens';

import { BehandlingResultat } from '../typer/behandling';
import type { IRestVedtakBegrunnelseTilknyttetVilkår, VedtakBegrunnelse } from '../typer/vedtak';
import { VedtakBegrunnelseType } from '../typer/vedtak';
import type { AlleBegrunnelser } from '../typer/vilkår';

export const finnVedtakBegrunnelseType = (
    alleBegrunnelser: AlleBegrunnelser,
    vedtakBegrunnelse: VedtakBegrunnelse
): VedtakBegrunnelseType | undefined => {
    return Object.keys(alleBegrunnelser).find(vedtakBegrunnelseType => {
        return (
            alleBegrunnelser[vedtakBegrunnelseType as VedtakBegrunnelseType].find(
                (vedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                    vedtakBegrunnelseTilknyttetVilkår.id === vedtakBegrunnelse
            ) !== undefined
        );
    }) as VedtakBegrunnelseType;
};

export const hentBakgrunnsfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
    switch (vedtakBegrunnelseType) {
        case VedtakBegrunnelseType.INNVILGET:
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_FORTSATT_INNVILGET:
            return BgSuccessSoft;
        case VedtakBegrunnelseType.AVSLAG:
        case VedtakBegrunnelseType.INSTITUSJON_AVSLAG:
            return BgDangerSoft;
        case VedtakBegrunnelseType.REDUKSJON:
        case VedtakBegrunnelseType.INSTITUSJON_REDUKSJON:
            return BgWarningSoft;
        case VedtakBegrunnelseType.OPPHØR:
        case VedtakBegrunnelseType.INSTITUSJON_OPPHØR:
            return BgNeutralSoft;
        default:
            return BgAccentSoft;
    }
};

export const hentBorderfarge = (vedtakBegrunnelseType?: VedtakBegrunnelseType) => {
    switch (vedtakBegrunnelseType) {
        case VedtakBegrunnelseType.INNVILGET:
        case VedtakBegrunnelseType.FORTSATT_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_INNVILGET:
        case VedtakBegrunnelseType.INSTITUSJON_FORTSATT_INNVILGET:
            return BorderSuccess;
        case VedtakBegrunnelseType.AVSLAG:
        case VedtakBegrunnelseType.INSTITUSJON_AVSLAG:
            return BorderDanger;
        case VedtakBegrunnelseType.REDUKSJON:
        case VedtakBegrunnelseType.INSTITUSJON_REDUKSJON:
            return BorderWarning;
        case VedtakBegrunnelseType.OPPHØR:
        case VedtakBegrunnelseType.INSTITUSJON_OPPHØR:
            return BorderNeutral;
        default:
            return BorderNeutralSubtle;
    }
};

export const vedtakHarFortsattUtbetaling = (behandlingResultat: BehandlingResultat) =>
    [
        BehandlingResultat.INNVILGET,
        BehandlingResultat.INNVILGET_OG_OPPHØRT,
        BehandlingResultat.INNVILGET_OG_ENDRET,
        BehandlingResultat.INNVILGET_ENDRET_OG_OPPHØRT,
        BehandlingResultat.ENDRET_OG_FORTSATT_INNVILGET,
        BehandlingResultat.DELVIS_INNVILGET,
        BehandlingResultat.DELVIS_INNVILGET_OG_OPPHØRT,
        BehandlingResultat.DELVIS_INNVILGET_OG_ENDRET,
        BehandlingResultat.DELVIS_INNVILGET_ENDRET_OG_OPPHØRT,
        BehandlingResultat.AVSLÅTT_OG_ENDRET,
        BehandlingResultat.AVSLÅTT_ENDRET_OG_OPPHØRT,
        BehandlingResultat.ENDRET_UTBETALING,
        BehandlingResultat.ENDRET_OG_OPPHØRT,
        BehandlingResultat.FORTSATT_INNVILGET,
    ].includes(behandlingResultat);
