import React from 'react';

import styled from 'styled-components';

import { BodyShort, HStack } from '@navikt/ds-react';
import { Space16, Space32, Space8 } from '@navikt/ds-tokens/dist/tokens';

import { PersonInformasjonUtbetaling } from './PersonInformasjonUtbetaling';
import { YtelseType, ytelsetype } from '../../../typer/beregning';
import type { IUtbetalingsperiodeDetalj } from '../../../typer/vedtaksperiode';
import { formaterBeløp, hentAlder } from '../../../utils/formatter';

const Ytelser = styled.section`
    margin: ${Space8} 0 ${Space16} ${Space32};
    border-bottom: 1px dashed;
`;

const Ytelselinje = styled(HStack)`
    margin-bottom: ${Space16};
`;

interface IPersonUtbetalingProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

const PersonUtbetaling: React.FC<IPersonUtbetalingProps> = ({ utbetalingsperiodeDetaljer }) => {
    const genererTekstForOrdinær = (fødselsdato: string) =>
        hentAlder(fødselsdato) < 6 ? 'Ordinær (under 6 år)' : 'Ordinær (fra 6 år)';

    return (
        <section>
            <PersonInformasjonUtbetaling person={utbetalingsperiodeDetaljer[0].person} />
            <Ytelser>
                {utbetalingsperiodeDetaljer.map(utbetalingsperiodeDetalj => {
                    return (
                        <Ytelselinje justify="space-between" key={utbetalingsperiodeDetalj.person.personIdent}>
                            <BodyShort>
                                {utbetalingsperiodeDetalj.ytelseType === YtelseType.ORDINÆR_BARNETRYGD
                                    ? genererTekstForOrdinær(utbetalingsperiodeDetalj.person.fødselsdato)
                                    : ytelsetype[utbetalingsperiodeDetalj.ytelseType].navn}
                            </BodyShort>
                            <BodyShort>{formaterBeløp(utbetalingsperiodeDetalj.utbetaltPerMnd)}</BodyShort>
                        </Ytelselinje>
                    );
                })}
            </Ytelser>
        </section>
    );
};

export default PersonUtbetaling;
