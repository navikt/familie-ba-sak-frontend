import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, CopyButton, Link, List } from '@navikt/ds-react';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { utledTekstTilModia } from './modiaStandardtekst';
import { SettBehandlingPåVentModalMotregning } from './SettBehandlingPåVentModalMotregning';
import type { IAvregningsperiode } from '../../../../../../typer/simulering';
import { erProd } from '../../../../../../utils/miljø';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const StyledAlert = styled(Alert)`
    width: fit-content;
`;

const StyledLink = styled(Link)`
    margin-top: 1rem;
`;

interface AvregningAlertProps {
    avregningsperioder: IAvregningsperiode[];
    harÅpenTilbakekrevingRessurs: Ressurs<boolean>;
}

const AvregningAlert = ({
    avregningsperioder,
    harÅpenTilbakekrevingRessurs,
}: AvregningAlertProps) => {
    const [visModal, settVisModal] = useState(false);
    const { behandling, vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();

    const modiaPersonoversiktUrl = erProd()
        ? 'https://modiapersonoversikt.intern.nav.no'
        : 'https://modiapersonoversikt.intern.dev.nav.no';

    return (
        <StyledAlert variant="warning">
            <BodyLong spacing>
                Denne saken inneholder både en etterbetaling og en feilutbetaling. Vi kan ikke
                automatisk avregne feilutbetalinger mot etterbetalinger.
            </BodyLong>
            <BodyLong>Du må derfor velge 1 eller 2:</BodyLong>
            <List as={'ol'}>
                <List.Item>
                    {harÅpenTilbakekrevingRessurs.status == RessursStatus.SUKSESS &&
                    harÅpenTilbakekrevingRessurs.data
                        ? 'Ferdigstille t-saken, og deretter gjøre nytt vedtak om etterbetaling'
                        : 'Først gjøre vedtak om etterbetalingen, og deretter gjøre nytt vedtak om feilutbetalingen og opprette t-sak («splitte saken»).'}
                </List.Item>
                <List.Item>
                    Be bruker om samtykke til å holde på etterbetalingen mens Nav vurderer t-sak
                    («ulovfestet motregning»). Hvis det ikke er åpenbart at hele beløpet skal kreves
                    tilbake, må du splitte saken.
                    <CopyButton
                        copyText={utledTekstTilModia(avregningsperioder)}
                        text="Kopier standardtekst til Modia"
                        activeText="Kopiert!"
                    />
                </List.Item>
            </List>
            {!erLesevisning && (
                <StyledLink
                    href={modiaPersonoversiktUrl}
                    target={'_blank'}
                    style={{ textDecoration: 'none' }}
                >
                    <Button
                        variant={'secondary-neutral'}
                        onClick={() => settVisModal(true)}
                        icon={<ExternalLinkIcon />}
                        iconPosition="right"
                    >
                        Be om samtykke fra bruker
                    </Button>
                </StyledLink>
            )}
            {visModal && (
                <SettBehandlingPåVentModalMotregning
                    lukkModal={() => settVisModal(false)}
                    behandling={behandling}
                />
            )}
        </StyledAlert>
    );
};

export default AvregningAlert;
