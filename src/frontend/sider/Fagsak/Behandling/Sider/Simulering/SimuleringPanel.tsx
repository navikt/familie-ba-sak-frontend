import type { ISimuleringDTO, ISimuleringPeriode } from '@typer/simulering';
import { Datoformat, isoStringTilDate, isoStringTilFormatertString } from '@utils/dato';
import { formaterBeløp } from '@utils/formatter';
import { isBefore } from 'date-fns';

import { BodyShort, Box, HStack, Spacer, VStack } from '@navikt/ds-react';

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
                    <BodyShort
                        weight={'semibold'}
                        textColor={feilutbetaling > 0 ? 'subtle' : 'default'}
                        data-color={feilutbetaling > 0 ? 'danger' : 'neutral'}
                    >
                        {formaterBeløpEllerDashOmUndefined(feilutbetaling)}
                    </BodyShort>
                </HStack>

                <HStack>
                    <BodyShort>Etterbetaling</BodyShort>
                    <Spacer />
                    <BodyShort weight={'semibold'}>{formaterBeløpEllerDashOmUndefined(etterbetaling)}</BodyShort>
                </HStack>
                <Box borderColor={'neutral'} borderWidth="1 0 0 0">
                    <HStack paddingBlock={'space-16 space-0'}>
                        <BodyShort weight="semibold">Neste utbetaling</BodyShort>
                        <Spacer />
                        {!nestePeriode && <BodyShort weight="semibold">-</BodyShort>}
                    </HStack>
                </Box>
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
                        <BodyShort
                            weight={'semibold'}
                            textColor={nestePeriode?.resultat && nestePeriode.resultat > 0 ? 'subtle' : 'default'}
                            data-color={nestePeriode?.resultat && nestePeriode.resultat > 0 ? 'success' : 'neutral'}
                        >
                            {formaterBeløpEllerDashOmUndefined(nestePeriode?.resultat)}
                        </BodyShort>
                    </HStack>
                )}
            </VStack>
        </Box>
    );
};
export default SimuleringPanel;
