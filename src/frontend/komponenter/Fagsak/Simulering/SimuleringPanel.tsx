import * as React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import Panel from 'nav-frontend-paneler';

import { BodyShort, Label } from '@navikt/ds-react';

import type { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import { datoformat, formaterBeløp, formaterIsoDato } from '../../../utils/formatter';
import { kalenderDato, erFør } from '../../../utils/kalender';
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

const LabelMedFarge = styled(Label)`
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
        fomDatoNestePeriode,
        perioder,
        tomSisteUtbetaling,
    },
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

    const panelTittel = (): string => {
        const utbetaltePerioder = perioder.filter(periode => erFørNestePeriode(periode));
        if (utbetaltePerioder.length === 0) {
            return 'Totalt';
        }
        if (utbetaltePerioder.length === 1) {
            return `Total for ${formaterIsoDato(perioder[0].fom, datoformat.MÅNED_ÅR_NAVN)}`;
        }
        return `Totalt for perioden ${tilVisning(kalenderDato(fom))} - ${
            tomSisteUtbetaling ? tilVisning(kalenderDato(tomSisteUtbetaling)) : ''
        }`;
    };

    return (
        <StyledPanel border>
            <StyledTable aria-label={'Simuleringsoversikt'}>
                <tbody>
                    <tr>
                        <StyledTh colSpan={2}>
                            <Label>{panelTittel()}</Label>
                        </StyledTh>
                    </tr>
                    <tr>
                        <StyledTd>
                            <BodyShort>Feilutbetaling</BodyShort>
                        </StyledTd>
                        <StyledTd erHøyrestilt={true}>
                            <LabelMedFarge
                                farge={feilutbetaling > 0 ? navFarger.navRod : navFarger.navMorkGra}
                            >
                                {formaterBeløpEllerDashOmUndefined(feilutbetaling)}
                            </LabelMedFarge>
                        </StyledTd>
                    </tr>

                    <tr>
                        <StyledTd>
                            <BodyShort>Etterbetaling</BodyShort>
                        </StyledTd>
                        <StyledTd erHøyrestilt={true}>
                            <LabelMedFarge>
                                {formaterBeløpEllerDashOmUndefined(etterbetaling)}
                            </LabelMedFarge>
                        </StyledTd>
                    </tr>
                </tbody>
            </StyledTable>

            <StyledHr />

            <StyledTable aria-label={'Neste utbetaling'}>
                <tbody>
                    <tr>
                        <StyledTh colSpan={2}>
                            <Label>Neste utbetaling</Label>
                        </StyledTh>
                        {!nestePeriode && (
                            <StyledTh erHøyrestilt={true}>
                                <Label>-</Label>
                            </StyledTh>
                        )}
                    </tr>
                    {nestePeriode && (
                        <tr>
                            <StyledTd>
                                <BodyShort>
                                    {kapitaliserTekst(
                                        formaterIsoDato(
                                            fomDatoNestePeriode,
                                            datoformat.MÅNED_ÅR_NAVN
                                        )
                                    )}
                                </BodyShort>
                            </StyledTd>

                            <StyledTd erHøyrestilt={true}>
                                <LabelMedFarge
                                    farge={
                                        nestePeriode?.resultat && nestePeriode.resultat > 0
                                            ? navFarger.navGronnDarken40
                                            : navFarger.navMorkGra
                                    }
                                >
                                    {formaterBeløpEllerDashOmUndefined(nestePeriode?.resultat)}
                                </LabelMedFarge>
                            </StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </StyledPanel>
    );
};
export default SimuleringPanel;
