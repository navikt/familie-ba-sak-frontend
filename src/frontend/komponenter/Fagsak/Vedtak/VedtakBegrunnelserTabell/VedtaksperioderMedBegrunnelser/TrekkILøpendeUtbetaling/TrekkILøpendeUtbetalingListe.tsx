import React from 'react';

import styled from 'styled-components';

import { Heading, HelpText } from '@navikt/ds-react';

import type { IBehandling } from '../../../../../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../typer/vedtaksperiode';
import { VedtaksperiodeMedBegrunnelserProvider } from '../../Context/VedtaksperiodeMedBegrunnelserContext';
import TrekkILøpendeUtbetalingPanel from './TrekkILøpendeUtbetalingPanel';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-top: 1rem;
`;

const StyledHelpText = styled(HelpText)`
    margin-top: 0.1rem;
    margin-left: 0.6rem;

    & + .navds-popover {
        max-width: 20rem;
    }
`;

export const TrekkILøpendeUtbetalingListe: React.FC<{
    trekkILøpendeUtbetalinger: IVedtaksperiodeMedBegrunnelser[];
    overskrift: string;
    hjelpetekst: string;
    åpenBehandling: IBehandling;
}> = ({ trekkILøpendeUtbetalinger, overskrift, hjelpetekst, åpenBehandling }) => {
    if (trekkILøpendeUtbetalinger.length === 0) {
        return <></>;
    }

    return (
        <>
            <StyledHeading level="2" size="small" spacing>
                {overskrift}
                <StyledHelpText placement="right">{hjelpetekst}</StyledHelpText>
            </StyledHeading>
            {trekkILøpendeUtbetalinger.map(
                (trekkILøpendeUtbetaling: IVedtaksperiodeMedBegrunnelser) => (
                    <VedtaksperiodeMedBegrunnelserProvider
                        key={trekkILøpendeUtbetaling.id}
                        åpenBehandling={åpenBehandling}
                        vedtaksperiodeMedBegrunnelser={trekkILøpendeUtbetaling}
                    >
                        <TrekkILøpendeUtbetalingPanel
                            vedtaksperiodeMedBegrunnelser={trekkILøpendeUtbetaling}
                        />
                    </VedtaksperiodeMedBegrunnelserProvider>
                )
            )}
        </>
    );
};
