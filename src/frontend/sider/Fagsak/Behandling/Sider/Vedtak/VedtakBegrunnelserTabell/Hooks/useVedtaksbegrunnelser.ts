import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { OptionType } from '../../../../../../../typer/common';
import type {
    IRestVedtakBegrunnelseTilknyttetVilkår,
    VedtakBegrunnelse,
} from '../../../../../../../typer/vedtak';
import type { VedtakBegrunnelseType } from '../../../../../../../typer/vedtak';
import type {
    IRestVedtaksbegrunnelse,
    IVedtaksperiodeMedBegrunnelser,
} from '../../../../../../../typer/vedtaksperiode';
import type { VedtaksbegrunnelseTekster } from '../../../../../../../typer/vilkår';

export const mapBegrunnelserTilSelectOptions = (
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser,
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
): OptionType[] => {
    return vedtaksperiodeMedBegrunnelser.begrunnelser.map(
        (begrunnelse: IRestVedtaksbegrunnelse) => ({
            value: begrunnelse.standardbegrunnelse.toString(),
            label: hentLabelForOption(
                begrunnelse.vedtakBegrunnelseType,
                begrunnelse.standardbegrunnelse,
                vilkårBegrunnelser
            ),
        })
    );
};

const hentLabelForOption = (
    vedtakBegrunnelseType: VedtakBegrunnelseType,
    standardbegrunnelse: VedtakBegrunnelse,
    vilkårBegrunnelser: Ressurs<VedtaksbegrunnelseTekster>
) => {
    return vilkårBegrunnelser.status === RessursStatus.SUKSESS
        ? (vilkårBegrunnelser.data[vedtakBegrunnelseType].find(
              (restVedtakBegrunnelseTilknyttetVilkår: IRestVedtakBegrunnelseTilknyttetVilkår) =>
                  restVedtakBegrunnelseTilknyttetVilkår.id === standardbegrunnelse
          )?.navn ?? '')
        : '';
};
