import * as React from 'react';

import { isBefore } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Box, HStack, Label, Spacer, VStack } from '@navikt/ds-react';
import { AGreen700, ASpacing4, ATextDanger, ATextDefault } from '@navikt/ds-tokens/dist/tokens';

import type { ISimuleringDTO, ISimuleringPeriode } from '../../../typer/simulering';
import { isoStringTilFormatertString, isoStringTilDate, Datoformat } from '../../../utils/dato';
import { formaterBeløp } from '../../../utils/formatter';

const LabelMedFarge = styled(Label)<{ $farge?: string }>`
    color: ${props => (props.$farge ? props.$farge : ATextDefault)};
`;

const HStackMedBorderTop = styled(HStack)`
    border-top: 1px solid;
    padding-top: ${ASpacing4};
`;

const StyledBox = styled(Box)`
    max-width: 26rem;
    margin-bottom: 2.5rem;
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
        <StyledBox borderColor="border-strong" borderWidth="1" padding="10">
            <VStack aria-label={'Simuleringsoversikt'} gap="3">
                <HStack>
                    <Label>{panelTittel()}</Label>
                </HStack>
                <HStack>
                    <BodyShort>Feilutbetaling</BodyShort>
                    <Spacer />
                    <LabelMedFarge $farge={feilutbetaling > 0 ? ATextDanger : ATextDefault}>
                        {formaterBeløpEllerDashOmUndefined(feilutbetaling)}
                    </LabelMedFarge>
                </HStack>

                <HStack>
                    <BodyShort>Etterbetaling</BodyShort>
                    <Spacer />
                    <LabelMedFarge>
                        {formaterBeløpEllerDashOmUndefined(etterbetaling)}
                    </LabelMedFarge>
                </HStack>
                <HStackMedBorderTop>
                    <Label>Neste utbetaling</Label>
                    <Spacer />
                    {!nestePeriode && <Label>-</Label>}
                </HStackMedBorderTop>
                {nestePeriode && (
                    <HStack>
                        <BodyShort>
                            {kapitaliserTekst(
                                isoStringTilFormatertString({
                                    isoString: fomDatoNestePeriode,
                                    tilFormat: Datoformat.MÅNED_ÅR_NAVN,
                                })
                            )}
                        </BodyShort>
                        <Spacer />
                        <LabelMedFarge
                            $farge={
                                nestePeriode?.resultat && nestePeriode.resultat > 0
                                    ? AGreen700
                                    : ATextDefault
                            }
                        >
                            {formaterBeløpEllerDashOmUndefined(nestePeriode?.resultat)}
                        </LabelMedFarge>
                    </HStack>
                )}
            </VStack>
        </StyledBox>
    );
};
export default SimuleringPanel;
