import React, { Fragment } from 'react';

import styled from 'styled-components';

import { Alert, Heading } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import Vedtaksperiode from './Vedtaksperiode';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../../typer/vedtaksperiode';
import { partition } from '../../../../../../utils/commons';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../../../utils/vedtakUtils';
import { useVedtakContext } from '../VedtakContext';
import { VedtaksperiodeProvider } from './VedtaksperiodeContext';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-top: 1rem;
`;

const StyledAlert = styled(Alert)`
    margin-bottom: 1rem;
`;

interface VedtaksperioderProps {
    åpenBehandling: IBehandling;
    vedtaksperioderMedBegrunnelserRessurs: Ressurs<IVedtaksperiodeMedBegrunnelser[]>;
}

const Vedtaksperioder: React.FC<VedtaksperioderProps> = ({
    åpenBehandling,
    vedtaksperioderMedBegrunnelserRessurs,
}) => {
    const { vedtaksbegrunnelseTekster } = useVedtakContext();

    if (
        vedtaksbegrunnelseTekster.status === RessursStatus.FEILET ||
        vedtaksbegrunnelseTekster.status === RessursStatus.FUNKSJONELL_FEIL
    ) {
        return (
            <StyledAlert variant="error">
                Klarte ikke å hente inn begrunnelser for vedtak.
            </StyledAlert>
        );
    }

    if (
        vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.FEILET ||
        vedtaksperioderMedBegrunnelserRessurs.status === RessursStatus.FUNKSJONELL_FEIL
    ) {
        return <StyledAlert variant="error">Klarte ikke å hente inn vedtaksperiodene.</StyledAlert>;
    }

    if (vedtaksperioderMedBegrunnelserRessurs.status !== RessursStatus.SUKSESS) {
        return null;
    }

    const vedtaksperioderSomSkalvises = filtrerOgSorterPerioderMedBegrunnelseBehov(
        vedtaksperioderMedBegrunnelserRessurs.data ?? [],
        åpenBehandling.status
    );

    const avslagOgResterende = partition(
        vedtaksperiode =>
            vedtaksperiode.type === Vedtaksperiodetype.AVSLAG &&
            !vedtaksperiode.fom &&
            !vedtaksperiode.tom,
        vedtaksperioderSomSkalvises
    );

    return vedtaksperioderSomSkalvises.length > 0 ? (
        <>
            <GrupperteVedtaksperioder
                vedtaksperioderMedBegrunnelser={avslagOgResterende[1]}
                overskrift={'Begrunnelser i vedtaksbrev'}
                åpenBehandling={åpenBehandling}
            />
            <GrupperteVedtaksperioder
                vedtaksperioderMedBegrunnelser={avslagOgResterende[0]}
                overskrift={'Generelle avslagsbegrunnelser'}
                åpenBehandling={åpenBehandling}
            />
        </>
    ) : (
        <Fragment />
    );
};

const GrupperteVedtaksperioder: React.FC<{
    vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[];
    overskrift: string;
    åpenBehandling: IBehandling;
}> = ({ vedtaksperioderMedBegrunnelser, overskrift, åpenBehandling }) => {
    if (vedtaksperioderMedBegrunnelser.length === 0) {
        return <></>;
    }

    return (
        <>
            <StyledHeading level="2" size="small" spacing>
                {overskrift}
            </StyledHeading>
            {vedtaksperioderMedBegrunnelser.map(
                (vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser) => (
                    <VedtaksperiodeProvider
                        key={vedtaksperiodeMedBegrunnelser.id}
                        åpenBehandling={åpenBehandling}
                        vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                    >
                        <Vedtaksperiode
                            vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                        />
                    </VedtaksperiodeProvider>
                )
            )}
        </>
    );
};

export default Vedtaksperioder;
