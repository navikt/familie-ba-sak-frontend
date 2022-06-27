import * as React from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { BackFilled, NextFilled } from '@navikt/ds-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import Link from './Link';
import type { IUnderside } from './sider';
import { erSidenAktiv } from './sider';

const ToggleVisningVenstremeny = styled(Button)`
    position: fixed;
    margin-left: ${(props: { åpenvenstremeny: boolean }) =>
        props.åpenvenstremeny ? '-17px' : '0px'};
    top: 370px;
    width: 34px;
    min-width: 34px;
    height: 34px;
    padding: 0px;
    border-radius: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
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
    const { åpenBehandling, trinnPåBehandling, åpenVenstremeny, settÅpenVenstremeny } =
        useBehandling();

    return (
        <ÅpenMenyContainer>
            {åpenVenstremeny && (
                <MenyItem>
                    <nav className={'venstremeny'}>
                        {åpenBehandling.status === RessursStatus.SUKSESS ? (
                            <>
                                {Object.entries(trinnPåBehandling).map(
                                    ([sideId, side], index: number) => {
                                        const tilPath = `/fagsak/${fagsakId}/${åpenBehandling.data.behandlingId}/${side.href}`;

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
                                                        erSidenAktiv(side, åpenBehandling.data) &&
                                                            'hover-effekt'
                                                    )}
                                                >
                                                    {`${side.steg ? `${index + 1}. ` : ''}${
                                                        side.navn
                                                    }`}
                                                </Link>
                                                {undersider.map((underside: IUnderside) => {
                                                    const antallAksjonspunkter =
                                                        underside.antallAksjonspunkter();
                                                    return (
                                                        <Link
                                                            active={erSidenAktiv(
                                                                side,
                                                                åpenBehandling.data
                                                            )}
                                                            key={`${sideId}_${underside.hash}`}
                                                            id={`${sideId}_${underside.hash}`}
                                                            to={`${tilPath}#${underside.hash}`}
                                                            className={classNames(
                                                                'venstremeny__link',
                                                                'underside',
                                                                erSidenAktiv(
                                                                    side,
                                                                    åpenBehandling.data
                                                                ) && 'hover-effekt'
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
                        ) : null}
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
                >
                    {åpenVenstremeny ? (
                        <BackFilled aria-label="Vis venstremeny" />
                    ) : (
                        <NextFilled aria-label="Skjul venstremeny" />
                    )}
                </ToggleVisningVenstremeny>
            </MenyItem>
        </ÅpenMenyContainer>
    );
};

export default Venstremeny;
