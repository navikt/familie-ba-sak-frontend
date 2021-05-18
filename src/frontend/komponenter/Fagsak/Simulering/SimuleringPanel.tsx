import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Panel from 'nav-frontend-paneler';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import { datoformat, formaterBeløp, formaterIsoDato } from '../../../utils/formatter';
import { kalenderDato, KalenderEnhet, trekkFra, erFør, erEtter } from '../../../utils/kalender';
import { tilVisning } from '../../../utils/kalender';

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

    const erFørNestePeriode = (periode: ISimuleringPeriode) =>
        !fomDatoNestePeriode || erFør(kalenderDato(periode.fom), kalenderDato(fomDatoNestePeriode));

    const sisteUtbetaltePeriode = perioder
        .filter(periode => erFørNestePeriode(periode))
        .sort((a, b) => (erEtter(kalenderDato(a.fom), kalenderDato(b.fom)) ? 1 : -1))
        .slice(-1)
        .pop();

    const utbetaltPeriodeTom = fomDatoNestePeriode
        ? tilVisning(trekkFra(kalenderDato(fomDatoNestePeriode), 1, KalenderEnhet.DAG))
        : sisteUtbetaltePeriode
        ? sisteUtbetaltePeriode.tom
        : '';

    return (
        <StyledPanel border>
            <StyledTable aria-label={'Simuleringsoversikt'}>
                <tbody>
                    <tr>
                        <StyledTh colSpan={2}>
                            <Element>
                                Totalt{' '}
                                {perioder.length > 1 &&
                                    `for perioden ${tilVisning(
                                        kalenderDato(fom)
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

            <StyledTable aria-label={'Neste utbetaling'}>
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
                                    formaterIsoDato(fomDatoNestePeriode, datoformat.MÅNED_ÅR_NAVN)
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
