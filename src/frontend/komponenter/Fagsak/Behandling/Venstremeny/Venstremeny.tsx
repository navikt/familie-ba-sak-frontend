import * as React from 'react';

import { NavLink } from 'react-router';
import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react';
import {
    ABorderFocus,
    ABorderSelected,
    ABorderWarning,
    AGrayalpha500,
    ASpacing2,
    ASpacing6,
    ASpacing8,
    ASurfaceDefault,
    ASurfaceHover,
    ASurfaceNeutralSubtle,
    ASurfaceWarning,
    ATextDefault,
} from '@navikt/ds-tokens/dist/tokens';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import useSakOgBehandlingParams from '../../../../hooks/useSakOgBehandlingParams';
import type { IUnderside } from '../Sider/sider';
import { erSidenAktiv } from '../Sider/sider';

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

const MenyLenke = styled(NavLink)<{ $erLenkenAktiv: boolean }>`
    text-decoration: none;
    color: ${props => (props.$erLenkenAktiv ? ATextDefault : AGrayalpha500)};
    padding: ${ASpacing2} ${ASpacing8};

    &:focus {
        box-shadow: 0 0 0 3px ${ABorderFocus};
        outline: none;
    }

    &.active {
        background-color: ${ASurfaceNeutralSubtle};
        box-shadow: inset 0.35rem 0 0 0 ${ABorderSelected};
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

    const stansNavigeringDersomSidenIkkeErAktiv = (
        event: React.MouseEvent,
        sidenErAktiv: boolean
    ) => {
        if (!sidenErAktiv) {
            event.preventDefault();
        }
    };

    return (
        <HStack justify="start">
            {åpenVenstremeny && (
                <Meny as="nav">
                    {Object.entries(trinnPåBehandling).map(([sideId, side], index: number) => {
                        const tilPath = `/fagsak/${fagsakId}/${behandling.behandlingId}/${side.href}`;

                        const undersider: IUnderside[] = side.undersider
                            ? side.undersider(behandling)
                            : [];

                        const sidenErAktiv = erSidenAktiv(side, behandling);

                        return (
                            <VStack key={sideId}>
                                <MenyLenke
                                    id={sideId}
                                    to={tilPath}
                                    $erLenkenAktiv={sidenErAktiv}
                                    onClick={event =>
                                        stansNavigeringDersomSidenIkkeErAktiv(event, sidenErAktiv)
                                    }
                                >
                                    {`${side.steg ? `${index + 1}. ` : ''}${side.navn}`}
                                </MenyLenke>
                                {undersider.map((underside: IUnderside) => {
                                    const antallAksjonspunkter = underside.antallAksjonspunkter();
                                    return (
                                        <MenyLenke
                                            key={`${sideId}_${underside.hash}`}
                                            id={`${sideId}_${underside.hash}`}
                                            to={`${tilPath}#${underside.hash}`}
                                            $erLenkenAktiv={sidenErAktiv}
                                            onClick={event =>
                                                stansNavigeringDersomSidenIkkeErAktiv(
                                                    event,
                                                    sidenErAktiv
                                                )
                                            }
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
