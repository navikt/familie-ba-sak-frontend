import * as React from 'react';
import { Activity } from 'react';

import { NavLink } from 'react-router';
import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, Stack, VStack } from '@navikt/ds-react';
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

import { useVenstremeny } from './useVenstremeny';
import { useFagsakId } from '../../../../hooks/useFagsakId';
import { useBehandlingContext } from '../context/BehandlingContext';
import type { IUnderside } from '../Sider/sider';
import { erSidenAktiv } from '../Sider/sider';

const ToggleVisningVenstremeny = styled(Button)`
    position: absolute;
    margin-right: -20px;
    top: 370px;
    width: 34px;
    min-width: 34px;
    height: 34px;
    border-radius: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: ${ASurfaceDefault};
    z-index: 10;
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

export function Venstremeny() {
    const { behandling, trinnPåBehandling } = useBehandlingContext();

    const fagsakId = useFagsakId();
    const [erÅpen, settErÅpen] = useVenstremeny();

    const stansNavigeringDersomSidenIkkeErAktiv = (event: React.MouseEvent, sidenErAktiv: boolean) => {
        if (!sidenErAktiv) {
            event.preventDefault();
        }
    };

    const icon = erÅpen ? (
        <ChevronLeftIcon aria-label={'Vis venstremeny'} />
    ) : (
        <ChevronRightIcon aria-label={'Skjul venstremeny'} />
    );

    return (
        <Stack direction={'row-reverse'}>
            <ToggleVisningVenstremeny
                title={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                aria-label={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                variant={'secondary'}
                size={'small'}
                icon={icon}
                onMouseDown={e => e.preventDefault()}
                onClick={() => settErÅpen(prev => !prev)}
            />
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <Box as={'nav'} paddingBlock={'space-8'}>
                    {Object.entries(trinnPåBehandling).map(([sideId, side], index) => {
                        const tilPath = `/fagsak/${fagsakId}/${behandling.behandlingId}/${side.href}`;
                        const undersider = side.undersider ? side.undersider(behandling) : [];
                        const sidenErAktiv = erSidenAktiv(side, behandling);
                        return (
                            <VStack key={sideId}>
                                <MenyLenke
                                    id={sideId}
                                    to={tilPath}
                                    $erLenkenAktiv={sidenErAktiv}
                                    onClick={event => stansNavigeringDersomSidenIkkeErAktiv(event, sidenErAktiv)}
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
                                                stansNavigeringDersomSidenIkkeErAktiv(event, sidenErAktiv)
                                            }
                                        >
                                            <HStack align={'center'} gap={'1'}>
                                                {antallAksjonspunkter > 0 ? (
                                                    <UndersideSirkel>{antallAksjonspunkter}</UndersideSirkel>
                                                ) : (
                                                    <Box padding={'3'} />
                                                )}
                                                <BodyShort size={'small'}>{underside.navn}</BodyShort>
                                            </HStack>
                                        </MenyLenke>
                                    );
                                })}
                            </VStack>
                        );
                    })}
                </Box>
            </Activity>
        </Stack>
    );
}
