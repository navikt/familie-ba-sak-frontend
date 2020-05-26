import * as React from 'react';
import { sider, erSidenInaktiv, ISide, visSide } from './sider';
import Link from './Link';
import { IFagsak } from '../../../typer/fagsak';
import { useBehandling } from '../../../context/BehandlingContext';

interface IProps {
    fagsak: IFagsak;
}

const Venstremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useBehandling();

    return (
        <nav className={'venstremeny'}>
            {Object.values(sider)
                .filter((side: ISide) => visSide(side, åpenBehandling))
                .map((side: ISide, index: number) => {
                    const tilPath =
                        side.id == 'SAKSOVERSIKT'
                            ? `/fagsak/${fagsak.id}/${side.href}`
                            : `/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/${side.href}`;
                    return (
                        <Link
                            active={erSidenInaktiv(side, åpenBehandling?.steg)}
                            key={side.id}
                            id={side.id}
                            to={tilPath}
                            className={'venstremeny__link'}
                        >
                            {`${side.steg ? `${index}. ` : ''}${side.navn}`}
                        </Link>
                    );
                })}
        </nav>
    );
};

export default Venstremeny;
