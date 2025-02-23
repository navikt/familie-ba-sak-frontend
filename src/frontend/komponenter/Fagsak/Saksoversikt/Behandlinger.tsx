import React, { useState } from 'react';

import styled from 'styled-components';

import {
    Alert,
    BodyShort,
    Box,
    Fieldset,
    Heading,
    HStack,
    Skeleton,
    Table,
    VStack,
} from '@navikt/ds-react';

import { Behandling } from './Behandling';
import {
    filtrerOgSorterSaksoversiktbehandlingerForVisning,
    type Saksoversiktsbehandling,
} from './utils';
import { hentBehandlingId } from './utils';
import { VisHenlagtBehandlingerSwitch } from './VisHenlagtBehandlingerSwitch';
import { VisMåndligValutajuseringBehandlingerSwitch } from './VisMåndligValutajuseringBehandlingerSwitch';
import { useHentSaksoversiktsbehandlinger } from '../../../hooks/useHentSaksoversiktsbehandlinger';
import type { IMinimalFagsak } from '../../../typer/fagsak';

const StyledHeaderCell = styled(Table.HeaderCell)<{ width?: string }>`
    width ${props => props.width};
`;

interface Props {
    minimalFagsak: IMinimalFagsak;
}

export function Behandlinger({ minimalFagsak }: Props) {
    const [visHenlagteBehandlinger, setVisHenlagteBehandlinger] = useState(false);
    const [visMånedligeValutajusteringer, setVisMånedligeValutajusteringer] = useState(false);

    const {
        data: saksoversiktbehandlinger,
        isPending: påventerSaksoversiktbehandlinger,
        isFetching: henterSaksoversiktbehandlinger,
        errors: feilmeldinger,
    } = useHentSaksoversiktsbehandlinger(minimalFagsak);

    if (påventerSaksoversiktbehandlinger || henterSaksoversiktbehandlinger) {
        return (
            <Box marginBlock={'space-96 space-0'}>
                <Heading level={'2'} size={'medium'} spacing={true}>
                    Behandlinger
                </Heading>
                <VStack gap={'4'} marginBlock={'1 0'}>
                    <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                    <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                    <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                </VStack>
            </Box>
        );
    }

    return (
        <Box marginBlock={'space-96 space-0'}>
            <HStack gap={'3'} wrap={false} justify={'space-between'} align={'end'}>
                <Heading level={'2'} size={'medium'} spacing={true}>
                    Behandlinger
                </Heading>
                {saksoversiktbehandlinger && saksoversiktbehandlinger.length > 0 && (
                    <Fieldset legend={'Filtreringer på behandlinger'} hideLegend={true}>
                        <VisHenlagtBehandlingerSwitch
                            visHenlagteBehandlinger={visHenlagteBehandlinger}
                            setVisHenlagteBehandlinger={setVisHenlagteBehandlinger}
                            saksoversiktbehandlinger={saksoversiktbehandlinger}
                        />
                        <VisMåndligValutajuseringBehandlingerSwitch
                            visMånedligeValutajusteringer={visMånedligeValutajusteringer}
                            setVisMånedligeValutajusteringer={setVisMånedligeValutajusteringer}
                            saksoversiktbehandlinger={saksoversiktbehandlinger}
                        />
                    </Fieldset>
                )}
            </HStack>
            <VStack gap={'2'}>
                {feilmeldinger.klagebehandlingerError && (
                    <Alert variant={'warning'}>
                        {`En feil oppstod ved henting av klagebehandlinger: ${feilmeldinger.klagebehandlingerError}`}
                    </Alert>
                )}
                {feilmeldinger.tilbakekrevingsbehandlingerError && (
                    <Alert variant={'warning'}>
                        {`En feil oppstod ved henting av tilbakekrevingsbehandlinger: ${feilmeldinger.tilbakekrevingsbehandlingerError}`}
                    </Alert>
                )}
            </VStack>
            {saksoversiktbehandlinger && saksoversiktbehandlinger.length > 0 ? (
                <Table size={'large'}>
                    <Table.Header>
                        <Table.Row>
                            <StyledHeaderCell width={'10%'} scope={'col'}>
                                Opprettet
                            </StyledHeaderCell>
                            <Table.HeaderCell scope={'col'}>Årsak</Table.HeaderCell>
                            <Table.HeaderCell scope={'col'}>Type</Table.HeaderCell>
                            <Table.HeaderCell scope={'col'}>Behandlingstema</Table.HeaderCell>
                            <Table.HeaderCell scope={'col'}>Status</Table.HeaderCell>
                            <Table.HeaderCell scope={'col'}>Vedtaksdato</Table.HeaderCell>
                            <StyledHeaderCell width={'22%'} scope={'col'}>
                                Resultat
                            </StyledHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filtrerOgSorterSaksoversiktbehandlingerForVisning(
                            saksoversiktbehandlinger,
                            visHenlagteBehandlinger,
                            visMånedligeValutajusteringer
                        ).map((behandling: Saksoversiktsbehandling) => (
                            <Behandling
                                key={hentBehandlingId(behandling)}
                                saksoversiktsbehandling={behandling}
                                minimalFagsak={minimalFagsak}
                            />
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <BodyShort>Ingen tidligere behandlinger</BodyShort>
            )}
        </Box>
    );
}
