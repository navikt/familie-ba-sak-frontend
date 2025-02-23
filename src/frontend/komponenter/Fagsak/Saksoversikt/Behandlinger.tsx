import React, { useState } from 'react';

import { differenceInMilliseconds } from 'date-fns';
import styled from 'styled-components';

import {
    Alert,
    BodyShort,
    Fieldset,
    Heading,
    HStack,
    Skeleton,
    Spacer,
    Switch,
    Table,
    VStack,
} from '@navikt/ds-react';

import { Behandling } from './Behandling';
import type { Saksoversiktsbehandling } from './utils';
import {
    hentBehandlingId,
    hentTidspunktforSortering,
    skalVisesNårHenlagtBehandlingerSkjules,
    skalVisesNårMånedligeValutajusteringerSkjules,
} from './utils';
import { useHentSaksoversiktsbehandlinger } from '../../../hooks/useHentSaksoversiktsbehandlinger';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { isoStringTilDate } from '../../../utils/dato';

const StyledSwitch = styled(Switch)`
    margin-right: 0.275rem;
`;

const StyledFieldSet = styled(Fieldset)`
    display: flex;
    flex-direction: column;
`;

const StyledHeading = styled(Heading)`
    margin-top: 3.75rem;
`;

const StyledDiv = styled.div`
    margin-top: auto;
`;

const StyledOpprettetKolonne = styled(Table.HeaderCell)`
    width: 10%;
`;

const StyledResultatKolonne = styled(Table.HeaderCell)`
    width: 22%;
`;

interface IBehandlingshistorikkProps {
    minimalFagsak: IMinimalFagsak;
}

const Behandlinger: React.FC<IBehandlingshistorikkProps> = ({ minimalFagsak }) => {
    const [visHenlagteBehandlinger, setVisHenlagteBehandlinger] = useState(false);
    const [visMånedligeValutajusteringer, setVisMånedligeValutajusteringer] = useState(false);

    const { data, isPending, errors } = useHentSaksoversiktsbehandlinger(minimalFagsak);

    if (isPending) {
        return (
            <VStack gap={'4'}>
                <StyledHeading level="2" size={'medium'} spacing>
                    Behandlinger
                </StyledHeading>
                <Table size={'large'}>
                    <Table.Header>
                        <Table.Row>
                            <StyledOpprettetKolonne scope="col">Opprettet</StyledOpprettetKolonne>
                            <Table.HeaderCell scope="col">Årsak</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Type</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Behandlingstema</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Vedtaksdato</Table.HeaderCell>
                            <StyledResultatKolonne scope="col">Resultat</StyledResultatKolonne>
                        </Table.Row>
                    </Table.Header>
                </Table>
                <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
                <Skeleton variant={'rectangle'} width={'100%'} height={'2.5rem'} />
            </VStack>
        );
    }

    const finnesHenlagteBehandlingerSomKanFiltreresBort = (data ?? []).some(
        (behandling: Saksoversiktsbehandling) =>
            !skalVisesNårHenlagtBehandlingerSkjules(behandling, false)
    );

    const finnesMånedligValutajusteringerSomKanFiltreresBort = (data ?? []).some(
        (behandling: Saksoversiktsbehandling) =>
            !skalVisesNårMånedligeValutajusteringerSkjules(behandling, false)
    );

    return (
        <>
            <HStack gap="3" wrap={false}>
                <StyledHeading level="2" size={'medium'} spacing>
                    Behandlinger
                </StyledHeading>
                <Spacer />
                <StyledDiv>
                    <StyledFieldSet legend="Filtreringer på behandlinger" hideLegend>
                        {finnesHenlagteBehandlingerSomKanFiltreresBort && (
                            <StyledSwitch
                                size="small"
                                position="left"
                                id={'vis-henlagte-behandlinger'}
                                checked={visHenlagteBehandlinger}
                                onChange={() => {
                                    setVisHenlagteBehandlinger(!visHenlagteBehandlinger);
                                }}
                            >
                                Vis henlagte behandlinger
                            </StyledSwitch>
                        )}
                        {finnesMånedligValutajusteringerSomKanFiltreresBort && (
                            <StyledSwitch
                                size="small"
                                position="left"
                                id={'vis-månedlig-valutajustering-behandlinger'}
                                checked={visMånedligeValutajusteringer}
                                onChange={() => {
                                    setVisMånedligeValutajusteringer(
                                        !visMånedligeValutajusteringer
                                    );
                                }}
                            >
                                Vis månedlige valutajusteringer
                            </StyledSwitch>
                        )}
                    </StyledFieldSet>
                </StyledDiv>
            </HStack>
            <VStack gap={'2'}>
                {!errors.klagebehandlingerError && (
                    <Alert variant={'warning'}>
                        {`Klarte ikke laste inn klagebehandlinger: ${errors.klagebehandlingerError}`}
                    </Alert>
                )}
                {!errors.tilbakekrevingsbehandlingerError && (
                    <Alert variant={'warning'}>
                        {`Klarte ikke laste inn tilbakekrevingsbehandlinger: ${errors.tilbakekrevingsbehandlingerError}`}
                    </Alert>
                )}
            </VStack>
            {data && data.length > 0 ? (
                <Table size={'large'}>
                    <Table.Header>
                        <Table.Row>
                            <StyledOpprettetKolonne scope="col">Opprettet</StyledOpprettetKolonne>
                            <Table.HeaderCell scope="col">Årsak</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Type</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Behandlingstema</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Vedtaksdato</Table.HeaderCell>
                            <StyledResultatKolonne scope="col">Resultat</StyledResultatKolonne>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data
                            .filter(
                                behandling =>
                                    skalVisesNårHenlagtBehandlingerSkjules(
                                        behandling,
                                        visHenlagteBehandlinger
                                    ) &&
                                    skalVisesNårMånedligeValutajusteringerSkjules(
                                        behandling,
                                        visMånedligeValutajusteringer
                                    )
                            )
                            .sort((a, b) =>
                                differenceInMilliseconds(
                                    isoStringTilDate(hentTidspunktforSortering(b)),
                                    isoStringTilDate(hentTidspunktforSortering(a))
                                )
                            )
                            .map((behandling: Saksoversiktsbehandling) => (
                                <Behandling
                                    key={hentBehandlingId(behandling)}
                                    saksoversiktsbehandling={behandling}
                                    minimalFagsak={minimalFagsak}
                                />
                            ))}
                    </Table.Body>
                </Table>
            ) : (
                <BodyShort children={'Ingen tidligere behandlinger'} />
            )}
        </>
    );
};

export default Behandlinger;
