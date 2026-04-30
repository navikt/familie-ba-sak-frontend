import type { PropsWithChildren } from 'react';

import { endOfMonth, isAfter } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Label, ExpansionCard } from '@navikt/ds-react';

import {
    hentVedtaksperiodeTittel,
    Vedtaksperiodetype,
    type IVedtaksperiodeMedBegrunnelser,
} from '../../../../../../typer/vedtaksperiode';
import {
    dagensDato,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDateMedFallback,
    tidenesEnde,
} from '../../../../../../utils/dato';
import { formaterBeløp, summer } from '../../../../../../utils/formatter';

const StyledExpansionCard = styled(ExpansionCard)`
    margin-bottom: 1rem;
`;

const StyledExpansionHeader = styled(ExpansionCard.Header)`
    align-items: center;
`;

const StyledExpansionTitle = styled(ExpansionCard.Title)`
    display: grid;
    grid-template-columns: minmax(6rem, 12rem) minmax(6rem, 15rem) auto;
    grid-gap: 0.5rem;

    margin-left: 0;
`;

const StyledExpansionContent = styled(ExpansionCard.Content)`
    overflow: visible;
`;

interface EkspanderbarVedtaksperiodeProps extends PropsWithChildren {
    vedtaksperiodeMedBegrunnelser: IVedtaksperiodeMedBegrunnelser;
    åpen: boolean;
    onClick?: () => void;
}

const slutterSenereEnnInneværendeMåned = (tom?: string) =>
    isAfter(isoStringTilDateMedFallback({ isoString: tom, fallbackDate: tidenesEnde }), endOfMonth(dagensDato));

const EkspanderbarVedtaksperiode = ({
    vedtaksperiodeMedBegrunnelser,
    åpen,
    onClick,
    children,
}: EkspanderbarVedtaksperiodeProps) => {
    const periode = {
        fom: vedtaksperiodeMedBegrunnelser.fom,
        tom: vedtaksperiodeMedBegrunnelser.tom,
    };
    const skalViseSum =
        (vedtaksperiodeMedBegrunnelser.type === Vedtaksperiodetype.UTBETALING ||
            vedtaksperiodeMedBegrunnelser.type ===
                Vedtaksperiodetype.UTBETALING_MED_REDUKSJON_FRA_SIST_IVERKSATTE_BEHANDLING) &&
        vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.length > 0;

    const sum = summer(
        vedtaksperiodeMedBegrunnelser.utbetalingsperiodeDetaljer.map(
            utbetalingsperiodeDetalj => utbetalingsperiodeDetalj.utbetaltPerMnd
        )
    );

    const tittel = hentVedtaksperiodeTittel(vedtaksperiodeMedBegrunnelser);

    return (
        <StyledExpansionCard open={åpen} onToggle={onClick} size="small" aria-label="Begrunnelser">
            <StyledExpansionHeader>
                <StyledExpansionTitle>
                    {periode.fom && (
                        <Label>
                            {isoDatoPeriodeTilFormatertString({
                                fom: periode.fom,
                                tom: slutterSenereEnnInneværendeMåned(periode.tom) ? '' : periode.tom,
                            })}
                        </Label>
                    )}
                    <BodyShort>{tittel}</BodyShort>
                    {skalViseSum && <BodyShort>{formaterBeløp(sum)}</BodyShort>}
                </StyledExpansionTitle>
            </StyledExpansionHeader>
            <StyledExpansionContent>{children}</StyledExpansionContent>
        </StyledExpansionCard>
    );
};

export default EkspanderbarVedtaksperiode;
