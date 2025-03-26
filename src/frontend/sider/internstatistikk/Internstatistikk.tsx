import React from 'react';

import styled from 'styled-components';

import { BodyShort, Heading, Table } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { useInternstatistikk } from './useInternstatistikk';
import { behandlingÅrsak } from '../../typer/behandling';

const Container = styled.div`
    padding: 5rem;
    height: 100%;
    overflow: auto;
`;

const Internstatistikk: React.FC = () => {
    const { internstatistikk, hentInternstatistikk } = useInternstatistikk();
    if (internstatistikk.status === RessursStatus.IKKE_HENTET) {
        hentInternstatistikk();
    }

    return (
        <Container>
            {internstatistikk.status === RessursStatus.SUKSESS && (
                <>
                    <Heading level="2" size="large" children={'Internstatistikk BA-SAK'} />
                    <BodyShort>
                        {`Antall fagsaker totalt: ${internstatistikk.data.antallFagsakerTotalt}`}
                    </BodyShort>

                    <BodyShort>
                        {`Antall løpende saker: ${internstatistikk.data.antallFagsakerLøpende}`}
                    </BodyShort>

                    <BodyShort spacing>
                        {`Antall behandlinger som ikke er ferdigstilt: ${internstatistikk.data.antallBehandlingerIkkeFerdigstilt}`}
                    </BodyShort>

                    <hr />
                    <Heading level="3" size="medium">
                        Antall behandlinger per årsak
                    </Heading>
                    <Table zebraStripes>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell scope="col">Behandlingsårsak</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Antall</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Object.entries(internstatistikk.data.antallBehandlingerPerÅrsak).map(
                                ([behandlingsårsak, antall]) => (
                                    <Table.Row key={`tabellrad-${behandlingsårsak}`}>
                                        <Table.DataCell>
                                            {
                                                // eslint-disable-next-line
                                                // @ts-ignore: her får vi riktig type, det er bare ts som ikke skjønner det
                                                behandlingÅrsak[behandlingsårsak]
                                            }
                                        </Table.DataCell>
                                        <Table.DataCell>{antall}</Table.DataCell>
                                    </Table.Row>
                                )
                            )}
                        </Table.Body>
                    </Table>
                </>
            )}
        </Container>
    );
};

export default Internstatistikk;
