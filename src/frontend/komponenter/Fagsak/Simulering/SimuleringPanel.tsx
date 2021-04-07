import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Panel from 'nav-frontend-paneler';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { ISimuleringDTO } from '../../../typer/simulering';
import familieDayjs from '../../../utils/familieDayjs';
import { formaterBeløp } from '../../../utils/formatter';

const StyledPanel = styled(Panel)`
    max-width: 26rem;
    padding: 2rem;
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
    simulering: ISimuleringDTO;
}

const SimuleringPanel: React.FunctionComponent<ISimuleringProps> = ({
    simulering: {
        feilutbetaling,
        fom,
        etterbetaling,
        tomDatoNestePeriode,
        fomDatoNestePeriode,
        perioder,
    },
}) => {
    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    const formater = (beløp?: number) => {
        return <>{!beløp || beløp === 0 ? '-' : formaterBeløp(beløp)}</>;
    };

    const nestePeriode = fomDatoNestePeriode
        ? perioder.find(periode => periode.fom === fomDatoNestePeriode) ?? undefined
        : undefined;
    return (
        <StyledPanel border>
            <StyledTable>
                <tbody>
                    <tr>
                        <StyledTh colSpan={2}>
                            <Element>
                                Totalt{' '}
                                {perioder.length > 1 &&
                                    `for perioden ${familieDayjs(fom).format(
                                        'DD.MM.YYYY'
                                    )} - ${familieDayjs(tomDatoNestePeriode).format('DD.MM.YYYY')}`}
                            </Element>
                        </StyledTh>
                    </tr>
                    <tr>
                        <StyledTd>
                            <Normaltekst>Feilutbetaling</Normaltekst>
                        </StyledTd>
                        <StyledTd erHøyrestilt={true}>
                            <ElementMedFarge farge={navFarger.navRod}>
                                {formater(feilutbetaling)}
                            </ElementMedFarge>
                        </StyledTd>
                    </tr>

                    <tr>
                        <StyledTd>
                            <Normaltekst>Etterbetaling</Normaltekst>
                        </StyledTd>
                        <StyledTd erHøyrestilt={true}>
                            <ElementMedFarge>{formater(etterbetaling)}</ElementMedFarge>
                        </StyledTd>
                    </tr>
                </tbody>
            </StyledTable>

            <StyledHr />

            <StyledTable>
                <tbody>
                    <tr>
                        <StyledTh colSpan={2}>
                            <Element>Neste utbetaling</Element>
                        </StyledTh>
                    </tr>
                    {
                        <tr>
                            <StyledTd>
                                <Normaltekst>
                                    {kapitaliserTekst(
                                        familieDayjs(fomDatoNestePeriode).format('MMMM YYYY')
                                    )}
                                </Normaltekst>
                            </StyledTd>

                            <StyledTd erHøyrestilt={true}>
                                <ElementMedFarge farge={navFarger.navGronnDarken40}>
                                    {formater(nestePeriode?.resultat)}
                                </ElementMedFarge>
                            </StyledTd>
                        </tr>
                    }
                </tbody>
            </StyledTable>
        </StyledPanel>
    );
};
export default SimuleringPanel;
