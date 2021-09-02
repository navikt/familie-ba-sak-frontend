import React from 'react';

import styled from 'styled-components';

import { Normaltekst, Element } from 'nav-frontend-typografi';

import { IUtbetalingsperiodeDetalj } from '../../../../../typer/vedtaksperiode';
import { sorterFødselsdato, formaterIdent, formaterBeløp } from '../../../../../utils/formatter';

interface IProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
}

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    .typo-normal {
        margin-right: 1.5rem;
    }
`;

const Utbetalingsresultat: React.FC<IProps> = ({ utbetalingsperiodeDetaljer }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <Element>Resultat</Element>

            {utbetalingsperiodeDetaljer
                .sort((utbetalingA, utbetalingB) =>
                    sorterFødselsdato(
                        utbetalingA.person.fødselsdato,
                        utbetalingB.person.fødselsdato
                    )
                )
                .map((detalj: IUtbetalingsperiodeDetalj) => (
                    <UtbetalingsperiodeDetalj key={detalj.person.personIdent}>
                        <Normaltekst title={detalj.person.navn}>
                            {formaterIdent(detalj.person.personIdent)}
                        </Normaltekst>

                        <Normaltekst>{formaterBeløp(detalj.utbetaltPerMnd)}</Normaltekst>
                    </UtbetalingsperiodeDetalj>
                ))}
        </div>
    );
};

export default Utbetalingsresultat;
