import { GenererteBrevbegrunnelser } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/GenererteBrevbegrunnelser';
import { skalViseFritekstbegrunnelser, Vedtaksperiodetype } from '@typer/vedtaksperiode';

import { VStack } from '@navikt/ds-react';

import { BegrunnelserMultiselect } from './BegrunnelserMultiselect';
import { EkspanderbarVedtaksperiode } from './EkspanderbarVedtaksperiode';
import { Fritekstbegrunnelser } from './Fritekstbegrunnelser';
import { Utbetalingsresultat } from './Utbetalingsresultat';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';

export function Vedtaksperiode() {
    const { vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();

    return (
        <EkspanderbarVedtaksperiode>
            <VStack gap={'space-20'}>
                {vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.length !== 0 && <Utbetalingsresultat />}
                {vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.AVSLAG && <BegrunnelserMultiselect />}
                <GenererteBrevbegrunnelser />
                {skalViseFritekstbegrunnelser(vedtaksperiodeMedBegrunnelser) && <Fritekstbegrunnelser />}
            </VStack>
        </EkspanderbarVedtaksperiode>
    );
}
