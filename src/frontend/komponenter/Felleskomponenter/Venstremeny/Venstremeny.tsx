import * as React from 'react';
import { sider, erSidenInaktiv } from './sider';
import Link from './Link';
import { IFagsak } from '../../../typer/fagsak';
import { IPar } from '../../../typer/common';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';

interface IProps {
    fagsak: IFagsak;
}

const Venstremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    return (
        <nav className={'venstremeny'}>
            {Object.values(sider).map((side: IPar) => (
                <Link
                    active={erSidenInaktiv(side, aktivBehandling?.steg)}
                    key={side.id}
                    id={side.id}
                    to={`/fagsak/${fagsak.id}/${side.navn}`}
                    className={'venstremeny__link'}
                >
                    {side.navn}
                </Link>
            ))}
        </nav>
    );
};

export default Venstremeny;
