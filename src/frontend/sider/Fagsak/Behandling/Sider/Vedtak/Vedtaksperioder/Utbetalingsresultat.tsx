import { BodyShort, HStack, Label, VStack } from '@navikt/ds-react';
import { useVedtaksperiodeContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/VedtaksperiodeContext';
import { formaterBeløp, formaterIdent, sorterUtbetaling } from '@utils/formatter';

export function Utbetalingsresultat() {
    const { vedtaksperiodeMedBegrunnelser } = useVedtaksperiodeContext();
    return (
        <VStack gap={'space-4'}>
            <Label>Resultat</Label>
            {vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.sort(sorterUtbetaling).map((detalj, index) => (
                <HStack key={`${index}_${detalj.person.fødselsdato}`} gap={'space-28'}>
                    <BodyShort title={detalj.person.navn}>{formaterIdent(detalj.person.personIdent)}</BodyShort>
                    <BodyShort>{formaterBeløp(detalj.utbetaltPerMnd)}</BodyShort>
                </HStack>
            ))}
        </VStack>
    );
}
