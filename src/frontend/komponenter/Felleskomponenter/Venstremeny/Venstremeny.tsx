import * as React from 'react';

import classNames from 'classnames';

import { Normaltekst } from 'nav-frontend-typografi';

import { hentDataFraRessurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import Link from './Link';
import { erSidenAktiv, IUnderside } from './sider';

const Venstremeny: React.FunctionComponent = () => {
    const { åpenBehandling, trinnPåBehandling } = useBehandling();
    const fagsak = hentDataFraRessurs(useFagsakRessurser().fagsak);

    return (
        <nav className={'venstremeny'}>
            {åpenBehandling.status === RessursStatus.SUKSESS
                ? Object.entries(trinnPåBehandling).map(([sideId, side], index: number) => {
                      const tilPath = `/fagsak/${fagsak?.id}/${åpenBehandling.data.behandlingId}/${side.href}`;

                      const undersider: IUnderside[] = side.undersider
                          ? side.undersider(åpenBehandling.data)
                          : [];

                      return (
                          <React.Fragment key={sideId}>
                              <Link
                                  active={erSidenAktiv(side, åpenBehandling.data)}
                                  id={sideId}
                                  to={tilPath}
                                  className={classNames(
                                      'venstremeny__link',
                                      erSidenAktiv(side, åpenBehandling.data) && 'hover-effekt'
                                  )}
                              >
                                  {`${side.steg ? `${index + 1}. ` : ''}${side.navn}`}
                              </Link>
                              {undersider.map((underside: IUnderside) => {
                                  const antallAksjonspunkter = underside.antallAksjonspunkter();
                                  return (
                                      <Link
                                          active={erSidenAktiv(side, åpenBehandling.data)}
                                          key={`${sideId}_${underside.hash}`}
                                          id={`${sideId}_${underside.hash}`}
                                          to={`${tilPath}#${underside.hash}`}
                                          className={classNames(
                                              'venstremeny__link',
                                              'underside',
                                              erSidenAktiv(side, åpenBehandling.data) &&
                                                  'hover-effekt'
                                          )}
                                      >
                                          <>
                                              {antallAksjonspunkter > 0 ? (
                                                  <div className={'underside__sirkel-tall'}>
                                                      {antallAksjonspunkter}
                                                  </div>
                                              ) : (
                                                  <div className={'underside__sirkel-plass'} />
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
