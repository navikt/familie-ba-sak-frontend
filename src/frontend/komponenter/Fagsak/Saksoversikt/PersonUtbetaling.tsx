import React from 'react';
import PersonInformasjon from '../../Felleskomponenter/PersonInformasjon/PersonInformasjon';
import DashedHr from '../../Felleskomponenter/DashedHr/DashedHr';
import { IBeregningDetalj } from '../../../typer/beregning';
import { Undertittel } from 'nav-frontend-typografi';

interface IPersonUtbetalingProps {
    beregningDetaljer: IBeregningDetalj[];
}

const PersonUtbetaling: React.FC<IPersonUtbetalingProps> = ({ beregningDetaljer }) => {
    return (
        <li>
            <PersonInformasjon person={beregningDetaljer[0].person} />
            {beregningDetaljer.map(beregningDetaljer => {
                return <Undertittel>{beregningDetaljer.ytelseType}</Undertittel>;
            })}
            <DashedHr />
        </li>
    );
};

export default PersonUtbetaling;
