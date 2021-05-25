import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useFritekstVedtakBegrunnelser } from '../../../../context/FritekstVedtakBegrunnelserContext';
import { useVedtakBegrunnelser } from '../../../../context/VedtakBegrunnelserContext';
import { IBehandling } from '../../../../typer/behandling';
import { IRestVedtakBegrunnelse, VedtakBegrunnelseType } from '../../../../typer/vedtak';
import {
    hentUtbetalingsperiodeDetaljer,
    IUtbetalingsperiodeDetalj,
    Vedtaksperiode,
} from '../../../../typer/vedtaksperiode';
import { formaterBeløp, formaterPersonIdent, sorterFødselsdato } from '../../../../utils/formatter';
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
    row-gap: 0.25rem;
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

    const { ekspandertBegrunnelse, toggleForm } = useFritekstVedtakBegrunnelser();
    const { vedtakBegrunnelser } = useVedtakBegrunnelser();

    const harBegrunnelserMedFritekstMulighet =
        vedtakBegrunnelser.filter((vedtakBegrunnelse: IRestVedtakBegrunnelse) => {
            return (
                (vedtakBegrunnelse.begrunnelseType === VedtakBegrunnelseType.AVSLAG ||
                    vedtakBegrunnelse.begrunnelseType === VedtakBegrunnelseType.OPPHØR ||
                    vedtakBegrunnelse.begrunnelseType === VedtakBegrunnelseType.REDUKSJON) &&
                vedtakBegrunnelse.fom === vedtaksperiode.periodeFom &&
                vedtakBegrunnelse.tom === vedtaksperiode.periodeTom
            );
        }).length > 0;

    const utbetalingsperiodeDetaljer = hentUtbetalingsperiodeDetaljer(vedtaksperiode);
    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiode={vedtaksperiode}
            åpen={ekspandertBegrunnelse}
            onClick={() => toggleForm(true)}
        >
            <UtbetalingsperiodepanelBody>
                {utbetalingsperiodeDetaljer ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <Element>Resultat</Element>

                        {utbetalingsperiodeDetaljer
                            .sort((utbetalingA, utbetalingB) =>
                                sorterFødselsdato(
                                    utbetalingA.person.fødselsdato,
                                    utbetalingB.person.fødselsdato
                                )
                            )
                            .map((detalj: IUtbetalingsperiodeDetalj) => (
                                <UtbetalingsperiodeDetalj key={detalj.person.personIdent}>
                                    <Normaltekst title={detalj.person.navn}>
                                        {formaterPersonIdent(detalj.person.personIdent)}
                                    </Normaltekst>

                                    <Normaltekst>
                                        {formaterBeløp(detalj.utbetaltPerMnd)}
                                    </Normaltekst>
                                </UtbetalingsperiodeDetalj>
                            ))}
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
                {harBegrunnelserMedFritekstMulighet && (
                    <FritekstVedtakbegrunnelser vedtaksperiode={vedtaksperiode} />
                )}
            </UtbetalingsperiodepanelBody>
        </EkspanderbartBegrunnelsePanel>
    );
};

export default VedtakBegrunnelsePanel;
