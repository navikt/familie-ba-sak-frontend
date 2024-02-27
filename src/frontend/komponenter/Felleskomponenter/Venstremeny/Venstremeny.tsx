import * as React from 'react';

import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react';
import {
    ABorderFocus,
    ABorderWarning,
    AGrayalpha500,
    ASpacing2,
    ASpacing6,
    ASpacing8,
    ASurfaceDefault,
    ASurfaceHover,
    ASurfaceWarning,
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

const MenyLenke = styled(Link)<{ $erLenkenAktiv: boolean }>`
    text-decoration: none;
    color: ${props => (props.$erLenkenAktiv ? ATextDefault : AGrayalpha500)};
    padding: ${ASpacing2} ${ASpacing8};

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

const UndersideSirkel = styled.span`
    border-color: ${ABorderWarning};
    border-radius: 50%;
    background-color: ${ASurfaceWarning};
    display: inline-grid;
    grid-column: circle;
    place-items: center;
    height: ${ASpacing6};
    width: ${ASpacing6};
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
                                            $erLenkenAktiv={erSidenAktiv(side, behandling)}
                                        >
                                            <HStack align="center" gap="1">
                                                {antallAksjonspunkter > 0 ? (
                                                    <UndersideSirkel>
                                                        {antallAksjonspunkter}
                                                    </UndersideSirkel>
                                                ) : (
                                                    <Box padding="3" />
                                                )}
                                                <BodyShort size="small">{underside.navn}</BodyShort>
                                            </HStack>
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
                    forwardedAs={Button}
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
