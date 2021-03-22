import React from 'react';

import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelseContext';
import { IBehandling } from '../../../../typer/behandling';
import { IRestAvslagbegrunnelser } from '../../../../typer/vedtak';
import { Vedtaksperiode, Vedtaksperiodetype } from '../../../../typer/vedtaksperiode';
import familieDayjs, { familieDayjsDiff } from '../../../../utils/familieDayjs';
import { datoformat } from '../../../../utils/formatter';
import OverskriftMedHjelpetekst from './Felles/OverskriftMedHjelpetekst';
import EkspanderbartBegrunnelsePanel from './Felles/EkspanderbartBegrunnelsePanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';

interface IAvslagTabell {
    åpenBehandling: IBehandling;
}

const PanelBody = styled.div`
    ul {
        margin: 0;
        padding-left: 1.5rem;
    }
`;

const AvslagBegrunnelser: React.FC<IAvslagTabell> = ({ åpenBehandling }) => {
    const { avslagBegrunnelser } = useVedtakBegrunnelser();

    const sorterTommePerioderSist = (a: Vedtaksperiode, b: Vedtaksperiode) =>
        !a.periodeFom && !a.periodeTom
            ? 1
            : familieDayjsDiff(
                  familieDayjs(a.periodeFom, datoformat.ISO_DAG),
                  familieDayjs(b.periodeFom, datoformat.ISO_DAG)
              );

    return avslagBegrunnelser.length ? (
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
                .sort(sorterTommePerioderSist)
                .map((periode: Vedtaksperiode) => (
                    <EkspanderbartBegrunnelsePanel vedtaksperiode={periode} åpen={true}>
                        <PanelBody>
                            <Element>Begrunnelse(r) for avslag</Element>
                            <ul>
                                {avslagBegrunnelser
                                    .find(
                                        (avslagBegrunnelser: IRestAvslagbegrunnelser) =>
                                            avslagBegrunnelser.fom === periode.periodeFom &&
                                            avslagBegrunnelser.tom === periode.periodeTom
                                    )
                                    ?.brevBegrunnelser.map((begrunnelse: string) => (
                                        <li>
                                            <Normaltekst children={begrunnelse} />
                                        </li>
                                    ))}
                            </ul>
                        </PanelBody>
                    </EkspanderbartBegrunnelsePanel>
                ))}
        </>
    ) : null;
};

export default AvslagBegrunnelser;
