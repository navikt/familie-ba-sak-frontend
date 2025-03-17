import React from 'react';

import styled from 'styled-components';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { ABorderStrong, ASpacing2, ASpacing8 } from '@navikt/ds-tokens/dist/tokens';

import { SaksoversiktPanelBredde } from './FagsakLenkepanel';
import PersonUtbetaling from './PersonUtbetaling';
import type { IUtbetalingsperiodeDetalj, Vedtaksperiode } from '../../../typer/vedtaksperiode';
import { Vedtaksperiodetype } from '../../../typer/vedtaksperiode';
import { formaterBeløp, sorterUtbetaling } from '../../../utils/formatter';

const LøpendeUtbetalinger = styled(VStack)`
    max-width: ${SaksoversiktPanelBredde};
    margin-top: ${ASpacing8};
`;

const Totallinje = styled(HStack)`
    margin-left: ${ASpacing8};
    padding-bottom: ${ASpacing2};
    border-bottom: 1px solid ${ABorderStrong};
`;

interface IUtbetalingerProps {
    vedtaksperiode?: Vedtaksperiode;
}

const Utbetalinger: React.FC<IUtbetalingerProps> = ({ vedtaksperiode }) => {
    if (vedtaksperiode?.vedtaksperiodetype !== Vedtaksperiodetype.UTBETALING) return null;

    const utbetalingsperiodeDetaljerGruppertPåPerson =
        vedtaksperiode?.utbetalingsperiodeDetaljer
            .sort(sorterUtbetaling)
            .reduce(
                (acc: { [key: string]: IUtbetalingsperiodeDetalj[] }, utbetalingsperiodeDetalj) => {
                    const utbetalingsperiodeDetaljerForPerson =
                        acc[utbetalingsperiodeDetalj.person.personIdent] ?? [];

                    return {
                        ...acc,
                        [utbetalingsperiodeDetalj.person.personIdent]: [
                            ...utbetalingsperiodeDetaljerForPerson,
                            utbetalingsperiodeDetalj,
                        ],
                    };
                },
                {}
            ) ?? {};

    return (
        <LøpendeUtbetalinger gap="4">
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
