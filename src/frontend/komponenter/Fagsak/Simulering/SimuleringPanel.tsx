import * as React from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Panel from 'nav-frontend-paneler';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { ISimuleringDTO } from '../../../typer/simulering';
import familieDayjs from '../../../utils/familieDayjs';
import { formaterBeløp, formaterIsoDato, datoformat } from '../../../utils/formatter';
import { datoDagenFør } from '../../../utils/tid';

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
    simulering: { feilutbetaling, fom, etterbetaling, fomDatoNestePeriode, perioder },
}) => {
    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    const formaterBeløpEllerDashOmUndefined = (beløp?: number): string => {
        return !beløp || beløp === 0 ? '-' : formaterBeløp(beløp);
    };

    const nestePeriode = fomDatoNestePeriode
        ? perioder.find(periode => periode.fom === fomDatoNestePeriode) ?? undefined
        : undefined;
    const sisteUtbetaltePeriode = perioder
        .filter(periode => dayjs(periode.fom) < dayjs(fomDatoNestePeriode))
        .sort((a, b) => (dayjs(a.fom).isAfter(dayjs(b.fom)) ? 1 : -1))
        .slice(-1)
        .pop();
    const utbetaltPeriodeTom = fomDatoNestePeriode
        ? datoDagenFør(familieDayjs(fomDatoNestePeriode, datoformat.ISO_DAG)).format(
              datoformat.DATO
          )
        : sisteUtbetaltePeriode
        ? sisteUtbetaltePeriode.tom
        : '';
    return (
        <StyledPanel border>
            <StyledTable>
                <tbody>
                    <tr>
                        <StyledTh colSpan={2}>
                            <Element>
                                Totalt{' '}
                                {perioder.length > 1 &&
                                    `for perioden ${formaterIsoDato(
                                        fom,
                                        datoformat.DATO
                                    )} - ${utbetaltPeriodeTom}`}
                            </Element>
                        </StyledTh>
                    </tr>
                    <tr>
                        <StyledTd>
                            <Normaltekst>Feilutbetaling</Normaltekst>
                        </StyledTd>
                        <StyledTd erHøyrestilt={true}>
                            <ElementMedFarge farge={navFarger.navRod}>
                                {formaterBeløpEllerDashOmUndefined(feilutbetaling)}
                            </ElementMedFarge>
                        </StyledTd>
                    </tr>

                    <tr>
                        <StyledTd>
                            <Normaltekst>Etterbetaling</Normaltekst>
                        </StyledTd>
                        <StyledTd erHøyrestilt={true}>
                            <ElementMedFarge>
                                {formaterBeløpEllerDashOmUndefined(etterbetaling)}
                            </ElementMedFarge>
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
                                {formaterBeløpEllerDashOmUndefined(nestePeriode?.resultat)}
                            </ElementMedFarge>
                        </StyledTd>
                    </tr>
                </tbody>
            </StyledTable>
        </StyledPanel>
    );
};
export default SimuleringPanel;
