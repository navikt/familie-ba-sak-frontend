import * as React from 'react';
import { IBeregningDetalj } from '../../../typer/beregning';

interface IProps {
    beregningDetaljer: IBeregningDetalj[];
}
const BeregningDetalj: React.FunctionComponent<IProps> = ({ beregningDetaljer }) => {
    return (
        <>
            {beregningDetaljer.map((detalj, index) => {
                return (
                    <div className="tilkjentytelse-detaljer-rad" key={index}>
                        <div className="tilkjentytelse-detaljer-kolonne">
                            {detalj.person.navn}|{detalj.person.personIdent}|{detalj.person.type}
                        </div>
                        <div className="tilkjentytelse-detaljer-kolonne">{detalj.stønadstype}</div>
                        <div className="tilkjentytelse-detaljer-kolonne">
                            {detalj.utbetaltPerMnd}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default BeregningDetalj;
