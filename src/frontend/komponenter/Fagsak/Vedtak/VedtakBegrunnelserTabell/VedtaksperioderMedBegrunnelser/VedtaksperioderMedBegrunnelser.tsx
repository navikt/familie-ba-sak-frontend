import React, { Fragment } from 'react';

import styled from 'styled-components';

import { Alert, Heading } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../../../context/AppContext';
import type { IBehandling } from '../../../../../typer/behandling';
import { ToggleNavn } from '../../../../../typer/toggles';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../../../typer/vedtaksperiode';
import { partition } from '../../../../../utils/commons';
import { filtrerOgSorterPerioderMedBegrunnelseBehov } from '../../../../../utils/vedtakUtils';
import { useVedtaksbegrunnelseTekster } from '../Context/VedtaksbegrunnelseTeksterContext';
import { VedtaksperiodeMedBegrunnelserProvider } from '../Context/VedtaksperiodeMedBegrunnelserContext';
import VedtaksperiodeMedBegrunnelserPanel from './VedtaksperiodeMedBegrunnelserPanel';

const StyledHeading = styled(Heading)`
    display: flex;
    margin-top: 1rem;
`;

interface IVedtakBegrunnelserTabell {
    åpenBehandling: IBehandling;
}

const VedtaksperioderMedBegrunnelser: React.FC<IVedtakBegrunnelserTabell> = ({
    åpenBehandling,
}) => {
    const { toggles } = useApp();
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

    const avslagOgResterende = toggles[ToggleNavn.organiserAvslag]
        ? partition(
              vedtaksperiode =>
                  vedtaksperiode.type === Vedtaksperiodetype.AVSLAG &&
                  !vedtaksperiode.fom &&
                  !vedtaksperiode.tom,
              vedtaksperioderSomSkalvises
          )
        : partition(
              vedtaksperiode => vedtaksperiode.type === Vedtaksperiodetype.AVSLAG,
              vedtaksperioderSomSkalvises
          );

    return vedtaksperioderSomSkalvises.length > 0 ? (
        <>
            <VedtaksperiodeListe
                vedtaksperioderMedBegrunnelser={avslagOgResterende[1]}
                overskrift={'Begrunnelser i vedtaksbrev'}
                åpenBehandling={åpenBehandling}
            />
            <VedtaksperiodeListe
                vedtaksperioderMedBegrunnelser={avslagOgResterende[0]}
                overskrift={
                    toggles[ToggleNavn.organiserAvslag]
                        ? 'Generelle avslagsbegrunnelser'
                        : 'Begrunnelser for avslag i vedtaksbrev'
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
        </>
    );
};

export default VedtaksperioderMedBegrunnelser;
