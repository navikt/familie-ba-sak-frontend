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
    vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[];
    overskrift: string;
    hjelpetekst: string;
    åpenBehandling: IBehandling;
}> = ({ vedtaksperioderMedBegrunnelser, overskrift, hjelpetekst, åpenBehandling }) => {
    if (vedtaksperioderMedBegrunnelser.length === 0) {
        return <></>;
    }

    return (
        <>
            <StyledHeading level="2" size="small" spacing>
                {overskrift}
                <StyledHelpText placement="right">{hjelpetekst}</StyledHelpText>
            </StyledHeading>
            {vedtaksperioderMedBegrunnelser.map(
                (vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser) => (
                    <VedtaksperiodeMedBegrunnelserProvider
                        key={vedtaksperiodeMedBegrunnelser.id}
                        åpenBehandling={åpenBehandling}
                        vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                    >
                        <TrekkILøpendeUtbetalingPanel
                            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                        />
                    </VedtaksperiodeMedBegrunnelserProvider>
                )
            )}
        </>
    );
};
