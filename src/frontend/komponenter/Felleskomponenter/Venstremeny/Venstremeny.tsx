import * as React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { ASurfaceDefault } from '@navikt/ds-tokens/dist/tokens';

import Link from './Link';
import type { IUnderside } from './sider';
import { erSidenAktiv } from './sider';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';

const ToggleVisningVenstremeny = styled(Button)<{ åpenvenstremeny: boolean }>`
    position: fixed;
    margin-left: ${props => (props.åpenvenstremeny ? '-17px' : '0px')};
    top: 370px;
    width: 34px;
    min-width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: ${ASurfaceDefault};
`;

const ÅpenMenyContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const MenyItem = styled.div`
    display: inline-block;
`;

const Venstremeny: React.FunctionComponent = () => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { behandling, trinnPåBehandling, åpenVenstremeny, settÅpenVenstremeny } = useBehandling();

    return (
        <ÅpenMenyContainer>
            {åpenVenstremeny && (
                <MenyItem>
                    <nav className={'venstremeny'}>
                        <>
                            {Object.entries(trinnPåBehandling).map(
                                ([sideId, side], index: number) => {
                                    const tilPath = `/fagsak/${fagsakId}/${behandling.behandlingId}/${side.href}`;

                                    const undersider: IUnderside[] = side.undersider
                                        ? side.undersider(behandling)
                                        : [];

                                    return (
                                        <React.Fragment key={sideId}>
                                            <Link
                                                active={erSidenAktiv(side, behandling)}
                                                id={sideId}
                                                to={tilPath}
                                                className={classNames(
                                                    'venstremeny__link',
                                                    erSidenAktiv(side, behandling) && 'hover-effekt'
                                                )}
                                            >
                                                {`${side.steg ? `${index + 1}. ` : ''}${side.navn}`}
                                            </Link>
                                            {undersider.map((underside: IUnderside) => {
                                                const antallAksjonspunkter =
                                                    underside.antallAksjonspunkter();
                                                return (
                                                    <Link
                                                        active={erSidenAktiv(side, behandling)}
                                                        key={`${sideId}_${underside.hash}`}
                                                        id={`${sideId}_${underside.hash}`}
                                                        to={`${tilPath}#${underside.hash}`}
                                                        className={classNames(
                                                            'venstremeny__link',
                                                            'underside',
                                                            erSidenAktiv(side, behandling) &&
                                                                'hover-effekt'
                                                        )}
                                                    >
                                                        <>
                                                            {antallAksjonspunkter > 0 ? (
                                                                <div
                                                                    className={
                                                                        'underside__sirkel-tall'
                                                                    }
                                                                >
                                                                    {antallAksjonspunkter}
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={
                                                                        'underside__sirkel-plass'
                                                                    }
                                                                />
                                                            )}
                                                            <BodyShort size="small">
                                                                {underside.navn}
                                                            </BodyShort>
                                                        </>
                                                    </Link>
                                                );
                                            })}
                                        </React.Fragment>
                                    );
                                }
                            )}
                        </>
                    </nav>
                </MenyItem>
            )}
            <MenyItem>
                <ToggleVisningVenstremeny
                    variant="secondary"
                    onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                    onClick={() => {
                        settÅpenVenstremeny(!åpenVenstremeny);
                    }}
                    size="small"
                    aria-label="Skjul venstremeny"
                    åpenvenstremeny={åpenVenstremeny ? 1 : 0}
                    title={åpenVenstremeny ? 'Skjul venstremeny' : 'Vis venstremeny'}
                    icon={
                        åpenVenstremeny ? (
                            <ChevronLeftIcon aria-label="Vis venstremeny" />
                        ) : (
                            <ChevronRightIcon aria-label="Skjul venstremeny" />
                        )
                    }
                />
            </MenyItem>
        </ÅpenMenyContainer>
    );
};

export default Venstremeny;
