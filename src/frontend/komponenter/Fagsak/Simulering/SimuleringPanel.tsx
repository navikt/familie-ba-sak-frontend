import * as React from 'react';

import { isBefore } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Label, Panel } from '@navikt/ds-react';
import {
    ABorderDefault,
    AGreen700,
    ATextDanger,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';

import type { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import { isoStringTilFormatertString, isoStringTilDate, Datoformat } from '../../../utils/dato';
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

const LabelMedFarge = styled(Label)`
    color: ${(props: { farge?: string }) => (props.farge ? props.farge : ATextDefault)};
`;

const StyledHr = styled.hr`
    border-top: 1px solid ${ABorderDefault};
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
        !fomDatoNestePeriode ||
        isBefore(isoStringTilDate(periode.fom), isoStringTilDate(fomDatoNestePeriode));

    const panelTittel = (): string => {
        const utbetaltePerioder = perioder.filter(periode => erFørNestePeriode(periode));
        if (utbetaltePerioder.length === 0) {
            return 'Totalt';
        }
        if (utbetaltePerioder.length === 1) {
            return `Total for ${isoStringTilFormatertString({
                isoString: perioder[0].fom,
                tilFormat: Datoformat.MÅNED_ÅR_NAVN,
            })}`;
        }
        return `Totalt for perioden ${isoStringTilFormatertString({
            isoString: fom,
            tilFormat: Datoformat.DATO,
        })} - ${isoStringTilFormatertString({
            isoString: tomSisteUtbetaling,
            tilFormat: Datoformat.DATO,
        })}`;
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
                            <LabelMedFarge farge={feilutbetaling > 0 ? ATextDanger : ATextDefault}>
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
                                        isoStringTilFormatertString({
                                            isoString: fomDatoNestePeriode,
                                            tilFormat: Datoformat.MÅNED_ÅR_NAVN,
                                        })
                                    )}
                                </BodyShort>
                            </StyledTd>

                            <StyledTd erHøyrestilt={true}>
                                <LabelMedFarge
                                    farge={
                                        nestePeriode?.resultat && nestePeriode.resultat > 0
                                            ? AGreen700
                                            : ATextDefault
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
