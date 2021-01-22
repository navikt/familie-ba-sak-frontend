import React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';

import { FamilieCheckbox } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { behandlingsstatuser } from '../../../../node_dist/frontend/typer/behandling';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { IBehandling } from '../../typer/behandling';
import familieDayjs from '../../utils/familieDayjs';
import { datoformat, formaterDato, formaterTilKunFørstBokstavStor } from '../../utils/formatter';

const KnyttDiv = styled.div`
    margin-top: 20px;
`;

const BehandlingstypeTd = styled.td`
    min-width: 12rem;
    label {
        text-indent: 2rem !important;
    }
`;

const KnyttTilBehandlingTd = styled.td`
    width: 2rem;
`;

const GenerellSakInfoStripeTittel = styled.div`
    font-weight: bold;
`;
export const KnyttJournalpostTilBehandling: React.FC = () => {
    const {
        settTilknyttedeBehandlingIder,
        dataForManuellJournalføring,
        hentSorterteBehandlinger,
        tilknyttedeBehandlingIder,
        visKnyttTilNyBehandling,
        knyttTilNyBehandling,
        settKnyttTilNyBehandling,
    } = useManuellJournalfør();

    if (dataForManuellJournalføring.status !== RessursStatus.SUKSESS) {
        return <></>;
    }

    const visGenerellSakInfoStripe =
        tilknyttedeBehandlingIder.length === 0 && !knyttTilNyBehandling;
    return (
        <KnyttDiv>
            <br />
            {dataForManuellJournalføring.data.fagsak?.behandlinger.length && (
                <>
                    <Undertittel>Knytt til tidligere behandling(er)</Undertittel>
                    <table className="tabell">
                        <thead className="tabell__head">
                            <tr className="tabell__head__tr">
                                <th></th>
                                <th>{'Dato'}</th>
                                <th>{'Årsak'}</th>
                                <th>{'Behandlingstype'}</th>
                                <th>{'Status'}</th>
                            </tr>
                        </thead>
                        <tbody className="tabell__body">
                            {hentSorterteBehandlinger().map((behandling: IBehandling) => (
                                <tr key={behandling.behandlingId}>
                                    <KnyttTilBehandlingTd>
                                        <FamilieCheckbox
                                            erLesevisning={false}
                                            label={'-'}
                                            checked={tilknyttedeBehandlingIder.includes(
                                                behandling.behandlingId
                                            )}
                                            onChange={() => {
                                                settTilknyttedeBehandlingIder([
                                                    ...tilknyttedeBehandlingIder.filter(
                                                        it => it !== behandling.behandlingId
                                                    ),
                                                    ...(tilknyttedeBehandlingIder.includes(
                                                        behandling.behandlingId
                                                    )
                                                        ? []
                                                        : [behandling.behandlingId]),
                                                ]);
                                            }}
                                        />
                                    </KnyttTilBehandlingTd>
                                    <td>
                                        {formaterDato(
                                            familieDayjs(behandling.opprettetTidspunkt),
                                            datoformat.DATO_FORKORTTET
                                        )}
                                    </td>
                                    <td>{formaterTilKunFørstBokstavStor(behandling.årsak)}</td>
                                    <BehandlingstypeTd>
                                        {formaterTilKunFørstBokstavStor(behandling.type)}
                                    </BehandlingstypeTd>
                                    <td>
                                        {formaterTilKunFørstBokstavStor(
                                            behandlingsstatuser[behandling.status]
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {visKnyttTilNyBehandling && (
                <>
                    <br />
                    <Undertittel>Knytt til ny behandling</Undertittel>
                    <br />
                    <Panel border={true}>
                        <FamilieCheckbox
                            erLesevisning={false}
                            label={'Knytt til ny behandling'}
                            checked={knyttTilNyBehandling}
                            onChange={() => {
                                settKnyttTilNyBehandling(!knyttTilNyBehandling);
                            }}
                        />
                    </Panel>
                </>
            )}
            {visGenerellSakInfoStripe && (
                <>
                    <br />
                    <AlertStripe type="info">
                        <GenerellSakInfoStripeTittel>{`Du velger å journalføre uten å knytte til behandling(er).`}</GenerellSakInfoStripeTittel>
                        <div>
                            {`Journalposten knyttes kun til person (tilsvarende "Knytt til generell
                            sak" i Gosys)`}
                        </div>
                    </AlertStripe>
                </>
            )}
        </KnyttDiv>
    );
};
