import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Panel from 'nav-frontend-paneler';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { ISimulering, useSimulering } from '../../../context/SimuleringContext';
import familieDayjs from '../../../utils/familieDayjs';

const StyledPanel = styled(Panel)`
    max-width: 26rem;
    padding: 2rem;
    padding-right: 3.4375rem;
    margin-bottom: 2.5rem;
`;

const StyledTable = styled.table`
    width: 100%;
    border-spacing: 0 0.5rem;
`;

const StyledTh = styled.th(
    (props: { erHøyrestilt?: boolean }) => `
        text-align: ${props.erHøyrestilt ? 'right' : 'left'};
    `
);

const StyledTd = styled.th(
    (props: { erHøyrestilt?: boolean }) => `
        text-align: ${props.erHøyrestilt ? 'right' : 'left'};
    `
);

const ElementMedFarge = styled(Element)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : navFarger.navMorkGra)};
`;

const StyledHr = styled.hr`
    border-top: 1px solid ${navFarger.navGra40};
    margin-left: 0.125rem;
`;

interface ISimuleringProps {
    simulering: ISimulering;
}

const SimuleringPanel: React.FunctionComponent<ISimuleringProps> = ({ simulering }) => {
    const { formater } = useSimulering();

    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    return (
        <StyledPanel border>
            <StyledTable>
                <tr>
                    <StyledTh colSpan={2}>
                        <Element>
                            Totalt for perioden {familieDayjs(simulering.fom).format('DD.MM.YYYY')}{' '}
                            - {familieDayjs(simulering.tom).format('DD.MM.YYYY')}
                        </Element>
                    </StyledTh>
                </tr>
                <tr>
                    <StyledTd>
                        <Normaltekst>Feilutbetaling</Normaltekst>
                    </StyledTd>
                    <StyledTd erHøyrestilt={true}>
                        <ElementMedFarge farge={navFarger.navRod}>
                            {formater(simulering.totalFeilutbetaling)}
                        </ElementMedFarge>
                    </StyledTd>
                </tr>

                <tr>
                    <StyledTd>
                        <Normaltekst>Etterbetaling</Normaltekst>
                    </StyledTd>
                    <StyledTd erHøyrestilt={true}>
                        <ElementMedFarge>{formater(simulering.totalYtelse)}</ElementMedFarge>
                    </StyledTd>
                </tr>
            </StyledTable>

            <StyledHr />

            <StyledTable>
                <tr>
                    <StyledTh colSpan={2}>
                        <Element>Neste utbetaling</Element>
                    </StyledTh>
                </tr>
                {simulering.nesteUtbetaling.beløp !== undefined && (
                    <tr>
                        <StyledTd>
                            <Normaltekst>
                                {kapitaliserTekst(
                                    familieDayjs(simulering.nesteUtbetaling.dato).format(
                                        'MMMM YYYY'
                                    )
                                )}
                            </Normaltekst>
                        </StyledTd>

                        <StyledTd erHøyrestilt={true}>
                            <ElementMedFarge farge={navFarger.navGronnDarken40}>
                                {formater(simulering.nesteUtbetaling.beløp)}
                            </ElementMedFarge>
                        </StyledTd>
                    </tr>
                )}
            </StyledTable>
        </StyledPanel>
    );
};
export default SimuleringPanel;
