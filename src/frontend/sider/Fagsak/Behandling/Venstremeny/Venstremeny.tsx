import type { MouseEvent } from 'react';
import { Activity } from 'react';

import classNames from 'classnames';
import { NavLink } from 'react-router';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, CopyButton, HStack, Stack, VStack } from '@navikt/ds-react';

import { useVenstremeny } from './useVenstremeny';
import Styles from './Venstremeny.module.css';
import { useFagsakId } from '../../../../hooks/useFagsakId';
import { formaterIdent } from '../../../../utils/formatter';
import { useBehandlingContext } from '../context/BehandlingContext';
import { erSidenAktiv } from '../Sider/sider';

export function Venstremeny() {
    const { behandling, trinnPåBehandling } = useBehandlingContext();

    const fagsakId = useFagsakId();
    const [erÅpen, settErÅpen] = useVenstremeny();

    function stansNavigeringDersomSidenIkkeErAktiv(event: MouseEvent, sidenErAktiv: boolean) {
        if (!sidenErAktiv) {
            event.preventDefault();
        }
    }

    const icon = erÅpen ? (
        <ChevronLeftIcon aria-label={'Vis venstremeny'} />
    ) : (
        <ChevronRightIcon aria-label={'Skjul venstremeny'} />
    );

    return (
        <Stack direction={'row-reverse'}>
            <Button
                title={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                aria-label={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                className={Styles.knapp}
                variant={'secondary'}
                size={'small'}
                icon={icon}
                onMouseDown={e => e.preventDefault()}
                onClick={() => settErÅpen(prev => !prev)}
            />
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <Box as={'nav'} width={'clamp(14rem, 15vw, 25rem)'}>
                    {Object.entries(trinnPåBehandling).map(([sideId, side], index) => {
                        const tilPath = `/fagsak/${fagsakId}/${behandling.behandlingId}/${side.href}`;
                        const undersider = side.undersider ? side.undersider(behandling) : [];
                        const sidenErAktiv = erSidenAktiv(side, behandling);
                        return (
                            <VStack key={sideId}>
                                <NavLink
                                    to={tilPath}
                                    className={({ isActive }) =>
                                        classNames(Styles.menylenke, {
                                            [Styles.active]: isActive,
                                            [Styles.lenkeAktiv]: sidenErAktiv,
                                            [Styles.lenkeInaktiv]: !sidenErAktiv,
                                        })
                                    }
                                    onClick={event => stansNavigeringDersomSidenIkkeErAktiv(event, sidenErAktiv)}
                                    draggable={false}
                                >
                                    {`${index + 1}. ${side.navn}`}
                                </NavLink>
                                {undersider.map(underside => {
                                    const antallAksjonspunkter = underside.antallAksjonspunkter();
                                    return (
                                        <NavLink
                                            key={`${sideId}_${underside.hash}`}
                                            to={`${tilPath}#${underside.hash}`}
                                            className={({ isActive }) =>
                                                classNames(Styles.undersidelenke, {
                                                    [Styles.active]: isActive,
                                                    [Styles.lenkeAktiv]: sidenErAktiv,
                                                    [Styles.lenkeInaktiv]: !sidenErAktiv,
                                                })
                                            }
                                            onClick={event =>
                                                stansNavigeringDersomSidenIkkeErAktiv(event, sidenErAktiv)
                                            }
                                            draggable={false}
                                        >
                                            <HStack align={'center'} gap={'space-8'} wrap={false}>
                                                {antallAksjonspunkter > 0 ? (
                                                    <span className={Styles.undersideSirkel}>
                                                        {antallAksjonspunkter}
                                                    </span>
                                                ) : (
                                                    <Box padding={'space-12'} />
                                                )}
                                                <VStack>
                                                    <BodyShort size={'small'}>{underside.navn}</BodyShort>
                                                    {underside.ident && !underside.skjermesForBruker && (
                                                        <HStack align={'center'}>
                                                            <BodyShort size={'small'} className={Styles.ident}>
                                                                {formaterIdent(underside.ident)}
                                                            </BodyShort>
                                                            <CopyButton copyText={underside.ident} size={'xsmall'} />
                                                        </HStack>
                                                    )}
                                                </VStack>
                                            </HStack>
                                        </NavLink>
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
