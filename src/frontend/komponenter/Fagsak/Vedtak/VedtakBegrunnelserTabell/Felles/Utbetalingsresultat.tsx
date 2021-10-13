import React from 'react';

import styled from 'styled-components';

import { Normaltekst, Element } from 'nav-frontend-typografi';

import { IUtbetalingsperiodeDetalj } from '../../../../../typer/vedtaksperiode';
import {
    formaterIdent,
    formaterBeløp,
    sorterPersonTypeOgFødselsdato,
} from '../../../../../utils/formatter';

interface IProps {
    utbetalingsperiodeDetaljer: IUtbetalingsperiodeDetalj[];
    filtrerDetalj?: (utbetalingsperiodeDetalj: IUtbetalingsperiodeDetalj) => boolean;
}

const UtbetalingsperiodeDetalj = styled.div`
    display: flex;
    flex-direction: row;

    .typo-normal {
        margin-right: 1.5rem;
    }
`;

const Utbetalingsresultat: React.FC<IProps> = ({
    filtrerDetalj = () => true,
    utbetalingsperiodeDetaljer,
}) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <Element>Resultat</Element>

            {utbetalingsperiodeDetaljer
                .filter(filtrerDetalj)
                .sort((utbetalingA, utbetalingB) =>
                    sorterPersonTypeOgFødselsdato(utbetalingA.person, utbetalingB.person)
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
