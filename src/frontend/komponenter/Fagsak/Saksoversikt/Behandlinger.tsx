import React, { useState } from 'react';

import { differenceInMilliseconds } from 'date-fns';
import styled from 'styled-components';

import { BodyShort, Fieldset, Heading, HStack, Spacer, Switch, Table } from '@navikt/ds-react';

import { Behandling } from './Behandling';
import type { Saksoversiktsbehandling } from './utils';
import {
    hentBehandlingerTilSaksoversikten,
    hentBehandlingId,
    hentTidspunktforSortering,
    skalVisesNårHenlagtBehandlingerSkjules,
    skalVisesNårMånedligeValutajusteringerSkjules,
} from './utils';
import { useFagsakContext } from '../../../context/fagsak/FagsakContext';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { isoStringTilDate } from '../../../utils/dato';

const StyledSwitch = styled(Switch)`
    margin-right: 0.275rem;
`;

const StyledFieldSet = styled(Fieldset)`
    float: right;
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
    const { klagebehandlinger } = useFagsakContext();

    const behandlinger = hentBehandlingerTilSaksoversikten(minimalFagsak, klagebehandlinger);

    const finnesHenlagteBehandlingerSomKanFiltreresBort = behandlinger.some(
        (behandling: Saksoversiktsbehandling) =>
            !skalVisesNårHenlagtBehandlingerSkjules(behandling, false)
    );

    const finnesMånedligValutajusteringerSomKanFiltreresBort = behandlinger.some(
        (behandling: Saksoversiktsbehandling) =>
            !skalVisesNårMånedligeValutajusteringerSkjules(behandling, false)
    );

    const [visHenlagteBehandlinger, setVisHenlagteBehandlinger] = useState(false);
    const [visMånedligeValutajusteringer, setVisMånedligeValutajusteringer] = useState(false);

    return (
        <div className={'saksoversikt__behandlingshistorikk'}>
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
            {behandlinger.length > 0 ? (
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
                        {behandlinger
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
        </div>
    );
};

export default Behandlinger;
