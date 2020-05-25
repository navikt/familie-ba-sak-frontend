import * as React from 'react';
import { sider, erSidenInaktiv, ISide, visSide } from './sider';
import Link from './Link';
import { IFagsak } from '../../../typer/fagsak';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    fagsak: IFagsak;
}

const Venstremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useFagsakRessurser();

    return (
        <nav className={'venstremeny'}>
            {Object.values(sider)
                .filter((side: ISide) => visSide(side, åpenBehandling))
                .map((side: ISide, index: number) => (
                    <Link
                        active={erSidenInaktiv(side, åpenBehandling?.steg)}
                        key={side.id}
                        id={side.id}
                        to={`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/${side.href}`}
                        className={'venstremeny__link'}
                    >
                        {`${side.steg ? `${index}. ` : ''}${side.navn}`}
                    </Link>
                ))}
        </nav>
    );
};

export default Venstremeny;
