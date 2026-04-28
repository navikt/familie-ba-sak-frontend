import React from 'react';

import styled from 'styled-components';

import { BodyShort, Heading, HStack, LocalAlert, Skeleton, Table, VStack } from '@navikt/ds-react';

import { Behandling } from './Behandling';
import { filtrerSaksoversiktbehandlinger, hentBehandlingerTilSaksoversikten, hentBehandlingId } from './utils';
import { VisHenlagtBehandlingerSwitch } from './VisHenlagtBehandlingerSwitch';
import { VisMånedligValutajuseringBehandlingerSwitch } from './VisMånedligValutajuseringBehandlingerSwitch';
import { useHentBarnetrygdbehandlinger } from '../../../hooks/useHentBarnetrygdbehandlinger';
import { useHentKlagebehandlinger } from '../../../hooks/useHentKlagebehandlinger';
import { useHentTilbakekrevingsbehandlinger } from '../../../hooks/useHentTilbakekrevingsbehandlinger';
import { useToggle } from '../../../hooks/useToggle';
import { useFagsakContext } from '../FagsakContext';

const StyledHeaderCell = styled(Table.HeaderCell)<{ width?: string }>`
    width ${props => props.width};
`;

function TableHeader() {
    return (
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
    );
}

export function Behandlinger() {
    const { fagsak } = useFagsakContext();

    const [visHenlagteBehandlinger, toggleVisHenlagteBehandlinger] = useToggle(false);
    const [visMånedligeValutajusteringer, toggleVisMånedligeValutajusteringer] = useToggle(false);

    const {
        data: barnetrygdbehandlinger,
        isPending: barnetrygdbehandlingerLaster,
        error: barnetrygdbehandlingerError,
    } = useHentBarnetrygdbehandlinger(fagsak.id);

    const {
        data: klagebehandlinger,
        isPending: klagebehandlingLaster,
        error: klagebehandlingError,
    } = useHentKlagebehandlinger(fagsak.id);

    const {
        data: tilbakekrevingsbehandlinger,
        isPending: tilbakekrevingsbehandlingerLaster,
        error: tilbakekrevingsbehandlingerError,
    } = useHentTilbakekrevingsbehandlinger(fagsak.id);

    if (klagebehandlingLaster || tilbakekrevingsbehandlingerLaster || barnetrygdbehandlingerLaster) {
        return (
            <VStack gap={'space-8'} marginBlock={'space-4 space-0'}>
                <HStack width={'100%'} align={'center'} justify={'space-between'}>
                    <Heading level={'2'} size={'medium'} spacing={true}>
                        Behandlinger
                    </Heading>
                </HStack>
                <Table size={'large'} stickyHeader={true}>
                    <TableHeader />
                    <Table.Body />
                </Table>
                <Skeleton data-testid={'skeleton'} variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                <Skeleton data-testid={'skeleton'} variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                <Skeleton data-testid={'skeleton'} variant={'rectangle'} width={'100%'} height={'2.5rem'} />
            </VStack>
        );
    }

    const saksoversiktbehandlinger = hentBehandlingerTilSaksoversikten(
        barnetrygdbehandlinger ?? [],
        klagebehandlinger ?? [],
        tilbakekrevingsbehandlinger ?? []
    );

    return (
        <VStack gap={'space-24'}>
            {barnetrygdbehandlingerError && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Barnetrygdbehandlinger er ikke tilgjengelig for øyeblikket.</LocalAlert.Title>
                    </LocalAlert.Header>
                    {barnetrygdbehandlingerError.message && (
                        <LocalAlert.Content>Feilmelding: ${barnetrygdbehandlingerError.message}</LocalAlert.Content>
                    )}
                </LocalAlert>
            )}
            {klagebehandlingError && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Klagebehandlinger er ikke tilgjengelig for øyeblikket.</LocalAlert.Title>
                    </LocalAlert.Header>
                    {klagebehandlingError.message && (
                        <LocalAlert.Content>Feilmelding: {klagebehandlingError.message}</LocalAlert.Content>
                    )}
                </LocalAlert>
            )}
            {tilbakekrevingsbehandlingerError && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            Tilbakekrevingsbehandlinger er ikke tilgjengelig for øyeblikket.
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                    {tilbakekrevingsbehandlingerError.message && (
                        <LocalAlert.Content>Feilmelding: {tilbakekrevingsbehandlingerError.message}</LocalAlert.Content>
                    )}
                </LocalAlert>
            )}
            <div>
                <HStack width={'100%'} align={'end'} justify={'space-between'}>
                    <Heading level={'2'} size={'medium'} spacing={true}>
                        Behandlinger
                    </Heading>
                    <VStack gap={'space-4'}>
                        <VisHenlagtBehandlingerSwitch
                            saksoversiktbehandlinger={saksoversiktbehandlinger}
                            visHenlagteBehandlinger={visHenlagteBehandlinger}
                            toggleVisHenlagteBehandlinger={toggleVisHenlagteBehandlinger}
                        />
                        <VisMånedligValutajuseringBehandlingerSwitch
                            saksoversiktbehandlinger={saksoversiktbehandlinger}
                            visMånedligeValutajusteringer={visMånedligeValutajusteringer}
                            toggleVisMånedligeValutajusteringer={toggleVisMånedligeValutajusteringer}
                        />
                    </VStack>
                </HStack>
                {saksoversiktbehandlinger.length === 0 && <BodyShort>Ingen tidligere behandlinger.</BodyShort>}
                {saksoversiktbehandlinger.length > 0 && (
                    <Table size={'large'} stickyHeader={true}>
                        <TableHeader />
                        <Table.Body>
                            {filtrerSaksoversiktbehandlinger(
                                saksoversiktbehandlinger,
                                visHenlagteBehandlinger,
                                visMånedligeValutajusteringer
                            ).map(behandling => (
                                <Behandling key={hentBehandlingId(behandling)} saksoversiktsbehandling={behandling} />
                            ))}
                        </Table.Body>
                    </Table>
                )}
            </div>
        </VStack>
    );
}
