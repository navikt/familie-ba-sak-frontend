import classNames from 'classnames';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { IFagsak } from '../../../typer/fagsak';
import { RessursStatus } from '../../../typer/ressurs';
import Link from './Link';
import { erSidenInaktiv, ISide, sider, visSide } from './sider';

interface IProps {
    fagsak: IFagsak;
}

const Venstremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useBehandling();

    return (
        <nav className={'venstremeny'}>
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
                                  className={classNames(
                                      'venstremeny__link',
                                      erSidenInaktiv(side, åpenBehandling.data.steg) &&
                                          'hover-effekt'
                                  )}
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
