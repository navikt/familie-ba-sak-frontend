import classNames from 'classnames';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { RessursStatus } from '@navikt/familie-typer';
import { IFagsak } from '../../../typer/fagsak';
import Link from './Link';
import { erSidenInaktiv, ISide, sider, visSide, IUnderside } from './sider';
import { Normaltekst } from 'nav-frontend-typografi';

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

                          const undersider: IUnderside[] = side.undersider
                              ? side.undersider(åpenBehandling.data)
                              : [];

                          return (
                              <React.Fragment key={side.id}>
                                  <Link
                                      active={erSidenInaktiv(side, åpenBehandling.data.steg)}
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
                                  {undersider.map((underside: IUnderside) => {
                                      const antallAksjonspunkter = underside.antallAksjonspunkter();
                                      return (
                                          <Link
                                              key={`${side.id}_${underside.hash}`}
                                              id={`${side.id}_${underside.hash}`}
                                              to={`${tilPath}#${underside.hash}`}
                                              className={classNames(
                                                  'venstremeny__link',
                                                  'underside'
                                              )}
                                          >
                                              <>
                                                  {antallAksjonspunkter > 0 ? (
                                                      <div className={'underside__sirkel-tall'}>
                                                          {antallAksjonspunkter}
                                                      </div>
                                                  ) : (
                                                      <div
                                                          className={'underside__sirkel-plass'}
                                                      ></div>
                                                  )}
                                                  <Normaltekst>{underside.navn}</Normaltekst>
                                              </>
                                          </Link>
                                      );
                                  })}
                              </React.Fragment>
                          );
                      })
                : null}
        </nav>
    );
};

export default Venstremeny;
