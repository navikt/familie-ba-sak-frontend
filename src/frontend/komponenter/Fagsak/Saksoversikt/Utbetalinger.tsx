import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { IPersonBeregning } from '../../../typer/beregning';
import { formaterPersonIdent } from '../../../utils/formatter';

interface IUtbetalingerProps {
    personbergninger: IPersonBeregning[];
}

const Utbetalinger: React.FC<IUtbetalingerProps> = ({ personbergninger }) => {
    return (
        <div className={'saksoversikt__utbetalinger'}>
            <Undertittel children={'Utbetalinger'} />
            <table className="tabell">
                <thead>
                    <tr>
                        <th children={'Barn'} />
                        <th children={'Beløp'} />
                        <th children={'Periode'} />
                    </tr>
                </thead>
                <tbody>
                    {personbergninger
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
                                    <td children={`${personBeregning.stønadFom}`} />
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Utbetalinger;
