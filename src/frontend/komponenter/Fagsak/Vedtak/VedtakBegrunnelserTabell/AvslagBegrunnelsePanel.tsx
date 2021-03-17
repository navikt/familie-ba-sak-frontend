import React from 'react';

import styled from 'styled-components';

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { periodeToString } from '../../../../typer/periode';
import Hjelpetekst44px from './Hjelpetekst44px';
import { ISammenslåttAvslagbegrunnelse } from '../../../../typer/vedtak';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { IRestPersonResultat } from '../../../../typer/vilkår';
import { Behandlingstype } from '../../../../typer/behandling';

interface IAvslagBegrunnelseTabellProps {
    sammenslått: ISammenslåttAvslagbegrunnelse;
}

const StyledEkspanderbartpanel = styled(Ekspanderbartpanel)`
    margin-bottom: 1.5rem;
    max-width: 49rem;

    .ekspanderbartPanel__hode {
        padding-top: 0;
        padding-bottom: 0;
    }
    .ekspanderbartPanel__innhold {
        padding: 1rem;
    }
`;

const UtbetalingsperiodepanelTittel = styled.p`
    display: flex;
    align-items: center;
    text-align: center;

    .typo-normal {
        margin-left: 1.5rem;
    }
`;

const UtbetalingsperiodepanelBody = styled.div`
    margin-left: 0.625rem;
    display: grid;
    grid-template-columns: 5fr 4fr;
`;

const VedtakBegrunnelsePanel: React.FC<IAvslagBegrunnelseTabellProps> = ({ sammenslått }) => {
    return (
        <StyledEkspanderbartpanel
            key={sammenslått.brevBegrunnelse} // TODO :Fiks
            apen={true} // TODO
            tittel={
                <UtbetalingsperiodepanelTittel>
                    {/* TODO legge inn tekst for hjelpeteksten og legg til hjepleteksten */}
                    {/* eslint-disable-next-line no-constant-condition */}
                    {true ? (
                        <div style={{ marginLeft: '0.625rem' }} />
                    ) : (
                        <Hjelpetekst44px innhold={'Midlertidig tekst'} />
                    )}
                    <Element>
                        {periodeToString({
                            fom: sammenslått.fom,
                            tom: sammenslått.tom,
                        })}
                    </Element>
                    <Normaltekst>Avslag</Normaltekst>
                </UtbetalingsperiodepanelTittel>
            }
        >
            <UtbetalingsperiodepanelBody>
                {sammenslått.personer.toString()}
                <br />
                {sammenslått.vilkår.toString()}
                <br />
                {sammenslått.brevBegrunnelse.toString()}
            </UtbetalingsperiodepanelBody>
        </StyledEkspanderbartpanel>
    );
};

export default VedtakBegrunnelsePanel;
