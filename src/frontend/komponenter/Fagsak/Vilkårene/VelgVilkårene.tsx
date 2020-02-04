import * as React from 'react';
import { IFagsak } from '../../../typer/fagsak';
import { useHistory } from 'react-router';
import { Knapp } from 'nav-frontend-knapper';


interface IProps {
    fagsak: IFagsak;
}

const VelgVilkårene: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();
    const [feilmelding, settFeilmelding] = React.useState('');


    return (
        <div className={'vilkårene'}>
                        <div className={'fastsett__navigering'}>
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        history.push(`/fagsak/opprett`);
                    }}
                    children={'Tilbake'}
                />
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                    }}
                    children={'Neste'}
                />
            </div>
        </div>
    );
}

export default VelgVilkårene;