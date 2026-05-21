import { useRef } from 'react';

import { GenererteBrevbegrunnelser } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/GenererteBrevbegrunnelser';
import { skalViseFritekstbegrunnelser, Vedtaksperiodetype } from '@typer/vedtaksperiode';

import { VStack } from '@navikt/ds-react';

import { BegrunnelserMultiselect, type StandardbegrunnelserHandlinger } from './BegrunnelserMultiselect';
import { EkspanderbarVedtaksperiode } from './EkspanderbarVedtaksperiode';
import { Fritekstbegrunnelser, type FritekstbegrunnelserHandlinger } from './Fritekstbegrunnelser';
import { Utbetalingsresultat } from './Utbetalingsresultat';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';

export function Vedtaksperiode() {
    const { vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();

    const imperativeBegrunnelserMultiselectRef = useRef<StandardbegrunnelserHandlinger>(null);
    const imperativeFritekstbegrunnelserRef = useRef<FritekstbegrunnelserHandlinger>(null);

    return (
        <EkspanderbarVedtaksperiode>
            <VStack gap={'space-20'}>
                {vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.length !== 0 && <Utbetalingsresultat />}
                {vedtaksperiodeMedBegrunnelser.type !== Vedtaksperiodetype.AVSLAG && (
                    <BegrunnelserMultiselect
                        imperativeRef={imperativeBegrunnelserMultiselectRef}
                        onSubmitSuccessful={() => {
                            imperativeFritekstbegrunnelserRef.current?.tilbakestillKombinertFritekstfeilmelding();
                        }}
                    />
                )}
                <GenererteBrevbegrunnelser />
                {skalViseFritekstbegrunnelser(vedtaksperiodeMedBegrunnelser) && (
                    <Fritekstbegrunnelser
                        imperativeRef={imperativeFritekstbegrunnelserRef}
                        onSubmitSuccessful={() => {
                            imperativeBegrunnelserMultiselectRef.current?.tilbakestillKombinertFritekstfeilmelding();
                        }}
                    />
                )}
            </VStack>
        </EkspanderbarVedtaksperiode>
    );
}
