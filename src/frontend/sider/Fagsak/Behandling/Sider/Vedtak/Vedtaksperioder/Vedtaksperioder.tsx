import React, { Fragment } from 'react';

import styled from 'styled-components';

import { Heading } from '@navikt/ds-react';

import { filtrerOgSorterPerioderMedBegrunnelseBehov } from './utils';
import Vedtaksperiode from './Vedtaksperiode';
import { VedtaksperiodeProvider } from './VedtaksperiodeContext';
import { useVedtaksperioderContext } from './VedtaksperioderContext';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../../typer/vedtaksperiode';
import { partition } from '../../../../../../utils/commons';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-top: 1rem;
`;

interface VedtaksperioderProps {
    åpenBehandling: IBehandling;
}

const Vedtaksperioder: React.FC<VedtaksperioderProps> = ({ åpenBehandling }) => {
    const { vedtaksperioder } = useVedtaksperioderContext();

    const vedtaksperioderSomSkalvises = filtrerOgSorterPerioderMedBegrunnelseBehov(
        vedtaksperioder,
        åpenBehandling.status
    );

    const avslagOgResterende = partition(
        vedtaksperiode =>
            vedtaksperiode.type === Vedtaksperiodetype.AVSLAG && !vedtaksperiode.fom && !vedtaksperiode.tom,
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
            {vedtaksperioderMedBegrunnelser.map((vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser) => (
                <VedtaksperiodeProvider
                    key={vedtaksperiodeMedBegrunnelser.id}
                    åpenBehandling={åpenBehandling}
                    vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                >
                    <Vedtaksperiode vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser} />
                </VedtaksperiodeProvider>
            ))}
        </>
    );
};

export default Vedtaksperioder;
