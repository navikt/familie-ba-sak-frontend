import * as React from 'react';

import { isBefore } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Box, HStack, Spacer, VStack } from '@navikt/ds-react';
import {
    ABorderDefault,
    AFontWeightBold,
    AGreen700,
    ASpacing4,
    ATextDanger,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';

import type { ISimuleringDTO, ISimuleringPeriode } from '../../../../../typer/simulering';
import { isoStringTilFormatertString, isoStringTilDate, Datoformat } from '../../../../../utils/dato';
import { formaterBeløp } from '../../../../../utils/formatter';

const BoldTekstMedFarge = styled(BodyShort)<{ $farge?: string }>`
    color: ${props => (props.$farge ? props.$farge : ATextDefault)};
    font-weight: ${AFontWeightBold};
`;

const HStackMedBorderTop = styled(HStack)`
    border-top: 1px solid ${ABorderDefault};
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
    simulering: { feilutbetaling, fom, etterbetaling, fomDatoNestePeriode, perioder, tomSisteUtbetaling },
}) => {
    const kapitaliserTekst = (tekst: string): string => {
        return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase();
    };

    const formaterBeløpEllerDashOmUndefined = (beløp?: number): string => {
        return !beløp || beløp === 0 ? '-' : formaterBeløp(beløp);
    };

    const nestePeriode = fomDatoNestePeriode
        ? (perioder.find(periode => periode.fom === fomDatoNestePeriode) ?? undefined)
        : undefined;

    const erFørNestePeriode = (periode: ISimuleringPeriode) =>
        !fomDatoNestePeriode || isBefore(isoStringTilDate(periode.fom), isoStringTilDate(fomDatoNestePeriode));

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
                    <BodyShort weight="semibold">{panelTittel()}</BodyShort>
                </HStack>
                <HStack>
                    <BodyShort>Feilutbetaling</BodyShort>
                    <Spacer />
                    <BoldTekstMedFarge $farge={feilutbetaling > 0 ? ATextDanger : ATextDefault}>
                        {formaterBeløpEllerDashOmUndefined(feilutbetaling)}
                    </BoldTekstMedFarge>
                </HStack>

                <HStack>
                    <BodyShort>Etterbetaling</BodyShort>
                    <Spacer />
                    <BoldTekstMedFarge>{formaterBeløpEllerDashOmUndefined(etterbetaling)}</BoldTekstMedFarge>
                </HStack>
                <HStackMedBorderTop>
                    <BodyShort weight="semibold">Neste utbetaling</BodyShort>
                    <Spacer />
                    {!nestePeriode && <BodyShort weight="semibold">-</BodyShort>}
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
                        <BoldTekstMedFarge
                            $farge={nestePeriode?.resultat && nestePeriode.resultat > 0 ? AGreen700 : ATextDefault}
                        >
                            {formaterBeløpEllerDashOmUndefined(nestePeriode?.resultat)}
                        </BoldTekstMedFarge>
                    </HStack>
                )}
            </VStack>
        </StyledBox>
    );
};
export default SimuleringPanel;
