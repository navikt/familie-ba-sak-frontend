import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { IPersonBeregning } from '../../../typer/beregning';
import { formaterPersonIdent } from '../../../utils/formatter';
import { periodeToString } from '../../../typer/periode';

interface IUtbetalingerProps {
    personberegninger: IPersonBeregning[];
}

const Utbetalinger: React.FC<IUtbetalingerProps> = ({ personberegninger }) => {
    return (
        <div className={'saksoversikt__utbetalinger'}>
            <Undertittel>Løpende månedlig utbetaling</Undertittel>
            <table className="tabell">
                <thead>
                    <tr>
                        <th children={'Barn'} />
                        <th children={'Beløp'} />
                        <th children={'Periode'} />
                    </tr>
                </thead>
                <tbody>
                    {personberegninger
                        .filter(
                            (personBeregning: IPersonBeregning) =>
                                personBeregning.ytelsePerioder.length > 0
                        )
                        .map((personBeregning: IPersonBeregning) => {
                            return (
                                <tr key={personBeregning.personIdent}>
                                    <td
                                        children={`${formaterPersonIdent(
                                            personBeregning.personIdent
                                        )}`}
                                    />
                                    <td children={`${personBeregning.beløp}`} />
                                    <td
                                        children={`${periodeToString({
                                            fom: personBeregning.stønadFom,
                                            tom: personBeregning.stønadTom,
                                        })}`}
                                    />
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Utbetalinger;
