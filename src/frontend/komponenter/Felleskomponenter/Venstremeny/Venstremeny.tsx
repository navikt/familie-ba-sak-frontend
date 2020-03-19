import * as React from 'react';
import { sider, erSidenInaktiv, ISide, visSide } from './sider';
import Link from './Link';
import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';

interface IProps {
    fagsak: IFagsak;
}

const Venstremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    return (
        <nav className={'venstremeny'}>
            {Object.values(sider)
                .filter((side: ISide) => visSide(side, aktivBehandling))
                .map((side: ISide, index: number) => (
                    <Link
                        active={erSidenInaktiv(side, aktivBehandling?.steg)}
                        key={side.id}
                        id={side.id}
                        to={`/fagsak/${fagsak.id}/${side.href}`}
                        className={'venstremeny__link'}
                    >
                        {`${side.steg ? `${index}. ` : ''}${side.navn}`}
                    </Link>
                ))}
        </nav>
    );
};

export default Venstremeny;
