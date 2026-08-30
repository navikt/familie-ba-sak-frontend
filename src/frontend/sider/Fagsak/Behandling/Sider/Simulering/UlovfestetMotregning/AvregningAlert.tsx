import { useErLesevisning } from '@hooks/useErLesevisning';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, CopyButton, Link, List, LocalAlert } from '@navikt/ds-react';
import { useSimuleringContext } from '@sider/Fagsak/Behandling/Sider/Simulering/SimuleringContext';
import { SettBehandlingPåVentModalMotregning } from '@sider/Fagsak/Behandling/Sider/Simulering/UlovfestetMotregning/SettBehandlingPåVentModalMotregning';
import type { IAvregningsperiode } from '@typer/simulering';
import { erProd } from '@utils/miljø';
import { useState } from 'react';

import { utledTekstTilModia } from './modiaStandardtekst';

interface Props {
    avregningsperioder: IAvregningsperiode[];
}

export function AvregningAlert({ avregningsperioder }: Props) {
    const erLesevisning = useErLesevisning();

    const { harÅpenTilbakekreving } = useSimuleringContext();

    const [visModal, settVisModal] = useState(false);

    const modiaPersonoversiktUrl = erProd()
        ? 'https://modiapersonoversikt.intern.nav.no'
        : 'https://modiapersonoversikt.intern.dev.nav.no';

    return (
        <LocalAlert status="warning">
            <LocalAlert.Header>
                <LocalAlert.Title>Denne saken inneholder både en etterbetaling og en feilutbetaling.</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
                <BodyLong>Vi kan ikke automatisk avregne feilutbetalinger mot etterbetalinger.</BodyLong>
                <BodyLong>Du må derfor velge 1 eller 2:</BodyLong>
                <List as={'ol'}>
                    <List.Item>
                        {harÅpenTilbakekreving
                            ? 'Ferdigstille t-saken, og deretter gjøre nytt vedtak om etterbetaling'
                            : 'Først gjøre vedtak om etterbetalingen, og deretter gjøre nytt vedtak om feilutbetalingen og opprette t-sak («splitte saken»).'}
                    </List.Item>
                    <List.Item>
                        <BodyLong>
                            Be bruker om samtykke til å holde på etterbetalingen mens Nav vurderer t-sak («ulovfestet
                            motregning»). Hvis det ikke er åpenbart at hele beløpet skal kreves tilbake, må du splitte
                            saken.
                        </BodyLong>
                        <CopyButton
                            copyText={utledTekstTilModia(avregningsperioder)}
                            text="Kopier standardtekst til Modia"
                            activeText="Kopiert!"
                        />
                    </List.Item>
                </List>
                {!erLesevisning && (
                    <Box marginBlock={'space-16 space-0'}>
                        <Link href={modiaPersonoversiktUrl} target={'_blank'} style={{ textDecoration: 'none' }}>
                            <Button
                                variant={'primary'}
                                onClick={() => settVisModal(true)}
                                icon={<ExternalLinkIcon />}
                                iconPosition="right"
                            >
                                Be om samtykke fra bruker
                            </Button>
                        </Link>
                    </Box>
                )}
                {visModal && <SettBehandlingPåVentModalMotregning lukkModal={() => settVisModal(false)} />}
            </LocalAlert.Content>
        </LocalAlert>
    );
}
