import { isBefore } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Box, HStack, Spacer, VStack } from '@navikt/ds-react';
import {
    BorderNeutral,
    FontWeightBold,
    Space16,
    TextDangerSubtle,
    TextNeutral,
    TextSuccessSubtle,
} from '@navikt/ds-tokens/dist/tokens';

import type { ISimuleringDTO, ISimuleringPeriode } from '../../../../../typer/simulering';
import { Datoformat, isoStringTilDate, isoStringTilFormatertString } from '../../../../../utils/dato';
import { formaterBeløp } from '../../../../../utils/formatter';

const BoldTekstMedFarge = styled(BodyShort)<{ $farge?: string }>`
    color: ${props => (props.$farge ? props.$farge : TextNeutral)};
    font-weight: ${FontWeightBold};
`;

const HStackMedBorderTop = styled(HStack)`
    border-top: 1px solid ${BorderNeutral};
    padding-top: ${Space16};
`;

interface ISimuleringProps {
    simulering: ISimuleringDTO;
}

const SimuleringPanel = ({
    simulering: { feilutbetaling, fom, etterbetaling, fomDatoNestePeriode, perioder, tomSisteUtbetaling },
}: ISimuleringProps) => {
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
        <Box
            maxWidth={'26rem'}
            marginBlock={'space-0 space-40'}
            borderColor="neutral-strong"
            borderWidth="1"
            padding="space-40"
        >
            <VStack aria-label={'Simuleringsoversikt'} gap="space-12">
                <HStack>
                    <BodyShort weight="semibold">{panelTittel()}</BodyShort>
                </HStack>
                <HStack>
                    <BodyShort>Feilutbetaling</BodyShort>
                    <Spacer />
                    <BoldTekstMedFarge $farge={feilutbetaling > 0 ? TextDangerSubtle : TextNeutral}>
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
                            $farge={
                                nestePeriode?.resultat && nestePeriode.resultat > 0 ? TextSuccessSubtle : TextNeutral
                            }
                        >
                            {formaterBeløpEllerDashOmUndefined(nestePeriode?.resultat)}
                        </BoldTekstMedFarge>
                    </HStack>
                )}
            </VStack>
        </Box>
    );
};
export default SimuleringPanel;
