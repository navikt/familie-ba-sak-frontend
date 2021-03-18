import React from 'react';

import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { IRestAvslagbegrunnelser } from '../../../../typer/vedtak';
import { RessursStatus } from '@navikt/familie-typer';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';
import EkspanderbartBegrunnelsePanel from './Felles/EkspanderbartBegrunnelsePanel';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';

interface IAvslagTabell {
    åpenBehandling: IBehandling;
}

const MarginDiv = styled.div`
    margin-left: 0.625rem;
`;

const AvslagBegrunnelser: React.FC<IAvslagTabell> = ({ åpenBehandling }) => {
    const { avslagBegrunnelser } = useVedtakBegrunnelser();

    return avslagBegrunnelser.status == RessursStatus.SUKSESS && avslagBegrunnelser.data.length ? (
        <>
            <OverskriftMedHjelpetekst
                overskrift={'Begrunnelser for avslag i vedtaksbrev'}
                hjelpetekst={
                    'Her har vi hentet begrunnelsestekster for avslag som du har satt i vilkårsvurderingen.'
                }
            />
            {åpenBehandling.vedtaksperioder
                .filter(
                    (periode: Vedtaksperiode) =>
                        periode.vedtaksperiodetype === Vedtaksperiodetype.AVSLAG
                )
                .sort((a, b) =>
                    !a.periodeFom && !a.periodeTom
                        ? 1
                        : familieDayjsDiff(
                              familieDayjs(a.periodeFom, datoformat.ISO_DAG),
                              familieDayjs(b.periodeFom, datoformat.ISO_DAG)
                          )
                )
                .map((periode: Vedtaksperiode) => (
                    <EkspanderbartBegrunnelsePanel vedtaksperiode={periode} åpen={true}>
                        <MarginDiv>
                            <Normaltekst children={'Begrunnelse(r) for avslag'} />
                            <ul>
                                {avslagBegrunnelser.data.find(
                                    (avslagBegrunnelser: IRestAvslagbegrunnelser) =>
                                        avslagBegrunnelser.fom === periode.periodeFom &&
                                        avslagBegrunnelser.tom === periode.periodeTom
                                )?.brevBegrunnelser ??
                                    [].map((begrunnelse: string) => <li>{begrunnelse}</li>)}
                            </ul>
                        </MarginDiv>
                    </EkspanderbartBegrunnelsePanel>
                ))}
        </>
    ) : null;
};

export default AvslagBegrunnelser;
