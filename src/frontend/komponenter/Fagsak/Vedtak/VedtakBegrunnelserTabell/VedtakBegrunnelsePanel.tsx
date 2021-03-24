import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useFritekstVedtakBegrunnelser } from '../../../../context/FritekstVedtakBegrunnelserContext';
import { IBehandling } from '../../../../typer/behandling';
import { ToggleNavn } from '../../../../typer/toggles';
import {
    IUtbetalingsperiodeDetalj,
    Vedtaksperiode,
    Vedtaksperiodetype,
} from '../../../../typer/vedtaksperiode';
import { formaterBeløp, formaterPersonIdent } from '../../../../utils/formatter';
import EkspanderbartBegrunnelsePanel from './Felles/EkspanderbartBegrunnelsePanel';
import FritekstVedtakbegrunnelser from './FritekstVedtakbegrunnelser';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';

interface IVedtakBegrunnelserTabell {
    vedtaksperiode: Vedtaksperiode;
    åpenBehandling: IBehandling;
}

const UtbetalingsperiodepanelBody = styled.div`
    margin-left: 0.625rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 40px;
`;

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    .typo-normal {
        margin-right: 1.5rem;
    }
`;

const VedtakBegrunnelsePanel: React.FC<IVedtakBegrunnelserTabell> = ({
    vedtaksperiode,
    åpenBehandling,
}) => {
    const { erLesevisning } = useBehandling();
    const { toggles } = useApp();

    const { ekspandertBegrunnelse, toggleForm } = useFritekstVedtakBegrunnelser();

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiode={vedtaksperiode}
            åpen={ekspandertBegrunnelse}
            onClick={() => toggleForm(true)}
        >
            <UtbetalingsperiodepanelBody>
                {vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.UTBETALING ? (
                    <div>
                        <Element>Resultat</Element>

                        {vedtaksperiode.utbetalingsperiodeDetaljer.map(
                            (detalj: IUtbetalingsperiodeDetalj) => (
                                <UtbetalingsperiodeDetalj key={detalj.person.personIdent}>
                                    <Normaltekst title={detalj.person.navn}>
                                        {formaterPersonIdent(detalj.person.personIdent)}
                                    </Normaltekst>

                                    <Normaltekst>
                                        {formaterBeløp(detalj.utbetaltPerMnd)}
                                    </Normaltekst>
                                </UtbetalingsperiodeDetalj>
                            )
                        )}
                    </div>
                ) : (
                    <div />
                )}
                <div>
                    <VedtakBegrunnelserMultiselect
                        erLesevisning={erLesevisning()}
                        personResultater={åpenBehandling.personResultater}
                        vedtaksperiode={vedtaksperiode}
                    />
                </div>
                {vedtaksperiode.vedtaksperiodetype === Vedtaksperiodetype.OPPHØR &&
                    toggles[ToggleNavn.begrunnelseFritekst] && (
                        <FritekstVedtakbegrunnelser vedtaksperiode={vedtaksperiode} />
                    )}
            </UtbetalingsperiodepanelBody>
        </EkspanderbartBegrunnelsePanel>
    );
};

export default VedtakBegrunnelsePanel;
