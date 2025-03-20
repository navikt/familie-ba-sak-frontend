import type { PropsWithChildren } from 'react';
import React from 'react';

import EkspanderbartBegrunnelsePanel from './EkspanderbartBegrunnelsePanel';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../../typer/vedtaksperiode';
import {
    hentVedtaksperiodeTittel,
    Vedtaksperiodetype,
} from '../../../../../../../typer/vedtaksperiode';
import { summer } from '../../../../../../../utils/formatter';

interface IEkspanderbartBegrunnelsePanelProps extends PropsWithChildren {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpen: boolean;
    onClick?: () => void;
}

const EkspanderbartVedtaksbegrunnelsePanel: React.FC<IEkspanderbartBegrunnelsePanelProps> = ({
    vedtaksperiodeMedBegrunnelser,
    åpen,
    onClick,
    children,
}) => {
    const periode = {
        fom: vedtaksperiodeMedBegrunnelser.fom,
        tom: vedtaksperiodeMedBegrunnelser.tom,
    };
    const skalViseSum =
        (vedtaksperiodeMedBegrunnelser.type === Vedtaksperiodetype.UTBETALING ||
            vedtaksperiodeMedBegrunnelser.type ===
                Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING) &&
        vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.length > 0;

    return (
        <EkspanderbartBegrunnelsePanel
            åpen={åpen}
            onClick={onClick}
            children={children}
            periode={periode}
            skalViseSum={skalViseSum}
            summer={() =>
                summer(
                    vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.map(
                        utbetalingsperiodeDetalj => utbetalingsperiodeDetalj.utbetaltPerMnd
                    )
                )
            }
            tittel={hentVedtaksperiodeTittel(vedtaksperiodeMedBegrunnelser)}
        />
    );
};

export default EkspanderbartVedtaksbegrunnelsePanel;
