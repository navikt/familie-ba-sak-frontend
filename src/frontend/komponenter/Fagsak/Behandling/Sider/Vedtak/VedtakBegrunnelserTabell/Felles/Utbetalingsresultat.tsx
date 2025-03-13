import React from 'react';

import styled from 'styled-components';

import { BodyShort, Label } from '@navikt/ds-react';

import type { IUtbetalingsperiodeDetalj } from '../../../../../../../typer/vedtaksperiode';
import {
    formaterIdent,
    formaterBeløp,
    sorterUtbetaling,
} from '../../../../../../../utils/formatter';

interface IProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    p + p {
        margin-left: 1.5rem;
    }
`;

const Utbetalingsresultat: React.FC<IProps> = ({ utbetalingsperiodeDetaljer }) => {
    if (utbetalingsperiodeDetaljer.length === 0) return null;

    return (
        <div style={{ marginBottom: '1rem' }}>
            <Label>Resultat</Label>

            {utbetalingsperiodeDetaljer
                .sort(sorterUtbetaling)
                .map((detalj: IUtbetalingsperiodeDetalj, index: number) => (
                    <UtbetalingsperiodeDetalj key={`${index}_${detalj.person.fødselsdato}`}>
                        <BodyShort title={detalj.person.navn}>
                            {formaterIdent(detalj.person.personIdent)}
                        </BodyShort>

                        <BodyShort>{formaterBeløp(detalj.utbetaltPerMnd)}</BodyShort>
                    </UtbetalingsperiodeDetalj>
                ))}
        </div>
    );
};

export default Utbetalingsresultat;
