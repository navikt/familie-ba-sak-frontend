import * as React from 'react';

import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';
import {
    ABorderFocus,
    AGrayalpha500,
    ASpacing14,
    ASpacing2,
    ASpacing8,
    ASurfaceDefault,
    ASurfaceHover,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';

import Link from './Link';
import type { IUnderside } from './sider';
import { erSidenAktiv } from './sider';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';

const ToggleVisningVenstremeny = styled(Button)<{ $åpenvenstremeny: boolean }>`
    position: fixed;
    margin-left: ${props => (props.$åpenvenstremeny ? '-17px' : '0px')};
    top: 370px;
    width: 34px;
    min-width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: ${ASurfaceDefault};
`;

const Meny = styled(VStack)`
    padding: ${ASpacing8} 0;
`;

const MenyLenke = styled(Link)<{ $erLenkenAktiv: boolean; $erUnderside?: boolean }>`
    text-decoration: none;
    color: ${props => (props.$erLenkenAktiv ? ATextDefault : AGrayalpha500)};
    padding: ${ASpacing2} ${ASpacing8};
    padding-left: ${props => props.$erUnderside && ASpacing14};

    &:focus {
        box-shadow: 0 0 0 3px ${ABorderFocus};
        outline: none;
    }

    ${props => {
        if (props.$erLenkenAktiv)
            return `
                &:hover {
                    background: ${ASurfaceHover};
                }
        `;
    }};
`;

const Venstremeny: React.FunctionComponent = () => {
    const { fagsakId } = useSakOgBehandlingParams();
    const { behandling, trinnPåBehandling, åpenVenstremeny, settÅpenVenstremeny } = useBehandling();

    return (
        <HStack justify="start">
            {åpenVenstremeny && (
                <Meny as="nav">
                    {Object.entries(trinnPåBehandling).map(([sideId, side], index: number) => {
                        const tilPath = `/fagsak/${fagsakId}/${behandling.behandlingId}/${side.href}`;

                        const undersider: IUnderside[] = side.undersider
                            ? side.undersider(behandling)
                            : [];

                        return (
                            <VStack key={sideId}>
                                <MenyLenke
                                    active={erSidenAktiv(side, behandling)}
                                    id={sideId}
                                    to={tilPath}
                                    $erLenkenAktiv={erSidenAktiv(side, behandling)}
                                >
                                    {`${side.steg ? `${index + 1}. ` : ''}${side.navn}`}
                                </MenyLenke>
                                {undersider.map((underside: IUnderside) => {
                                    const antallAksjonspunkter = underside.antallAksjonspunkter();
                                    return (
                                        <MenyLenke
                                            active={erSidenAktiv(side, behandling)}
                                            key={`${sideId}_${underside.hash}`}
                                            id={`${sideId}_${underside.hash}`}
                                            to={`${tilPath}#${underside.hash}`}
                                            $erUnderside
                                            $erLenkenAktiv={erSidenAktiv(side, behandling)}
                                        >
                                            <>
                                                {antallAksjonspunkter > 0 ? (
                                                    <div className={'underside__sirkel-tall'}>
                                                        {antallAksjonspunkter}
                                                    </div>
                                                ) : (
                                                    <div className={'underside__sirkel-plass'} />
                                                )}
                                                <BodyShort size="small">{underside.navn}</BodyShort>
                                            </>
                                        </MenyLenke>
                                    );
                                })}
                            </VStack>
                        );
                    })}
                </Meny>
            )}
            <div>
                <ToggleVisningVenstremeny
                    variant="secondary"
                    onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                    onClick={() => {
                        settÅpenVenstremeny(!åpenVenstremeny);
                    }}
                    size="small"
                    aria-label="Skjul venstremeny"
                    $åpenvenstremeny={åpenVenstremeny ? 1 : 0}
                    title={åpenVenstremeny ? 'Skjul venstremeny' : 'Vis venstremeny'}
                    icon={
                        åpenVenstremeny ? (
                            <ChevronLeftIcon aria-label="Vis venstremeny" />
                        ) : (
                            <ChevronRightIcon aria-label="Skjul venstremeny" />
                        )
                    }
                />
            </div>
        </HStack>
    );
};

export default Venstremeny;
