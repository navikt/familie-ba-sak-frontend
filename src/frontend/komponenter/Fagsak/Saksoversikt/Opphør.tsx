import moment from 'moment';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useApp } from '../../../context/AppContext';
import { IFagsak } from '../../../typer/fagsak';
import { datoformat } from '../../../utils/formatter';

interface IOpphørProps {
    fagsak: IFagsak;
}

const Opphør: React.FunctionComponent<IOpphørProps> = ({ fagsak }) => {
    const { axiosRequest } = useApp();
    const [opphørsdato, setOpphørsdato] = React.useState('');

    return (
        <div className={'saksoversikt__opphør'}>
            <Systemtittel children={'Opphør utbetalinger for fagsak'} />
            <Input
                bredde={'S'}
                label={'Fra og med-dato'}
                placeholder={'MM.YY'}
                value={opphørsdato}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setOpphørsdato(event.target.value)
                }
            />
            <Knapp
                mini={true}
                onClick={() => {
                    axiosRequest<void, { opphørsdato: string }>({
                        method: 'POST',
                        url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/opphoer-migrert-vedtak/v2`,
                        data: {
                            opphørsdato: moment(opphørsdato, datoformat.MÅNED, true).format(
                                'YYYY-MM-DD'
                            ),
                        },
                    });
                }}
                children={'Opphør utbetaling'}
            />
        </div>
    );
};

export default Opphør;
