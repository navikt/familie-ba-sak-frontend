import { useBehandling } from '@hooks/useBehandling';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';

import { BodyShort, Detail, VStack } from '@navikt/ds-react';

function formaterOpprettetTidspunkt(opprettetTidspunkt: string | undefined) {
    return isoStringTilFormatertString({
        isoString: opprettetTidspunkt,
        tilFormat: Datoformat.DATO_FORLENGET_MED_TID,
        defaultString: 'UKJENT OPPRETTELSESTIDSPUNKT',
    });
}

export function EgetVedtakInformasjon() {
    const behandling = useBehandling();

    const totrinnskontroll = behandling.totrinnskontroll;
    const totrinnskontrollSaksbehandler = totrinnskontroll?.saksbehandler ?? 'UKJENT SAKSBEHANDLER';
    const opprettetTidspunkt = totrinnskontroll?.opprettetTidspunkt;

    return (
        <VStack gap={'space-16'} marginBlock={'space-0 space-12'}>
            <div>
                <BodyShort>{formaterOpprettetTidspunkt(opprettetTidspunkt)}</BodyShort>
                <BodyShort>{totrinnskontrollSaksbehandler}</BodyShort>
            </div>
            <Detail>Vedtaket er sendt til godkjenning</Detail>
        </VStack>
    );
}
