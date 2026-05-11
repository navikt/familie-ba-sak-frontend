import { Fragment } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';
import { Vedtaksperiodetype } from '@typer/vedtaksperiode';
import { partition } from '@utils/commons';
import styled from 'styled-components';

import { Heading } from '@navikt/ds-react';

import { filtrerOgSorterPerioderMedBegrunnelseBehov } from './utils';
import { Vedtaksperiode } from './Vedtaksperiode';
import { VedtaksperiodeProvider } from './VedtaksperiodeContext';
import { useVedtaksperioderContext } from './VedtaksperioderContext';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-top: 1rem;
`;

export function Vedtaksperioder() {
    const { vedtaksperioder } = useVedtaksperioderContext();

    const behandling = useBehandling();

    const vedtaksperioderSomSkalvises = filtrerOgSorterPerioderMedBegrunnelseBehov(vedtaksperioder, behandling.status);

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
            />
            <GrupperteVedtaksperioder
                vedtaksperioderMedBegrunnelser={avslagOgResterende[0]}
                overskrift={'Generelle avslagsbegrunnelser'}
            />
        </>
    ) : (
        <Fragment />
    );
}

const GrupperteVedtaksperioder = ({
    vedtaksperioderMedBegrunnelser,
    overskrift,
}: {
    vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[];
    overskrift: string;
}) => {
    if (vedtaksperioderMedBegrunnelser.length === 0) {
        return <></>;
    }

    return (
        <>
            <StyledHeading level="2" size="small" spacing>
                {overskrift}
            </StyledHeading>
            {vedtaksperioderMedBegrunnelser.map(vedtaksperiodeMedBegrunnelser => (
                <VedtaksperiodeProvider
                    key={vedtaksperiodeMedBegrunnelser.id}
                    vedtaksperiodeMedBegrunnelser={vedtaksperiodeMedBegrunnelser}
                >
                    <Vedtaksperiode />
                </VedtaksperiodeProvider>
            ))}
        </>
    );
};
