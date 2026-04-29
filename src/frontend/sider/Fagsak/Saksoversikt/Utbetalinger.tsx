import styled from 'styled-components';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { BorderNeutralStrong, Space32, Space8 } from '@navikt/ds-tokens/dist/tokens';

import { SaksoversiktPanelBredde } from './FagsakLenkepanel';
import PersonUtbetaling from './PersonUtbetaling';
import type { IUtbetalingsperiodeDetalj, Vedtaksperiode } from '../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { formaterBeløp, sorterUtbetaling } from '../../../utils/formatter';

const LøpendeUtbetalinger = styled(VStack)`
    max-width: ${SaksoversiktPanelBredde};
    margin-top: ${Space32};
`;

const Totallinje = styled(HStack)`
    margin-left: ${Space32};
    padding-bottom: ${Space8};
    border-bottom: 1px solid ${BorderNeutralStrong};
`;

interface IUtbetalingerProps {
    vedtaksperiode?: Vedtaksperiode;
}

const Utbetalinger = ({ vedtaksperiode }: IUtbetalingerProps) => {
    if (vedtaksperiode?.vedtaksperiodetype !== Vedtaksperiodetype.UTBETALING) return null;

    const utbetalingsperiodeDetaljerGruppertPåPerson =
        vedtaksperiode?.utbetalingsperiodeDetaljer
            .sort(sorterUtbetaling)
            .reduce((acc: { [key: string]: IUtbetalingsperiodeDetalj[] }, utbetalingsperiodeDetalj) => {
                const utbetalingsperiodeDetaljerForPerson = acc[utbetalingsperiodeDetalj.person.personIdent] ?? [];

                return {
                    ...acc,
                    [utbetalingsperiodeDetalj.person.personIdent]: [
                        ...utbetalingsperiodeDetaljerForPerson,
                        utbetalingsperiodeDetalj,
                    ],
                };
            }, {}) ?? {};

    return (
        <LøpendeUtbetalinger gap="space-16">
            {Object.values(utbetalingsperiodeDetaljerGruppertPåPerson).map(
                (utbetalingsperiodeDetaljerForPerson, index) => {
                    return (
                        <PersonUtbetaling
                            key={index}
                            utbetalingsperiodeDetaljer={utbetalingsperiodeDetaljerForPerson}
                        />
                    );
                }
            )}
            <Totallinje justify="space-between">
                <BodyShort>Totalt utbetalt/mnd</BodyShort>
                <BodyShort weight="semibold">
                    {vedtaksperiode ? formaterBeløp(vedtaksperiode.utbetaltPerMnd) : '-'}
                </BodyShort>
            </Totallinje>
        </LøpendeUtbetalinger>
    );
};

export default Utbetalinger;
