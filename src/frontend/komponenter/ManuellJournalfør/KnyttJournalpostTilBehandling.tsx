import React from 'react';

import styled from 'styled-components';

import { Undertittel } from 'nav-frontend-typografi';

import { Alert } from '@navikt/ds-react';
import { FamilieCheckbox } from '@navikt/familie-form-elements';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import type { BehandlingÅrsak } from '../../typer/behandling';
import {
    behandlingsstatuser,
    BehandlingStatus,
    behandlingstyper,
    behandlingÅrsak,
} from '../../typer/behandling';
import { hentAktivBehandlingPåMinimalFagsak } from '../../utils/fagsak';
import { datoformat, formaterIsoDato } from '../../utils/formatter';
import type { VisningBehandling } from '../Fagsak/Saksoversikt/visningBehandling';
import { KnyttTilNyBehandling } from './KnyttTilNyBehandling';

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
        skjema,
        minimalFagsak,
        hentSorterteBehandlinger,
        kanKnytteJournalpostTilBehandling,
        erLesevisning,
    } = useManuellJournalfør();
    const åpenBehandling: VisningBehandling | undefined = minimalFagsak
        ? hentAktivBehandlingPåMinimalFagsak(minimalFagsak)
        : undefined;

    const visGenerellSakInfoStripe =
        !erLesevisning() &&
        skjema.felter.tilknyttedeBehandlingIder.verdi.length === 0 &&
        !skjema.felter.knyttTilNyBehandling.verdi;
    return (
        <KnyttDiv>
            {!!minimalFagsak?.behandlinger.length && (
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
                            {hentSorterteBehandlinger().map((behandling: VisningBehandling) => {
                                const behandlingId: number | undefined =
                                    typeof behandling.behandlingId == 'number'
                                        ? behandling.behandlingId
                                        : undefined;

                                return behandlingId !== undefined ? (
                                    <tr
                                        key={behandlingId}
                                        className={
                                            skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                behandlingId
                                            )
                                                ? 'tabell__tr--valgt'
                                                : ''
                                        }
                                        aria-selected={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                            behandlingId
                                        )}
                                    >
                                        <KnyttTilBehandlingTd>
                                            <FamilieCheckbox
                                                id={behandlingId.toString()}
                                                erLesevisning={!kanKnytteJournalpostTilBehandling()}
                                                label={'-'}
                                                checked={skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                    behandlingId
                                                )}
                                                onChange={() => {
                                                    skjema.felter.tilknyttedeBehandlingIder.validerOgSettFelt(
                                                        [
                                                            ...skjema.felter.tilknyttedeBehandlingIder.verdi.filter(
                                                                it => it !== behandlingId
                                                            ),
                                                            ...(skjema.felter.tilknyttedeBehandlingIder.verdi.includes(
                                                                behandlingId
                                                            )
                                                                ? []
                                                                : [behandlingId]),
                                                        ]
                                                    );
                                                }}
                                            />
                                        </KnyttTilBehandlingTd>
                                        <td>
                                            {formaterIsoDato(
                                                behandling.opprettetTidspunkt,
                                                datoformat.DATO_FORKORTTET
                                            )}
                                        </td>
                                        <td>
                                            {behandlingÅrsak[behandling.årsak as BehandlingÅrsak]}
                                        </td>
                                        <BehandlingstypeTd>
                                            {behandlingstyper[behandling.type].navn}
                                        </BehandlingstypeTd>
                                        <td>{behandlingsstatuser[behandling.status]}</td>
                                    </tr>
                                ) : null;
                            })}
                        </tbody>
                    </table>
                    <br />
                </>
            )}
            {(!åpenBehandling || åpenBehandling.status === BehandlingStatus.AVSLUTTET) && (
                <KnyttTilNyBehandling />
            )}
            {visGenerellSakInfoStripe && (
                <>
                    <br />
                    <Alert variant="info">
                        <GenerellSakInfoStripeTittel>
                            {hentSorterteBehandlinger().length > 0
                                ? `Du velger å journalføre uten å knytte til behandling(er).`
                                : `Du velger å journalføre uten å knytte til ny behandling.`}
                        </GenerellSakInfoStripeTittel>
                        <div>
                            {`Journalposten knyttes kun til person (tilsvarende "Knytt til generell
                            sak" i Gosys)`}
                        </div>
                    </Alert>
                </>
            )}
        </KnyttDiv>
    );
};
