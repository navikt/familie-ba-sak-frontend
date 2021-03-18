import React from 'react';

import styled from 'styled-components';

import { Element, Normaltekst } from 'nav-frontend-typografi';

import { useBehandling } from '../../../../context/BehandlingContext';
import { Behandlingstype } from '../../../../typer/behandling';
import {
    IUtbetalingsperiodeDetalj,
    Vedtaksperiode,
    Vedtaksperiodetype,
} from '../../../../typer/vedtaksperiode';
import { IRestPersonResultat } from '../../../../typer/vilkår';
import { formaterBeløp, formaterPersonIdent } from '../../../../utils/formatter';
import VedtakBegrunnelserMultiselect from './VedtakBegrunnelserMultiselect';
import EkspanderbartBegrunnelsePanel from './EkspanderbartBegrunnelsePanel';

interface IVedtakBegrunnelserTabell {
    vedtaksperiode: Vedtaksperiode;
    personResultater: IRestPersonResultat[];
    behandlingsType: Behandlingstype;
}

const UtbetalingsperiodepanelBody = styled.div`
    margin-left: 0.625rem;
    display: grid;
    grid-template-columns: 5fr 4fr;
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
    personResultater,
    behandlingsType,
}) => {
    const { erLesevisning } = useBehandling();

    return (
        <EkspanderbartBegrunnelsePanel
            vedtaksperiode={vedtaksperiode}
            åpen={behandlingsType === Behandlingstype.FØRSTEGANGSBEHANDLING}
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
                        personResultater={personResultater}
                        vedtaksperiode={vedtaksperiode}
                    />
                </div>
            </UtbetalingsperiodepanelBody>
        </EkspanderbartBegrunnelsePanel>
    );
};

export default VedtakBegrunnelsePanel;
