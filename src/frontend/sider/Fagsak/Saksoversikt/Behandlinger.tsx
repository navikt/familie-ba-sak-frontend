import React, { useState } from 'react';

import styled from 'styled-components';

import {
    Alert,
    BodyShort,
    Fieldset,
    Heading,
    HStack,
    Skeleton,
    Table,
    VStack,
} from '@navikt/ds-react';

import { Behandling } from './Behandling';
import { filtrertOgSorterSaksoversiktbehandlinger, type Saksoversiktsbehandling } from './utils';
import { hentBehandlingerTilSaksoversikten, hentBehandlingId } from './utils';
import { VisHenlagtBehandlingerSwitch } from './VisHenlagtBehandlingerSwitch';
import { VisMånedligValutajuseringBehandlingerSwitch } from './VisMånedligValutajuseringBehandlingerSwitch';
import { useHentBarnetrygdbehandlinger } from '../../../hooks/useHentBarnetrygdbehandlinger';
import { useHentKlagebehandlinger } from '../../../hooks/useHentKlagebehandlinger';
import { useHentTilbakekrevingsbehandlinger } from '../../../hooks/useHentTilbakekrevingsbehandlinger';

const StyledHeaderCell = styled(Table.HeaderCell)<{ width?: string }>`
    width ${props => props.width};
`;

const TableHeader = () => {
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
};

type Props = {
    fagsakId: number;
};

export function Behandlinger({ fagsakId }: Props) {
    const {
        data: barnetrygdbehandlinger,
        isPending: hentBarnetrygdbehandlingerLaster,
        error: hentBarnetrygdbehandlingerError,
    } = useHentBarnetrygdbehandlinger(fagsakId);

    const {
        data: klagebehandlinger,
        isPending: hentKlagebehandlingLaster,
        error: hentKlagebehandlingError,
    } = useHentKlagebehandlinger(fagsakId);

    const {
        data: tilbakekrevingsbehandlinger,
        isPending: hentTilbakekrevingsbehandlingerLaster,
        error: hentTilbakekrevingsbehandlingerError,
    } = useHentTilbakekrevingsbehandlinger(fagsakId);

    const [visHenlagteBehandlinger, setVisHenlagteBehandlinger] = useState(false);
    const [visMånedligeValutajusteringer, setVisMånedligeValutajusteringer] = useState(false);

    const behandlingerLaster =
        hentKlagebehandlingLaster ||
        hentTilbakekrevingsbehandlingerLaster ||
        hentBarnetrygdbehandlingerLaster;

    if (behandlingerLaster) {
        return (
            <VStack gap={'2'} marginBlock={'1 0'}>
                <Heading level={'2'} size={'medium'} spacing={true}>
                    Behandlinger
                </Heading>
                <Table size={'large'}>
                    <TableHeader />
                    <Table.Body />
                </Table>
                <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
            </VStack>
        );
    }

    const saksoversiktbehandlinger = hentBehandlingerTilSaksoversikten(
        barnetrygdbehandlinger ?? [],
        klagebehandlinger ?? [],
        tilbakekrevingsbehandlinger ?? []
    );

    return (
        <VStack gap={'4'} marginBlock={'1 0'}>
            {hentBarnetrygdbehandlingerError !== null && (
                <Alert variant={'warning'}>
                    <VStack gap={'4'}>
                        <BodyShort>
                            Barnetrygdbehandlinger er ikke tilgjengelig for øyeblikket.
                        </BodyShort>
                        {hentBarnetrygdbehandlingerError.message && (
                            <BodyShort>
                                Feilmelding: {hentBarnetrygdbehandlingerError.message}
                            </BodyShort>
                        )}
                    </VStack>
                </Alert>
            )}
            {hentKlagebehandlingError !== null && (
                <Alert variant={'warning'}>
                    <VStack gap={'4'}>
                        <BodyShort>
                            Klagebehandlinger er ikke tilgjengelig for øyeblikket.
                        </BodyShort>
                        {hentKlagebehandlingError.message && (
                            <BodyShort>Feilmelding: {hentKlagebehandlingError.message}</BodyShort>
                        )}
                    </VStack>
                </Alert>
            )}
            {hentTilbakekrevingsbehandlingerError !== null && (
                <Alert variant={'warning'}>
                    <VStack gap={'4'}>
                        <BodyShort>
                            Tilbakekrevingsbehandlinger er ikke tilgjengelig for øyeblikket.
                        </BodyShort>
                        {hentTilbakekrevingsbehandlingerError.message && (
                            <BodyShort>
                                Feilmelding: {hentTilbakekrevingsbehandlingerError.message}
                            </BodyShort>
                        )}
                    </VStack>
                </Alert>
            )}
            <HStack gap={'3'} wrap={false} justify={'space-between'} align={'end'}>
                <Heading level={'2'} size={'medium'} spacing={true}>
                    Behandlinger
                </Heading>
                <Fieldset legend={'Filtreringer på behandlinger'} hideLegend={true}>
                    <VisHenlagtBehandlingerSwitch
                        saksoversiktbehandlinger={saksoversiktbehandlinger}
                        visHenlagteBehandlinger={visHenlagteBehandlinger}
                        setVisHenlagteBehandlinger={setVisHenlagteBehandlinger}
                    />
                    <VisMånedligValutajuseringBehandlingerSwitch
                        saksoversiktbehandlinger={saksoversiktbehandlinger}
                        visMånedligeValutajusteringer={visMånedligeValutajusteringer}
                        setVisMånedligeValutajusteringer={setVisMånedligeValutajusteringer}
                    />
                </Fieldset>
            </HStack>
            {saksoversiktbehandlinger.length > 0 && (
                <Table size={'large'}>
                    <TableHeader />
                    <Table.Body>
                        {filtrertOgSorterSaksoversiktbehandlinger(
                            saksoversiktbehandlinger,
                            visHenlagteBehandlinger,
                            visMånedligeValutajusteringer
                        ).map((behandling: Saksoversiktsbehandling) => (
                            <Behandling
                                key={hentBehandlingId(behandling)}
                                saksoversiktsbehandling={behandling}
                                fagsakId={fagsakId}
                            />
                        ))}
                    </Table.Body>
                </Table>
            )}
            {saksoversiktbehandlinger.length === 0 && (
                <BodyShort>Ingen tidligere behandlinger</BodyShort>
            )}
        </VStack>
    );
}
