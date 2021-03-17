import React from 'react';

import styled from 'styled-components';

import { PopoverOrientering } from 'nav-frontend-popover';
import { Element } from 'nav-frontend-typografi';

import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { ISammenslåttAvslagbegrunnelse } from '../../../../typer/vedtak';
import Hjelpetekst44px from './Hjelpetekst44px';
import { RessursStatus } from '@navikt/familie-typer';
import AvslagBegrunnelsePanel from './AvslagBegrunnelsePanel';

interface IAvslagTabell {
    åpenBehandling: IBehandling;
}

const UtbetalingsperioderOverskrift = styled.div`
    margin: 2.75rem 0;
    display: flex;
    align-items: center;
    text-align: center;
`;

const StyledHjelpetekst44px = styled(Hjelpetekst44px)`
    .popover {
        max-width: 18rem;
        text-align: left;
    }
`;

const AvslagBegrunnelser: React.FC<IAvslagTabell> = ({ åpenBehandling }) => {
    const { avslagBegrunnelser } = useVedtakBegrunnelser();

    return avslagBegrunnelser.status == RessursStatus.SUKSESS && avslagBegrunnelser.data.length ? (
        <>
            <UtbetalingsperioderOverskrift>
                <Element>Begrunnelser for avslag i vedtaksbrev</Element>
                <StyledHjelpetekst44px
                    type={PopoverOrientering.Hoyre}
                    innhold="Her har vi hentet begrunnelsestekster for avslag som du har satt i vilkårsvurderingen."
                />
            </UtbetalingsperioderOverskrift>
            {avslagBegrunnelser.data.map(
                (sammenslåttAvslagbegrunnelse: ISammenslåttAvslagbegrunnelse) => (
                    <AvslagBegrunnelsePanel sammenslått={sammenslåttAvslagbegrunnelse} />
                )
            )}
        </>
    ) : null;
};

export default AvslagBegrunnelser;
