import React, { Fragment } from 'react';

import styled from 'styled-components';

import { Alert, Heading, HelpText } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import { partition } from '../../../../../utils/commons';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { VedtaksperiodeMedBegrunnelserProvider } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import VedtaksperiodeMedBegrunnelserPanel from './VedtaksperiodeMedBegrunnelserPanel';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-bottom: 0.5rem;
`;

const StyledHelpText = styled(HelpText)`
    margin-top: 0.1rem;
    margin-left: 0.6rem;

    & + .navds-popover {
        max-width: 20rem;
    }
`;

const VedtaksperiodeListeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const VedtaksperioderMedBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({
    åpenBehandling,
}) => {
    const { vedtaksbegrunnelseTekster } = useVedtaksbegrunnelseTekster();

    const vedtaksperioderSomSkalvises = filtrerOgSorterPerioderMedBegrunnelseBehov(
        åpenBehandling.vedtak?.vedtaksperioderMedBegrunnelser ?? [],
        åpenBehandling.resultat,
        åpenBehandling.status
    );

    if (
        vedtaksbegrunnelseTekster.status === RessursStatus.FEILET ||
        vedtaksbegrunnelseTekster.status === RessursStatus.FUNKSJONELL_FEIL
    ) {
        return <Alert variant="error">Klarte ikke å hente inn begrunnelser for vedtak.</Alert>;
    }

    const avslagOgResterende = partition(
        vedtaksperiode => vedtaksperiode.type === Vedtaksperiodetype.AVSLAG,
        vedtaksperioderSomSkalvises
    );

    return vedtaksperioderSomSkalvises.length > 0 ? (
        <>
            <VedtaksperiodeListe
                vedtaksperioderMedBegrunnelser={avslagOgResterende[1]}
                overskrift={'Begrunnelser i vedtaksbrev'}
                hjelpetekst={
                    'Her skal du sette begrunnelsestekster for innvilgelse, reduksjon og opphør.'
                }
                åpenBehandling={åpenBehandling}
            />
            <VedtaksperiodeListe
                vedtaksperioderMedBegrunnelser={avslagOgResterende[0]}
                overskrift={'Begrunnelser for avslag i vedtaksbrev'}
                hjelpetekst={
                    'Her har vi hentet begrunnelsestekster for avslag som du har satt i vilkårsvurderingen.'
                }
                åpenBehandling={åpenBehandling}
            />
        </>
    ) : (
        <Fragment />
    );
};

const VedtaksperiodeListe: React.FC<{
    vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[];
    overskrift: string;
    hjelpetekst: string;
    åpenBehandling: IBehandling;
}> = ({ vedtaksperioderMedBegrunnelser, overskrift, hjelpetekst, åpenBehandling }) => {
    if (vedtaksperioderMedBegrunnelser.length === 0) {
        return <></>;
    }

    return (
        <VedtaksperiodeListeWrapper>
            <StyledHeading level="2" size="small">
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
                        <VedtaksperiodeMedBegrunnelserPanel
                            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                        />
                    </VedtaksperiodeMedBegrunnelserProvider>
                )
            )}
        </VedtaksperiodeListeWrapper>
    );
};

export default VedtaksperioderMedBegrunnelser;
