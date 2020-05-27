import * as React from 'react';
import { sider, erSidenInaktiv, ISide, visSide } from './sider';
import Link from './Link';
import { IFagsak } from '../../../typer/fagsak';
import { useBehandling } from '../../../context/BehandlingContext';
import { RessursStatus } from '../../../typer/ressurs';

interface IProps {
    fagsak: IFagsak;
}

const Venstremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useBehandling();

    return (
        <nav className={'venstremeny'}>
            <Link
                active={true}
                key={'saksoversikt'}
                id={'saksoversikt'}
                to={`/fagsak/${fagsak.id}/saksoversikt`}
                className={'venstremeny__link'}
            >
                {`Saksoversikt`}
            </Link>

            {åpenBehandling.status === RessursStatus.SUKSESS
                ? Object.values(sider)
                      .filter((side: ISide) => visSide(side, åpenBehandling.data))
                      .map((side: ISide, index: number) => {
                          const tilPath =
                              side.id === 'SAKSOVERSIKT'
                                  ? `/fagsak/${fagsak.id}/${side.href}`
                                  : `/fagsak/${fagsak.id}/${åpenBehandling.data.behandlingId}/${side.href}`;
                          return (
                              <Link
                                  active={erSidenInaktiv(side, åpenBehandling.data.steg)}
                                  key={side.id}
                                  id={side.id}
                                  to={tilPath}
                                  className={'venstremeny__link'}
                              >
                                  {`${side.steg ? `${index + 1}. ` : ''}${side.navn}`}
                              </Link>
                          );
                      })
                : null}
        </nav>
    );
};

export default Venstremeny;
